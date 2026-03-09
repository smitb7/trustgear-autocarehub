const mongoose = require("mongoose")

const garageSchema = new mongoose.Schema(
    {
        garageId : string,
        name : String,
        location : String, 
        contactNumber : String

    }
)

const Garage = mongoose.model("Garage", garageSchema)

module.exports = Garage