const mongoose = require("mongoose");
const Appointments = require("./appointmentsSchema");

const invoiceSchema = new mongoose.Schema({
    invoiceId : String,
    appointmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Appointments"
    },
    amount : Number,
    serviceDetails : String,
    paymentStatus : {
        type : String,
        default : "Unpaid"
    }
});


const Invoice = mongoose.model("Invoice", invoiceSchema) ;

module.exports = Invoice ;