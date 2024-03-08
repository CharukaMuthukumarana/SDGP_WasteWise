import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const recyclingTrashCanDetails = () => {

  const {trashCanId}= useLocalSearchParams();
  return (
    <View>
      <Text>Trash Can Details for ID: {trashCanId}</Text>
      {/* Add your trash can details components here */}
    </View>
  );
};

export default recyclingTrashCanDetails;