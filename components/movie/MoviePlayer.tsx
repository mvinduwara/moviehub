// components/movie/MoviePlayer.tsx
'use client';

import { useState } from 'react';
import { MOVIE_SOURCES } from '@/lib/stream-sources';

interface MoviePlayerProps {
  tmdbId: number;
}

export default function MoviePlayer({ tmdbId }: MoviePlayerProps) {
  const [activeSource, setActiveSource] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-zinc-800 shadow-2xl">
        <iframe
          src={MOVIE_SOURCES[activeSource].url(tmdbId.toString())}
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          title="Movie Stream"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
        <span className="text-sm font-medium text-zinc-400 mr-2">Stream Source:</span>
        {MOVIE_SOURCES.map((source, index) => (
          <button
            key={index}
            onClick={() => setActiveSource(index)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              activeSource === index
                ? 'bg-red-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}