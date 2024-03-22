// Home Page


import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
<<<<<<<< Updated upstream:WasteWiseReact/WasteWiseApp/recyclingScreens/RecyclingHome.js
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';




const CustomButton = ({ title, title2 ,onPress, color1 }) => (
========
import React from 'react'
import { Link, router} from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';



const recyclinghome = () => {
  const { username } = useLocalSearchParams();

  const CustomButton = ({ title, title2 ,onPress, color1 }) => (
>>>>>>>> Stashed changes:WasteWiseReact/WasteWiseApp/recyclingScreens/[recyclinghome].js
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[color1,'white']} // Adjust the gradient colors as needed
        style={styles.button}
        start={{ x: -3, y: -3 }}
        end={{x:1.1, y: 2}}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{title}{"\n"}{title2}</Text>
          <AntDesign name="arrowright" size={45} color="black" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
<<<<<<<< Updated upstream:WasteWiseReact/WasteWiseApp/recyclingScreens/RecyclingHome.js
    
  );
========
    );
>>>>>>>> Stashed changes:WasteWiseReact/WasteWiseApp/recyclingScreens/[recyclinghome].js


const RecyclingHome = ({navigation}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
<<<<<<<< Updated upstream:WasteWiseReact/WasteWiseApp/recyclingScreens/RecyclingHome.js
      <Text style={[styles.title2, styles.boldText]}>
        Recycling_Name
      </Text>
========
    <Text style={[styles.title2, styles.boldText]}>
      Welcome
    </Text>
    <Text style={[styles.title3, styles.boldText]}>
      {username}
    </Text>
>>>>>>>> Stashed changes:WasteWiseReact/WasteWiseApp/recyclingScreens/[recyclinghome].js

    </View>

    <CustomButton
      title="Monitor"
      title2="Trash Cans"
      onPress={() => navigation.navigate('RecyclingMonitorTrash')}
      color1='#E87200'
    />

    <CustomButton
      title="Trash Collecting"
      title2="Schedules"
      onPress={() => navigation.navigate('CompanyLogin')}
      color1='#0E73F6'
    />
    <CustomButton
      title="View Map"
      title2=""
      onPress={() => navigation.navigate('RecyclingViewMap')}
      color1='#0E73F6'
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  button: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 40,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 17,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  title2: {
    fontSize: 40, // Adjust the font size as needed
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title3: {
    fontSize: 30, // Adjust the font size as needed
    textAlign: 'center',
    marginBottom: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecyclingHome;

