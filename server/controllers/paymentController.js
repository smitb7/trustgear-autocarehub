const Payment = require("../models/paymentSchema");

//  TEMP TEST CONTROLLER (no Razorpay yet)
const createPayment = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    const payment = await Payment.create({
      userId: req.user.id,
      appointmentId,
      amount,
      status: "Pending",
    });

    res.status(201).json({
      message: "Payment record created",
      data: payment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Payment creation failed",
    });
  }
};

module.exports = { createPayment };

