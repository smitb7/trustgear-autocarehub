const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payments",
      required: true,
    },
    amount: Number,
    filePath: String,
    status: {
      type: String,
      default: "Generated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoices", invoiceSchema);