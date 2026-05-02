export const MOVIE_SOURCES = [
  { name: 'Server 1 (VidSrc)', url: (id: string) => `https://vidsrc.me/embed/movie/${id}` },
  { name: 'Server 2 (2Embed)', url: (id: string) => `https://2embed.cc/embed/${id}` },
  { name: 'Server 3 (EmbedSU)', url: (id: string) => `https://embedsu.com/embed/movie?tmdb=${id}` },
];

export const TV_SOURCES = [
  { name: 'Server 1 (VidSrc)', url: (id: string, s: string, e: string) => `https://vidsrc.me/embed/tv/${id}/${s}/${e}` },
  { name: 'Server 2 (EmbedSU)', url: (id: string, s: string, e: string) => `https://embedsu.com/embed/tv?tmdb=${id}&s=${s}&e=${e}` },
  { name: 'Server 3 (AutoEmbed)', url: (id: string, s: string, e: string) => `https://player.autoembed.cc/embed/tv/${id}/${s}/${e}` },
];