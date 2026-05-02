import Image from 'next/image';
import { notFound } from 'next/navigation';
import MoviePlayer from '@/components/movie/MoviePlayer';
import WatchlistButton from '@/components/common/WatchlistButton';
import ProgressTracker from '@/components/player/ProgressTracker';
import SubtitlePanel from '@/components/player/SubtitlePanel';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMovieDetails(id: string) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <main className="min-h-screen bg-zinc-950 pb-12">
      <div className="relative h-[40vh] w-full lg:h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute bottom-0 z-20 flex w-full flex-col justify-end p-6 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-6xl">{movie.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-zinc-300">
              <span className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-1 text-yellow-500">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span>{movie.runtime} min</span>
            </div>
            <p className="mt-4 line-clamp-3 text-lg text-zinc-400 md:line-clamp-none">
              {movie.overview}
            </p>
            <div className="mt-6">
              <WatchlistButton movie={movie} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Watch Now</h2>
        <ProgressTracker
          item={{
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            type: 'movie',
          }}
        />
        <MoviePlayer tmdbId={movie.id} />
      </div>
    </main>
  );
}