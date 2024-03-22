import React from 'react';
import { Text, View} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const TrashCanDetails = () => {
  const { username } = useLocalSearchParams();
  return (
    <View>
      <Text>Trash Can Details for ID: {username}</Text>
    </View>
  );
};

export default TrashCanDetails;