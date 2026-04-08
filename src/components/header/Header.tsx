import React from 'react';
import { Text, View } from 'react-native';

import CineMatchLogo from './CineMatchLogo';
import { styles } from './Header.styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <CineMatchLogo size={28} />
      <Text style={styles.title}>Cinématch</Text>
    </View>
  );
}
