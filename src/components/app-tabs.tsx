import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function AppTabs() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <NativeTabs
      backgroundColor={isDark ? '#000000' : '#ffffff'}
      indicatorColor={isDark ? '#212225' : '#F0F0F3'}
      labelStyle={{ selected: { color: isDark ? '#ffffff' : '#000000' } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="discover">
        <NativeTabs.Trigger.Label>Discover</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
