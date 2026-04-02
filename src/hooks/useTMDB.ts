import { useCallback, useRef, useState } from 'react';

import { fetchRandomMoviePage } from '@/services/tmdbService';
import type { Movie } from '@/types';

/** Nombre de films restants en deck sous lequel on déclenche le chargement suivant */
const PREFETCH_THRESHOLD = 5;

interface UseTMDBResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  /** Appelé par DeckContainer quand l'index avance */
  onMovieConsumed: (remainingCount: number) => void;
}

export function useDiscoverMovies(): UseTMDBResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Evite de déclencher plusieurs fetchs simultanés
  const isFetching = useRef(false);

  const loadMore = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const { movies: newMovies } = await fetchRandomMoviePage();
      setMovies((prev) => [...prev, ...newMovies]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, []);

  // Chargement initial
  const hasLoadedOnce = useRef(false);
  if (!hasLoadedOnce.current) {
    hasLoadedOnce.current = true;
    loadMore();
  }

  const onMovieConsumed = useCallback(
    (remainingCount: number) => {
      if (remainingCount <= PREFETCH_THRESHOLD) {
        loadMore();
      }
    },
    [loadMore],
  );

  return { movies, isLoading, error, onMovieConsumed };
}
