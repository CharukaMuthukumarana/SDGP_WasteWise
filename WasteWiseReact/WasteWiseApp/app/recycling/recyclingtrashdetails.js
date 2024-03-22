import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

const recyclingtrashdetails = () => {
  const { trashCanId } = useLocalSearchParams();
  const [trashDetails, setTrashDetails] = useState(null);

  useEffect(() => {
    const fetchTrashDetails = async () => {
      try {
        const response = await fetch(`https://waste-wise-api-sdgp.koyeb.app/api/devices/${trashCanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trash details');
        }
        const data = await response.json();
        setTrashDetails(data);
      } catch (error) {
        console.error('Error fetching trash details:', error);
      }
    };

    fetchTrashDetails();
  }, [trashCanId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TRASH CAN DETAILS</Text>
      {trashDetails && (
        <View>
          <Text>Trash Can ID: {trashDetails.trashCanId}</Text>
          <Text>Collection Date: {trashDetails.collectionDate}</Text>
          <Text>Collection State: {trashDetails.collectionState}</Text>
          <Text>Bin Level: {trashDetails.sensorData[0].binlevel}</Text>
          <Text>Latitude: {trashDetails.latitude}</Text>
          <Text>Longitude: {trashDetails.longitude}</Text>
          <Text>Waste Type: {trashDetails.wasteType}</Text>
        </View>
      )}
    </View>
  );
};

export default recyclingtrashdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
