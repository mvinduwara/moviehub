'use client';

import { useState } from 'react';
import { TV_SOURCES } from '@/lib/stream-sources';

interface TVPlayerProps {
  tmdbId: string;
  season: string;
  episode: string;
}

export default function TVPlayer({ tmdbId, season, episode }: TVPlayerProps) {
  const [activeSource, setActiveSource] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-zinc-800 shadow-2xl">
        <iframe
          src={TV_SOURCES[activeSource].url(tmdbId, season, episode)}
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          title={`TV Stream S${season} E${episode}`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
        <span className="text-sm font-medium text-zinc-400 mr-2">Stream Source:</span>
        {TV_SOURCES.map((source, index) => (
          <button
            key={index}
            onClick={() => setActiveSource(index)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              activeSource === index ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}