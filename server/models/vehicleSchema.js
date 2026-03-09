const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        vehicleId : String,
        brand : String,
        model : String,
        year : Number,
        plateNumber : String,
        runkm : String
    }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;