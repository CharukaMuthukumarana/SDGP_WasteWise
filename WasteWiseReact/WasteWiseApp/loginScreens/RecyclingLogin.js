// Recycling Registration Page

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const RecyclingLogin = () => {
  const navigation = useNavigation();
  const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  const handleRegister = () => {
    // Perform registration logic here
    // For now, just show an alert
    Alert.alert('User Registered');
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
          <TouchableOpacity onPress={() => navigation.navigate('RecyclingLogin2')}>
            <Text style={styles.ButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="John Doe" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Johndoe@mail.com" />

      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.phoneContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select Country Code', value: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'USA +1', value: '+1' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },
            { label: '+44', value: '+44' },

            // Add more country codes as needed
          ]}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
          
        />
        <TextInput style={styles.input} placeholder="Enter your mobile number" keyboardType="phone-pad" />
      </View>

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="*********" />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} placeholder="*********" />
      <CustomButton
        title="Register"
        onPress={handleRegister}
      />
      </View>
      
    </ScrollView>
    
  );
};

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
    fontSize: 13,
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
  },
  countryContainer: {
    marginTop: 15,
  },
  backButton: {
    marginTop: 20,
  },
  ButtonText: {
    color: 'blue',
    fontSize: 13,
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

export default RecyclingLogin;