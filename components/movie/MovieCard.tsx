import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: any; 
  mediaType?: 'movie' | 'tv';
}

export default function MovieCard({ movie, mediaType = 'movie' }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title || movie.name; 
  const date = movie.release_date || movie.first_air_date;
  const href = mediaType === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <Link href={href} className="group relative flex flex-col gap-2 transition-transform hover:scale-105">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800">
        {movie.poster_path ? (
           <Image
             src={posterUrl}
             alt={title}
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">No Image</div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-yellow-500 px-1.5 py-0.5 text-xs font-bold text-black">
          ★ {movie.vote_average?.toFixed(1) || 'NR'}
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
          WEB
        </div>
      </div>
      <div className="mt-1">
        <h3 className="truncate text-sm font-medium text-zinc-100 group-hover:text-red-500">
          {title}
        </h3>
        <p className="text-xs text-zinc-400">
          {date ? date.substring(0, 4) : 'N/A'}
        </p>
      </div>
    </Link>
  );
}