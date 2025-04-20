import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import {PopButton} from "@/app/components.jsx"
import Animated, { useSharedValue, FadeIn, FadeOut, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';

const App = () => {

  const navigation = useNavigation();
  const isInitialMount = useRef(true);

  const [tickets, setTickets] = useState(0);
  const [diamonds, setDiamonds] = useState(0);  
  const [boosts, setBoosts] = useState({"studyRequirement": 1800, "gameMult": 1, "exchangeRate": 100})
  
  const saveTicketData = async () => {
    console.log("saved");
    try {
      await AsyncStorage.setItem("@tickets", JSON.stringify(tickets));
      getTicketData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getTicketData = async () => {
    console.log("got data");
    try {
      const value = await AsyncStorage.getItem("@tickets");
      if (value !== null) {
        setTickets(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error getting data:', error);
      setTickets(-1);
    }
  };

  const saveDiamondData = async () => {
    console.log("saved");
    try {
      await AsyncStorage.setItem("@diamonds", JSON.stringify(diamonds));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getDiamondData = async () => {
    console.log("got data");
    try {
      const value = await AsyncStorage.getItem("@diamonds");
      if (value !== null) {
        setDiamonds(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const getBoostData = async () => {
    console.log("got data");
    try {
      const value = await AsyncStorage.getItem("@boosts");
      if (value !== null) {
        setBoosts(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTicketData();
      getDiamondData();
      getBoostData();
      isInitialMount.current = false;
    });
    return unsubscribe;
  }, [navigation]);
    
  useEffect(() => {
    if (isInitialMount.current == false) {
      saveTicketData();
    } 
      }, [tickets]);
  
  useEffect(() => {
    if (isInitialMount.current == false) {
      saveDiamondData();
    } 
      }, [diamonds]);
  

  const pause = async (delay) => {
    await new Promise(resolve => setTimeout(resolve, delay));
  };



    
  
  return (

    <View style={styles.container}>

      <Image source={require('@/assets/images/study2.png')} style={{height:75, resizeMode:"contain", alignSelf:"flex-start", margin:30, marginLeft:-75}}></Image>
      
      <View style={[styles.horizontalBreak, {marginTop: 0, backgroundColor: "#0077e1ff"}]}></View>

      <View style={styles.ticketContainer}>
        <Image source={require('@/assets/images/ticket-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{tickets}</Text>
      </View>

      <View style={styles.diamondContainer}>
        <Image source={require('@/assets/images/diamond-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{diamonds}</Text>
      </View>

      

      

    </View>
  );
}

export default App


