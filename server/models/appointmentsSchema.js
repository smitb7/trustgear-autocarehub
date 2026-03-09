const mongoose = require("mongoose")
const User = require("./usersSchema")
const Vehicle= require("./vehicleSchema")
const Service = require("./serviceSchema")
const Garage = require("./garageSchema")

const appointmentsSchema = new mongoose.Schema({
    appointmentId : String,
    userId : String,
    vehicleId : String, 
    serviceId: String, 
    garageId : String, 
    appointmentDate : Date,
    pickupRequest : Boolean,
    status : String 
})

const Appointments = mongoose.model("Appointments", appointmentsSchema);


module.exports =  Appointments ;
