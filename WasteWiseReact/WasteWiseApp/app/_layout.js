import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack 
        screenOptions={{
            headerStyle:{
                backgroundColor:"green"
            },
            headerTintColor:"white",
            headerTitleStyle:{
            },
        }}>
        <Stack.Screen
                name="home"
                options={{ headerTitle: "" }}
            />
        <Stack.Screen 
            name="addtrashcan"
            options={{ headerTitle: "Add Trash Can" }}
        />
        <Stack.Screen 
        name="logins/companylogin"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="logins/companylogin2"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="logins/recyclinglogin"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="logins/recyclinglogin2"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="logins/driverlogin"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="logins/driverlogin2"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="company/companyhome"
        options={{ headerTitle: "Home" }}
        />
        <Stack.Screen 
        name="company/companymonitortrash"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="company/companytrashdetails"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="company/companycollectionschedule"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="recycling/recyclinghome"
        options={{ headerTitle: "Home" }}
        />
        <Stack.Screen 
        name="recycling/recyclingviewmap"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="recycling/recyclingmonitortrash"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="recycling/recyclingcollectionschedule"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="recycling/recyclingtrashdetails"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="driver/driverhome"
        options={{ headerTitle: "Home" }}
        />
        <Stack.Screen 
        name="driver/drivercollectionschedule"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="driver/drivermonitortrash"
        options={{ headerTitle: "Waste Wise" }}
        />
        <Stack.Screen 
        name="driver/driverviewmap"
        options={{ headerTitle: "Waste Wise" }}
        />
        </Stack>
    );
}