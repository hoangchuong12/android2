
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import Login from './Login';
import Logup from './Logup';

const Stack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Logup" component={Logup} />
    </Stack.Navigator>
  );
};

export default ProfileStackScreen;
