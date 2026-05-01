import Link from 'next/link';
import SearchBar from '@/components/common/SearchBar';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            Movie<span className="text-red-600">Hub</span>
          </span>
        </Link>

        <div className="hidden flex-1 px-8 md:block max-w-xl">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/watchlist"
            className="text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            My Watchlist
          </Link>
        </nav>
      </div>

      <div className="border-t border-zinc-800/50 p-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}