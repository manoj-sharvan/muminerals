const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductMaster",
    required: true,
  },
  hsn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductMaster",
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, "Please Enter Quantity"],
  },
  ratePerTon: {
    type: Number,
    required: [true, "Please Enter Rate Per Ton"],
  },
  amount: {
    type: Number,
    required: [true, "Please Enter Amount"],
  },
});

module.exports = mongoose.model("Product", productSchema);
