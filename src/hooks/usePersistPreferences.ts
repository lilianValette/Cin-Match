import { useEffect } from 'react';

import { useAppStore } from '@/store/useAppStore';
import type { PersistedPrefs } from '@/store/useAppStore';

const KEY = 'cinematch-prefs';

const EMPTY: PersistedPrefs = {
  hasCompletedOnboarding: false,
  favoriteGenres: {},
  hasCompletedPlatformSelection: false,
  selectedPlatformIds: [],
  hasCompletedRegionSelection: false,
  selectedRegionIds: [],
  watchlistMovieIds: [],
  watchlistById: {},
  dislikedMovieIds: {},
};

export function usePersistPreferences() {
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const favoriteGenres = useAppStore((s) => s.favoriteGenres);
  const hasCompletedPlatformSelection = useAppStore((s) => s.hasCompletedPlatformSelection);
  const selectedPlatformIds = useAppStore((s) => s.selectedPlatformIds);
  const hasCompletedRegionSelection = useAppStore((s) => s.hasCompletedRegionSelection);
  const selectedRegionIds = useAppStore((s) => s.selectedRegionIds);
  const watchlistMovieIds = useAppStore((s) => s.watchlistMovieIds);
  const watchlistById = useAppStore((s) => s.watchlistById);
  const dislikedMovieIds = useAppStore((s) => s.dislikedMovieIds);
  const isHydrated = useAppStore((s) => s.isHydrated);
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        hydrateFromStorage({ ...EMPTY, ...JSON.parse(raw) } as PersistedPrefs);
        return;
      }
    } catch {}
    hydrateFromStorage(EMPTY);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({
        hasCompletedOnboarding,
        favoriteGenres,
        hasCompletedPlatformSelection,
        selectedPlatformIds,
        hasCompletedRegionSelection,
        selectedRegionIds,
        watchlistMovieIds,
        watchlistById,
        dislikedMovieIds,
      } satisfies PersistedPrefs));
    } catch {}
  }, [
    hasCompletedOnboarding, favoriteGenres,
    hasCompletedPlatformSelection, selectedPlatformIds,
    hasCompletedRegionSelection, selectedRegionIds,
    watchlistMovieIds, watchlistById, dislikedMovieIds,
    isHydrated,
  ]);
}
