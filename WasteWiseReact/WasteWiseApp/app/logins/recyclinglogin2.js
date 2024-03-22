import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, {useState} from 'react'
import { Link, router } from 'expo-router'
import { useLocation } from 'expo-router';

const recyclinglogin2 = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


    const CustomButton = ({ title, onPress }) => (
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      );
      const handleLogin = async () => {
        try {
          const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/recyclingUsers');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();

          // Check if username and password match
          const user = data.find(user => user.recyclingUsername === username && user.password === password);
          if (user) {
            // Username and password match, navigate to the next screen
            router.push({
              pathname: '../recycling/[recyclinghome]',
              params: {username:username}
            })
            Alert.alert('Logging Successful');
          } else {
            // Username and password do not match, show an alert
            Alert.alert('Error', 'Invalid username or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          Alert.alert('Error', 'Failed to log in. Please try again later.');
        }
      };
    return (
        <ScrollView style={styles.ScrollView}>
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title1}>Waste Wise</Text>
            </View>
            <Text style={[styles.subtitle, styles.boldText]}>Recycling Login</Text>

            <View style={[{marginVertical: 20 },{justifyContent: 'center'},{ flexDirection: 'row' }]}>
            <Text style={styles.smallText}>Don't have an account? </Text>
            <View>
                <TouchableOpacity onPress={() => router.push("logins/recyclinglogin")}>
                <Text style={styles.ButtonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            </View>
            

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            
        </View>
        <View style={[{padding:20, marginTop:180}]}>
            <CustomButton
            title="Log In"
            onPress={handleLogin}
            />
        </View>
        </ScrollView>
    )
}

export default recyclinglogin2

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    ScrollView:{
      flex: 1
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
    ButtonText: {
      color: 'blue',
      fontSize: 13,
      marginLeft: 4,
      textAlign: 'left',
      textDecorationLine: 'underline',
    },
    button:{
      backgroundColor: 'grey',
      padding: 12,
      borderRadius: 5,
      bottom: 0,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
  