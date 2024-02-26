import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import appropriate icons
import CalendarPicker from 'react-native-calendar-picker'; // Import Calendar Picker component

const TrashCanDetailsScreen = ({ route }) => {
  const { trashCan } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.companyName}>{trashCan.companyName}</Text>
      <Text style={styles.trashCanName}>{trashCan.name}</Text>
      <View style={styles.progressBar}>
        <View
          style={{
            backgroundColor: '#6BCDFD',
            width: `${trashCan.collectedPercentage}%`,
            height: '100%',
            borderRadius: 5,
          }}
        />
      </View>
      <Text style={styles.percentageText}>{trashCan.collectedPercentage}% filled</Text>

      <View style={styles.variableList}>
        <Text style={styles.variableItem}>Location: <Text style={{ color: 'blue' }}>{trashCan.location}</Text></Text>
        <Text style={styles.variableItem}>Waste Type: <Text style={{ color: 'green' }}>{trashCan.wasteType}</Text></Text>
        <Text style={styles.variableItem}>Last Collected Date: {trashCan.lastCollectedDate.toLocaleDateString()}</Text>
        <Text style={styles.variableItem}>Fixed Date: {trashCan.fixedDate.toLocaleDateString()}</Text>
        <Text style={styles.variableItem}>Predicted Collecting Date: {trashCan.predictedCollectingDate.toLocaleDateString()}</Text>
        <Text style={styles.variableItem}>Assigned Collecting Date: {trashCan.assignedCollectingDate.toLocaleDateString()}</Text>
      </View>

      <TouchableOpacity style={styles.changeDateButton} onPress={() => setShowCalendar(true)}>
        <Text style={styles.changeDateButtonText}>Change Date</Text>
      </TouchableOpacity>

      {/* Modal for displaying the calendar */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedStartDate={selectedDate}
          />
          <Button title="Close" onPress={() => setShowCalendar(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trashCanName: {
    fontSize: 18,
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  variableList: {
    marginBottom: 20,
  },
  variableItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  changeDateButton: {
    backgroundColor: '#6BCDFD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  changeDateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TrashCanDetailsScreen;
