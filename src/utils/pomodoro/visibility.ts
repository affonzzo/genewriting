import { create } from 'zustand';

interface PomodoroVisibilityStore {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const usePomodoroVisibility = create<PomodoroVisibilityStore>((set) => ({
  isVisible: true,
  setVisible: (visible) => set({ isVisible: visible }),
}));