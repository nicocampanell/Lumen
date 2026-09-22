import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { initialStudy, loadStudy, saveStudy, STORAGE_KEY, updateStudy } from '../../lib/study.ts';
import type { Dataset, StudyState } from '../../lib/model.ts';
import type { StudyAction } from '../../lib/study.ts';

type StudyContextValue = {
  state: StudyState;
  dataset: Dataset | undefined;
  storageError?: string;
  recoveryExport?: string;
  dispatch: (action: StudyAction) => void;
  deleteAllData: () => void;
};

const Context = createContext<StudyContextValue | undefined>(undefined);

function readInitial(): { state: StudyState; error?: string; recoveryExport?: string } {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return { state: initialStudy() };
    return loadStudy(window.localStorage);
  } catch {
    return { state: initialStudy(), error: 'Saved Lumin data could not be read. Export it before resetting.' };
  }
}

export function StudyProvider(props: { children: React.ReactNode }): React.ReactElement {
  const initial = useMemo(readInitial, []);
  const [state, setState] = useState<StudyState>(initial.state);
  const [storageError, setStorageError] = useState<string | undefined>(initial.error);
  const [recoveryExport, setRecoveryExport] = useState<string | undefined>(initial.recoveryExport);
  const stateRef = useRef(initial.state);
  const storageLoadBlocked = useRef(Boolean(initial.error));
  const dispatch = (action: StudyAction): void => {
    const next = updateStudy(stateRef.current, action, new Date());
    stateRef.current = next;
    if (!storageLoadBlocked.current) {
      try {
        const error = typeof window === 'undefined' || !window.localStorage ? undefined : saveStudy(window.localStorage, next);
        setStorageError(error);
      } catch {
        setStorageError('Changes could not be saved on this device. Export your data before leaving.');
      }
    }
    setState(next);
  };
  const deleteAllData = (): void => {
    let cleared = false;
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.removeItem(STORAGE_KEY);
      cleared = true;
      setStorageError(undefined);
    } catch {
      setStorageError('Changes could not be saved on this device. Export your data before leaving.');
    }
    const next = initialStudy();
    stateRef.current = next;
    if (cleared) storageLoadBlocked.current = false;
    if (cleared) setRecoveryExport(undefined);
    setState(next);
  };
  const value = useMemo(() => ({ state, dataset: state.activeSource ? state.datasets[state.activeSource] : undefined, storageError, recoveryExport, dispatch, deleteAllData }), [state, storageError, recoveryExport]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useStudy(): StudyContextValue {
  const value = useContext(Context);
  if (!value) throw new Error('useStudy must be used within StudyProvider');
  return value;
}
