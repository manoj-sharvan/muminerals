const productMasterModel = require("../models/productMasterModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utills/ErrorHandler");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel
      .find()
      .populate("description", "description")
      .populate("hsn", "hsn");
    res.status(200).json({
      status: true,
      message: "Get Products",
      products,
      count: products.length,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const productsData = req.body;

    console.log(
      "Received productsData:",
      JSON.stringify(productsData, null, 2)
    );

    if (!Array.isArray(productsData)) {
      return new ErrorHandler("Invalid products data", 400);
    }

    const createdProducts = await Promise.all(
      productsData.map(async (productData) => {
        const { description, hsn, quantity, ratePerTon, amount } = productData;

        // Find or create ProductMaster entry for description
        let productMaster = await productMasterModel.findOne({ description });
        if (!productMaster) {
          productMaster = new productMasterModel({ description, hsn });
          await productMaster.save();
        }

        // Create the Product using the ObjectId references from ProductMaster
        const product = new productModel({
          description: productMaster._id,
          hsn: productMaster._id,
          quantity,
          ratePerTon,
          amount,
        });
        return await product.save();
      })
    );

    res.status(201).json({
      status: true,
      message: "Products created successfully",
      products: createdProducts,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to create products",
      error: err.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  if (!product)
    return res
      .status(404)
      .json({ status: false, message: "Product Not Found" });

  product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    { runValidators: true }
  );
  res.status(200).json({
    status: true,
    message: "Update Product",
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await productModel.findById(req.params.id).findOneAndDelete();

  if (!product)
    return res
      .status(404)
      .json({ status: false, message: "Product Not Found" });

  res.status(200).json({
    status: true,
    message: "Delete Product",
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  res.status(201).json({
    status: true,
    message: "Get Product",
    product,
  });
};
