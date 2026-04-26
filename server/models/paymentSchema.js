const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointments",
  },

  amount: {
    type: Number,
  },

  razorpayOrderId: {
    type: String,
  },

  razorpayPaymentId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
});

const Payments = mongoose.model("Payments", paymentSchema);

module.exports = Payments;