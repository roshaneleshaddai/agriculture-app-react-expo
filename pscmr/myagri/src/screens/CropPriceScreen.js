import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../config/config';
const CropPriceScreen = () => {
  // State variables for user inputs
  const [commodityName, setCommodityName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Function to handle the prediction request
  const fetchPrediction = async () => {
    try {
      const response = await fetch(`http://${API_BASE_URL}/predicts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commodity_name: commodityName,
          state: state,
          district: district,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
      Alert.alert('Prediction Success', `Predicted Modal Price: ${data.predicted_price}`);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      Alert.alert('Error', 'Failed to fetch prediction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Commodity Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Crop name"
        value={commodityName}
        onChangeText={setCommodityName}
      />

      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter state"
        value={state}
        onChangeText={setState}
      />

      <Text style={styles.label}>District:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter district"
        value={district}
        onChangeText={setDistrict}
      />

      <Button title="Predict Price" onPress={fetchPrediction} />

      {predictedPrice !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Predicted Modal Price: ₹{predictedPrice.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CropPriceScreen;
