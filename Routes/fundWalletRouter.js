const express = require("express");
const {
  coupon,

  monnify,
  vPay,
} = require("../Controllers/fundWalletController");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/coupon", auth, coupon);
router.all("/monnify", monnify);
router.all("/vpay", vPay);

module.exports = router;
