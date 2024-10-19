const mongoose = require("mongoose");

const buyerModel = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  gstin: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(v);
      },
      message: props => `${props.value} is not a valid GSTIN format!`
    }
  },
  contactNumber1: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regex to match landline and mobile phone numbers with optional country code
        return /^(\+\d{1,3}[- ]?)?\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid contact number format!`
    }
  },
  contactNumber2: {
    type: String,
    validate: {
      validator: function(v) {
        // Regex to match landline and mobile phone numbers with optional country code
        return /^(\+\d{1,3}[- ]?)?\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid contact number format!`
    }
  },
  outsideTN: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = mongoose.model("Buyer", buyerModel);
