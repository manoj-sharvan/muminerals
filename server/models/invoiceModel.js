const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceDate: {
    type: Date,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  buyerPORef: {
    type: String,
    default: "-----",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  bagsCount: {
    type: Number,
    required: true,
  },
  bagWeight: {
    type: Number,
    required: true,
  },
  totalWeightInTons: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalAmountInWords: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  eWayBillNumber: {
    type: String,
    required: function () {
      return this.isOutsideState;
    },
  },
  declaration: {
    type: String,
    default:
      "We declare that this invoice shows the actual price of the goods described and all particulars are true and correct.",
  },
  isOutsideState: {
    type: Boolean,
    required: true,
  },
  taxableValue: {
    type: Number,
    required: true,
  },
  cgstAmount: {
    type: Number,
    default: 0,
  },
  sgstAmount: {
    type: Number,
    default: 0,
  },
  igstAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
