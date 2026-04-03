import { Link } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { styles } from './index.styles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>CinMatch</Text>
        <Text style={styles.title}>Swipe des films et affine les recommandations.</Text>
        <Text style={styles.subtitle}>
          Base propre pour construire le deck de swipe, les stats et le moteur de suggestion.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/discover" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Commencer</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

