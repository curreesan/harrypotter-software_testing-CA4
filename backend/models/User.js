// models/User.js
const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that the username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that the email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema); // Create and export the User model
module.exports = User;
