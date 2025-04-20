import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import {PopButton} from "@/app/components.jsx"
import Animated, { useSharedValue, FadeIn, FadeOut, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';

const App = () => {

  const [devToolsEnabled, setDevToolsEnabled] = useState(false);
  const [studyMusicEnabled, setStudyMusicEnabled] = useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const isInitialMount = useRef(true);
  const navigation = useNavigation();

  

  const [settings, setSettings] = useState({'devToolsEnabled':devToolsEnabled});

  const saveSettings = async () => {
    console.log("saved");
    try {
      console.log(settings);
      await AsyncStorage.setItem("@settings", JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving data:', error); 
    }
  };

  const getSettings = async () => {
    console.log("got data");
    try {
      const value = await AsyncStorage.getItem("@settings");
      if (value !== null) {
        setSettings(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };


  useEffect(() => {
  if (isInitialMount.current == false) {
    saveSettings();
  }}, [settings]);

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getSettings();
        isInitialMount.current = false;
      });
      return unsubscribe;
    }, [navigation]);
    
  useEffect(() => {
    settings['devToolsEnabled'] = devToolsEnabled;
    saveSettings();
  }, [devToolsEnabled])





    
  
  return (

    <View style={styles.container}>

      <Image source={require('@/assets/images/settings.png')} style={{width:"30%", resizeMode:"contain", alignSelf:"flex-start", margin:"2%"}}></Image>
      
      <View style={[styles.horizontalBreak, {marginTop: 0, backgroundColor: "#0077e1ff"}]}></View>

      <View style={styles.checkboxContainer}>
      <Checkbox
          value={devToolsEnabled} 
          onValueChange={setDevToolsEnabled}
          style={styles.checkbox}
      />
      <Text style={[styles.appButtonText, {marginHorizontal:10, fontSize:40}]}>Enable Developer Tools</Text>
      </View>


      

      

    </View>
  );
}

export default App


