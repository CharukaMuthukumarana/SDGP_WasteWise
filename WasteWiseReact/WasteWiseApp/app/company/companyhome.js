import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react'
import { Link, router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

const companyhome = () => {
  const {username} = useLocalSearchParams();
  const CustomButton = ({ title, title2 ,onPress, color1 }) => (
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
    
);

return (
    <SafeAreaView style={styles.container}>
    <View style={styles.center}>
    <Text style={[styles.title2, styles.boldText]}>
        Welcome
    </Text>
    <Text style={[styles.title3, styles.boldText]}>
        {username}
    </Text>


    </View>

    <CustomButton
    title="Monitor"
    title2="Trash Cans"
    onPress={() => router.push({
      pathname: '../company/companymonitortrash',
      params: {username:username}
    })}
    color1='#E87200'
    />

    <CustomButton
    title="Trash Collecting"
    title2="Schedules"
    onPress={() => 
      router.push({
        pathname: '../company/companycollectionschedule',
        params: {username:username}
      })
    }
    color1='#0E73F6'
    />
</SafeAreaView>
)
}

export default companyhome

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
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title3: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center',
    marginBottom: 25,
  },
  boldText: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});