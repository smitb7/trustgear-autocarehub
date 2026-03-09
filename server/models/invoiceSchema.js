const mongoose = require("mongoose");
const Appointments = require("./appointmentsSchema")

const invoiceSchema = new mongoose.Schema({
    invoiceId : String,
    appointmentId : mongoose.Schema.Types.ObjectId,
    amount : Number,
    serviceDetails : String,
    paymentStatus : String
});


const Invoice = mongoose.model("Invoice", invoiceSchema) ;

module.exports = Invoice ;