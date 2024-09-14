import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../services/api'; // Import your login API function

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await loginUser(loginData); // Assuming loginUser is an API call function
      if (response && response.data && response.data.success) {
        Alert.alert('Success', 'Login successful');
        
        try {
          // Store user details in AsyncStorage
          await AsyncStorage.setItem('user', JSON.stringify(response.data.userDetails));
          // Navigate to the main screen after successful login
          navigation.navigate('Main');
        } catch (storageError) {
          console.error('AsyncStorage error:', storageError);
          Alert.alert('Error', 'Failed to store user data');
        }
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        New User? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
});
