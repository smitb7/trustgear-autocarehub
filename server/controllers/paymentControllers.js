const Razorpay = require("razorpay");
const Payments = require("../models/paymentSchema");
const Appointments = require("../models/appointmentsSchema");
const Invoices = require("../models/invoiceSchema");
const generateInvoice = require("../utils/generateInvoice");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    const paymentData = await Payments.create({
      userId: req.user.id,
      appointmentId,
      amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(201).send({
      data: { order, paymentData },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Payment error");
  }
};

// VERIFY PAYMENT + CREATE INVOICE
const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      razorpay_signature,
      appointmentId,
    } = req.body;

    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).send("Invalid signature");
    }

    // after invoice is created


    // update payment
    const payment = await Payments.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        status: "Paid",
        razorpayPaymentId: paymentId,
      },
      { new: true }
    );

    // update appointment
    await Appointments.findByIdAndUpdate(appointmentId, {
      paymentStatus: "Paid",
    });

    // CREATE INVOICE
    const appointment = await Appointments.findById(appointmentId)
      .populate("vehicleId")
      .populate("serviceId")
      .populate("garageId");

    const invoice = await Invoices.create({
      userId: payment.userId,
      appointmentId,
      paymentId: payment._id,
      amount: payment.amount,
    });

    const filePath = await generateInvoice({
      ...invoice.toObject(),
      appointment,
    });

    invoice.filePath = filePath;
    await invoice.save();

    // link invoice to appointment
    await Appointments.findByIdAndUpdate(appointmentId, {
      invoiceId: invoice._id,
    });

    res.status(200).send({
      message: "Payment verified & invoice created",
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Verification failed");
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};