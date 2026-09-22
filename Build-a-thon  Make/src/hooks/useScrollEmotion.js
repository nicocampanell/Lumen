// useScrollEmotion hook
import { useState, useEffect, useCallback } from 'react'
import { emotionPresets } from '../data/emotionPresets'

export function useScrollEmotion(externalIndex) {
  // Use the external index directly — scroll still updates via the setter passed from context
  const activeIndex = externalIndex ?? 0

  return { currentEmotion: emotionPresets[activeIndex] }
}
