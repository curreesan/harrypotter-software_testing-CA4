// routes/userRoutes.js
const express = require("express");
const User = require("../models/User"); // Import the User model
const router = express.Router();

// Route for user registration (No hashing)
router.post("/api/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create a new user (no password hashing)
    const newUser = new User({
      username,
      email,
      password, // Store password directly without hashing
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Route for user login (No hashing)
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the one stored in the database
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success - user logged in
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
