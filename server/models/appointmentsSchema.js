const mongoose = require("mongoose");
const User = require("./usersSchema");
const Vehicle = require("./vehicleSchema");
const Service = require("./serviceSchema");
const Garage = require("./garageSchema");

const appointmentsSchema = new mongoose.Schema({
  // appointmentId : String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage",
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "invoices",
  },
  appointmentDate: Date,
  pickupRequest: Boolean,

  // NEW FIELD (IMPORTANT for dynamic payment )
  servicePrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Forwarded", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = Appointments;
