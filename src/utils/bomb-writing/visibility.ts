import { create } from 'zustand';

interface BombWritingVisibilityStore {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useBombWritingVisibility = create<BombWritingVisibilityStore>((set) => ({
  isVisible: true,
  setVisible: (visible) => set({ isVisible: visible }),
}));