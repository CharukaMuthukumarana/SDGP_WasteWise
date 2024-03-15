import React from 'react';
import { Text, View } from 'react-native';

const TrashCanDetails = ({ trashCanId }) => {
  return (
    <View>
      <Text>Trash Can Details for ID: {trashCanId}</Text>
      {/* Add your trash can details components here */}
    </View>
  );
};

export default TrashCanDetails;