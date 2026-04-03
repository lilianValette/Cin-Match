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

export type WatchProviderCategory = 'flatrate' | 'rent' | 'buy' | 'free' | 'ads';

export interface StreamingPlatform {
  id: number;
  name: string;
  logoUrl: string;
  categories: WatchProviderCategory[];
}

export interface PersonCredit {
  id: number;
  name: string;
}

export interface MovieCredits {
  /** Top 10 cast members by billing order */
  topCast: PersonCredit[];
  directors: PersonCredit[];
}

export interface DiscoveryFilters {
  includedGenres: number[];
  excludedGenres: number[];
  minReleaseYear: number;
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

export interface TMDBWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}

export interface TMDBWatchCountryResult {
  link?: string;
  flatrate?: TMDBWatchProvider[];
  rent?: TMDBWatchProvider[];
  buy?: TMDBWatchProvider[];
  free?: TMDBWatchProvider[];
  ads?: TMDBWatchProvider[];
}

export interface TMDBWatchProvidersResponse {
  id: number;
  results: Record<string, TMDBWatchCountryResult>;
}
