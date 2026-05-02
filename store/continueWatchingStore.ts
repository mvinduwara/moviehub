import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchProgress {
  id: number;
  title: string;
  poster_path: string;
  type: 'movie' | 'tv';
  season?: string;
  episode?: string;
  updatedAt: number;
}

interface ContinueWatchingState {
  items: WatchProgress[];
  addOrUpdateItem: (item: Omit<WatchProgress, 'updatedAt'>) => void;
  removeItem: (id: number) => void;
}

export const useContinueWatchingStore = create<ContinueWatchingState>()(
  persist(
    (set) => ({
      items: [],
      addOrUpdateItem: (item) => {
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== item.id);
          const newItem = { ...item, updatedAt: Date.now() };

          return { items: [newItem, ...filtered].slice(0, 10) };
        });
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
    }),
    {
      name: 'moviehub-continue-watching',
    }
  )
);