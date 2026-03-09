const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        serviceName : String,
        description : String,
        price : Number 
    }
) ;

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service; 
