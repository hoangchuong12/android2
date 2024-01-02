import React from 'react';
import { View, StyleSheet, TextInput,Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" color="black" size={20} />
        <TextInput
          placeholder="Search..."
          style={styles.input}
        />
      </View>
      <MaterialCommunityIcons name="cart-plus" color={'#fff'} size={24} />
      <MaterialCommunityIcons  name="chat-processing-outline" color={'#fff'} size={24} />
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
