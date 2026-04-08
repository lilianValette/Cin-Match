import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import BottomNavBar from '@/components/bottom-nav-bar/BottomNavBar';
import Header from '@/components/header/Header';
import { usePersistPreferences } from '@/hooks/usePersistPreferences';
import { useAppStore } from '@/store/useAppStore';

import OnboardingScreen from '@/components/onboarding/OnboardingScreen';
import PlatformSelectionScreen from '@/components/onboarding/PlatformSelectionScreen';
import RegionSelectionScreen from '@/components/onboarding/RegionSelectionScreen';

export default function RootLayout() {
  usePersistPreferences();

  const isHydrated = useAppStore((s) => s.isHydrated);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const hasCompletedPlatformSelection = useAppStore((s) => s.hasCompletedPlatformSelection);
  const hasCompletedRegionSelection = useAppStore((s) => s.hasCompletedRegionSelection);

  const showGenreOnboarding = !isHydrated || !hasCompletedOnboarding;
  const showPlatformOnboarding = isHydrated && hasCompletedOnboarding && !hasCompletedPlatformSelection;
  const showRegionOnboarding = isHydrated && hasCompletedOnboarding && hasCompletedPlatformSelection && !hasCompletedRegionSelection;

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
        {showGenreOnboarding && <OnboardingScreen />}
        {showPlatformOnboarding && <PlatformSelectionScreen />}
        {showRegionOnboarding && <RegionSelectionScreen />}
      </View>
    </ThemeProvider>
  );
}
