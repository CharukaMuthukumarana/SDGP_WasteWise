// CompanyLogin.js

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompanyLogin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Waste Wise</Text>
      </View>
      <Text style={[styles.subtitle, styles.boldText]}>Company Registration</Text>
      <Text style={styles.smallText}>Already have an account? 
        <Button
          title="Sign in"
          onPress={(() => navigation.navigate("CompanyLogin2"))}
        />
      </Text>
      

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="John Doe" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Johndoe@mail.com" />

      <Text style={styles.label}>Mobile Number</Text>
      {/* Add a TextInput for Mobile Number */}
      <View style={styles.countryContainer}>
        <Text style={styles.label}>Country</Text>
        {/* Add a TextInput with a dropdown for selecting the country */}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Waste Wise</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'purple',
    fontSize: 20,
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
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
  backButtonText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default CompanyLogin;