import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const DriverTrashDetails = () => {
  const { trashCanId } = useLocalSearchParams();
  const [trashDetails, setTrashDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const fetchTrashDetails = async () => {
      try {
        const response = await fetch(`https://waste-wise-api-sdgp.koyeb.app/api/devices/${trashCanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trash details');
        }
        const data = await response.json();
        setTrashDetails(data);
        setCompanyName(data.companyName);
      } catch (error) {
        console.error('Error fetching trash details:', error);
      }
    };

    fetchTrashDetails();
  }, [trashCanId]);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const saveChanges = async () => {
    try {
      const dateString = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}T00:00:00.000Z`;
      setDateString(dateString); // Set the dateString
      const response = await fetch(`https://waste-wise-api-sdgp.koyeb.app/api/devices/${companyName}/${trashCanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionDate: dateString,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update collection date');
      }
      // No need to parse response.json() since no data is expected
      setDatePicker(false);
      Alert.alert('Changes saved', 'The collection date has been updated.');
    } catch (error) {
      console.error('Error updating collection state:', error);
      Alert.alert('Error', 'Something went wrong while saving the changes.');
    }
    try {
      const response = await fetch(`https://waste-wise-api-sdgp.koyeb.app/api/devices/${trashCanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionState: "Collected",
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update collection state');
      }
      // No need to parse response.json() since no data is expected;
      setDatePicker(false);
    } catch (error) {
      console.error('Error updating collection state:', error);
      Alert.alert('Error', 'Something went wrong while saving the changes.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trash Can Details</Text>
      {trashDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Trash Can ID: {trashDetails.trashCanId}</Text>
          <Text style={styles.detailText}>Collection Date: {trashDetails.collectionDate}</Text>
          <Text style={styles.detailText}>Collection State: {trashDetails.collectionState}</Text>
          <Text style={styles.detailText}>Company Name: {trashDetails.companyName}</Text>
          <Text style={styles.detailText}>Bin Level: {trashDetails.sensorData[0].binlevel}</Text>
          <Text style={styles.detailText}>Latitude: {trashDetails.latitude}</Text>
          <Text style={styles.detailText}>Longitude: {trashDetails.longitude}</Text>
          <Text style={styles.detailText}>Waste Type: {trashDetails.wasteType}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Mark As Collected" onPress={saveChanges} color="#2ecc71" />
      </View>
      {dateString && <Text style={styles.dateStringText}>Date String: {dateString}</Text>}
    </View>
  );
};

export default DriverTrashDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  selectedDateText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  dateStringText: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});
