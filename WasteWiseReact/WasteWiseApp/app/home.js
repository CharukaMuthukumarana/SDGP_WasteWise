import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const Separator = () => <View style={styles.separator} />;


const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <Text style={[styles.title2, styles.boldText]}>
        Waste Wise
      </Text>
      <Text style={styles.title}>
        Which of the following are you,
      </Text>
    </View>
    <Separator />
   
    <CustomButton
      title="Company"
      onPress={()=>router.push("/logins/companylogin")}
    />

    <CustomButton
      title="Recycling"
      onPress={()=>router.push("/logins/recyclinglogin")}
    />

    <CustomButton
      title="Driver"
      onPress={()=>router.push("/logins/driverlogin")}
    />
    <View style={[{marginVertical:30 },{justifyContent: 'center'},{ flexDirection: 'row' }]}>
            <View>
            <TouchableOpacity onPress={() =>router.push("/addtrashcan")}>
                <Text style={styles.ButtonText}>Add Trash Cans</Text>
            </TouchableOpacity>
            </View>
        </View>
  </SafeAreaView>

  )
}

export default Home


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25,
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
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1.2,
    marginTop: 30,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title2: {
    fontSize: 50, // Adjust the font size as needed
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
    marginVertical: 1,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  link: {
    textDecorationLine: 'none', // to remove underline from link
  },
  ButtonText: {
    color: 'blue',
    fontSize: 13,
    marginLeft: 12,
    marginVertical: 20,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
});