import React, { useState } from 'react';

import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function Body() {
  const [postData, setPostData] = useState(null);

  const getDataUsingSimpleGetCall = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(function (response) {
        setPostData(response.data); 
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Example of Axios Networking in React Native
      </Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={getDataUsingSimpleGetCall}>
        <Text>Simple Get Call</Text>
      </TouchableOpacity>
      {postData && (
        <FlatList
          data={postData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, borderColor: '#00b9ff',borderRadius: 20, padding:10  }}>
              <Text>Post ID: {item.id}</Text>
              <Text>Title: {item.title}</Text>
              <Text>price: {item.price}</Text>
              <Text>description: {item.description}</Text>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
},
});

