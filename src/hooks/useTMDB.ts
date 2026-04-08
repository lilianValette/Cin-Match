import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { regionIdsToCodes } from '@/constants/regions';
import { fetchRandomMoviePage } from '@/services/tmdbService';
import { useAppStore } from '@/store/useAppStore';
import type { Movie } from '@/types';

/** Nombre de films restants en deck sous lequel on déclenche le chargement suivant */
const PREFETCH_THRESHOLD = 5;

// Cache mémoire conservé tant que l'app reste en vie (évite de recharger en changeant d'onglet).
let DISCOVER_MOVIES_CACHE: Movie[] = [];
let DISCOVER_HAS_LOADED = false;
let DISCOVER_ERROR_CACHE: string | null = null;
let DISCOVER_IS_FETCHING = false;

/** Réinitialise le cache de découverte (à appeler après un changement de préférences). */
export function resetDiscoverCache(): void {
  DISCOVER_MOVIES_CACHE = [];
  DISCOVER_HAS_LOADED = false;
  DISCOVER_ERROR_CACHE = null;
  DISCOVER_IS_FETCHING = false;
}

/**
 * Sélectionne un genre pour le prochain fetch selon les poids favoris.
 * 30 % du temps → pas de filtre (découverte libre).
 * 70 % du temps → genre pondéré aléatoire parmi les favoris.
 */
function pickGenreForFetch(favoriteGenres: Record<number, number>): number | undefined {
  const entries = Object.entries(favoriteGenres)
    .map(([id, w]) => ({ id: Number(id), w }))
    .filter(({ w }) => w > 0);

  if (entries.length === 0) return undefined;

  // 30 % de chance d'exploration sans filtre de genre
  if (Math.random() < 0.3) return undefined;

  // Sélection aléatoire pondérée
  const total = entries.reduce((s, { w }) => s + w, 0);
  let r = Math.random() * total;
  for (const { id, w } of entries) {
    r -= w;
    if (r <= 0) return id;
  }
  return entries[entries.length - 1].id;
}

interface UseTMDBResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  /** Appelé par DeckContainer quand l'index avance */
  onMovieConsumed: (remainingCount: number) => void;
}

interface UseDiscoverMoviesOptions {
  excludedMovieIds?: number[];
}

export function useDiscoverMovies(options?: UseDiscoverMoviesOptions): UseTMDBResult {
  const [movies, setMovies] = useState<Movie[]>(DISCOVER_MOVIES_CACHE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(DISCOVER_ERROR_CACHE);

  const excludedIdsSet = useMemo(
    () => new Set(options?.excludedMovieIds ?? []),
    [options?.excludedMovieIds],
  );
  const excludedIdsRef = useRef(excludedIdsSet);

  useEffect(() => {
    excludedIdsRef.current = excludedIdsSet;
  }, [excludedIdsSet]);

  const loadMore = useCallback(async () => {
    if (DISCOVER_IS_FETCHING) return;
    DISCOVER_IS_FETCHING = true;
    setIsLoading(true);
    setError(null);
    DISCOVER_ERROR_CACHE = null;

    try {
      // Sélectionne un genre selon les préférences pondérées
      const { favoriteGenres, selectedPlatformIds, selectedRegionIds } = useAppStore.getState();
      const genreId = pickGenreForFetch(favoriteGenres);
      const providerIds = selectedPlatformIds.length > 0 ? selectedPlatformIds : undefined;
      const originCodes = selectedRegionIds.length > 0 ? regionIdsToCodes(selectedRegionIds) : undefined;

      const { movies: newMovies } = await fetchRandomMoviePage(genreId, providerIds, originCodes);
      setMovies((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const filtered = newMovies.filter((movie) => {
          return !existingIds.has(movie.id) && !excludedIdsRef.current.has(movie.id);
        });

        const next = [...prev, ...filtered];
        DISCOVER_MOVIES_CACHE = next;
        DISCOVER_HAS_LOADED = true;
        return next;
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erreur inconnue';
      setError(message);
      DISCOVER_ERROR_CACHE = message;
    } finally {
      setIsLoading(false);
      DISCOVER_IS_FETCHING = false;
    }
  }, []);

  // Chargement initial
  if (!DISCOVER_HAS_LOADED && DISCOVER_MOVIES_CACHE.length === 0) {
    DISCOVER_HAS_LOADED = true;
    loadMore();
  }

  const filteredMovies = useMemo(
    () => movies.filter((movie) => !excludedIdsSet.has(movie.id)),
    [movies, excludedIdsSet],
  );

  useEffect(() => {
    if (!isLoading && filteredMovies.length === 0) {
      loadMore();
    }
  }, [filteredMovies.length, isLoading, loadMore]);

  const onMovieConsumed = useCallback(
    (remainingCount: number) => {
      if (remainingCount <= PREFETCH_THRESHOLD) {
        loadMore();
      }
    },
    [loadMore],
  );

  return { movies: filteredMovies, isLoading, error, onMovieConsumed };
}
