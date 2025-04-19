import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import {PopButton} from "@/app/components.jsx"

const App = () => {
  const navigation = useNavigation();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(60000*179.95);
  const intervalRef = useRef(null);
  const isInitialMount = useRef(true);

  const [tickets, setTickets] = useState(0);
  const [diamonds, setDiamonds] = useState(0);  
  const [boosts, setBoosts] = useState({"studyRequirement": 1800, "gameMult": 1, "exchangeRate": 100})
  
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

    
  
  return (

    <View style={styles.container}>

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
            alert("Studying stopped! You gained "+sessionTickets+" tickets!");
            setTickets(tickets+sessionTickets);
            setTime(time-(Math.floor(time/(boosts["studyRequirement"]*1000))*(boosts["studyRequirement"]*1000)));
            sessionTickets = 0;
          }}
          style={[styles.buttonContainer, {backgroundColor:"rgb(255, 50, 50)"}]}>
          <Text style={styles.appButtonText}>Stop Studying</Text>
        </PopButton>
      </View>

      <Text style={styles.appButtonText}>Time For Each Ticket: {Math.round(boosts["studyRequirement"]/60 * 100) / 100} minutes</Text>

      <PopButton
        onPress={() => {setTickets(tickets+3);}}
        style={[styles.buttonContainer, {backgroundColor: "rgb(50, 50, 200)", height:40, width:400}]}>
        <Text style={styles.appButtonText}>(DEV TOOL) Press to get 3 tickets</Text>
      </PopButton>

      

    </View>
  );
}

export default App


