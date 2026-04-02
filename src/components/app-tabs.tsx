import { TabList, TabListProps, TabSlot, TabTrigger, TabTriggerSlotProps, Tabs } from 'expo-router/ui';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';

import { styles } from './app-tabs.styles';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="discover" href="/discover" asChild>
            <TabButton>Discover</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>{children}</Text>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const backgroundColor = scheme === 'dark' ? '#131313' : '#F3F4F6';
  const { style, ...rest } = props;

  return <View {...rest} style={[styles.container, { backgroundColor }, style]} />;
}

