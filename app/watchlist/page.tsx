'use client';

import { useEffect, useState } from 'react';
import { useWatchlistStore } from '@/store/watchlistStore';
import MovieCard from '@/components/MovieCard';

export default function WatchlistPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { watchlist } = useWatchlistStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <main className="min-h-screen bg-zinc-950 p-6 pt-24" />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
          My <span className="text-red-600">Watchlist</span>
        </h1>
        
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50">
            <p className="text-lg text-zinc-400">Your watchlist is empty.</p>
            <p className="text-sm text-zinc-500">Go find some movies to save!</p>
          </div>
        )}
      </div>
    </main>
  );
}