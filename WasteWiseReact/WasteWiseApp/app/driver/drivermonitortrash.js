import React, { useState } from 'react';
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

const DriverMonitorTrash = () => {

    const [selectedType, setSelectedType] = useState('All'); // Initial selected type
    const [data, setData] = useState([
      { id: 1, title: 'TrashCanID_1', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PAPER', percentage: 81, previousCollection: 'Previous date', predictedCollection: 'Predicted date', isChecked: false },
      { id: 2, title: 'TrashCanID_2', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PLASTIC', percentage: 60, previousCollection: 'Previous date', predictedCollection: 'Predicted date', isChecked: false },
      { id: 3, title: 'TrashCanID_3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 45, previousCollection: 'Previous date', predictedCollection: 'Predicted date', isChecked: false },
      // Add more data objects as needed
    ]);

    const Separator = () => <View style={styles.separator} />;
    
    const CustomButton = ({ id, title, title2, onPress, date, type, percentage, isChecked, toggleCheckbox }) => {
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => toggleCheckbox(id)}>
                    {isChecked ? (
                      <View style={styles.checkboxChecked} />
                    ) : (
                      <View style={styles.checkboxUnchecked} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.buttonText}>
                    {title}
                    <Text style={styles.buttonText2}>{"\n"}{title2}{date}</Text>
                  </Text>
                </View>
    
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

    const toggleCheckbox = (id) => {
      const updatedData = data.map(item => {
        if (item.id === id) {
          return {...item, isChecked: !item.isChecked};
        }
        return item;
      });
      setData(updatedData);
    };

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

                {data.map((item, index) => (
                    <CustomButton
                    key={index}
                    id={item.id}
                    title={item.title}
                    title2={item.title2}
                    date={item.date}
                    onPress={() => router.push("logins/driverlogin2")}
                    type={item.type}
                    percentage={item.percentage}
                    isChecked={item.isChecked}
                    toggleCheckbox={toggleCheckbox}
                    />
                ))}
        </SafeAreaView>
    </ScrollView>    
    )

}

export default DriverMonitorTrash;


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
    checkboxUnchecked: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#000',
      marginRight: 10,
    },
    checkboxChecked: {
      width: 20,
      height: 20,
      borderRadius: 5,
      backgroundColor: '#000',
      marginRight: 10,
    },
});

