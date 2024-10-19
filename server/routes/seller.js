const express = require("express");
const router = express.Router();
const {
  getSellers,
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
} = require("../controllers/sellerController");

router.get("/sellers", getSellers);
router.post("/seller/new", createSeller);
router.get("/seller/:id", getSeller);
router.put("/seller/:id", updateSeller);
router.delete("/seller/:id", deleteSeller);

module.exports = router;
