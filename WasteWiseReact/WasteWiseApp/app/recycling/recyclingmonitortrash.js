import React, { useState, useEffect } from 'react';
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

const recyclingmonitortrash = () => {

    const [selectedType, setSelectedType] = useState('All'); // Initial selected type
    const Separator = () => <View style={styles.separator} />;
    const [trashData, setTrashData] = useState([]);
    const [trashData1, setTrashData1] = useState([]);


    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch('https://waste-wise-api-sdgp.koyeb.app/api/devices');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTrashData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    useEffect(() => {
      fetchData1();
    }, []);

    const fetchData1 = async () => {
      try {
        const response = await fetch('https://api.thingspeak.com/channels/2421336/feeds.json?api_key=YMEB70W7TK016LEX');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTrashData1(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    const CustomButton = ({ title, title2, onPress, color1, date, type, percentage }) => {
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
                  <Text style={styles.buttonText2}>{"\n"}{title2}{date}</Text>
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
              <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                <Text style={styles.buttonText2}>
                  {percentage}{"%"}
                </Text>
                <View>
                  {percentage > 80 && (
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push("company/companymonitortrash")}>
                    <View style={styles.icon}>
                      <SimpleLineIcons name="exclamation" size={15} color="red" />
                    </View>
                  </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={[styles.barBorder,{borderColor: barColor, backgroundColor: opacityColor}]}>
                <View style={[
                  { backgroundColor: barColor },
                  styles.progressBar,
                  { width: `${percentage}%` },
                ]}></View>
              </View>
              <View>
                {percentage > 80 && (
                  <TouchableOpacity style={styles.backButton} onPress={() => router.push("/company/companycollectionschedule")}>
                  <Text style={styles.ButtonText}>Request to Collect !</Text>
                </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )
        );
    };
    const CustomButton1 = ({ title, title2, onPress, color1, date, type, percentage }) => {
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
                <Text style={styles.buttonText2}>{"\n"}{title2}{date}</Text>
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
            <View style={{ marginLeft: 10, flexDirection: 'row'}}>
              <Text style={styles.buttonText2}>
                {percentage}{"%"}
              </Text>
              <View>
                {percentage > 80 && (
                  <TouchableOpacity style={styles.backButton} onPress={() => router.push("company/companymonitortrash")}>
                  <View style={styles.icon}>
                    <SimpleLineIcons name="exclamation" size={15} color="red" />
                  </View>
                </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={[styles.barBorder,{borderColor: barColor, backgroundColor: opacityColor}]}>
              <View style={[
                { backgroundColor: barColor },
                styles.progressBar,
                { width: `${percentage}%` },
              ]}></View>
            </View>
            <View>
              {percentage > 80 && (
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/company/companycollectionschedule")}>
                <Text style={styles.ButtonText}>Request to Collect !</Text>
              </TouchableOpacity>
              )}
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
    
    // const data = [
    //     { title: 'TrashCanID1', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PAPER', percentage: 81 },
    //     { title: 'TrashCanID2', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PLASTIC', percentage: 60 },
    //     { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 45 },
    //     { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 50 },
    //     { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 45 },
    //     { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 90 },
    //     { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 89 },
    //     // Add more data objects as needed
    // ];

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
                </View>
                <View style={styles.buttonContent}>
                    <Text style={[styles.title2, styles.boldText]}>Company_name</Text>
                
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                        <Picker.Item label="All" value="All" />
                        <Picker.Item label="PAPER" value="PAPER" />
                        <Picker.Item label="PLASTIC" value="PLASTIC" />
                        <Picker.Item label="GLASS/METAL" value="GLASS/METAL" />
                        {/* Add more countries as needed */}
                    </Picker>
                
                </View>

                <Separator/>

                <CustomButton1
                      
                      title="Channel 2421336"
                      title2={`Collection Date: "2024-03-04"`}
                      onPress={() =>
                        router.push({
                          pathname: '../recycling/recyclingtrashdetails', // Updated dynamic route pattern
                          params: { trashCanId: trashData1.channel.name }
                        })
                      }
                      type="PLASTIC"
                      percentage={trashData1.feeds && trashData1.feeds.length > 1 ? 
                        ((trashData1.feeds[0].field1 - trashData1.feeds[trashData1.feeds.length - 1].field1) / trashData1.feeds[0].field1) * 100 : 
                        0}
                        /> 
           
                 <Separator/>
                {trashData.map((item, index) => {
                  // Extracting date from collectionDate and formatting it
                  const collectionDate = new Date(item.collectionDate);
                  const formattedDate = `${collectionDate.getDate()}/${collectionDate.getMonth() + 1}/${collectionDate.getFullYear()}`;

                  return (
                    <CustomButton
                      key={index}
                      title={item.trashCanId}
                      title2={`Collection Date: ${formattedDate}`}
                      onPress={() =>
                        router.push({
                          pathname: '../recycling/recyclingtrashdetails', // Updated dynamic route pattern
                          params: { trashCanId: item.trashCanId }
                        })
                      }
                      type={item.wasteType}
                      percentage={item.sensorData && item.sensorData.length > 1 ? 
                        ((item.sensorData[0].binlevel - item.sensorData[item.sensorData.length - 1].binlevel) / item.sensorData[0].binlevel) * 100 : 
                        0}
                        />
                        
                  );
                  
                })}
                
        </SafeAreaView>
    </ScrollView>    
    )
}

export default recyclingmonitortrash

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
      color: 'grey',
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
    ButtonText: {
      color: 'red',
      textAlign: 'center',
      textDecorationLine: 'underline',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    icon:{
      marginLeft: 10,
      marginTop:2
    },
    separator: {
      marginTop: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    picker: {
        height: 30,
        width: 160,
        fontSize: 12,
        fontWeight: '500',
        backgroundColor: 'white',
        color: '#344953',
        paddingLeft: 20,
    },
  });