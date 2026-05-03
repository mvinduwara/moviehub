// app/genre/[slug]/page.tsx
import { notFound } from 'next/navigation';
import MovieCard from '@/components/movie/MovieCard';

// Map URL slugs to TMDB Genre IDs
const GENRE_MAP: Record<string, { id: number; name: string }> = {
  action: { id: 28, name: 'Action' },
  comedy: { id: 35, name: 'Comedy' },
  horror: { id: 27, name: 'Horror' },
  romance: { id: 10749, name: 'Romance' },
  'sci-fi': { id: 878, name: 'Science Fiction' },
  thriller: { id: 53, name: 'Thriller' },
  drama: { id: 18, name: 'Drama' },
  animation: { id: 16, name: 'Animation' },
};

interface GenrePageProps {
  params: Promise<{ slug: string }>;
}

async function getMoviesByGenre(genreId: number) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

  const res = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { slug } = await params;
  const genre = GENRE_MAP[slug.toLowerCase()];

  if (!genre) notFound(); 

  const data = await getMoviesByGenre(genre.id);

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-white capitalize">
          {genre.name} <span className="text-red-600">Movies</span>
        </h1>
        
        {data?.results && data.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.results.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} mediaType="movie" />
            ))}
          </div>
        ) : (
          <p className="text-zinc-400">No movies found for this genre.</p>
        )}
      </div>
    </main>
  );
}