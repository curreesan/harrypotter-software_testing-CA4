// routes/toyRoutes.js
const express = require("express");
const TotalToy = require("../models/TotalToy"); // Import the TotalToy model

const router = express.Router();

// Route to get all toy data for the homepage
router.get("/api/toys", async (req, res) => {
  try {
    const toys = await TotalToy.find(); // Fetch all toys from the database
    res.json(toys); // Send toy data to the frontend
  } catch (error) {
    console.error("Error fetching toy data:", error);
    res.status(500).json({ message: "Error fetching toy data" });
  }
});

// Route to update the purchase count for a toy
router.post("/api/toys/:id/update", async (req, res) => {
  const toyId = req.params.id;
  const { action } = req.body; // action could be 'increase' or 'decrease'

  try {
    const toy = await TotalToy.findById(toyId); // Find the toy by its ID

    if (!toy) {
      return res.status(404).json({ message: "Toy not found" });
    }

    // Handle the increase or decrease action
    if (action === "increase") {
      if (toy.purchaseCount < toy.totalCount) {
        toy.purchaseCount += 1; // Increase purchase count
      } else {
        return res.status(400).json({ message: "No more toys available" });
      }
    } else if (action === "decrease" && toy.purchaseCount > 0) {
      toy.purchaseCount -= 1; // Decrease purchase count
    }

    // Save the updated toy document
    await toy.save();

    // Send the updated toy data to the frontend
    res.json(toy);
  } catch (error) {
    console.error("Error updating toy:", error);
    res.status(500).json({ message: "Error updating toy" });
  }
});

module.exports = router;
