import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'expo-router';
import {PopButton} from "@/app/components.jsx"

let howToPlay = "StudyPlayProfit is a game aimed at making studying more fun!\n\nClick on the Study tab and press the button to begin studying. Studying gives you tickets.\nClick on the Profit tab to exchange your tickets for diamonds and to spend your diamonds for boosts to income rates.\nClick on the play tab to gamble your diamonds for a chance to get even more diamonds by playing Blackjack";
let credits = "Coding and Asset Creation by PyroProtato\nLibrary used: React Native + Expo\nAsset Creation Software: Google Drawings\nSome Project and Coding guidance: Google AI     and various sources on Google";
let projectInfo = "This project utilizes React Native Expo, which is a programming framework that allows you to create iOS apps and Android apps.\n\nHours Spent Coding: ~40";

const app = () => {

  const [screenText, setScreenText] = useState(howToPlay);

  return (
    <View style={styles.container}>

      <Image style={[styles.image, {marginBottom: -125, marginTop: -125}]} source={require("@/assets/images/logo.png")}></Image>

      <View style={styles.horizontalBreak}></View>

      <View style={styles.hview}>
      
      <PopButton
        onPress={() => {setScreenText(howToPlay);}}
        style={[styles.buttonContainer, {backgroundColor:"#0077e1ff"}]}>
        <Text style={styles.appButtonText}>How to play!</Text>
      </PopButton>

      <PopButton
        onPress={() => {setScreenText(credits);}}
        style={[styles.buttonContainer, {backgroundColor:"rgb(252, 186, 3)"}]}>
        <Text style={styles.appButtonText}>Credits</Text>
      </PopButton>

      <PopButton
        onPress={() => {setScreenText(projectInfo);}}
        style={[styles.buttonContainer, {backgroundColor:"#04c61fff"}]}>
        <Text style={styles.appButtonText}>Project Info</Text>
      </PopButton>

      </View>

        <Text style={styles.description}>{screenText}</Text>

    </View>
  )
}

export default app;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(0, 0, 0)',
        height: "100%",
        width:"100%",
        flexDirection: 'column',
        alignItems: "center",
    },
    hview: {
      backgroundColor: 'rgb(0, 0, 0, 1',
      flexDirection: 'row',
      alignItems: "center",
      alignSelf: "center",
    },
    buttonContainer: {
      height: 100,
      width: "25%",
      margin: 25,
      borderRadius: 25,
      justifyContent: "center"
    },
    horizontalBreak: {
      backgroundColor: "rgb(255, 255, 255)",
      height:5,
      width:"100%",
      marginVertical: 10
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
      marginVertical: 5,
    },
    imgContainer: {
      backgroundColor: 'rgb(0, 0, 0, 0',
      flexDirection: 'row',
    },
    background: {
      backgroundColor: 'rgba(0, 0, 0, 1)'
    },
    image: {
      resizeMode: "contain",
      verticalAlign: "top",
      width: "90%",
      marginHorizontal:-50,
    },
    title: {
        color: 'white',
        fontSize:42, 
        fontWeight: 'bold', 
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 100,
        top: 100
    },
    description: {
      color: 'white',
      fontSize:15, 
      margin: 20,
      marginHorizontal: "5%",
      textAlign: 'center',
      width: "90%"
    },
  })