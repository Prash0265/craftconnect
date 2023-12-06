//SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://10.0.0.221:3000/signup', { username, password });
      Alert.alert('Signup Successful', 'You have successfully signed up!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Signup</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Text
          style={styles.button1}
          onPress={handleSignup}
        >
          Signup
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff', // Background color for the form container
    borderRadius: 10, // Border radius for the form container
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: '#262E36',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#262E36', // Border color for the text input container
    borderRadius: 8, // Border radius for the text input container
  },
  button1: {
    backgroundColor: '#262E36',
    color: '#fff',
    padding: 10,
    borderRadius: 25,
    fontSize: 20,
    minWidth: 150,
    textAlign: 'center',
    margin: 10,
  },
  textInput: {
    height: 40,
    padding: 10,
    color: '#F0F0F0',
    fontSize: 16,
    width: '100%',
  },
  logo: {
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 50,
  },
});
