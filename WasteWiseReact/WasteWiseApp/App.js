import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './loginScreens/FirstPage';
import RecyclingLoginScreen from './loginScreens/RecyclingLogin';
import RecyclingLoginScreen2 from './loginScreens/RecyclingLogin2';
import CompanyLoginScreen from './loginScreens/CompanyLogin';
import CompanyLoginScreen2 from './loginScreens/CompanyLogin2';
import DriverLoginScreen from './loginScreens/DriverLogin';
import DriverLoginScreen2 from './loginScreens/DriverLogin2';
 
import CompanyHomeScreen from './companyScreens/CompanyHome';
import RecyclingHomeScreen from './recyclingScreens/RecyclingHome';
import DriverHomeScreen from './driverScreens/DriverHome';

import CompanyMonitorScreen from './companyScreens/CompanyMonitorTrash';
import RecyclingMonitorScreen from './recyclingScreens/RecyclingMonitorTrash';
import DriverMonitorScreen from './driverScreens/DriverMonitorTrash';

import CompanyCollectionSchedule from './companyScreens/CompanyCollectionSchedule';
// import CompanyLogin from './loginScreens/CompanyLogin';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="RecyclingLogin" component={RecyclingLoginScreen} />
        <Stack.Screen name="RecyclingLogin2" component={RecyclingLoginScreen2} />
        <Stack.Screen name="CompanyLogin" component={CompanyLoginScreen} />
        <Stack.Screen name="CompanyLogin2" component={CompanyLoginScreen2} />
        <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
        <Stack.Screen name="DriverLogin2" component={DriverLoginScreen2} />

        <Stack.Screen name="CompanyHome" component={CompanyHomeScreen} />
        <Stack.Screen name="RecyclingHome" component={RecyclingHomeScreen} />
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} />

        <Stack.Screen name="CompanyMonitorTrash" component={CompanyMonitorScreen} />
        <Stack.Screen name="RecyclingMonitorTrash" component={RecyclingMonitorScreen} />
        <Stack.Screen name="DriverMonitorTrash" component={DriverMonitorScreen} />

        <Stack.Screen name="CompanyCollectionSchedule" component={CompanyCollectionSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;