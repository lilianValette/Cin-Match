import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './Header.styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cinématch</Text>
    </View>
  );
}
