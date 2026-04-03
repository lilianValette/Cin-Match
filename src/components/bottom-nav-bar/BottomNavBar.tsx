import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import NavItem from './NavItem';
import { styles } from './BottomNavBar.styles';
import DiscoveryIcon from './icons/DiscoveryIcon';
import MatchesIcon from './icons/MatchesIcon';
import ProfileIcon from './icons/ProfileIcon';

const NAV_ITEMS = [
  {
    key: 'discover',
    href: '/discover' as const,
    label: 'Découverte',
    Icon: DiscoveryIcon,
  },
  {
    key: 'matches',
    href: '/matches' as const,
    label: 'Matchs',
    Icon: MatchesIcon,
  },
  {
    key: 'profile',
    href: '/profile' as const,
    label: 'Profil',
    Icon: ProfileIcon,
  },
] as const;

export default function BottomNavBar() {
  const router = useRouter();
  const segments = useSegments();
  const activeSegment = segments[0] ?? '';

  if (segments[0] === 'movie') return null;

  return (
    <View style={styles.wrapper}>
      {/* Gradient overlay: transparent → opaque black */}
      <View style={styles.gradientFade} pointerEvents="none" />
      <View style={styles.container}>
        {NAV_ITEMS.map(({ key, href, label, Icon }) => {
          const isActive = activeSegment === key;
          return (
            <NavItem
              key={key}
              label={label}
              icon={<Icon active={isActive} />}
              isActive={isActive}
              onPress={() => router.replace(href)}
            />
          );
        })}
      </View>
    </View>
  );
}
