const sellerModel = require("../models/sellerModel");
const ErrorHandler = require("../utills/ErrorHandler");

exports.getSellers = async (req, res, next) => {
  try {
    const sellers = await sellerModel.find();
    res.status(200).json({
      status: true,
      message: "Get Sellers",
      sellers,
      count: sellers.length,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
exports.createSeller = async (req, res, next) => {
  try {
    const { gstin } = req.body;

    // Check if the GSTIN is already used by another seller
    const existingSeller = await sellerModel.findOne({ GSTIN: gstin });
    if (existingSeller) {
      return next(new ErrorHandler("GSTIN already exists", 400));
    }

    const seller = new sellerModel(req.body);
    await seller.save();

    res.status(201).json({
      status: true,
      message: "Seller created successfully",
      seller,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.updateSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gstin } = req.body;

    // Check if another seller (other than the current one being updated) has the same GSTIN
    const existingSeller = await sellerModel.findOne({
      GSTIN: gstin,
      _id: { $ne: id },
    });
    if (existingSeller) {
      return next(new ErrorHandler("GSTIN already exists", 400));
    }

    let seller = await sellerModel.findById(id);

    if (!seller) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    seller = await sellerModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: true,
      message: "Seller updated successfully",
      seller,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.deleteSeller = async (req, res, next) => {
  try {
    const seller = await sellerModel.findByIdAndDelete(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    res.status(200).json({
      status: true,
      message: "Seller deleted successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.getSeller = async (req, res, next) => {
  try {
    const seller = await sellerModel.findById(req.params.id);
    if (!seller) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    res.status(200).json({
      status: true,
      message: "Get Seller",
      seller,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
