Soil Moisture Monitoring App
A React Native mobile app that monitors soil moisture levels using an ESP8266 module. The ESP8266 collects data from a soil moisture sensor and sends it to a Node.js/Express backend. The app fetches this data and displays the current moisture level in real-time.

Features
View real-time soil moisture readings from the ESP8266.
Uses Wi-Fi to send sensor data to a backend API.
Fetch and display the sensor data in the app using Axios.
Easy to set up and configure with any soil moisture sensor.
Project Setup
Requirements
React Native (with Expo or React Native CLI)
Node.js for the backend server
ESP8266 for sending sensor data
Soil Moisture Sensor connected to the ESP8266
Installation
Clone the Repository:
git clone https://github.com/roshaneleshaddai/agriculture-app-react-expo.git
cd agriculture-app-react-expo
Install Dependencies: In the React Native app directory:
npm install
Start the React Native App: If using Expo:
expo start
If using React Native CLI:
npx react-native run-android # for Android
npx react-native run-ios # for iOS
Backend Server: Navigate to the backend folder (assuming you have a folder for your backend API):
cd myagri-backend
npm install
node server.js
ESP8266 Setup:

Connect the soil moisture sensor to the ESP8266.
Upload the provided Arduino code to the ESP8266 using the Arduino IDE.
Modify the Wi-Fi credentials and backend API URL in the ESP8266 code.
Usage
Once the app is running, it will fetch real-time soil moisture readings from the backend API.
The ESP8266 will continuously send sensor data to the backend.
API Endpoints
GET /soil-moisture: Fetch the current soil moisture readings from the backend API.
POST /soil-moisture: Endpoint where ESP8266 sends the soil moisture data.
