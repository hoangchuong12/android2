import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



import Feed from './src/Body/Feed';
import Notifications from './src/Body/Notifications';
import Profile from './src/Body/Profile';
const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
  
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
     
      </Tab.Navigator>
    </NavigationContainer>
  );
}
