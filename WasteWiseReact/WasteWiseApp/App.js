import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './loginScreens/FirstPage';
import RecyclingLoginScreen from './loginScreens/RecyclingLogin';
import CompanyLoginScreen from './loginScreens/CompanyLogin';
import CompanyLoginScreen2 from './loginScreens/CompanyLogin2';
import DriverLoginScreen from './loginScreens/DriverLogin';
// import CompanyLogin from './loginScreens/CompanyLogin';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen name="FirstPage" component={FirstPage} />
        {/* <Stack.Screen name="RecyclingLogin" component={RecyclingLoginScreen} /> */}
        <Stack.Screen name="CompanyLogin" component={CompanyLoginScreen} />
        <Stack.Screen name="CompanyLogin2" component={CompanyLoginScreen2} />
        {/* <Stack.Screen name="DriverLogin" component={DriverLoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;