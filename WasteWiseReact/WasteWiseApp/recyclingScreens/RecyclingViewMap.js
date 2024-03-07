import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const App = () => {
  const [destinations, setDestinations] = useState([
    { latitude: 6.5792, longitude: 79.9629 },
    { latitude: 6.9271, longitude: 79.8612 },
    // Add more destinations as needed
  ]);
  const [origin, setOrigin] = useState(null);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [completedDestinations, setCompletedDestinations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get current location when component mounts
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      Location.watchPositionAsync({ distanceInterval: 10 }, location => {
        setUserLocation(location.coords);
      });
    })();
  }, []);

  useEffect(() => {
    if (userLocation) {
      setOrigin({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    }
  }, [userLocation]);

  const handleConfirmDestination = () => {
    const completedDestination = destinations[currentDestinationIndex];
    setCompletedDestinations([...completedDestinations, completedDestination]);
    setCurrentDestinationIndex(currentDestinationIndex + 1);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 5,
          longitudeDelta: 1,
        }}
      >
        {origin && (
          <Marker coordinate={origin} title="Current Location" />
        )}
        {destinations.map((destination, index) => (
          <Marker
            key={index}
            coordinate={destination}
            title={`Destination ${index + 1}`}
            pinColor={currentDestinationIndex === index ? 'red' : 'blue'}
          />
        ))}
        {origin && destinations[currentDestinationIndex] && (
          <MapViewDirections
            origin={origin}
            destination={destinations[currentDestinationIndex]}
            apikey="AIzaSyBtde98wmoYJKfgcZaVz7QrFimVDbrFtFY"
            strokeWidth={4}
            strokeColor="red"
            mode={'DRIVING'}
          />
        )}
      </MapView>
      <Button
        title="Confirm Destination"
        onPress={handleConfirmDestination}
        disabled={!origin || currentDestinationIndex === destinations.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
