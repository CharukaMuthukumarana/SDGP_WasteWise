import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstPage from './loginScreens/FirstPage';
import RecyclingLoginScreen from './loginScreens/RecyclingLogin';
import CompanyLoginScreen from './loginScreens/CompanyLogin';
import DriverLoginScreen from './loginScreens/DriverLogin';
import CompanyLogin from './loginScreens/CompanyLogin';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen name="FirstPage" component={FirstPage} />
        {/* <Stack.Screen name="RecyclingLogin" component={RecyclingLoginScreen} /> */}
        <Stack.Screen name="CompanyLogin" component={CompanyLoginScreen} />
        {/* <Stack.Screen name="DriverLogin" component={DriverLoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;