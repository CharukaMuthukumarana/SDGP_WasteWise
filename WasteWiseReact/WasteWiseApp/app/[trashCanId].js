import React from 'react';
import { Text, View } from 'react-native';

const TrashCanDetails = ({ trashCanId }) => {
  return (
    <View>
      <Text>Trash Can Details for ID: {trashCanId}</Text>
    </View>
  );
};

export default TrashCanDetails;