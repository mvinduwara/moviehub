'use client';

import { useState } from 'react';

interface SubtitlePanelProps {
  tmdbId: number | string;
}

interface Subtitle {
  id: string;
  attributes: {
    language: string;
    release: string;
    files: { file_id: number; file_name: string }[];
  };
}

export default function SubtitlePanel({ tmdbId }: SubtitlePanelProps) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');

  const fetchSubtitles = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/subtitles?tmdbId=${tmdbId}&lang=${language}`);
      const data = await res.json();
      
      if (data.data) {
        setSubtitles(data.data.slice(0, 5)); 
      } else {
        setError('No subtitles found for this language.');
      }
    } catch (err) {
      setError('Failed to load subtitles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          Subtitles
        </h3>
        
        <div className="flex gap-2">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-md bg-zinc-800 px-3 py-1 text-sm text-white outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="si">Sinhala</option>
          </select>
          <button 
            onClick={fetchSubtitles}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-1 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {subtitles.length > 0 && (
        <ul className="flex flex-col gap-2 mt-4">
          {subtitles.map((sub) => (
            <li key={sub.id} className="flex items-center justify-between rounded-md bg-zinc-800/50 p-2 text-sm text-zinc-300">
              <span className="truncate pr-4">{sub.attributes.release || 'Standard Subtitle Track'}</span>
              
              <button className="whitespace-nowrap text-xs font-medium text-red-400 hover:text-red-300">
                Get Subtitle
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}