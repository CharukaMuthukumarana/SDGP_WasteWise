// Company Monitor Trash Cans


import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SimpleLineIcons } from '@expo/vector-icons';


const CompanyMonitorTrash = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('All'); // Initial selected type
  const Separator = () => <View style={styles.separator} />;

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
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CompanyLogin')}>
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
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CompanyLogin')}>
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

  const data = [
    { title: 'TrashCanID1', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PAPER', percentage: 81 },
    { title: 'TrashCanID2', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'PLASTIC', percentage: 60 },
    { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'GLASS/METAL', percentage: 45 },
    // Add more data objects as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
      </View>
      <View style={styles.buttonContent}>
        <Text style={[styles.title2, styles.boldText]}>Company_name</Text>
        <RNPickerSelect
          style={{
            inputAndroid: {
              height: 50,
              width: 120,
              fontSize: 20,
              fontWeight: '500',
              backgroundColor: 'white',
              color: '#344953',
              paddingLeft: 20,// Add paddingLeft to make the labels visible
            },
          }}
          onValueChange={(value) => setSelectedType(value)}
          items={[
            { label: "All", value: 'All' },
            { label: 'Paper', value: 'PAPER' },
            { label: 'Plastic', value: 'PLASTIC' },
            { label: 'Glass/Metal', value: 'GLASS/METAL' },
          ]}
          value={selectedType}
        />
      </View>

      <Separator/>

      {data.map((item, index) => (
        <CustomButton
          key={index}
          title={item.title}
          title2={item.title2}
          date={item.date}
          onPress={() => navigation.navigate('CompanyLogin')}
          type={item.type}
          percentage={item.percentage}
        />
      ))}
    </SafeAreaView>
  );
};

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
});

export default CompanyMonitorTrash;