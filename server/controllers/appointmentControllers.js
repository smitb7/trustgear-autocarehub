const express = require('express')
const mongoose = require('mongoose')

const User = require('../models/appointmentsSchema')
const { data } = require('react-router-dom')



// ctreate API for appointments 


const createAppointment = async(req,res)=>{

    try {
        const {
            userId,
            vehicleId,
            serviceId,
            garageId,
            appointmentDate,
            pickupRequest,
            status
        } = req.body
        

        const createappointmentData = await User.insertOne({
            userId : userId,
            vehicleId : vehicleId,
            serviceId: serviceId,
            garageId : garageId,
            appointmentDate : appointmentDate,
            pickupRequest : pickupRequest,
            status : status      
        })


        res.status(200).send ({
            data : createappointmentData,
            message : "Your Data has been created"
        })
    } catch (err) { 

        res.status(500).send("appointment server Down...!")
        
    }

}





