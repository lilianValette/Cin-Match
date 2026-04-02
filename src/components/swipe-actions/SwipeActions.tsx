import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from './SwipeActions.styles';

interface SwipeActionsProps {
  onDislike: () => void;
  onInfo: () => void;
  onLike: () => void;
}

export default function SwipeActions({ onDislike, onInfo, onLike }: SwipeActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, styles.buttonSmall, pressed && { opacity: 0.7 }]}
        onPress={onDislike}
        accessibilityLabel="Dislike"
        accessibilityRole="button">
        <Text style={styles.icon}>✕</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.buttonInfo, pressed && { opacity: 0.7 }]}
        onPress={onInfo}
        accessibilityLabel="Informations"
        accessibilityRole="button">
        <Text style={styles.iconInfo}>ℹ</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.buttonLarge, styles.buttonLike, pressed && { opacity: 0.7 }]}
        onPress={onLike}
        accessibilityLabel="Like"
        accessibilityRole="button">
        <Text style={styles.iconLike}>♥</Text>
      </Pressable>
    </View>
  );
}
