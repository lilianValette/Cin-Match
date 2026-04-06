import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import BottomNavBar from '@/components/bottom-nav-bar/BottomNavBar';
import Header from '@/components/header/Header';
import { usePersistPreferences } from '@/hooks/usePersistPreferences';
import { useAppStore } from '@/store/useAppStore';

import OnboardingScreen from '@/components/onboarding/OnboardingScreen';

export default function RootLayout() {
  usePersistPreferences();

  const isHydrated = useAppStore((s) => s.isHydrated);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);

  // Affiche l'onboarding si :
  // - le storage n'est pas encore lu (écran noir le temps de la lecture AsyncStorage)
  // - ou si l'utilisateur n'a pas encore choisi ses genres
  const showOnboarding = !isHydrated || !hasCompletedOnboarding;

  return (
    <ThemeProvider value={DarkTheme}>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
            animation: 'fade',
          }}
        />
        <BottomNavBar />
        {showOnboarding && <OnboardingScreen />}
      </View>
    </ThemeProvider>
  );
}
