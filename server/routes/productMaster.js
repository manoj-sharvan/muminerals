const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productMasterController");

router.get("/masterProducts", getProducts);
router.post("/masterProducts/new", createProduct);
router.get("/masterProducts/:id", getProduct);
router.put("/masterProducts/:id", updateProduct);
router.delete("/masterProducts/:id", deleteProduct);

module.exports = router;
