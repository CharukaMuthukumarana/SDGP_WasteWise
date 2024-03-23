import { StyleSheet, Text, View, Button, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';



const companytrashdetails = () => {
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
    try {
      const response = await fetch(`https://waste-wise-api-sdgp.koyeb.app/api/devices/${trashCanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionState: "Requested",
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
      <Text style={styles.heading}>TRASH CAN DETAILS</Text>
      {trashDetails && (
        
        <View>
          <Text>Trash Can ID: {trashDetails.trashCanId}</Text>
          <Text>Collection Date: {trashDetails.collectionDate}</Text>
          <Text>Collection State: {trashDetails.collectionState}</Text>
          <Text>Company Name: {trashDetails.companyName}</Text>
          <Text>Bin Level: {trashDetails.sensorData[0].binlevel}</Text>
          <Text>Latitude: {trashDetails.latitude}</Text>
          <Text>Longitude: {trashDetails.longitude}</Text>
          <Text>Waste Type: {trashDetails.wasteType}</Text>

        </View>
      )}
      <Button title="Select Collection Date" onPress={() => setDatePicker(true)} />
      {selectedDate && <Text>Selected Date: {formatDate(selectedDate)}</Text>}

      {datePicker && (<DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={saveChanges} />
      </View>
      {dateString && (
        <Text>Date String: {dateString}</Text>
      )}
      
    </View>
  );
};

export default companytrashdetails;

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
  datePicker: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

