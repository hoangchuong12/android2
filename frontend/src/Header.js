import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Header() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?title=${searchText}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" color="black" size={20} />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <MaterialCommunityIcons name="cart-plus" color={'#fff'} size={24} />
      <MaterialCommunityIcons name="chat-processing-outline" color={'#fff'} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    marginTop: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 300,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
    paddingVertical: 4,
  },
});
