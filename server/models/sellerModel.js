const mongoose = require("mongoose");

const sellerModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: [String],
    required: true,
  },
  gstin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seller", sellerModel);
