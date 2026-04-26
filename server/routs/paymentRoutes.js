const express = require("express");

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentControllers");

const authMiddleware = require("../middlewares/authMiddleware");

const paymentRouter = express.Router();

// CREATE ORDER
paymentRouter.post("/create-order", authMiddleware, createPaymentOrder);

// VERIFY PAYMENT
paymentRouter.post("/verify", authMiddleware, verifyPayment);

module.exports = paymentRouter;