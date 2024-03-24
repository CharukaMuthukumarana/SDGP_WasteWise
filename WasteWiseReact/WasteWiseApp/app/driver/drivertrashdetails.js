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

  const handleDateChange = (event, selectedDate) => {
    setDatePicker(false);
    setSelectedDate(selectedDate);
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trash Can Details</Text>
      {trashDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Trash Can ID:</Text>
          <Text style={styles.detail}>{trashDetails.trashCanId}</Text>
          <Text style={styles.label}>Collection Date:</Text>
          <Text style={styles.detail}>{trashDetails.collectionDate}</Text>
          <Text style={styles.label}>Collection State:</Text>
          <Text style={styles.detail}>{trashDetails.collectionState}</Text>
          <Text style={styles.label}>Company Name:</Text>
          <Text style={styles.detail}>{trashDetails.companyName}</Text>
          <Text style={styles.label}>Bin Level:</Text>
          <Text style={styles.detail}>{trashDetails.sensorData[0].binlevel}</Text>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.detail}>{trashDetails.latitude}</Text>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.detail}>{trashDetails.longitude}</Text>
          <Text style={styles.label}>Waste Type:</Text>
          <Text style={styles.detail}>{trashDetails.wasteType}</Text>
        </View>
      )}
      <Button title="Select Collection Date" onPress={() => setDatePicker(true)} />
      {selectedDate && <Text style={styles.selectedDate}>Selected Date: {formatDate(selectedDate)}</Text>}
      {datePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={saveChanges} color="#2ecc71" />
      </View>
      {dateString && <Text style={styles.dateString}>Date String: {dateString}</Text>}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  dateString: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});
