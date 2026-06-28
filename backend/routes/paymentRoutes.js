const express = require("express");
const { createdOrder, verifyPayment } = require("../controllers/paymentController");



const router = express.Router();

router.post("/order", createdOrder);
router.post("/verfiy", verifyPayment);

module.exports = router;