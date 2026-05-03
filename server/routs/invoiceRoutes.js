const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createInvoice,
  downloadInvoice,
} = require("../controllers/invoiceControllers");

const Invoices = require("../models/invoiceSchema");

// GET USER INVOICES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoices.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: invoices });
  } catch (err) {
    res.status(500).json({ message: "Error fetching invoices" });
  }
});

// DOWNLOAD
router.get("/download/:id", authMiddleware, downloadInvoice);

// OPTIONAL CREATE
router.post("/create", authMiddleware, createInvoice);

module.exports = router;