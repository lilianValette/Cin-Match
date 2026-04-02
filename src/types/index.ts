export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  genres: Genre[];
  rating: number;
  year: number;
  duration: number; // minutes
  isPremium?: boolean;
}

export interface Actor {
  id: number;
  name: string;
  photoUrl: string;
  knownFor: string;
}

export interface TMDBMovieRaw {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
