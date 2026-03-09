const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema(
    {
        serviceId : String, 
        serviceName : String,
        description : String,
        price : number 
    }
) 

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service; 
