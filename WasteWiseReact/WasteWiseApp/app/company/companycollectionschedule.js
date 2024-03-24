//Company Collection Schedule

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';

const CompanyMonitorTrash = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('All'); // Initial selected type
  const Separator = () => <View style={styles.separator} />;
  const [trashData, setTrashData] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      try {
        const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/devices');
        const data = await response.json();
        setTrashData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const CustomButton = ({ title, date, type, collectionType}) => {

    // Check if the selected type is 'All' or matches the current type
    const isVisible = selectedType === 'All' || selectedType === type;

    return (
      isVisible && (
        <View style={[{flexDirection: 'row', justifyContent:'space-between', marginVertical:10, marginHorizontal:10}]}>
          <View>
            <Text>
              {date}
            </Text>
          </View>
          <View style={[{borderColor: 'black',  borderWidth:1, borderRadius:5, width: '70%', backgroundColor: collectionColor(collectionType)}]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {title}
              </Text>

              <View style={[{borderColor: getColorForType(type), borderWidth:2, borderRadius:3}]}>
                <Text style={[
                  { backgroundColor: getColorForType(type), borderColor: getColorForType(type),},
                  styles.typeIndicator,
                  {opacity: 0.6}
                ]}>
                  {type}
                </Text>
              </View>
            </View>
          </View>  
        </View>
      )
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
      Collected: '#AEEA6F',
      Requested: '#6FC5EA',
      Sheduled: '#6FC5EA',
    };
    // Return the color based on  the type, default to a fallback color if not found
    return typeColors[collectionType] || 'grey';
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
      </View>

      <Separator/>

      <ScrollView style={[{marginBottom:20,}]} >
      {trashData.map((item, index) => {
          // Extracting date from collectionDate and formatting it
          const collectionDate = new Date(item.collectionDate);
          const formattedDate = `${collectionDate.getDate()}/${collectionDate.getMonth() + 1}/${collectionDate.getFullYear()}`;

          return (
            <CustomButton
              key={index}
              title={item.trashCanId}
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

const CustomButton = ({ title, date, type, collectionType}) => {

  // Check if the selected type is 'All' or matches the current type
  const isVisible = selectedType === 'All' || selectedType === type;

  return (
    isVisible && (
      <View style={styles.buttonContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <View style={[styles.buttonContent, {borderColor: collectionColor(collectionType), backgroundColor: collectionColor(collectionType)}]}>
          <Text style={styles.buttonText}>{title}</Text>
          <View style={[styles.typeIndicator, {backgroundColor: getColorForType(type), borderColor: getColorForType(type)}]}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10, // Adjust spacing between TrashCanIDs
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  dateText: {
    fontSize: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  typeIndicator: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 3,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // Add other styles as needed
});


export default CompanyMonitorTrash;

