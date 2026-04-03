import { tmdbFetch } from './api';
import type {
  Movie,
  StreamingPlatform,
  TMDBMovieRaw,
  TMDBResponse,
  TMDBWatchCountryResult,
  TMDBWatchProvidersResponse,
  WatchProviderCategory,
} from '@/types';
import { Config } from '@/constants/Config';

/** Genres TMDB → nom lisible (cache local pour éviter un appel par film) */
const GENRE_CACHE: Record<number, string> = {};

export async function fetchGenres(): Promise<void> {
  if (Object.keys(GENRE_CACHE).length > 0) return;

  const data = await tmdbFetch<{ genres: { id: number; name: string }[] }>('/genre/movie/list', {
    language: 'fr-FR',
  });
  data.genres.forEach((g) => {
    GENRE_CACHE[g.id] = g.name;
  });
}

function mapMovie(raw: TMDBMovieRaw): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    posterUrl: raw.poster_path
      ? `${Config.TMDB_IMAGE_BASE_URL}${raw.poster_path}`
      : '',
    backdropUrl: raw.backdrop_path
      ? `${Config.TMDB_IMAGE_BASE_URL}${raw.backdrop_path}`
      : '',
    genres: (raw.genre_ids ?? []).map((id) => ({ id, name: GENRE_CACHE[id] ?? '' })),
    rating: Math.round(raw.vote_average * 10) / 10,
    year: raw.release_date ? Number(raw.release_date.slice(0, 4)) : 0,
    duration: 0, // non disponible sur /discover — à enrichir via getMovieDetails si besoin
  };
}

/**
 * Récupère une page de films aléatoires depuis /discover/movie.
 * TMDB retourne 20 films par page. On tire une page au hasard parmi les 100 premières.
 */
export async function fetchRandomMoviePage(): Promise<{ movies: Movie[]; totalPages: number }> {
  await fetchGenres();

  // Première requête pour connaître le nombre total de pages
  const firstPage = await tmdbFetch<TMDBResponse<TMDBMovieRaw>>('/discover/movie', {
    language: 'fr-FR',
    sort_by: 'popularity.desc',
    page: '1',
  });

  // TMDB plafonne à 500 pages max via l'API publique
  const maxPage = Math.min(firstPage.total_pages, 500);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  if (randomPage === 1) {
    return {
      movies: firstPage.results.map(mapMovie),
      totalPages: maxPage,
    };
  }

  const data = await tmdbFetch<TMDBResponse<TMDBMovieRaw>>('/discover/movie', {
    language: 'fr-FR',
    sort_by: 'popularity.desc',
    page: String(randomPage),
  });

  return {
    movies: data.results.map(mapMovie),
    totalPages: maxPage,
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
    const providers = country[category] ?? [];
    providers.forEach((provider) => {
      const existing = providersById.get(provider.provider_id);
      const logoUrl = provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : '';

      if (!existing) {
        providersById.set(provider.provider_id, {
          id: provider.provider_id,
          name: provider.provider_name,
          logoUrl,
          categories: [category],
        });
        return;
      }

      if (!existing.categories.includes(category)) {
        existing.categories.push(category);
      }
    });
  });

  return Array.from(providersById.values());
}
