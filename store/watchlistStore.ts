import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types/movie';

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) => {
        const currentList = get().watchlist;
        if (!currentList.find((m) => m.id === movie.id)) {
          set({ watchlist: [...currentList, movie] });
        }
      },
      removeFromWatchlist: (movieId) => {
        set({ watchlist: get().watchlist.filter((m) => m.id !== movieId) });
      },
      isInWatchlist: (movieId) => {
        return get().watchlist.some((m) => m.id === movieId);
      },
    }),
    {
      name: 'moviehub-watchlist',
    }
  )
);