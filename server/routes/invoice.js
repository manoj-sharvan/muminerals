const express = require("express");
const router = express.Router();
const {
  invoiceCreate,
  invoiceUpdate,
  invoiceDelete,
  invoiceGet,
  invoiceGetAll,
  invoiceGetByBuyer,
  invoiceGetBySeller,
} = require("../controllers/invoiceController");

router.post("/invoice/new", invoiceCreate);
router.put("/invoice/:id", invoiceUpdate);
router.delete("/invoice/:id", invoiceDelete);
router.get("/invoice/:id", invoiceGet);
router.get("/invoices", invoiceGetAll);
router.get("/invoices/buyer/:buyerId", invoiceGetByBuyer);
router.get("/invoices/seller/:sellerId", invoiceGetBySeller);

module.exports = router;
