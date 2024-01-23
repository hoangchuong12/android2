import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const handleInputChange = debounce(async (text) => {
    setSearchText(text);

    try {
      const response = await axios.get(`https://fakestoreapi.com/products?title=${text}`);

      // Filter product names based on whether the title contains the current search text
      const productNames = response.data
        .filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
        .map(product => ({
          id: product.id,
          title: product.title
        }));

      setSuggestions(productNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 300);
  ;

  useEffect(() => {
    // Clear suggestions when searchText is empty
    if (!searchText.trim()) {
      setSuggestions([]);
    }
  }, [searchText]);

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        setSearchText(item.title);
        // Navigate to the product detail screen with the selected product ID
        navigation.navigate('ProductDetail', { productId: item.id });
      }}
    >
      <Text style={styles.suggestionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" color="black" size={20} />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={handleInputChange}
          value={searchText}
        />

      </View>

      {/* Display search suggestions */}
      {suggestions.length > 0 && searchText.trim() !== '' && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSuggestionItem}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
    paddingVertical: 4,
  },
  suggestionsContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    fontSize: 16,
  },

});
