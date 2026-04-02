import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import BottomNavBar from '@/components/bottom-nav-bar/BottomNavBar';
import Header from '@/components/header/Header';

export default function RootLayout() {
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
      </View>
    </ThemeProvider>
  );
}
