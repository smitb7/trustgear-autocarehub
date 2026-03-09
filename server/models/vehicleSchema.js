const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        brand : String,
        model : String,
        year : Number,
        plateNumber : {
            type: String,
            unique: true
        },
        runKm : String
    }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;