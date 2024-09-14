const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // This handles parsing JSON request bodies
app.use(cors()); // Enable CORS

// MongoDB connection
const mongoURI = 'mongodb+srv://sreeja123:sreeja123@cluster0.txke7.mongodb.net/myagri?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Importing the users route
const usersRoute = require('./routes/users');
const cropYieldPredictRoute = require('./routes/yeild');
// Using the users route
app.use('/api/users', usersRoute);
app.use('/api', cropYieldPredictRoute);
// Define the port to run the server on
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
