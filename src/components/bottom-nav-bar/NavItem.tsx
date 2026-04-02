import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from './NavItem.styles';

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

export default function NavItem({ label, icon, isActive, onPress }: NavItemProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}>
      {icon}
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}
