import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SymbolView } from 'expo-symbols';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Study"
        options={{
          title: 'Study',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="access-time-filled" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Play"
        options={{
          title: 'Play',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gamepad" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profit"
        options={{
          title: 'Profit',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="attach-money" color={color} />,
        }}
      />
    </Tabs>
  );
}
