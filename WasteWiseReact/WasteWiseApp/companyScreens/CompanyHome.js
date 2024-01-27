// Home Page


import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';



const Separator = () => <View style={styles.separator} />;

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);



const CompanyHome = ({navigation}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <Text style={[styles.title2, styles.boldText]}>
        Waste Wise
      </Text>

    </View>
    <Separator />
    <CustomButton
      title="Button1"
      onPress={() => navigation.navigate('CompanyLogin')}
    />

    <CustomButton
      title="Button2"
      onPress={() => navigation.navigate('CompanyLogin')}
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
    backgroundColor: 'white',
    padding: 17,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 30,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title2: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center',
    marginVertical: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default CompanyHome;

