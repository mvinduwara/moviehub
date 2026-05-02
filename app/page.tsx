import MovieCard from '@/components/MovieCard';
import { TMDBResponse } from '@/types/movie';
import ContinueWatchingRow from '@/components/home/ContinueWatchingRow';

async function getTrendingMovies() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${siteUrl}/api/movies`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return res.json() as Promise<TMDBResponse>;
}

export default async function Home() {
  const data = await getTrendingMovies();

  return (
    <main className="min-h-screen bg-zinc-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
          <ContinueWatchingRow />
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}