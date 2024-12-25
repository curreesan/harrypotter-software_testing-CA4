const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const toyRoutes = require("./routes/toyRoutes"); // Import the toyRoutes
const userRoutes = require("./routes/userRoutes"); // Import the userRoutes

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use the toyRoutes for toy-related routes
app.use(toyRoutes);

// Use the userRoutes for user-related routes
app.use(userRoutes); // Add this line to handle user routes

// Default route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
