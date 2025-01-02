import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { BombWritingSettings, BombWritingState } from '../utils/bomb-writing/types'

interface BombWritingStore extends BombWritingState {
  startSession: (settings: BombWritingSettings, initialText: string) => void;
  endSession: (isVictory: boolean) => void;
  updateText: (text: string) => void;
  updateTimer: (time: number) => void;
  reset: () => void;
}

const initialState: BombWritingState = {
  previousText: '',
  currentText: '',
  isActive: false,
  sessionStartTime: null,
  timer: 0,
  settings: null
}

export const useBombWriting = create<BombWritingStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      startSession: (settings, initialText) => {
        if (!settings?.duration || settings.duration <= 0 || !settings.totalTime || !settings.maxPauseTime) {
          throw new Error('Invalid settings provided')
        }
        const state = get()
        if (state.isActive) throw new Error('Session already active')
        
        set({
          previousText: initialText.trim(),
          currentText: initialText.trim(),
          isActive: true,
          settings,
          sessionStartTime: Date.now(),
          timer: settings.duration
        })
      },
      endSession: (isVictory: boolean) => {
        const state = get();
        if (!state.isActive) {
          throw new Error('Cannot end: No active session');
        }

        set({
          ...initialState,
          previousText: state.previousText,
          currentText: isVictory ? state.currentText : state.previousText
        });
      },
      updateText: (text: string) => {
        const state = get();
        if (!state.isActive) {
          throw new Error('Cannot update: No active session');
        }

        set({ ...state, currentText: text.trim() });
      },
      updateTimer: (time) => {
        const state = get()
        if (!state.isActive) return
        
        set({ timer: time })
        if (time <= 0) {
          get().endSession(false)
        }
      },
      reset: () => set(initialState)
    }),
    {
      name: 'bomb-writing-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ previousText: state.previousText })
    }
  )
)