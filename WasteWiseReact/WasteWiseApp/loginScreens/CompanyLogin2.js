// CompanyLogin2.js

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompanyLogin2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Waste Wise</Text>
      </View>
      <Text style={[styles.subtitle, styles.boldText]}>Company Login</Text>

      <Text style={styles.smallText}>Don't have an account? 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CompanyLogin')}>
        <Text style={styles.ButtonText}>Sign up</Text>
      </TouchableOpacity>
      </Text>
      

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="John Doe" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="*********" />

    </View>
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
    marginTop: 5,
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
    marginTop: 17,
    marginLeft: 3,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
});

export default CompanyLogin2;