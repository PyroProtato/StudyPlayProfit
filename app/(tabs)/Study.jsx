import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import {PopButton} from "@/app/components.jsx"
import Animated, { useSharedValue, FadeIn, FadeOut, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';

const App = () => {
  const resultOpacity = useSharedValue(0);
  const resultScale = useSharedValue(0);

  const navigation = useNavigation();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const isInitialMount = useRef(true);

  const [settings, setSettings] = useState({'devToolsEnabled':false});
  const [tickets, setTickets] = useState(0);
  const [diamonds, setDiamonds] = useState(0);  
  const [boosts, setBoosts] = useState({"studyRequirement": 1800, "gameMult": 1, "exchangeRate": 100})
  const [profit, setProfit] = useState(0);
  const [noTouch, setNoTouch] = useState(false);
  
  let sessionTickets = Math.floor(time/(boosts["studyRequirement"]*1000));

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

  const getSettings = async () => {
  console.log("got data");
  try {
    const value = await AsyncStorage.getItem("@settings");
    if (value !== null) {
      setSettings(JSON.parse(value));
      console.log(value);
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
      getSettings();
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
  

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000)
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);


  const pause = async (delay) => {
    await new Promise(resolve => setTimeout(resolve, delay));
  };

  const resultAnim = async () => { 
    setNoTouch(true);
    await pause(200);
    resultOpacity.value = withTiming(1, { duration:1000, easing: Easing.linear });
    resultScale.value = withTiming(1, { duration:1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    await pause(2000);
    resultOpacity.value = withTiming(0, { duration:1000, easing: Easing.linear });
    resultScale.value = withTiming(0, { duration:1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    await pause(1000);
    setNoTouch(false);
    setTickets(tickets+sessionTickets);
    sessionTickets = 0;
  };
  
  const resultAnimStyle = useAnimatedStyle(() => ({
    opacity: resultOpacity.value,
    transform: [{ scale: resultScale.value }],
  }));

  const resultBgAnimStyle = useAnimatedStyle(() => ({
    opacity: resultOpacity.value,
  }));

    
  
  return (

    <View style={styles.container}>

      <Image source={require('@/assets/images/study2.png')} style={{width:"30%", resizeMode:"contain", alignSelf:"flex-start", margin:"2%",}}></Image>
      
      <View style={[styles.horizontalBreak, {marginTop: 0, backgroundColor: "#0077e1ff"}]}></View>

      <View style={styles.ticketContainer}>
        <Image source={require('@/assets/images/ticket-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{tickets}</Text>
      </View>

      <View style={styles.diamondContainer}>
        <Image source={require('@/assets/images/diamond-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{diamonds}</Text>
      </View>

      <View>
        <Text style={styles.timeText}>Minutes: {Math.floor(time/60000)}</Text>
        <Text style={[styles.runningText, {opacity: isRunning ? 1:0}]}>(Running!)</Text>
        <Text style={styles.rewardText}>Current Reward: {sessionTickets} tickets</Text>
        <Text style={styles.nextRewardText}>Time until next ticket: {Math.ceil(((boosts["studyRequirement"]*1000)-(time%(boosts["studyRequirement"]*1000)))/60000)} minute(s)</Text>
      </View>

      <View style={styles.buttoncontainer}>
        <PopButton
          onPress={isRunning => setIsRunning(true)}
          style={[styles.buttonContainer, {backgroundColor: "#009688"}]}>
          <Text style={styles.appButtonText}>Start Studying</Text>
        </PopButton>

        <PopButton
          onPress={() => {
            setIsRunning(false);
            setProfit(sessionTickets);
            resultAnim();
            setTime(time-(Math.floor(time/(boosts["studyRequirement"]*1000))*(boosts["studyRequirement"]*1000)));
          }}
          style={[styles.buttonContainer, {backgroundColor:"rgb(255, 50, 50)"}]}>
          <Text style={styles.appButtonText}>Stop Studying</Text>
        </PopButton>
      </View>

      <Text style={styles.appButtonText}>Time For Each Ticket: {Math.round(boosts["studyRequirement"]/60 * 100) / 100} minutes</Text>
  
      {settings['devToolsEnabled'] && <PopButton
        onPress={() => {setTime(time+1000*60*15)}}
        style={[styles.buttonContainer, {backgroundColor: "rgb(50, 50, 200)", height:40, width:400}]}>
        <Text style={styles.appButtonText}>(DEV TOOL) Press to "study" for 15 minutes</Text>
      </PopButton>}

      {noTouch && <Animated.View style={[styles.container, resultBgAnimStyle, {position:"absolute", backgroundColor:"rgba(119, 119, 119, 0.63)", justifyContent:"center", height:"100%", width:"100%"}]}></Animated.View>}
            
      <Animated.View style={[styles.container, resultAnimStyle, {position:"absolute", margin:"auto", marginTop:"25%", backgroundColor:"rgb(0, 0, 0, 0)", justifyContent:"center"}]}>
        <Image source={require('@/assets/images/ticket-icon.png')} style={[styles.resultImage, {marginBottom: -250}]}></Image>
        <Text style={[styles.appButtonText, {fontSize:50, marginTop:0, color:"rgb(50, 255, 50)"}]}>{profit}</Text>
      </Animated.View>

      

    </View>
  );
}

export default App


