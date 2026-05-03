import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export interface CloudMedia {
  id: number;
  title: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
}

interface WatchlistState {
  watchlist: CloudMedia[];
  fetchWatchlist: () => Promise<void>;
  addToWatchlist: (item: CloudMedia) => Promise<void>;
  removeFromWatchlist: (id: number) => Promise<void>;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => {
  const supabase = createClient();

  return {
    watchlist: [],

    clearWatchlist: () => set({ watchlist: [] }),
    fetchWatchlist: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
         set({ watchlist: [] });
         return;
      }

      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map(item => ({
          id: item.tmdb_id,
          title: item.title,
          poster_path: item.poster_path,
          media_type: item.media_type as 'movie' | 'tv'
        }));
        set({ watchlist: mapped });
      }
    },

    addToWatchlist: async (item) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to save to your watchlist!');
        return;
      }

      const current = get().watchlist;
      if (!current.find(m => m.id === item.id)) {
        set({ watchlist: [item, ...current] }); 
      }

      await supabase.from('watchlist').insert({
        user_id: user.id,
        tmdb_id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        media_type: item.media_type
      });
    },

    removeFromWatchlist: async (id) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      set({ watchlist: get().watchlist.filter(m => m.id !== id) }); 

      await supabase
        .from('watchlist')
        .delete()
        .match({ user_id: user.id, tmdb_id: id });
    },

    isInWatchlist: (id) => {
      return get().watchlist.some(m => m.id === id);
    }
  };
});