import { tmdbFetch } from './api';
import type {
  Genre,
  Movie,
  MovieCredits,
  StreamingPlatform,
  TMDBMovieRaw,
  TMDBResponse,
  TMDBWatchCountryResult,
  TMDBWatchProvidersResponse,
  WatchProviderCategory,
} from '@/types';
import { Config } from '@/constants/Config';

interface TMDBWatchProviderListItem {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority: number;
}

interface TMDBWatchProvidersListResponse {
  results: TMDBWatchProviderListItem[];
}

/** Genres TMDB → nom lisible (cache local pour éviter un appel par film) */
const GENRE_CACHE: Record<number, string> = {};

export async function fetchWatchProviders(countryCode = 'FR'): Promise<StreamingPlatform[]> {
  const data = await tmdbFetch<TMDBWatchProvidersListResponse>('/watch/providers/movie', {
    watch_region: countryCode,
    language: 'fr-FR',
  });
  return data.results
    .sort((a, b) => a.display_priority - b.display_priority)
    .map((p) => ({
      id: p.provider_id,
      name: p.provider_name,
      logoUrl: p.logo_path ? `https://image.tmdb.org/t/p/w92${p.logo_path}` : '',
      categories: [],
    }));
}

export async function fetchAllGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>('/genre/movie/list', {
    language: 'fr-FR',
  });
  data.genres.forEach((g) => {
    GENRE_CACHE[g.id] = g.name;
  });
  return data.genres;
}

export async function fetchGenres(): Promise<void> {
  if (Object.keys(GENRE_CACHE).length > 0) return;
  await fetchAllGenres();
}

function mapMovie(raw: TMDBMovieRaw): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    posterUrl: raw.poster_path ? `${Config.TMDB_IMAGE_BASE_URL}${raw.poster_path}` : '',
    backdropUrl: raw.backdrop_path ? `${Config.TMDB_IMAGE_BASE_URL}${raw.backdrop_path}` : '',
    genres: (raw.genre_ids ?? []).map((id) => ({ id, name: GENRE_CACHE[id] ?? '' })),
    rating: Math.round(raw.vote_average * 10) / 10,
    year: raw.release_date ? Number(raw.release_date.slice(0, 4)) : 0,
    duration: 0,
  };
}

/**
 * Récupère une page de films aléatoires depuis /discover/movie.
 * Si genreId est fourni, filtre les films par ce genre.
 * TMDB retourne 20 films par page. On tire une page au hasard parmi les 500 premières.
 */
export async function fetchRandomMoviePage(
  genreId?: number,
  providerIds?: number[],
  originCountryCodes?: string[],
): Promise<{ movies: Movie[]; totalPages: number }> {
  await fetchGenres();

  const baseParams: Record<string, string> = {
    language: 'fr-FR',
    sort_by: 'popularity.desc',
    page: '1',
  };
  if (genreId != null) {
    baseParams.with_genres = String(genreId);
  }
  if (providerIds && providerIds.length > 0) {
    baseParams.with_watch_providers = providerIds.join('|');
    baseParams.watch_region = 'FR';
  }
  if (originCountryCodes && originCountryCodes.length > 0) {
    baseParams.with_origin_country = originCountryCodes.join('|');
  }

  const firstPage = await tmdbFetch<TMDBResponse<TMDBMovieRaw>>('/discover/movie', baseParams);

  const maxPage = Math.min(firstPage.total_pages, 500);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  if (randomPage === 1) {
    return { movies: firstPage.results.map(mapMovie), totalPages: maxPage };
  }

  const data = await tmdbFetch<TMDBResponse<TMDBMovieRaw>>('/discover/movie', {
    ...baseParams,
    page: String(randomPage),
  });

  return { movies: data.results.map(mapMovie), totalPages: maxPage };
}

// Raw TMDB credits types — local only
interface TMDBCastRaw { id: number; name: string; order: number }
interface TMDBCrewRaw { id: number; name: string; job: string }
interface TMDBCreditsRaw { cast: TMDBCastRaw[]; crew: TMDBCrewRaw[] }

export async function fetchMovieCredits(movieId: number): Promise<MovieCredits> {
  const data = await tmdbFetch<TMDBCreditsRaw>(`/movie/${movieId}/credits`, { language: 'fr-FR' });
  return {
    topCast: data.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, 10)
      .map(({ id, name }) => ({ id, name })),
    directors: data.crew
      .filter((m) => m.job === 'Director')
      .map(({ id, name }) => ({ id, name })),
  };
}

export async function fetchMovieWatchProviders(
  movieId: number,
  countryCode = 'FR',
): Promise<StreamingPlatform[]> {
  const data = await tmdbFetch<TMDBWatchProvidersResponse>(`/movie/${movieId}/watch/providers`);
  const country = data.results?.[countryCode] ?? data.results?.US;
  if (!country) return [];
  return mapWatchProviders(country);
}

function mapWatchProviders(country: TMDBWatchCountryResult): StreamingPlatform[] {
  const categories: WatchProviderCategory[] = ['flatrate', 'rent', 'buy', 'free', 'ads'];
  const providersById = new Map<number, StreamingPlatform>();

  categories.forEach((category) => {
    (country[category] ?? []).forEach((provider) => {
      const existing = providersById.get(provider.provider_id);
      const logoUrl = provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : '';

      if (!existing) {
        providersById.set(provider.provider_id, {
          id: provider.provider_id,
          name: provider.provider_name,
          logoUrl,
          categories: [category],
        });
      } else if (!existing.categories.includes(category)) {
        existing.categories.push(category);
      }
    });
  });

  return Array.from(providersById.values());
}
