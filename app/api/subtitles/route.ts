import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tmdbId = searchParams.get('tmdbId');
  const language = searchParams.get('lang') || 'en'; 

  const API_KEY = process.env.OPENSUBTITLES_API_KEY;

  if (!tmdbId) {
    return NextResponse.json({ error: 'TMDB ID is required' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'Subtitle API key is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.opensubtitles.com/api/v1/subtitles?tmdb_id=${tmdbId}&languages=${language}`,
      {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from OpenSubtitles');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error fetching subtitles' }, { status: 500 });
  }
}