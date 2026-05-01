import { NextResponse } from 'next/server';

export async function GET() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } } // Edge caching for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from TMDB');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}