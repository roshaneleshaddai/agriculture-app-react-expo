import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function DiseasePredictionScreen() {
  const [disease, setDisease] = useState("");
  const [pesticides, setPesticides] = useState("");
  const [image, setImage] = useState(require("../../assets/disease.jpg"));
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Pick from Gallery", onPress: openImageLibrary },
        { text: "Take a Photo", onPress: openCamera },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage({ uri: imageUri });
      sendImageToServer(imageUri);
    } else {
      Alert.alert("No image selected", "Please select an image.");
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage({ uri: imageUri });
      sendImageToServer(imageUri);
    } else {
      Alert.alert("No image captured", "Please take a photo.");
    }
  };

  const sendImageToServer = async (imageUri) => {
    setLoading(true);
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios({
        method: "POST",
        url: "https://outline.roboflow.com/crop-disease-identification/9",
        params: {
          api_key: "API_KEY", // Replace with your API key
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { data } = response;
      console.log(data);
      setDisease(data.predicted_disease || "Unknown Disease");
      setPesticides(data.recommended_pesticides || "No recommendations available");
    } catch (error) {
      console.error("Error predicting disease:", error);
      Alert.alert("Error", "An error occurred while predicting the disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Disease Prediction</Text>

      <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
        <Ionicons name="camera-outline" size={30} color="black" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image source={image} style={styles.diseaseImage} />
      )}

      <View style={styles.diseaseContainer}>
        <Text style={styles.diseaseText}>Disease: {disease}</Text>
        <Text style={styles.pesticideText}>
          Pesticide to be used: {pesticides}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000080",
  },
  cameraIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  diseaseImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  diseaseContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  diseaseText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000080",
  },
  pesticideText: {
    fontSize: 18,
    color: "#000080",
  },
});
