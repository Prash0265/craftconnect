// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import SplashScreen from './screens/SplashScreen';  // Import SplashScreen component
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BottomTabNavigator from './screens/BottomTabNavigator';
 
const Stack = createStackNavigator();
 
export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
 
  useEffect(() => {
    // Simulate a delay for the splash screen
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);  // Adjust the duration as needed
 
    return () => clearTimeout(splashTimer);
  }, []);
 
  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Splash">
        {/* Add the SplashScreen screen */}
        {isSplashVisible ? (
<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        ) : (
<>
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Signup" component={SignupScreen} />
<Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
</>
        )}
</Stack.Navigator>
</NavigationContainer>
  );
}

