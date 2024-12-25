const mongoose = require("mongoose");

const totalToySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    default: 100, // Set default value of 100 for total count
  },
  purchaseCount: {
    type: Number,
    default: 0, // Default purchase count is 0
  },
});

const TotalToy = mongoose.model("TotalToy", totalToySchema);

module.exports = TotalToy;
