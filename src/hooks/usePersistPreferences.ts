import { useEffect } from 'react';

import { useAppStore } from '@/store/useAppStore';
import type { PersistedPrefs } from '@/store/useAppStore';

const KEY = 'cinematch-prefs';

export function usePersistPreferences() {
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const favoriteGenres = useAppStore((s) => s.favoriteGenres);
  const isHydrated = useAppStore((s) => s.isHydrated);
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        hydrateFromStorage(JSON.parse(raw) as PersistedPrefs);
        return;
      }
    } catch {}
    hydrateFromStorage({ hasCompletedOnboarding: false, favoriteGenres: {} });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ hasCompletedOnboarding, favoriteGenres } satisfies PersistedPrefs),
      );
    } catch {}
  }, [hasCompletedOnboarding, favoriteGenres, isHydrated]);
}
