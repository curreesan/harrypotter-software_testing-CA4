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

// Route to handle purchase
router.post("/api/toys/purchase", async (req, res) => {
  const toys = req.body; // Array of toy objects with id and purchaseCount

  try {
    for (const toy of toys) {
      const { id, purchaseCount } = toy;
      const toyDoc = await TotalToy.findById(id);

      if (!toyDoc) continue; // Skip if toy not found

      // Update the totalCount and reset purchaseCount
      toyDoc.totalCount -= purchaseCount;
      toyDoc.purchaseCount = 0;

      await toyDoc.save();
    }

    res.status(200).json({ message: "Purchase successful" });
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).json({ message: "Error processing purchase" });
  }
});

module.exports = router;
