const mongoose = require("mongoose")

const blackListTokenschema = new mongoose.Schema({

    token : {
        type : String,
        require : true
    }

}, {timestamps : true, 
    versionKey : false})

const BlacklistToken =  mongoose.model("BlacklistToken", blackListTokenschema)

module.exports = BlacklistToken