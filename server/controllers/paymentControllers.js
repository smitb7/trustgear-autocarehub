const Razorpay = require("razorpay");
const Payments = require("../models/paymentSchema");
const Appointments = require("../models/appointmentsSchema");
const crypto = require("crypto");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ==============================
// ✅ CREATE PAYMENT ORDER
// ==============================
const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    if (!appointmentId || !amount) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    const paymentData = await Payments.create({
      userId: req.user.id,
      appointmentId: appointmentId,
      amount: amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(201).send({
      message: "Payment order created",
      data: {
        order,
        paymentData,
      },
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).send({ message: "Payment server down" });
  }
};


// ==============================
// ✅ VERIFY PAYMENT
// ==============================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).send({ message: "Invalid payment data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Payments.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Paid",
          razorpayPaymentId: razorpay_payment_id,
        }
      );

      // OPTIONAL: update appointment status
      await Appointments.findByIdAndUpdate(
        { _id: req.body.appointmentId },
        { paymentStatus: "Paid" }
      );

      return res.status(200).send({
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).send({
        message: "Invalid signature",
      });
    }

  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).send({ message: "Payment verification failed" });
  }
};


// ==============================
// ✅ EXPORTS
// ==============================
module.exports = {
  createPaymentOrder,
  verifyPayment,
};