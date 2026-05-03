import MovieCard from '@/components/movie/MovieCard';
import { TMDBResponse } from '@/types/movie';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getSearchResults(query: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${siteUrl}/api/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json() as Promise<TMDBResponse>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  
  if (!query) {
    return (
      <main className="min-h-screen bg-zinc-950 p-6 pt-24 text-center text-white">
        <h1 className="text-2xl">Please enter a search term.</h1>
      </main>
    );
  }

  const data = await getSearchResults(query);

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
          Search Results for: <span className="text-red-600">"{query}"</span>
        </h1>
        
        {data?.results && data.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-400">No movies found. Try a different search term.</p>
        )}
      </div>
    </main>
  );
}