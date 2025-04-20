import { View, StyleSheet, Pressable, Text, Image, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "@/app/styles.js";
import {PopButton} from "@/app/components.jsx"
import Animated, { useSharedValue, FadeIn, FadeOut, withSpring, withTiming, useAnimatedStyle, Easing, } from 'react-native-reanimated';
import { Link } from 'expo-router';



let suits = ["♣️", "❤️", "♠️", "♦️"];
let numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', "J", "Q", "K", "A"];
let resultTextColor = "rgb(255, 255, 255)";

const App = () => {
  const resultOpacity = useSharedValue(0);
  const resultScale = useSharedValue(0);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);

  const [stage, setStage] = useState("betting");
  const [bet, setBet] = useState(undefined);
  const [init, setInit] = useState(true);
  const [profit, setProfit] = useState(0);
  const [noTouch, setNoTouch] = useState(false);


  const navigation = useNavigation();
  const isInitialMount = useRef(true);


  const [tickets, setTickets] = useState(0);
  const [diamonds, setDiamonds] = useState(0);  
  const [boosts, setBoosts] = useState({"studyRequirement": 1800, "gameMult": 1, "exchangeRate": 100})
  const [settings, setSettings] = useState(0);


  const saveTicketData = async () => {
    console.log("saved");
    try {
      await AsyncStorage.setItem("@tickets", JSON.stringify(tickets));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getTicketData = async () => {
    console.log("got ticket data");
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
    setPlayerTotal(addTotal(playerCards));
      }, [playerCards]);
  
  useEffect(() => {
    checkCards();
  }, [playerTotal])
  
  useEffect(() => {
    setDealerTotal(addTotal(dealerCards));
      }, [dealerCards]);
  
  useEffect(() => {
    if (stage == "betting" && init == true) {
      setBet(undefined);
      setPlayerCards([]);
      setDealerCards([]);
      setInit(false);
    } else if (stage == "player" && init == true) {
      setPlayerCards(playerCards => [...playerCards, drawCard()]);
      setPlayerCards(playerCards => [...playerCards, drawCard()]);
      setDealerCards(dealerCards => [...dealerCards, drawCard()]);
      setDealerCards(dealerCards => [...dealerCards, drawCard()]);
      setInit(false);
    } else if (stage == "dealer" && init == true) {
      dealerTurn();
    }
        }, [stage]);
    
  
  const checkCards = async () => {
    if (playerTotal == "bust") {
      setProfit(bet*-1);
      resultTextColor = "rgb(250, 50, 50)";
      resultAnim();
      await pause(3000);
      setInit(true);
      setBet(undefined);
      setStage("betting");
    }
  }

  const drawCard = () => {
    const numberIndex = Math.floor(Math.random() * numbers.length); 
    const suitIndex = Math.floor(Math.random() * suits.length); 
    const card = suits[suitIndex]+numbers[numberIndex]
    return card
  };

  const handleInputChange = (text) => {
    // Use a regular expression to allow only numbers
    let formattedNumber = text.replace(/[^0-9]/g, '');
    if (Number(formattedNumber) > diamonds) {
      formattedNumber = String(Math.floor(Number(formattedNumber) / 10))
    }
    setBet(formattedNumber);
  };

  const dealerTurn = async () => {
    setNoTouch(true);
    await pause(1000);
    let drawedCards = [];
    let cardTotal = addTotal(dealerCards);
    while (cardTotal < 17) {
      cardTotal = 0;
      drawedCards.push(drawCard());
      cardTotal = addTotal(dealerCards.concat(drawedCards));
      setDealerCards(dealerCards.concat(drawedCards));
      await pause(1000);
    }
    console.log(cardTotal);
    if (cardTotal == "bust" || cardTotal < playerTotal) {
      resultTextColor = "rgb(50, 250, 50)";
      setProfit(Math.round(Number(bet)*boosts["gameMult"]));
      resultAnim();
      await pause(3000);
      setDiamonds(diamonds+Number(bet)+Math.round(Number(bet)*boosts["gameMult"]));
    } else if (cardTotal > playerTotal) {
      resultTextColor = "rgb(250, 50, 50)";
      setProfit(bet*-1);
      resultAnim();
      await pause(3000);
    } else if (cardTotal == playerTotal) {
      resultTextColor = "rgb(255, 255, 255)";
      setProfit(0);
      resultAnim();
      await pause(3000);
      setDiamonds(diamonds+Math.round(Number(bet)));
    }
    setStage("betting");
    setBet(undefined);
    setInit(true);
    setNoTouch(false);
  };

  const addTotal = (cards) => {
    let total = 0;
    let numAces = 0;
    for (var i = 0; i < cards.length; i++) {
      let number = String(cards[i].substring(2)).trim();
      if (number == 'A') {
        numAces = numAces + 1;
        total = total + 11;
      } else if (number == 'K' || number == 'Q' || number == 'J') {
        total = total + 10;
      } else {
        total = total + Number(number);
      }
    }
    while (total > 21 && numAces >= 1) {
      numAces--;
      total -= 10;
    }
    if (total > 21) {
      return "bust";
    } else {
      return String(total);
    }
  };

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

      <Image source={require('@/assets/images/play.png')} style={{width:"30%", resizeMode:"contain", alignSelf:"flex-start", margin:"2%"}}></Image>

      <View style={[styles.horizontalBreak, {marginTop: 0, backgroundColor: "#ffdb25ff"}]}></View>

      <View style={styles.ticketContainer}>
        <Image source={require('@/assets/images/ticket-icon.png')} style={styles.ticketIcon}></Image>
        <Text style={styles.ticketText}>{tickets}</Text>
      </View>

      <View style={styles.diamondContainer}>
              <Image source={require('@/assets/images/diamond-icon.png')} style={styles.ticketIcon}></Image>
              <Text style={styles.ticketText}>{diamonds}</Text>
      </View>

      <Link style={[styles.appButtonText, {alignSelf:"flex-start", marginLeft:10, color:"rgb(0, 81, 255)"}]} target="_blank" rel="noopener noreferrer" href="https://bicyclecards.com/how-to-play/blackjack">
          How to play Blackjack
      </Link>

      <View style={[styles.cardContainer]}>
        <Text style={[styles.appButtonText, {fontSize:25}]}>Dealer Cards</Text>
        {stage == "player" && <Text style={styles.cardDescription}>{"❓, "+dealerCards[1]}</Text>}
        {stage == "player" && <Text style={[styles.appButtonText, {fontSize:20}]}>Total: {addTotal(dealerCards.slice(1))}+?</Text>}

        {stage != "player" && <Text style={styles.cardDescription}>{dealerCards.join(", ")}</Text>}
        {stage != "player" && <Text style={[styles.appButtonText, {fontSize:20}]}>Total: {dealerTotal}</Text>}
      </View>

      {stage == "betting" && <View style={[styles.hview, {marginVertical: 0}]}>
        <TextInput 
          style = {styles.betInput}
          placeholder='Enter Diamond Bet Here'
          onChangeText={handleInputChange} 
          value={bet}
          keyboardType="numeric"
        />
        <PopButton
          onPress={() => {
            setInit(true);
            setStage("player");
            setDiamonds(diamonds - Number(bet));
          }}
          style={[styles.checkButton]}>
          <Text style={styles.appButtonText}>Submit</Text>
        </PopButton>
      </View>}

      {stage == "player" && <View style={[styles.hview]}>
        <PopButton
          onPress={() => {setPlayerCards(playerCards => [...playerCards, drawCard()]);
          }}
          style={[styles.actionButton, {backgroundColor: "rgb(220, 25, 25)"}]}>
          <Text style={[styles.appButtonText, {fontSize: 30}]}>Hit</Text>
        </PopButton>
        <PopButton
          onPress={() => {setStage("dealer"); setInit(true);}}
          style={[styles.actionButton, {backgroundColor: "rgb(25, 3, 150)"}]}>
          <Text style={[styles.appButtonText, {fontSize: 30}]}>Stay</Text>
        </PopButton>
      </View>}

      <View style={[styles.cardContainer]}>
        <Text style={[styles.appButtonText, {fontSize:25}]}>Player Cards</Text>
        <Text style={styles.cardDescription}>{playerCards.join(", ")}</Text>
        <Text style={[styles.appButtonText, {fontSize:20}]}>Total: {playerTotal}</Text>
      </View>

      <Text style={styles.appButtonText}>Current Diamond Multiplyer: x{Math.round(boosts["gameMult"]*100)/100}</Text>

      {settings['devToolsEnabled'] && <PopButton
        onPress={() => {setDiamonds(diamonds+1000)}}
        style={[styles.buttonContainer, {backgroundColor: "rgb(50, 50, 200)", height:40, width:400}]}>
        <Text style={styles.appButtonText}>(DEV TOOL) Press to get 1000 diamonds</Text>
      </PopButton>}
      

      {noTouch && <Animated.View style={[styles.container, resultBgAnimStyle, {position:"absolute", backgroundColor:"rgba(119, 119, 119, 0.63)", justifyContent:"center", height:"100%", width:"100%"}]}></Animated.View>}
      
      <Animated.View style={[styles.container, resultAnimStyle, {position:"absolute", margin:"auto", marginTop:"25%", backgroundColor:"rgb(0, 0, 0, 0)", justifyContent:"center"}]}>
        <Image source={require('@/assets/images/diamond-icon.png')} style={[styles.resultImage, {marginBottom: -250}]}></Image>
        <Text style={[styles.appButtonText, {fontSize:50, marginTop:0, color:resultTextColor}]}>{profit}</Text>
      </Animated.View>


    </View>
  );
}

export default App


