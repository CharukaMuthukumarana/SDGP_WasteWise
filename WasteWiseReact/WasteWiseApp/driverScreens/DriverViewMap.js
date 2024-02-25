import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button, Alert, Linking } from 'react-native';
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
  const [journeyStarted, setJourneyStarted] = useState(false);

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

  const handleStartJourney = () => {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${destinations
      .map(dest => `${dest.latitude},${dest.longitude}`)
      .join('&destination=')}`;

    Linking.openURL(url).catch(err => {
      console.error('Failed to open Google Maps: ', err);
      Alert.alert(
        'Error',
        'Could not open Google Maps. Please make sure the app is installed.'
      );
    });

    setJourneyStarted(true);
  };

  const handleConfirmDestination = () => {
    const completedDestination = destinations[currentDestinationIndex];
    setCompletedDestinations([...completedDestinations, completedDestination]);
    setCurrentDestinationIndex(currentDestinationIndex + 1);
    Alert.alert('Confirmation', 'Destination confirmation successful.');
    // Call backend function to handle confirmation
    handleConfirmationWithBackend();
  };

  const handleNextDestination = () => {
    setCurrentDestinationIndex(0);
    setCompletedDestinations([]);
    setJourneyStarted(false);
  };

  const handleConfirmationWithBackend = () => {
    // Placeholder function to handle confirmation with backend
    console.log('Confirmation sent to backend');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        initialRegion={{
          latitude: origin ? origin.latitude : 7.8731,
          longitude: origin ? origin.longitude : 80.7718,
          latitudeDelta: 5,
          longitudeDelta: 1,
        }}
        region={
          journeyStarted && origin
            ? {
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : null
        }
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
        {journeyStarted && origin && destinations[currentDestinationIndex] && (
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
      {!journeyStarted && (
        <Button title="Start Journey" onPress={handleStartJourney} />
      )}
      {journeyStarted && (
        <Button
          title="Confirm Destination"
          onPress={handleConfirmDestination}
          disabled={!origin || currentDestinationIndex === destinations.length}
        />
      )}
      {completedDestinations.length > 0 && (
        <Button title="Start Next Destination" onPress={handleNextDestination} />
      )}
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
