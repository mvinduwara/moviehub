// components/common/WatchlistButton.tsx
'use client';

import { useWatchlistStore } from '@/store/watchlistStore';
import { useStore } from '@/hooks/useStore';

interface WatchlistButtonProps {
  movie: any; // Accommodates both TV and Movies
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  // Fetch the entire store object safely
  const store = useStore(useWatchlistStore, (state) => state);

  if (!store) return null;

  const isSaved = store.isInWatchlist(movie.id);

  const toggleWatchlist = () => {
    if (isSaved) {
      store.removeFromWatchlist(movie.id);
    } else {
      store.addToWatchlist(movie);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
        isSaved
          ? 'bg-zinc-800 text-red-500 hover:bg-zinc-700'
          : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      {isSaved ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
          Saved to Watchlist
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add to Watchlist
        </>
      )}
    </button>
  );
}