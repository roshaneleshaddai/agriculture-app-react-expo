import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export default function UserProfileScreen() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [crops, setCrops] = useState('');
  const [location, setLocation] = useState('');
  const [state,setState]=useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [predictedYield, setPredictedYield] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username, phone, crops, location,state, profileImage } = JSON.parse(userData);
          setUsername(username || '');
          setPhone(phone || '');
          setCrops(crops || '');
          setLocation(location || '');
          setState(state||'');
          setProfileImage(profileImage || null);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your media library.');
      return;
    }
  
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      } else {
        Alert.alert('Image Selection Canceled', 'No image was selected.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const saveProfile = async () => {
    try {
      const userData = {
        username,
        phone,
        crops,
        location,
        state,
        profileImage,
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));

      await axios.post(`${API_BASE_URL}/users/profile`, userData);

      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const fetchPrediction = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/crop-yield-predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'Area': '1.0', 
          'Production': '500', 
          'Annual_Rainfall': '300', 
          'Input_Per_Unit_Area': '0.5', 
          'Season':'Kharif', 
          'Year_Interval': '2010s', 
          'Crop':` ${crops}`, 
          'State': `${state}`,
        }),
      });

      const textResponse = await response.text();
      console.log('Raw Response:', textResponse); // Log raw response
      const data = JSON.parse(textResponse);
      console.log('Parsed Response:', data);
      setPredictedYield(data.prediction);
      Alert.alert('Prediction Success', `Predicted Yield: ${data.prediction}`);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      Alert.alert('Error', 'Failed to fetch prediction');
    }
};


  const toggleEditing = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const renderInputField = (label, value, setValue) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
        />
      ) : (
        <Text style={styles.fields}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/avatar.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />) : (
        <Text style={styles.header}>{username}</Text>
      )}

      {renderInputField('Phone no', phone, setPhone)}
      {renderInputField('Location', location, setLocation)}
      {renderInputField('Current Crops', crops, setCrops)}
      {renderInputField('State', state, setState)}

      <Text style={styles.label}>Predicted Yield</Text>
      <Text style={styles.fields}>{predictedYield || 'No prediction yet'}</Text>

      <TouchableOpacity style={styles.button} onPress={toggleEditing}>
        <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={fetchPrediction}>
        <Text style={styles.buttonText}>Get Prediction</Text>
      </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  fields: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#20232a',
    borderRadius: 3,
    margin: 5,
  },
});
