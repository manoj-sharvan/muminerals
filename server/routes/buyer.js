const express = require("express");
const router = express.Router();
const {
  getBuyers,
  createBuyer,
  getBuyer,
  updateBuyer,
  deleteBuyer,
} = require("../controllers/buyerController");

router.get("/buyers", getBuyers);
router.post("/buyer/new", createBuyer);
router.get("/buyer/:id", getBuyer);
router.put("/buyer/:id", updateBuyer);
router.delete("/buyer/:id", deleteBuyer);

module.exports = router;
