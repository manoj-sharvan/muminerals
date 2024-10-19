const Invoice = require("../models/invoiceModel");
const Buyer = require("../models/buyerModel");
const Seller = require("../models/sellerModel");

exports.invoiceCreate = async (req, res, next) => {
  try {
    const {
      invoiceDate,
      invoiceNumber,
      buyerPORef,
      seller,
      buyer,
      products,
      bagsCount,
      bagWeight,
      totalAmount,
      totalAmountInWords,
      vehicleNumber,
      eWayBillNumber,
      isOutsideState,
    } = req.body;

    // Calculate Taxable Value
    const totalWeightInTons = (bagsCount * bagWeight) / 1000;
    const taxableValue = totalAmount / 1.05; // Assuming total amount includes IGST at 5%

    // Calculate CGST and SGST Amounts (if applicable)
    let cgstAmount = 0;
    let sgstAmount = 0;
    if (!isOutsideState) {
      // Inside State
      cgstAmount = taxableValue * 0.025;
      sgstAmount = taxableValue * 0.025;
    }

    // Calculate IGST Amount (if applicable)
    let igstAmount = 0;
    if (isOutsideState) {
      igstAmount = taxableValue * 0.05;
    }

    const newInvoice = new Invoice({
      invoiceDate,
      invoiceNumber,
      buyerPORef,
      seller,
      buyer,
      products,
      bagsCount,
      bagWeight,
      totalAmount,
      totalAmountInWords,
      vehicleNumber,
      eWayBillNumber,
      isOutsideState,
      cgstAmount,
      sgstAmount,
      igstAmount,
      taxableValue,
      totalWeightInTons,
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      status: true,
      message: "Invoice created successfully",
      invoice: savedInvoice,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to create invoice",
      error: err.message,
    });
  }
};

exports.invoiceUpdate = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const updateData = req.body;

    // Calculate updated total weight, taxable value, and tax components
    if (
      updateData.bagsCount &&
      updateData.bagWeight &&
      updateData.totalAmount
    ) {
      const totalWeightInTons =
        (updateData.bagsCount * updateData.bagWeight) / 1000;
      const taxableValue = totalWeightInTons * updateData.totalAmount;

      if (updateData.isOutsideState) {
        updateData.igstAmount = taxableValue * 0.05;
        updateData.cgstAmount = 0;
        updateData.sgstAmount = 0;
        updateData.totalValue = taxableValue + updateData.igstAmount;
      } else {
        updateData.cgstAmount = taxableValue * 0.025;
        updateData.sgstAmount = taxableValue * 0.025;
        updateData.igstAmount = 0;
        updateData.totalValue =
          taxableValue + updateData.cgstAmount + updateData.sgstAmount;
      }

      updateData.totalWeightInTons = totalWeightInTons;
      updateData.taxableValue = taxableValue;
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      updateData,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to update invoice",
      error: err.message,
    });
  }
};

exports.invoiceDelete = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to delete invoice",
      error: err.message,
    });
  }
};

exports.invoiceGet = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId)
      .populate("seller")
      .populate("buyer")
      .populate("products");

    if (!invoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Get Invoice",
      invoice,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to get invoice",
      error: err.message,
    });
  }
};

exports.invoiceGetAll = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate("seller")
      .populate("buyer")
      .populate("products");

    res.status(200).json({
      status: true,
      message: "Get All Invoices",
      invoices,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to get invoices",
      error: err.message,
    });
  }
};

exports.invoiceGetByBuyer = async (req, res, next) => {
  try {
    const buyerId = req.params.buyerId;
    const invoices = await Invoice.find({ buyer: buyerId })
      .populate("seller")
      .populate("buyer")
      .populate("products");

    res.status(200).json({
      status: true,
      message: "Get Invoices by Buyer",
      invoices,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to get invoices",
      error: err.message,
    });
  }
};

exports.invoiceGetBySeller = async (req, res, next) => {
  try {
    const sellerId = req.params.sellerId;
    const invoices = await Invoice.find({ seller: sellerId })
      .populate("seller")
      .populate("buyer")
      .populate("products");

    res.status(200).json({
      status: true,
      message: "Get Invoices by Seller",
      invoices,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to get invoices",
      error: err.message,
    });
  }
};
