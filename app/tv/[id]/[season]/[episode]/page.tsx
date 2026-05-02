import Link from 'next/link';
import TVPlayer from '@/components/movie/TVPlayer';

interface EpisodePageProps {
  params: Promise<{
    id: string;
    season: string;
    episode: string;
  }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id, season, episode } = await params;
  
  const nextEpisode = parseInt(episode) + 1;
  const prevEpisode = parseInt(episode) > 1 ? parseInt(episode) - 1 : 1;

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-24">
      <div className="mx-auto max-w-5xl">
        
        <div className="mb-6 flex items-center justify-between text-sm text-zinc-400">
          <Link href={`/tv/${id}`} className="hover:text-red-500 transition-colors">
            ← Back to Show Details
          </Link>
          <div className="font-semibold text-white">
            Season {season} <span className="mx-2 text-zinc-600">|</span> Episode {episode}
          </div>
        </div>

        <TVPlayer tmdbId={id} season={season} episode={episode} />
        <div className="mt-8 flex items-center justify-between">
          <Link 
            href={`/tv/${id}/${season}/${prevEpisode}`}
            className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Previous Episode
          </Link>
          <Link 
            href={`/tv/${id}/${season}/${nextEpisode}`}
            className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Next Episode
          </Link>
        </div>
      </div>
    </main>
  );
}