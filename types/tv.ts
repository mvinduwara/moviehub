export interface Season {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string;
  }
  
  export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string;
    number_of_seasons: number;
    seasons: Season[];
  }