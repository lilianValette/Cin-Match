import React from 'react';
import { Text } from 'react-native';

import { styles } from './icons.styles';

interface IconProps {
  active: boolean;
}

export default function DiscoveryIcon({ active }: IconProps) {
  return (
    <Text style={[styles.icon, active && styles.iconActive]}>⊞</Text>
  );
}
