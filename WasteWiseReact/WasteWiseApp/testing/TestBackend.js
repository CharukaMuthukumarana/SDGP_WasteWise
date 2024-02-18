import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const IP_ADDRESS = '192.168.230.180'; // Replace this with your actual IP address

const TestBackend = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:8000/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Users:</Text>
      {error ? (
        <Text>Error: {error}</Text>
      ) : (
        users.map(user => (
          <Text key={user._id}>{user.r_name}</Text>
        ))
      )}
    </View>
  );
};

export default TestBackend;
