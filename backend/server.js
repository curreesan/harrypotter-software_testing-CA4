const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const toyRoutes = require("./routes/toyRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyToken = require("./middleware/verifyToken"); // Import the JWT verification middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use route prefixes
app.use(toyRoutes); // Add prefix for toy routes
app.use(userRoutes); // Add prefix for user routes

// Example of a protected route
app.post("/api/cart/add", verifyToken, (req, res) => {
  // You can now access req.userId for this user and proceed with cart logic
  res.status(200).json({ message: "Item added to cart" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
