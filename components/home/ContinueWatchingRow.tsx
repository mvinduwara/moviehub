'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContinueWatchingStore } from '@/store/continueWatchingStore';
import { useStore } from '@/hooks/useStore';

export default function ContinueWatchingRow() {
  const store = useStore(useContinueWatchingStore, (state) => state);

  if (!store || store.items.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
        Continue <span className="text-red-600">Watching</span>
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {store.items.map((item) => {
          const href = item.type === 'movie' 
            ? `/movie/${item.id}` 
            : `/tv/${item.id}/${item.season}/${item.episode}`;

          return (
            <div key={item.id} className="relative flex-none w-64 group">
              <Link href={href} className="block overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 transition-transform hover:scale-[1.02]">
                <div className="relative aspect-video w-full bg-zinc-800">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 transition-opacity group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-red-600/80 p-3 text-white backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
                  {item.type === 'tv' && (
                    <p className="text-xs text-zinc-400 mt-1">Season {item.season} • Episode {item.episode}</p>
                  )}
                </div>
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  store.removeItem(item.id);
                }}
                className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1.5 text-zinc-300 opacity-0 transition-opacity hover:bg-black hover:text-white group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}