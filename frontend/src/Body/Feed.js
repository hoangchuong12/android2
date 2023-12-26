import React from 'react';
import { View, Text, FlatList, Image,StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../Header';
import Body from './Feed/Body';

export default function Feed() {
return(
    <View style={styles.container}>
        <Header></Header>
        <Body></Body>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      flexDirection: 'column',
    },
  
  });