import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { styles } from './profile.styles';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.placeholder}>Profile</Text>
    </SafeAreaView>
  );
}

