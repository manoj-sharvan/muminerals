const buyerModel = require("../models/buyerModel");
const ErrorHandler = require("../utills/ErrorHandler");


// Utility function to check if GSTIN is outside TN
const checkOutsideTN = (gstin) => {
  return !gstin.startsWith("33");
};

exports.getBuyers = async (req, res, next) => {
  try {
    const buyers = await buyerModel.find();
    res.status(200).json({
      status: true,
      message: "Get Buyers",
      buyers,
      count: buyers.length,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.getBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerModel.findById(req.params.id);
    if (!buyer) {
      return next(new ErrorHandler("Buyer Not Found", 404));
    }

    res.status(200).json({
      status: true,
      message: "Get Buyer",
      buyer,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.createBuyer = async (req, res, next) => {
  try {
    const { gstin, ...buyerData } = req.body;
    const outsideTN = checkOutsideTN(gstin);

    const buyer = new buyerModel({ ...buyerData, gstin, outsideTN });
    await buyer.save();

    res.status(201).json({
      status: true,
      message: "Buyer created successfully",
      buyer,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.updateBuyer = async (req, res, next) => {
  try {
    const { gstin, ...buyerData } = req.body;
    let buyer = await buyerModel.findById(req.params.id);

    if (!buyer) {
      return next(new ErrorHandler("Buyer Not Found", 404));
    }

    const outsideTN = checkOutsideTN(gstin);

    buyer = await buyerModel.findByIdAndUpdate(
      req.params.id,
      { ...buyerData, gstin, outsideTN },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: true,
      message: "Update Buyer",
      buyer,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerModel.findByIdAndDelete(req.params.id);

    if (!buyer) {
      return next(new ErrorHandler("Buyer Not Found", 404));
    }

    res.status(200).json({
      status: true,
      message: "Delete Buyer",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
