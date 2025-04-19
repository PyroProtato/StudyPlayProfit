import { View, StyleSheet, Pressable, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import Animated, { useSharedValue, FadeIn, FadeOut, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';
import {PopButton} from "@/app/components.jsx"


let commonChance = 600;
let uncommonChance = 250;
let rareChance = 100;
let epicChance = 45;
let legendaryChance = 5;

let commonRewards = [{"studyRequirement":-5}, {"gameMult":0.01}, {"exchangeRate":2}];
let uncommonRewards = [{"studyRequirement":-10}, {"gameMult":0.02}, {"exchangeRate":5}];
let rareRewards = [{"studyRequirement":-20}, {"gameMult":0.05}, {"exchangeRate":10}];
let epicRewards = [{"studyRequirement":-60}, {"gameMult":0.1}, {"exchangeRate":25}];
let legendaryRewards = [{"studyRequirement":-300}, {"gameMult":0.25}, {"exchangeRate":100}];

let displayTextColor = "white";

const App = () => {
  const diamondTranslateY = useSharedValue(0);
  const screenTranslateY = useSharedValue(0);
  const gachaOpacity = useSharedValue(0);
  const gachaScale = useSharedValue(0);

  const navigation = useNavigation();
  const isInitialMount = useRef(true);


  const [tickets, setTickets] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [boosts, setBoosts] = useState({"studyRequirement": 1800, "gameMult": 1, "exchangeRate": 100})
  const [displayBoostKey, setDisplayBoostKey] = useState(null);
  const [displayBoostValue, setDisplayBoostValue] = useState(null);
  const [previousDisplayBoost, setPreviousDisplayBoost] = useState(null);
  const [newDisplayBoost, setNewDisplayBoost] = useState(null);
  const [displayBoostRarity, setDisplayBoostRarity] = useState(null);
  const [diamondAnimShown, setDiamondAnimShown] = useState(false);
  const [diamondsAdded, setDiamondsAdded] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);

  const saveTicketData = async () => {
    console.log("saved");
    try {
      await AsyncStorage.setItem("@tickets", JSON.stringify(tickets));
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

  const saveBoostData = async () => {
    console.log("saved");
    try {
      await AsyncStorage.setItem("@boosts", JSON.stringify(boosts));
    } catch (error) {
      console.error('Error saving data:', error);
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
    if (isInitialMount.current == false) {
      saveBoostData();
    } 
      }, [boosts]);
  

  const gacha = () => {
    let boost = {};
    let total = commonChance+uncommonChance+rareChance+epicChance+legendaryChance;
    let entry = Math.floor(Math.random() * (total - 1 + 1) + 1);
    if (entry <= commonChance) { //COMMON
      boost = commonRewards[Math.floor(Math.random() * commonRewards.length)];
      setDisplayBoostRarity("COMMON");
      displayTextColor = "#c9c9c9";
    } else if (entry <= commonChance+uncommonChance) { //UNCOMMON
      boost = uncommonRewards[Math.floor(Math.random() * uncommonRewards.length)];
      setDisplayBoostRarity("UNCOMMON");
      displayTextColor = "#00e83e";
    } else if (entry <= commonChance+uncommonChance+rareChance) { //RARE
      boost = rareRewards[Math.floor(Math.random() * rareRewards.length)];
      setDisplayBoostRarity("RARE");
      displayTextColor = "#00bfff";
    } else if (entry <= commonChance+uncommonChance+rareChance+epicChance) { //EPIC
      boost = epicRewards[Math.floor(Math.random() * epicRewards.length)];
      setDisplayBoostRarity("EPIC");
      displayTextColor = "#b300ff";
    } else if (entry <= commonChance+uncommonChance+rareChance+epicChance+legendaryChance) { //LEGENDARY
      boost = legendaryRewards[Math.floor(Math.random() * legendaryRewards.length)];
      setDisplayBoostRarity("LEGENDARY");
      displayTextColor = "#ffea00";
    }
    let boostKey = Object.keys(boost)[0];
    let boostValue = Object.values(boost)[0];
    const newBoosts = {...boosts};
    setPreviousDisplayBoost(Math.round((newBoosts[boostKey]*100)/100));
    newBoosts[boostKey] = newBoosts[boostKey] + boostValue;
    setNewDisplayBoost(Math.round((newBoosts[boostKey]*100)/100));
    setBoosts(newBoosts);
    if (boostKey == "studyRequirement") {
      boostKey = "Seconds to Study per Ticket ";
    } else if (boostKey == "gameMult") {
      boostKey = "Diamond Multiplyer in Game ";
      boostValue = "+" + boostValue;
    } else if (boostKey == "exchangeRate") {
      boostKey = "Diamonds Gained per 3 Tickets "
      boostValue = "+" + boostValue;
    }
    setDisplayBoostKey(boostKey);
    setDisplayBoostValue(boostValue);  
    gachaAnim();
  }

  const pause = async (delay) => {
    await new Promise(resolve => setTimeout(resolve, delay));
  };

  const addDiamondsAnim = async (amount) => {
    setDiamondAnimShown(true);
    let targetY = -40;
    await pause(1000);
    diamondTranslateY.value = withTiming(diamondTranslateY.value + targetY, {duration: 500, easing: Easing.inOut(Easing.quad)});
    await pause(200);
    setDiamondAnimShown(false);
    setDiamonds(amount);
    await pause(20);
    diamondTranslateY.value = 0;
  }

  const gachaAnim = async (amount) => { 
    setShowPrevious(false);
    let targetY = -1000;
    screenTranslateY.value = withTiming(screenTranslateY.value + targetY, {duration: 2000, easing: Easing.inOut(Easing.quad)});
    await pause(4000);
    gachaOpacity.value = withTiming(1, { duration:2000, easing: Easing.linear });
    gachaScale.value = withTiming(1, { duration:2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    await pause(4000);
    setShowPrevious(true);
    screenTranslateY.value = withTiming(screenTranslateY.value - targetY, {duration: 2000, easing: Easing.inOut(Easing.quad)});
    await pause(2000);
    gachaOpacity.value = 0;
    gachaScale.value = 0;
  }

  const gachaAnimStyle = useAnimatedStyle(() => ({
    opacity: gachaOpacity.value,
    transform: [{ scale: gachaScale.value }],
  }));
  



  return (

    <Animated.View style={[styles.container, {transform: [{translateY: screenTranslateY}]}]}>

      <View style={styles.ticketContainer}>
        <Image source={require('@/assets/images/ticket-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{tickets}</Text>
      </View>

      <View style={styles.diamondContainer}>
              <Image source={require('@/assets/images/diamond-icon.png')} style={styles.ticketIcon}></Image>
              <Text style={styles.ticketText}>{diamonds}</Text>
      </View>
      {diamondAnimShown && <Animated.View style={[styles.diamondAddContainer, {transform: [{translateY: diamondTranslateY}]}, ]}>
        <Image source={require('@/assets/images/diamond-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={[styles.appButtonText, {color: "rgb(50, 255, 50)"}]}>+{diamondsAdded}</Text>
      </Animated.View>}

      <PopButton
        onPress={() => {
          if (tickets >= 3) {
            setDiamondsAdded(boosts["exchangeRate"]);
            addDiamondsAnim(diamonds+boosts["exchangeRate"]);
            setTickets(tickets-3);
          }
        }}
        style={[styles.buttonContainer, {backgroundColor:"rgb(14, 219, 82)"}]}>
        <Text style={styles.appButtonText}>Purchase {boosts["exchangeRate"]} Diamonds</Text>
        <Text style={styles.priceText}>3x Tickets</Text>
      </PopButton>

      <View style={styles.buttoncontainer}>

      <PopButton
        onPress={() => {if (diamonds >= 100) {gacha(); setDiamonds(diamonds-100);}}}
        style={[styles.buttonContainer, {backgroundColor:"rgb(14, 110, 219)"}]}>
        <Text style={styles.appButtonText}>Draw (1x)</Text>
        <Text style={styles.priceText}>100 Diamonds</Text>
      </PopButton>

      <PopButton
        onPress={() => {}}
        style={[styles.buttonContainer, {backgroundColor:"rgb(14, 45, 219)"}]}>
        <Text style={styles.appButtonText}>Draw (10x)</Text>
        <Text style={styles.priceText}>1000 Diamonds</Text>
      </PopButton>

      </View>

      <Image source={require('@/assets/images/cards/card_back.png')} style={styles.cardImage}></Image>
      
      {showPrevious && <Text style={[styles.appButtonText, {fontSize: 30}]}>Previous Reward</Text>}
      {showPrevious && <Text style={[styles.appButtonText,{color:displayTextColor}]}>({displayBoostRarity}) </Text>}
      {showPrevious && <Text style={[styles.appButtonText, {fontWeight:"normal"}]}>
        {displayBoostKey} 
        <Text style={styles.appButtonText}>({displayBoostValue})</Text>
      </Text>}

      <Animated.View entering={FadeIn.duration(1000)} style={[{height:1000, width:600, position:"absolute", marginTop: 1000}, gachaAnimStyle]}>
        <Text style={[styles.rarityText, {color:displayTextColor, marginTop: 100}]}>{displayBoostRarity}</Text>
          <View style={[styles.container, {backgroundColor:displayTextColor}]}>
            <Text style={[styles.rarityText, {fontSize:24, fontWeight:"normal"}]}>{displayBoostKey} 
              <Text style={[styles.rarityText, {fontSize:24}]}>({displayBoostValue})</Text>
            </Text> 
            <Text style={[styles.rarityText, {fontSize:24}]}>{previousDisplayBoost} --{">"} {newDisplayBoost}</Text>
          </View>
      </Animated.View>

    </Animated.View>

  );
}

export default App
