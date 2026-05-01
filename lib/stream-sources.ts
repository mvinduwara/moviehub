export const MOVIE_SOURCES = [
    { name: 'Server 1 (VidSrc)', url: (id: string) => `https://vidsrc.me/embed/movie/${id}` },
    { name: 'Server 2 (2Embed)', url: (id: string) => `https://2embed.cc/embed/${id}` },
    { name: 'Server 3 (EmbedSU)', url: (id: string) => `https://embedsu.com/embed/movie?tmdb=${id}` },
    { name: 'Server 4 (AutoEmbed)', url: (id: string) => `https://player.autoembed.cc/embed/movie/${id}` },
  ];