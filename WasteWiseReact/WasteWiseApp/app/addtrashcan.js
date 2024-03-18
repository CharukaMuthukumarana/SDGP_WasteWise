import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Alert } from 'react-native';

const addtrashcan = () => {
    const [trashCanId, setTrashCanId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [latitude, setLatitude] = useState('0.0000');
    const [longitude, setLongitude] = useState('0.0000');
    const [type, setType] = useState('');
    const [collectionType, setCollectionType] = useState(null);
    const [collectionDate, setCollectionDate] = useState(null);
    const [binLevel, setBinLevel] = useState(0);
    const [showMapView, setShowMapView] = useState(false);
    const [location, setLocation] = useState(null);
    
    useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
      })();
  }, []);

  const openMapView = () => {
      setShowMapView(true);
  };

  const handleMapPress = (event) => {
      setLatitude(String(event.nativeEvent.coordinate.latitude));
      setLongitude(String(event.nativeEvent.coordinate.longitude));
      setShowMapView(false);
  };

  const addTrashCan = async () => {
    const trashCanData = {
        trashCanId: trashCanId,
        collectionDate: collectionDate,
        collectionState: "Not Scheduled", // Assuming this is always "Collected" for new trash cans
        companyName: companyName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        wasteType: type,
        sensorData: [{
            timestamp: new Date().toISOString(),
            binlevel: binLevel
        }]
    };

    try {
        const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trashCanData)
        });

        if (response.ok) {
            // If the response is successful, reset the form fields
            setTrashCanId('');
            setCompanyName('');
            setLatitude('0.0000');
            setLongitude('0.0000');
            setType('PAPER');
            setCollectionType('');
            setCollectionDate('');
            setBinLevel(0);
            Alert.alert('Success', 'Trash can added successfully.');
        } else {
            throw new Error('Failed to add trash can');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add trash can. Please try again later.');
    }
};
    const CustomButton = ({ title, onPress }) => (
        <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        >
        <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
        <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.title1}>Waste Wise</Text>
        </View>
        <Text style={[styles.subtitle, styles.boldText]}>Add</Text>
        <Text style={[styles.subtitle, styles.boldText]}>Trash Can</Text>

        <Text style={styles.label}>Trash Can ID</Text>
        <TextInput 
        style={styles.input} 
        placeholder="ABC_1" 
        value={trashCanId}
        onChangeText={(text)=> setTrashCanId(text)}
        />
        <Text style={styles.label}>Company Name</Text>
        <TextInput 
        style={styles.input} 
        placeholder="ABC" 
        value={companyName}
        onChangeText={(text)=> setCompanyName(text)}
        />
        <Text style={styles.label}>Latitude of the Company</Text>
        <View style={styles.phoneContainer}>
        <TextInput
            style={styles.input}
            placeholder="Enter the Latitude"
            keyboardType="numeric"
            value={latitude}
            onChangeText={(text) => setLatitude(String(text))}
        />
        </View>
        <Text style={styles.label}>Latitude of the Company</Text>
        <View style={styles.phoneContainer}>
        <TextInput
            style={styles.input}
            placeholder="Enter the Longitude"
            keyboardType="numeric"
            value={longitude}
            onChangeText={(text) => setLongitude(String(text))}
        />
        </View>

        <Text style={styles.label}>Trash Type</Text>
        <Picker
            style={styles.picker}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) =>
                setType(itemValue)
            }>
            <Picker.Item label="Select Type" value={null} />
            <Picker.Item label="PAPER" value="PAPER" />
            <Picker.Item label="GLASS/METAL" value="GLASS/METAL" />
            <Picker.Item label="PLASTIC" value="PLASTIC" />
        </Picker>

        <CustomButton title="Add Trash Can" onPress={addTrashCan} />
        <TouchableOpacity style={styles.button} onPress={openMapView}>
                    <Text style={styles.buttonText}>Select Location</Text>
        </TouchableOpacity>
        </View>
        {showMapView && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        onPress={handleMapPress}
                    >
                        {latitude !== '0.0000' && longitude !== '0.0000' && (
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(latitude),
                                    longitude: parseFloat(longitude),
                                }}
                            />
                        )}
                    </MapView>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => setShowMapView(false)}
                    >
                        <Text style={styles.buttonText}>Confirm Location</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
  )
}

export default addtrashcan

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      
    },
    mapContainer: {
      flex: 1,
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
      flex:1,
  
    },
    picker: {
      flex: 1,
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
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button:{
      backgroundColor: 'grey',
      padding: 12,
      borderRadius: 5,
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
  });