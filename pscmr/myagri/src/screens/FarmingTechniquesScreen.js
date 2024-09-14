import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function FarmingTechniquesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Farming Techniques</Text>

      <View style={styles.techniqueContainer}>
        <Image
          source={require("../../assets/image1.jpg")}
          style={styles.image}
        />
        <Text style={styles.techniqueText}>Crop Rotation</Text>
        <Text style={styles.description}>
          This technique involves alternating the types of crops grown in a
          particular area from season to season.
        </Text>
      </View>

      <View style={styles.techniqueContainer}>
        <Image
          source={require("../../assets/image2.jpg")}
          style={styles.image}
        />
        <Text style={styles.techniqueText}>Terrace Farming</Text>
        <Text style={styles.description}>
          Terrace farming involves creating steps or terraces on the slopes of
          hills to prevent soil erosion and manage water flow.
        </Text>
      </View>

      <View style={styles.techniqueContainer}>
        <Image
          source={require("../../assets/image3.jpg")}
          style={styles.image}
        />
        <Text style={styles.techniqueText}>Drip Irrigation</Text>
        <Text style={styles.description}>
          Drip irrigation is a method of watering plants directly at the root
          zone through a network of valves, pipes, tubing, and emitters.
        </Text>
      </View>

      <View style={styles.techniqueContainer}>
        <Image
          source={require("../../assets/image4.jpg")}
          style={styles.image}
        />
        <Text style={styles.techniqueText}>Agroforestry</Text>
        <Text style={styles.description}>
          Agroforestry integrates trees and shrubs into crop and livestock
          farming systems to create more diverse, productive, and sustainable
          land-use systems.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000080",
  },
  techniqueContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  techniqueText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
