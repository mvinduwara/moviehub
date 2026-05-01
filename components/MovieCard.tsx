 import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link href={`/movie/${movie.id}`} className="group relative flex flex-col gap-2 transition-transform hover:scale-105">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-yellow-500 px-1.5 py-0.5 text-xs font-bold text-black">
          ★ {movie.vote_average.toFixed(1)}
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
          WEB
        </div>
      </div>
      <div className="mt-1">
        <h3 className="truncate text-sm font-medium text-zinc-100 group-hover:text-red-500">
          {movie.title}
        </h3>
        <p className="text-xs text-zinc-400">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </p>
      </div>
    </Link>
  );
}