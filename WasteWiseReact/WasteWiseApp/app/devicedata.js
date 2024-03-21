import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

const devicedata = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [trashCanIdInput, setTrashCanIdInput] = useState('')

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2421336/feeds.json?api_key=YMEB70W7TK016LEX')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }

  const updateCollectionState = () => {
    if (!trashCanIdInput) {
      setError('Please enter a trash can ID');
      return;
    }

    const updatedData = data.map(item => {
      if (item.trashCanId === trashCanIdInput) {
        return {
          ...item,
          collectionState: 'Collected'
        };
      }
      return item;
    });

    fetch('https://api.thingspeak.com/channels/2421336/feeds.json?api_key=YMEB70W7TK016LEX', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data updated successfully:', data);
      fetchData();
      setTrashCanIdInput('');
      setError(null);
    })
    .catch(error => {
      console.error('Error updating data:', error);
      setError(error.message);
    });
  }

  return (
    <View>
      <Text>{data ? JSON.stringify(data) : 'Loading...'}</Text>
      {error && <Text>Error: {error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter Trash Can ID"
        value={trashCanIdInput}
        onChangeText={text => setTrashCanIdInput(text)}
      />
      <Button title="Update Collection State" onPress={updateCollectionState} />
    </View>
  )
}

export default devicedata

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
})




// import { StyleSheet, Text, View } from 'react-native'
// import React , {useState, useEffect}from 'react'

// const devicedata = () => {
//   const [data, setData] = useState(null)

//   useEffect(() => {
//     fetch('https://waste-wise-api-sdgp.koyeb.app/api/devices')
//       .then(response => response.json())
//       .then(data => setData(data)) // Update the state with fetched data
//       .catch(error => console.error(error));
//   }, [])

//   return (
//     <View>
//       <Text>{data ? JSON.stringify(data) : 'Loading...'}</Text>
//     </View>
//   )
// }

// export default devicedata

// const styles = StyleSheet.create({})
