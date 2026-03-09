const mongoose = require("mongoose")
const User = require("./usersSchema")
const Vehicle= require("./vehicleSchema")
const Service = require("./serviceSchema")
const Garage = require("./garageSchema")

const appointmentsSchema = new mongoose.Schema({
    // appointmentId : String,
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vehicleId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    }, 
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }, 
    garageId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Garage"
    }, 
    appointmentDate : Date,
    pickupRequest : Boolean,
    status : {
        type: String,
        enum: ["Pending", "Approved", "Forwarded", "Completed"],
        default: "Pending"
    }
})

const Appointments = mongoose.model("Appointments", appointmentsSchema);


module.exports =  Appointments ;
