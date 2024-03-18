import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack 
        screenOptions={{
            headerStyle:{
                backgroundColor:"orange"
            },
            headerTintColor:"white",
            headerTitleStyle:{
                fontWeight:"bold"
            },
        }}>
        <Stack.Screen name="home"/>
        <Stack.Screen name="addtrashcan"/>
        <Stack.Screen name="devicedata"/>
        <Stack.Screen name="logins/companylogin"/>
        <Stack.Screen name="logins/companylogin2"/>
        <Stack.Screen name="logins/recyclinglogin"/>
        <Stack.Screen name="logins/recyclinglogin2"/>
        <Stack.Screen name="logins/driverlogin"/>
        <Stack.Screen name="logins/driverlogin2"/>
        <Stack.Screen name="company/companyhome"/>
        <Stack.Screen name="company/companymonitortrash"/>
        <Stack.Screen name="company/companycollectionschedule"/>
        <Stack.Screen name="recycling/recyclinghome"/>
        <Stack.Screen name="recycling/recyclingviewmap"/>
        <Stack.Screen name="recycling/recyclingmonitortrash"/>
        <Stack.Screen name="recycling/recyclingcollectionschedule"/>
        <Stack.Screen name="driver/driverhome"/>
        <Stack.Screen name="driver/drivercollectionschedule"/>
        <Stack.Screen name="driver/drivermonitortrash"/>
        <Stack.Screen name="driver/driverviewmap"/>
        </Stack>
    );
}