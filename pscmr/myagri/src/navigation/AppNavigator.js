import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import MarketPricesScreen from '../screens/MarketPricesScreen';
import FarmingTechniquesScreen from '../screens/FarmingTechniquesScreen';
import DiseasePredictionScreen from '../screens/DiseasePredictionScreen';
import WeatherForecastScreen from '../screens/WeatherForecastScreen';
import CropPriceScreen from '../screens/CropPriceScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="CropPrice" component={CropPriceScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MarketPrices" component={MarketPricesScreen} />
      <Stack.Screen name="FarmingTechniques" component={FarmingTechniquesScreen} />
      <Stack.Screen name="DiseasePrediction" component={DiseasePredictionScreen} />
      <Stack.Screen name="WeatherForecast" component={WeatherForecastScreen} />
    </Stack.Navigator>
  );
}
