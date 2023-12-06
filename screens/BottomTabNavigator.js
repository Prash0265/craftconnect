import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AfterLogin from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/AfterLogin.js';
import ProfileScreen from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/ProfileScreen.js';
import FavoritesScreen from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/AfterLogin.js';
import DealsScreen from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/AfterLogin.js';
import CartScreen from '/Users/prashanthnanadaram/Desktop/capstone_project-main/project/frontend/craftconnect/screens/AfterLogin.js';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'AfterLogin') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Deals') {
            iconName = focused ? 'ios-flash' : 'ios-flash-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'ios-cart' : 'ios-cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="AfterLogin" component={AfterLogin} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Deals" component={DealsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
