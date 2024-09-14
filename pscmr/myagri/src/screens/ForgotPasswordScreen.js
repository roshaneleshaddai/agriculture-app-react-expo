import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [phone,setPhone]=useState('');
  const handle = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const Data = {
      username,
      password,
    };

    try {
      const response = await loginUser(Data);
      
      if (response && response.data && response.data.success) {
        Alert.alert('Success', 'User Found');
        navigation.navigate('SetPassword'); // Navigate to the main screen after successful login
      } else {
        Alert.alert('Error', response.data.message || 'user not found');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during processing');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Submit" onPress={() => navigation.navigate('SetPassword')} />
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
});
