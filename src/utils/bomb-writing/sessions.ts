import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionStore {
  dailyCount: number;
  lastSessionDate: string;
  incrementCount: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      dailyCount: 0,
      lastSessionDate: new Date().toDateString(),
      incrementCount: () => {
        const today = new Date().toDateString();
        const lastDate = get().lastSessionDate;
        
        // Se for um novo dia, reseta o contador
        if (today !== lastDate) {
          set({ dailyCount: 1, lastSessionDate: today });
        } else {
          set(state => ({ dailyCount: state.dailyCount + 1 }));
        }
      },
    }),
    {
      name: 'bomb-writing-sessions',
    }
  )
);