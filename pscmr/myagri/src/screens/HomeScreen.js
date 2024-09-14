import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

export default function HomeScreen({ navigation }) {
  const [isWaterPumpOn, setIsWaterPumpOn] = useState(false);
  const [waterPump, setWaterPump] = useState(false);

  useEffect(() => {
    const fetchPumpStatus = async () => {
      try {
        const response = await axios.get("http://192.168.56.100/pump/status");
        console.log(response);
        setIsWaterPumpOn(response.data.status === "on");
      } catch (error) {
        console.error("Error fetching pump status:", error);
      }
    };

    fetchPumpStatus();
  }, []);

  const toggleWaterPump = async (value) => {
    try {
      const endpoint = value
        ? "http://192.168.56.100/pump/on"
        : "http://192.168.56.100/pump/off";
      await axios.get(endpoint);
      setWaterPump(value);
    } catch (error) {
      console.error("Error toggling pump:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello User !!</Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={180}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.smallButtonContainer}>
          <Text style={styles.buttonText}>Water Pump</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isWaterPumpOn ? "Active" : "Inactive"}
            </Text>
            <Switch
              value={waterPump}
              onValueChange={(value) => toggleWaterPump(value)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("FarmingTechniques")}
        >
          <Text style={styles.buttonText}>New Farming Techniques</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("DiseasePrediction")}
        >
          <Text style={styles.buttonText}>Disease Prediction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("WeatherForecast")}
        >
          <Text style={styles.buttonText}>Weather forecast</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.smallButton}
        onPress={() => navigation.navigate("CropPrice")}
      >
        <Text style={styles.buttonText}>Crop Price prediction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
  },
  bigButton: {
    width: "100%",
    paddingVertical: 80,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  smallButtonContainer: {
    flex: 1,
    padding: 20,
    margin: 5,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    marginRight: 10,
  },
  smallButton: {
    flex: 1,
    padding: 40,
    margin: 5,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#fff", // Optional: To make the background of the chart container white
    padding: 10,
  },
  chart: {
    borderRadius: 16,
  },
});
