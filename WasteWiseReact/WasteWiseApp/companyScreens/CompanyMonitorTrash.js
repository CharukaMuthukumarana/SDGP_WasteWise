// Company - Monitor Trash Cans

import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

const CompanyMonitorTrash = ({ navigation }) => {

  const CustomButton = ({ title, title2, onPress, color1, date, type, percentage }) => {
    const barColor = percentage > 80 ? 'red' : getColorForType(type);

    return (
      <TouchableOpacity
        style={[styles.button,{ borderColor: barColor},]}
        onPress={onPress}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            {title}
            <Text style={styles.buttonText2}>{"\n"}{title2}{date}</Text>
          </Text>
          
          <Text style={[
                {backgroundColor: getColorForType(type)},
                {borderColor: getColorForType(type)},
                {borderWidth: 3},
                {padding: 2},
                {justifyContent: 'center'},
            ]}>
                {type}
            </Text>
            
        </View>
        <View style={[{marginLeft:10}]}>
          <Text style={styles.buttonText2}>
            {percentage}{"%"}
          </Text>
        </View>
        <View style={styles.barBorder}>
        
        <View style={[
            { backgroundColor: getColorForType(type) },
            styles.progressBar,
            { width: `${percentage}%` },
          ]}></View> 
        </View>
        
        
        
      </TouchableOpacity>
    );
  };

    
    const getColorForType = (type) => {
        // Define colors for different types
        const typeColors = {
          Type1: '#E87200',
          Type2: '#34A853',
          Type3: '#4285F4',
          // Add more types and corresponding colors as needed
        };
      
        // Return the color based on the type, default to a fallback color if not found
        return typeColors[type] || 'grey';
      };

      const data = [
        { title: 'TrashCanID1', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'Type1', percentage: 90 },
        { title: 'TrashCanID2', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'Type2', percentage: 60 },
        { title: 'TrashCanID3', title2: 'Collection Date: ' + '', date: 'DD/MM/YYYY', type: 'Type3', percentage: 45 },
        // Add more data objects as needed
      ];

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.center}>
            <Text style={[styles.title2, styles.boldText]}>Company_Name</Text>
        </View>

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
    fontSize: 17,
  },
  button: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 40,
    borderColor:'black',
    borderWidth: 1.6,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  progressBar: {
    height: 10,
    width: '60%', // You can adjust the width based on the percentage
    borderRadius: 5,
  },
  typeIndicator: {
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 5,
  },
  barBorder:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    marginHorizontal:8,
    marginBottom: 10,
    marginTop:5
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
    marginVertical: 30,

  },
  boldText: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CompanyMonitorTrash;

