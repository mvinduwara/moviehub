'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import GenreDropdown from '@/components/common/layout/GenreDropdown';
import { createClient } from '@/lib/supabase/client';
import { useWatchlistStore } from '@/store/watchlistStore';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  const { fetchWatchlist, clearWatchlist } = useWatchlistStore(); 

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchWatchlist(); 
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchWatchlist(); 
      } else {
        setUser(null);
        clearWatchlist(); 
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [supabase.auth, fetchWatchlist, clearWatchlist]);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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

        <nav className="flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="text-sm font-semibold text-zinc-300 hover:text-white">
            Home
          </Link>
          <Link href="/anime" className="text-sm font-semibold text-zinc-300 hover:text-white">
            Anime
          </Link>
          
          <div className="h-4 w-px bg-zinc-700 hidden md:block"></div>
          
          <GenreDropdown />

          <div className="h-4 w-px bg-zinc-700"></div>

          <Link
            href="/watchlist"
            className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
            Watchlist
          </Link>

          <div className="flex items-center gap-2 ml-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>

      <div className="border-t border-zinc-800/50 p-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}