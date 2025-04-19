import { View, StyleSheet, Button, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';
import {MovingView} from "@/app/components.jsx"


const PopButton = ({children, onPress, style}) => {
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
        <Text style={styles.appButtonText}>{children}</Text>
    </AnimatedPressable>
  );
};

export default function AnimatedStyleUpdateExample() {
    const translateY = useSharedValue(0);

    const handlePress = () => {
        let offset = 50;
        offset *= 1.5;
        translateY.value += offset;
    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value) }]
    }));

    return (
      <View style={styles.container}>
        <Animated.View
            style={[{width:100, height:100, backgroundColor:'white'}, animatedStyles]}
        />
      <Button onPress={handlePress} title="Click me!"/>
      <PopButton style={[styles.checkButton]} onPress={() => {console.log("H1")}}>
        <Text style={styles.appButtonText}>Hello!</Text>
      </PopButton>
      <MovingView style={styles.container} running={true} nx={50} ny={50}>
        <Text style={styles.appButtonText}>Hi!</Text>
      </MovingView>
      </View>
    );
  }

