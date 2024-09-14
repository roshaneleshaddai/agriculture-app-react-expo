const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const upload = require('../middleware/upload');

// Check if the User model is already defined, otherwise define it
let User;
try {
  User = mongoose.model("User");
} catch (error) {
  if (error.name === "MissingSchemaError") {
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      phone: { type: String, required: true, unique: true },
      crops: { type: String, required: true },
      state: { type: String, required: true },
      location: { type: String, required: true },
      password: { type: String, required: true },
      profileImage: { type: String },
    });
    User = mongoose.model("User", userSchema);
  } else {
    throw error;
  }
}

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, phone, crops,state, location, password } = req.body;

  try {
    // Validate input
    if (!username || !phone || !crops || !state || !location || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including a valid password.",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ phone });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      username,
      phone,
      crops,
      state,
      location,
      password: hashedPassword,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Prepare the response object with required user details
    const userDetails = {
      username: user.username,
      phone: user.phone,
      crops: user.crops,
      state: user.state,
      location: user.location,
    };

    // Include profilePicture if it exists
    if (user.profileImage) {
      userDetails.profileImage = user.profileImage;
    }

    // Send the response with user details
    res.status(200).json({ success: true, message: 'Login successful', userDetails });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.post('/profile', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, phone, crops,state, location } = req.body;
    const profileImage = req.file ? req.file.path : null;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile
    user.phone = phone || user.phone;
    user.crops = crops || user.crops;
    user.state = state || user.state;
    user.location = location || user.location;
    if (profileImage) {
      user.profileImage = profileImage;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        username: user.username,
        phone: user.phone,
        crops: user.crops,
        state: user.state,
        location: user.location,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
