import { Link } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 96,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  kicker: {
    color: '#fdc003',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  subtitle: {
    color: '#B0B4BA',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 520,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#ff8e80',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '800',
  },
});
