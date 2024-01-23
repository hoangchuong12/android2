// ProfileStackScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import Login from './Login';

const Stack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default ProfileStackScreen;
