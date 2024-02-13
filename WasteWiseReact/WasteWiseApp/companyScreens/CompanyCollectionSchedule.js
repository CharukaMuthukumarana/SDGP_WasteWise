// Recycling Monitor Trash Cans


import React, { useState } from 'react';
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

  const CustomButton = ({ title, date, type,}) => {

    // Check if the selected type is 'All' or matches the current type
    const isVisible = selectedType === 'All' || selectedType === type;

    return (
      isVisible && (
        <ScrollView>
          <View style={[{flexDirection: 'row', justifyContent:'space-between',}]}>
            <View>
                  <Text>
                      {date}
                  </Text>
              </View>
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
          </View> 
        </ScrollView>
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
    { title: 'TrashCanID1', date: 'DD/MM/YYYY', type: 'PAPER' },
    { title: 'TrashCanID2', date: 'DD/MM/YYYY', type: 'PLASTIC'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    { title: 'TrashCanID3', date: 'DD/MM/YYYY', type: 'GLASS/METAL'},
    // Add more data objects as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={[styles.title, styles.boldText]}>Waste Wise</Text>
      </View>

      <Separator/>

      {data.map((item, index) => (
        <CustomButton
          key={index}
          title={item.title}
          date={item.date}
          type={item.type}
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
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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