const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route for crop yield prediction
router.post('/crop-yield-predict', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', req.body);
        console.log('Crop Yield Server Response:', response.data); // Log the response data
        res.json(response.data);
    } catch (error) {
        console.error('Crop Yield Server Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route for modal price prediction
router.post('/modal-price-predict', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predicts-nefjsfw', req.body);
        console.log('Modal Price Server Response:', response.data); // Log the response data
        res.json(response.data);
    } catch (error) {
        console.error('Modal Price Server Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
