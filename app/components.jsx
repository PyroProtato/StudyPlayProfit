import { View, StyleSheet, Button, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
//import { setItem, getItem, clear, getAllKeys, getAllItems } from '@/utils/AsyncStorage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';

export const PopButton = ({children, onPress, style}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.90, {mass:0.01, stiffness:20, damping:50});
  };
 
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
        {children}
    </AnimatedPressable>
  );
};

export const MovingView = ({children, style, running, nx, ny}) => {
    const x = useSharedValue(0);
    const y = useSharedValue(1);

    useEffect(() => {
        if (running) {
            moveToPosition(nx, ny);
        }
    }, [running])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }, { translateY: y.value }]
        };
    });

    const moveToPosition = (newX, newY) => {
        x.value = withTiming(newX, {duration: 1000})
        y.value = withTiming(newY, {duration: 1000})
    }


    return (
        <Animated.View
            style={[style, animatedStyle]}
        >{children}</Animated.View>
    );

}
