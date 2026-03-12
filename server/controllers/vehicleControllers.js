const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/vehicleSchema")


//  Get all vehicles 

const getallVehicles = async(req,res)=>{

    try {

        const displayallVehicles = await User.find()

        console.log(displayallVehicles)
        res.status(200).json({
            
            
            data : displayallVehicles,
            message : "all vehicles data is here..!"
        })



    } catch (err) {
        
        res.status(500).send("Vehicle Server Down...!")

    }

}




module.exports ={getallVehicles}
