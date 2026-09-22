import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('onboarding has consent, sample choice and no credential fields', async () => {
  const text = await readFile(new URL('../src/app/components/OnboardingPage.tsx', import.meta.url), 'utf8');
  assert.match(text, /informational, not medical/i);
  assert.match(text, /Use sample data/);
  assert.doesNotMatch(text, /type=["']password["']/);
  assert.match(text, /importGarmin/);
});

test('profile keeps consent explicit and protects source choices', async () => {
  const text = await readFile(new URL('../src/app/components/ProfilePage.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(text, /dispatch\(\{ type: ['"]consent['"] \}\)/);
  assert.match(text, /navigate\(['"]\/onboarding['"]\)/);
  assert.match(text, /requestToken/);
  assert.match(text, /tabIndex=\{?-1\}?/);
  assert.match(text, /saved readings stay here/i);
});

test('profile cancels stale Garmin and file completions across reset and unmount', async () => {
  const text = await readFile(new URL('../src/app/components/ProfilePage.tsx', import.meta.url), 'utf8');
  assert.match(text, /const fileToken = requestToken\.current/);
  assert.match(text, /file\.text\(\)[\s\S]{0,180}fileToken !== requestToken\.current/s);
  assert.match(text, /useEffect\(\(\) => \(\) => \{[\s\S]{0,100}requestToken\.current \+= 1/s);
  assert.match(text, /cancelPending\(\);\s*deleteAllData\(\)/s);
});

test('profile offers a clearly labeled raw recovery download after a corrupt load', async () => {
  const text = await readFile(new URL('../src/app/components/ProfilePage.tsx', import.meta.url), 'utf8');
  assert.match(text, /recoveryExport/);
  assert.match(text, /Download recovery copy/);
  assert.match(text, /before resetting/i);
});
