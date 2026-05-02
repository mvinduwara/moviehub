import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TVShow } from '@/types/tv';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTVDetails(id: string) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

  const res = await fetch(
    `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  return res.json() as Promise<TVShow>;
}

export default async function TVPage({ params }: PageProps) {
  const { id } = await params;
  const show = await getTVDetails(id);

  if (!show) notFound();

  const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;

  return (
    <main className="min-h-screen bg-zinc-950 pb-12">
      <div className="relative h-[40vh] w-full lg:h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
        <Image src={backdropUrl} alt={show.name} fill className="object-cover" priority />
        
        <div className="absolute bottom-0 z-20 flex w-full flex-col justify-end p-6 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-6xl">{show.name}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-zinc-300">
              <span className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-1 text-yellow-500">
                ★ {show.vote_average.toFixed(1)}
              </span>
              <span>{show.first_air_date?.substring(0, 4)}</span>
              <span>{show.number_of_seasons} Seasons</span>
            </div>
            <p className="mt-4 line-clamp-3 text-lg text-zinc-400 md:line-clamp-none">{show.overview}</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 md:px-12 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-2">Seasons</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {show.seasons.filter(s => s.season_number > 0).map((season) => (
            <Link 
              key={season.id} 
              href={`/tv/${show.id}/${season.season_number}/1`}
              className="group flex flex-col gap-2 rounded-lg bg-zinc-900/50 p-2 transition-colors hover:bg-zinc-800"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800">
                {season.poster_path ? (
                  <Image src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name} fill className="object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-500 text-sm">No Poster</div>
                )}
              </div>
              <div className="mt-1">
                <h3 className="text-sm font-medium text-white group-hover:text-red-500">{season.name}</h3>
                <p className="text-xs text-zinc-400">{season.episode_count} Episodes</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}