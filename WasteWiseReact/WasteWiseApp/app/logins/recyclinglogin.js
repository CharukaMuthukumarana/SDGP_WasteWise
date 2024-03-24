import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState} from 'react'
import { Link, router } from 'expo-router'
import {Picker} from '@react-native-picker/picker';

const recyclinglogin = () => {
    const [selectedCountry, setSelectedCountry] = useState("Select Country");
    const [mobileNumber, setMobileNumber] = useState('');
    const [recyclingUsername, setRecyclingUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const CustomButton = ({ title, onPress }) => (
        <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        >
        <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const handleRegister = async () => {
      try {
        const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recyclingUsername,
            password,
            mobileNumber,
            email,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
  
        Alert.alert('User Registered');
        // Navigate to the login screen
        router.push('logins/recyclinglogin2');
      } catch (error) {
        console.error('Error registering user:', error);
        Alert.alert('Error', 'Failed to register user. Please try again later.');
      }
    };
  
    

    return (
        <ScrollView>
        <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.title1}>Waste Wise</Text>
        </View>
        <Text style={[styles.subtitle, styles.boldText]}>Recycling</Text>
        <Text style={[styles.subtitle, styles.boldText]}>Registration</Text>
        <View style={[{marginVertical: 20 },{justifyContent: 'center'},{ flexDirection: 'row' }]}>
            <Text style={styles.smallText}>Already have an account? </Text>
            <View>
            <TouchableOpacity onPress={() =>router.push("logins/recyclinglogin2")}>
                <Text style={styles.ButtonText}>Sign in</Text>
            </TouchableOpacity>
            </View>
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={recyclingUsername}
          onChangeText={setRecyclingUsername}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Johndoe@mail.com"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Mobile Number</Text>
        {/* <Picker
            style={styles.picker}
            selectedValue={selectedCountry}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedCountry(itemValue)
            }>
            <Picker.Item label="Select Country" value="null" />
            <Picker.Item label="USA (+1)" value="+1" />
            <Picker.Item label="UK (+44)" value="+44" />
            {/* Add more countries as needed */}
        {/* </Picker>  */}
        <View style={styles.phoneContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
            />
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        
        <CustomButton
            title="Register"
            onPress={handleRegister}
        />
        </View>
        
        </ScrollView>
  )
}

export default recyclinglogin


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  header: {
    marginTop: 20,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title1: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'purple',
    fontSize: 35,
    textAlign: 'center'
  },
  boldText: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 15,
    marginTop: 0,
    textAlign: 'center',
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    flex:1,

  },
  picker: {
    flex: 1,
  },
  countryContainer: {
    marginTop: 15,
  },
  ButtonText: {
    color: 'blue',
    fontSize: 15,
    marginLeft: 4,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button:{
    backgroundColor: 'grey',
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});