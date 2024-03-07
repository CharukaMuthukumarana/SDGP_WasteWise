import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';


const RecyclingViewMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  
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

  useEffect(() => {
    if (location) {
      const destinations = [
        { id: '1', name: 'Colombo', latitude: 6.9271, longitude: 79.8613 },
        { id: '2', name: 'Kandy', latitude: 7.2911, longitude: 80.6354 },
        { id: '3', name: 'Galle', latitude: 6.0572, longitude: 80.2173 },
        { id: '4', name: 'Anuradhapura', latitude: 8.4455, longitude: 80.3521 },
        { id: '5', name: 'Nuwara Eliya', latitude: 6.9439, longitude: 80.7208 },
      ];
      setDestinations(destinations);
    }
  }, [location]);

  useEffect(() => {
    if (journeyStarted && currentDestination) {
      const intervalId = setInterval(() => {
        updateLocation();
      }, 5000); // Update location every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [journeyStarted, currentDestination]);

  const updateLocation = async () => {
    const newLocation = await Location.getCurrentPositionAsync({});
    setLocation(newLocation);
    if (currentDestination) {
      getRoute(currentDestination);
    }
  };

  const startJourney = () => {
    if (destinations.length > 0) {
      setCurrentDestination(destinations[0]);
      setJourneyStarted(true);
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
    }
  };

  const confirmDestination = () => {
    if (currentDestination) {
      const updatedDestinations = destinations.filter(
        (destination) => destination !== currentDestination
      );
      setDestinations(updatedDestinations);
      setCurrentDestination(null);
      setRouteCoordinates([]);
      if (updatedDestinations.length === 0) {
        setJourneyStarted(false);
      } else {
        setCurrentDestination(updatedDestinations[0]);
      }
    }
  };
  

  const getRoute = async (destination) => {
    const apiKey = 'AIzaSyBtde98wmoYJKfgcZaVz7QrFimVDbrFtFY'; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const routeCoordinates = decodePolyline(points);
        setRouteCoordinates(routeCoordinates);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const decodePolyline = (encoded) => {
    let index = 0;
    let len = encoded.length;
    let lat = 0;
    let lng = 0;
    const routeCoordinates = [];

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const latitude = lat / 1e5;
      const longitude = lng / 1e5;
      routeCoordinates.push({ latitude, longitude });
    }
    return routeCoordinates;
  };

  if (errorMsg) {
    return <Text style={styles.errorMsg}>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text style={styles.loadingMsg}>Getting your location...</Text>;
  }

  let destinationMarker = null;
  let route = null;
  if (currentDestination) {
    destinationMarker = (
      <Marker
        coordinate={{
          latitude: currentDestination.latitude,
          longitude: currentDestination.longitude,
        }}
        title={currentDestination.name}
        description="Your destination"
        pinColor="red"
      />
    );

    if (routeCoordinates.length > 0) {
      route = (
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={3}
          strokeColor="red"
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true} // Show blue dot for user's current location
      >
        {destinationMarker}
        {route}
      </MapView>
      {!journeyStarted && destinations.length > 0 && (
        <Button title="Start Journey" onPress={startJourney} style={styles.startButton} />
      )}
      {journeyStarted && (
        <View style={styles.journeyContainer}>
          <Text>Current Destination: {currentDestination ? currentDestination.name : ''}</Text>
          <Button title="Confirm Destination" onPress={confirmDestination} />
        </View>
      )}
      
      <View style={styles.destinationsContainer}>
        {destinations.length > 0 && !journeyStarted && (
          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.destinationText}>{item.name}</Text>
            )}
          />
        )}
        {destinations.length === 0 && !journeyStarted && (
          <Text style={styles.noDestinationsText}>No destinations remaining</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  journeyContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1, // Ensure the journey container is above the map
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 1, // Ensure the start button is above the map
  },
  destinationsContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom position as per your requirement
    left: 20,
    right: 20,
    zIndex: 1, // Ensure the destinations container is above the map
    maxHeight: 300,
  },
  destinationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noDestinationsText: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  errorMsg: {
    fontSize: 16,
    color: 'red',
  },
  loadingMsg: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default RecyclingViewMap;




// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker, Polyline } from 'react-native-maps';


// const recyclingViewMap = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [destinations, setDestinations] = useState([]);
//   const [currentDestination, setCurrentDestination] = useState(null);
//   const [journeyStarted, setJourneyStarted] = useState(false);
//   const [routeCoordinates, setRouteCoordinates] = useState([]);


//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   useEffect(() => {
//     if (location) {
//       const destinations = [
//         { id: '1', name: 'Colombo', latitude: 6.9271, longitude: 79.8613 },
//         { id: '2', name: 'Kandy', latitude: 7.2911, longitude: 80.6354 },
//         { id: '3', name: 'Galle', latitude: 6.0572, longitude: 80.2173 },
//         { id: '4', name: 'Anuradhapura', latitude: 8.4455, longitude: 80.3521 },
//         { id: '5', name: 'Nuwara Eliya', latitude: 6.9439, longitude: 80.7208 },
//       ];
//       setDestinations(destinations);
//     }
//   }, [location]);

//   const startJourney = () => {
//     if (destinations.length > 0) {
//       setCurrentDestination(destinations[0]);
//       setJourneyStarted(true);
//     }
//   };

//   const confirmDestination = () => {
//     if (currentDestination) {
//       const updatedDestinations = destinations.filter(
//         (destination) => destination.id !== currentDestination.id
//       );
//       setDestinations(updatedDestinations);
//       setCurrentDestination(null);
//       setJourneyStarted(false);
//     }
//   };

//   if (errorMsg) {
//     return <Text style={styles.errorMsg}>{errorMsg}</Text>;
//   }

//   if (!location) {
//     return <Text style={styles.loadingMsg}>Getting your location...</Text>;
//   }

//   let marker = null;
//   if (location) {
//     marker = (
//       <Marker
//         coordinate={{
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         }}
//         title="Your Location"
//         description="You are here"
//       />
//     );
//   }

//   let destinationMarker = null;
//   if (currentDestination) {
//     destinationMarker = (
//       <Marker
//         coordinate={{
//           latitude: currentDestination.latitude,
//           longitude: currentDestination.longitude,
//         }}
//         title={currentDestination.name}
//         description="Your destination"
//       />
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {marker}
//         {destinationMarker}
//       </MapView>
//       {journeyStarted ? (
//         <View style={styles.journeyContainer}>
//           <Text style={styles.journeyText}>
//             Your current destinationText: {currentDestination.name}
//           </Text>
//           <Button title="Confirm Destination" onPress={confirmDestination} />
//         </View>
//       ) : (
//         <Button title="Start Journey" onPress={startJourney} />
//       )}
//       {destinations.length > 0 ? (
//         <FlatList
//           data={destinations}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <Text style={styles.destinationText}>{item.name}</Text>
//           )}
//         />
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   errorMsg: {
//     color: 'red',
//     fontSize: 16,
//   },
//   loadingMsg: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   journeyContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   journeyText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   destinationText: {
//     fontSize: 16,
//     marginTop: 10,
//   },
// });

// export default recyclingViewMap;
