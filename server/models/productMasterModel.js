const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, "Please Enter Description"],
  },
  hsn: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please Enter HSN"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    trim: true,
    required: true,
  },
  updatedBy: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("ProductMaster", productSchema);
