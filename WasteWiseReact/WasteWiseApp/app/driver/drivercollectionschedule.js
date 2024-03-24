import React, { useState , useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Link, router } from 'expo-router'
import { SimpleLineIcons } from '@expo/vector-icons';

const DriverCollectionSchedule = () => {
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
  
    
    const CustomButton = ({ title, title2, onPress, color1, date, type, percentage, collectionType, predictedCollection }) => {
        const barColor = percentage > 80 ? 'red' : 'orange';
        const borderColor = percentage > 80 ? 'red' : '#d3d3d3';
        const borderWidth = percentage > 80 ? 3 : 2;
        const opacityColor = percentage > 80 ? '#ffb5b7' : '#fbd9b5';
    
        // Check if the selected type is 'All' or matches the current type
        const isVisible = selectedType === 'All' || selectedType === type;
    
        return (
          isVisible && (
            <TouchableOpacity
              style={[styles.button, { borderColor: borderColor, backgroundColor:'white',borderWidth:borderWidth}]}
              onPress={onPress}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                  {title}
                </Text>
                <View style={[{borderColor: getColorForType(type), borderWidth:2, borderRadius:3}]}>
                  <Text style={[
                    { backgroundColor: getColorForType(type), borderColor: getColorForType(type),},
                    styles.typeIndicator,
                    {opacity: 0.4}
                  ]}>
                    {type}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText2}>
                  Collection State:{"\n"} 
                  <Text style={styles.buttonText3}>
                    {collectionType}
                    </Text>
                </Text>
                <Text style={styles.buttonText2}>
                  Next Collection:{"\n"} 
                  <Text style={styles.buttonText4}>
                    {date}
                    </Text>
                </Text>
              </View>  
            </TouchableOpacity>
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


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
                </View>
                <View style={styles.buttonContent}>
                    <Text style={[styles.title2, styles.boldText]}>Company_name</Text>
                
          
                
                </View>

                <Separator/>

                {trashData.map((item, index) => {
                  // Extracting date from collectionDate and formatting it
                  const collectionDate = new Date(item.collectionDate);
                  const formattedDate = `${collectionDate.getDate()}/${collectionDate.getMonth() + 1}/${collectionDate.getFullYear()};`

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
            </SafeAreaView>
        </ScrollView>    
    )
}

export default DriverCollectionSchedule;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 25,
    },
    button: {
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 40,
      borderColor: 'black',
      borderWidth: 1.6,
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    progressBar: {
      height: 7,
      borderRadius: 5,
    },
    typeIndicator: {
      padding: 5,
      fontWeight: 'bold'
    },
    barBorder: {
      borderWidth: 1.5,
      borderRadius: 5,
      marginHorizontal: 8,
      marginBottom: 10,
      marginTop: 5,
      height: 10,
      position: 'relative',
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'left',
    },
    buttonText2: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'left',
    },
    buttonText3: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'left',
    },
    buttonText4: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'left',
    },
    title2: {
      fontSize: 20, // Adjust the font size as needed
      textAlign: 'left',
      marginBottom: 0,
    },
    boldText: {
      fontWeight: 'bold',
    },

  });