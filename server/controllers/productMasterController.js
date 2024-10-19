const productMasterModel = require("../models/productMasterModel");
const ErrorHandler = require("../utills/ErrorHandler");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productMasterModel.find();
    res.status(200).json({
      status: true,
      message: "Get Products",
      products,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = await productMasterModel.create(productData);
    res.status(201).json({
      status: true,
      message: "Create Product",
      product,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productMasterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      status: true,
      message: "Update Product",
      product,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productMasterModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      status: true,
      message: "Delete Product",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productMasterModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      status: true,
      message: "Get Product",
      product,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
