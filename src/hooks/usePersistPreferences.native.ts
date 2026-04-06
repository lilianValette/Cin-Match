import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import { useAppStore } from '@/store/useAppStore';
import type { PersistedPrefs } from '@/store/useAppStore';

const KEY = 'cinematch-prefs';

export function usePersistPreferences() {
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const favoriteGenres = useAppStore((s) => s.favoriteGenres);
  const isHydrated = useAppStore((s) => s.isHydrated);
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  // Lecture au démarrage
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        try {
          hydrateFromStorage(JSON.parse(raw) as PersistedPrefs);
          return;
        } catch {}
      }
      hydrateFromStorage({ hasCompletedOnboarding: false, favoriteGenres: {} });
    });
  }, []);

  // Sauvegarde à chaque changement de préférences
  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(
      KEY,
      JSON.stringify({ hasCompletedOnboarding, favoriteGenres } satisfies PersistedPrefs),
    );
  }, [hasCompletedOnboarding, favoriteGenres, isHydrated]);
}
