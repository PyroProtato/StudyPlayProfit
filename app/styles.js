import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#010017',
      flex:1,
      flexDirection: "column",
      alignItems: "center",
    },
    minCurContainer: {
      backgroundColor: 'rgb(0, 0, 0, 1',
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttoncontainer: {
      backgroundColor: 'rgb(0, 0, 0, 1',
      flexDirection: 'row',
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
      width: 200,
      margin: 25,
      borderRadius: 25,
      justifyContent: "center"
    },
    checkButton: {
      backgroundColor: "rgb(54, 255, 14)",
      height: 100,
      width: 100,
      marginLeft: 25,
      borderRadius: 5,
      justifyContent: "center"
    },
    actionButton: {
      height: 100,
      width: 200,
      borderRadius: 5,
      marginHorizontal: 15,
      justifyContent: "center"
    },
    ticketContainer: {
      flexDirection: "row",
      height: 40,
      width: 125,
      backgroundColor: "rgb(97, 19, 0)",
      margin: 25,
      alignSelf: 'flex-end',
      borderRadius: 10,
      justifyContent: "flex-start",
      position: "absolute"
    },
    diamondContainer: {
        flexDirection: "row",
        height: 40,
        width: 125,
        backgroundColor: "rgb(3, 102, 196)",
        alignSelf: 'flex-end',
        marginTop: 75,
        margin: 25,
        borderRadius: 10,
        justifyContent: "flex-start",
        position: "absolute"
      },
      diamondAddContainer: {
        flexDirection: "row",
        height: 40,
        width: 125,
        backgroundColor: "rgb(3, 102, 196, 0)",
        alignSelf: 'flex-end',
        marginTop: 115,
        margin: 25,
        borderRadius: 10,
        justifyContent: "flex-start",
        position: "absolute"
      },
    cardContainer: {
      flexDirection: "column",
      height: 100,
      width: 400,
      backgroundColor: "rgb(75, 75, 75)",
      alignSelf: 'center',
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 25,
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
      marginVertical: 5,
    },
    cardDescription: {
      color: '#fff',
      fontSize:15, 
      margin: 5,
      marginHorizontal: 50,
      textAlign: 'center',
    },
    ticketText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
    },
    timeText: {
      fontSize: 60,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
      marginTop: 150,
      marginBottom: 10,
    },
    rewardText: {
      fontSize: 30,
      color: "#fff",
      alignSelf: "center",
      textAlign: "center",
      marginVertical: 10,
      marginTop: 50,
    },
    nextRewardText: {
      fontSize: 30,
      color: "#fff",
      alignSelf: "center",
      textAlign: "center",
      marginBottom: 25,
      marginTop: 0,
    },
    runningText: {
      fontSize: 30,
      color: "rgb(50, 255, 50)",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
      marginVertical: 0,
    },
    rarityText: {
      fontSize: 60,
      color: "rgb(255, 255, 255)",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
      margin:10
    },
    priceText: {
      fontSize: 15,
      color: "rgb(255, 255, 255)",
      alignSelf: "center",
      textAlign: "center",
      marginVertical: 0,
    },
    ticketIcon: {
      resizeMode: "contain",
      alignSelf: "flex-start",
      verticalAlign: "middle",
      height: 40,
      width: 40,
      marginHorizontal:5
    },
    cardImage: {
      resizeMode: "contain",
      verticalAlign: "middle",
      height: 400,
      marginHorizontal:5,
      marginVertical: -50
    },
    resultImage: {
      resizeMode: "contain",
      verticalAlign: "middle",
      height: 400,
    },
    betInput: {
      height: 100,
      width: 400,
      fontSize: 30,
      fontWeight: "bold",
      color: "rgb(0, 60, 255)",
      borderWidth: 5,
      borderColor: "rgb(255, 255, 255)",
      padding: 10,
    },
  });

export default styles;