// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AfterLogin from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/AfterLogin.js'; // Import your HomeScreen component
import ProfileScreen from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/ProfileScreen.js'; // Import your ProfileScreen component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AfterLogin" component={AfterLogin} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Favorites" component={AfterLogin} />
      <Tab.Screen name="Deals" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
