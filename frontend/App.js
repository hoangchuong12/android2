import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './src/Body/feed/Feed';
import NotificationsScreen from './src/Body/notifications/Notifications';
import Profile from './src/Body/profile/Profile';
import Login from './src/Body/profile/Login';
// // App.js
import ProfileStackScreen from './src/Body/profile/ProfileStackScreen';


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const NotificationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

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
          component={NotificationsStack}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
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
