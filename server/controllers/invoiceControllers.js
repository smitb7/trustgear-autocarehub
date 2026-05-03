const Invoices = require("../models/invoiceSchema");
const Payments = require("../models/paymentSchema");
const generateInvoice = require("../utils/generateInvoice");

//  CREATE INVOICE
const createInvoice = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status !== "Paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    //  duplicate
    const existing = await Invoices.findOne({ paymentId });
    if (existing) {
      return res.status(200).json({
        message: "Invoice already exists",
        data: existing,
      });
    }

    const invoice = await Invoices.create({
      userId: payment.userId,
      appointmentId: payment.appointmentId,
      paymentId: payment._id,
      amount: payment.amount,
    });

    return res.status(201).json({
      message: "Invoice created",
      data: invoice,
    });

  } catch (err) {
    console.log("CREATE INVOICE ERROR:", err);
    return res.status(500).json({
      message: "Invoice error",
    });
  }
};


// DOWNLOAD INVOICE 
const downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoices.findById(req.params.id)
      .populate({
        path: "appointmentId",
        model: "Appointments",
        populate: [
          { path: "serviceId" },
          { path: "garageId" },
        ],
      })
      .populate({
        path: "userId",
        model: "User", // 🔥 FIXED (NOT "users")
      });

    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }

    // ❗ SAFETY CHECK (VERY IMPORTANT)
    if (!invoice.appointmentId) {
      return res.status(400).send("Appointment data missing");
    }

    // STREAM PDF
    generateInvoice(
      invoice,
      invoice.appointmentId,
      invoice.userId,
      res
    );

  } catch (err) {
    console.log("DOWNLOAD ERROR:", err);
    return res.status(500).send("Download error");
  }
};

module.exports = {
  createInvoice,
  downloadInvoice,
};