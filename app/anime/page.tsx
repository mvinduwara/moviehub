import MovieCard from '@/components/movie/MovieCard';

interface MediaItem {
  id: number;
  poster_path?: string;
  vote_average?: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

async function getAnimeShows() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

  const res = await fetch(
    `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16&with_original_language=ja&page=1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error('Failed to fetch Anime');
  return res.json();
}

export default async function AnimePage() {
  const data = await getAnimeShows();

  return (
    <main className="min-h-screen bg-zinc-950 p-6 pt-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Trending <span className="text-red-600">Anime</span>
          </h1>
          <p className="mt-2 text-zinc-400">Discover top-rated Japanese animation and series.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data.results.map((show: MediaItem) => (
            <MovieCard key={show.id} movie={show} mediaType="tv" />
          ))}
        </div>
      </div>
    </main>
  );
}