import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';



const app = () => {
  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("@/assets/images/logo.png")}></Image>

      <Text style={styles.description}>Study to get game tokens which you can use to play games. Play games to earn Diamonds which you can use to gacha. Profit boosts to make the studying and the game more efficient!</Text>

    </View>
  )
}

export default app;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(0, 0, 0, 0',
        flex:1,
        flexDirection: 'column',
        alignItems: "center",
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
      verticalAlign: "middle",
      height: 300,
      marginHorizontal:-50,
      marginVertical: 50
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
      fontSize:20, 
      margin: 20,
      marginHorizontal: 50,
      textAlign: 'center',
    },
  })