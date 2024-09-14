import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const api_key = '14822f771eac4ac5811153930241808';  // Replace with your actual API key

export default function WeatherForecastScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data for Vijayawada on component mount
    fetchWeatherData(16.5062, 80.6480);  // Vijayawada's latitude and longitude
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=3`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderGraph = () => {
    if (!weatherData) return null;

    const labels = weatherData.forecast.forecastday.map((day) => day.date);
    const temps = weatherData.forecast.forecastday.map((day) => day.day.avgtemp_c);

    return (
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: temps,
            },
          ],
        }}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#0000ff',
          backgroundGradientFrom: '#0000ff',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };

  const renderWeatherDetails = () => {
    if (!weatherData) return null;

    return weatherData.forecast.forecastday.map((day, index) => (
      <View key={index} style={styles.weatherDetailContainer}>
        <Text style={styles.boldText}>{day.date}</Text>
        <Text style={styles.boldText}>{day.day.condition.text}</Text>
        <Text style={styles.boldText}>Avg Temp: {day.day.avgtemp_c}°C</Text>
        <Text style={styles.boldText}>Max Temp: {day.day.maxtemp_c}°C</Text>
        <Text style={styles.boldText}>Min Temp: {day.day.mintemp_c}°C</Text>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Weather Forecast</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {renderGraph()}
          {renderWeatherDetails()}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  weatherDetailContainer: {
    marginTop: 10,
  },
  weatherDetailText: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
