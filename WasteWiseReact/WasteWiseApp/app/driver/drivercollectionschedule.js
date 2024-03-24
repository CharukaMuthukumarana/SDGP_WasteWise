import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';

const DriverMonitorTrash = () => {
  const { username } = useLocalSearchParams();
  const [selectedType, setSelectedType] = useState('All'); // Initial selected type
  const [trashData, setTrashData] = useState([]);
  const [category, setCategory] = useState("Today");

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      try {
        const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/devices');
        const data = await response.json();
        // Filter data based on the companyName equal to the username
        const filteredData = data
        // Filter data based on collectionState "Scheduled" or "Requested"
        const scheduledRequestedData = filteredData.filter(item => item.collectionState === "Scheduled" || item.collectionState === "Requested");
        // Set the filtered data
        setTrashData(scheduledRequestedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const filterTrashData = () => {
    // Get today's date
    const today = new Date();
    // Filter data based on the selected category
    if (category === 'Today') {
      return trashData.filter(item => {
        const collectionDate = new Date(item.collectionDate);
        return collectionDate.toDateString() === today.toDateString() || collectionDate < today;
      });
    } else if (category === 'Upcoming') {
      return trashData.filter(item => {
        const collectionDate = new Date(item.collectionDate);
        return collectionDate > today;
      });
    } else {
      return trashData;
    }
  };

  const CustomButton = ({ title, collectionDate, date, type, collectionType }) => {
    const currentDate = new Date();
    const backgroundColor = collectionDate.toDateString() === currentDate.toDateString() ? 'green' : 'red';
  
    return (
      <View style={[styles.buttonContainer, { backgroundColor }]}>
        <Text style={styles.dateText}>{date}</Text>
        <View style={[styles.buttonContent, { borderColor: collectionColor(collectionType), backgroundColor: collectionColor(collectionType) }]}>
          <Text style={styles.buttonText}>{title}</Text>
          <View style={[styles.typeIndicator, { backgroundColor: getColorForType(type), borderColor: getColorForType(type) }]}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        </View>
      </View>
    );
  };

  const getColorForType = (type) => {
    // Define colors for different types
    const typeColors = {
      PLASTIC: '#E87200',
      PAPER: '#34A853',
      'GLASS/METAL': '#4285F4',
      // Add more types and corresponding colors as needed
    };

    // Return the color based on the type, default to a fallback color if not found
    return typeColors[type] || 'grey';
  };
  
  const collectionColor = (collectionType) => {
    // Define colors for different types
    const typeColors = {
      Scheduled: '#AEEA6F',
      Requested: '#6FC5EA',
    };
    // Return the color based on  the type, default to a fallback color if not found
    return typeColors[collectionType] || 'grey';
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
        <Text style={styles.title}>{username}</Text>
      </View>
      <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
          }>
          <Picker.Item label="Today" value="Today" />
          <Picker.Item label="Upcoming" value="Upcoming" />
      </Picker>
      <Separator/>
      <ScrollView style={{ marginBottom: 20 }}>
      {filterTrashData().map((item, index) => {
          const collectionDate = new Date(item.collectionDate);
          const formattedDate = `${collectionDate.getDate()}/${collectionDate.getMonth() + 1}/${collectionDate.getFullYear()}`;

          return (
            <CustomButton
              key={index}
              title={item.trashCanId}
              collectionDate={collectionDate}
              date={formattedDate}
              type={item.wasteType}
              collectionType={item.collectionState}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  typeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  separator: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DriverMonitorTrash;