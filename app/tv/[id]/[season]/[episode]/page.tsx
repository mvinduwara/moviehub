import Link from 'next/link';
import TVPlayer from '@/components/movie/TVPlayer';
import ProgressTracker from '@/components/player/ProgressTracker';

interface EpisodePageProps {
  params: Promise<{ id: string; season: string; episode: string; }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id, season, episode } = await params;

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const res = await fetch(`${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  const show = await res.json();

  const nextEpisode = parseInt(episode) + 1;
  const prevEpisode = parseInt(episode) > 1 ? parseInt(episode) - 1 : 1;

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-24">
      <div className="mx-auto max-w-5xl">
        <ProgressTracker 
          item={{
            id: show.id,
            title: show.name,
            poster_path: show.poster_path,
            type: 'tv',
            season: season,
            episode: episode,
          }} 
        />
      </div>
    </main>
  );
}