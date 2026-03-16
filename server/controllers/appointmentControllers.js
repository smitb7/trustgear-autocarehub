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
        

        const createappointmentData = await User.create({
            userId : userId,
            vehicleId : vehicleId,
            serviceId: serviceId,
            garageId : garageId,
            appointmentDate : appointmentDate,
            pickupRequest : pickupRequest,
            status : status      
        })


        res.status(201).send ({
            data : createappointmentData,
            message : "Your Data has been created"
        })
    } catch (err) { 
        console.log(err)
        res.status(500).send("appointment server Down...!")
        
    }

}





// now to get All appointments with the use of read(get)

const getallappointmentData = async(req,res)=>{

   try {

    const getappointmentData = await User.find()

    res.status(200).json({
        data : getappointmentData,
        message : "Your appointment data is displayed here..!"
    })

   } catch (err) {

    res.status(500).send("appointment server Down...!")
    
   }


}

// Get appointments by ID 

const getappointmentsbyId = async(req,res)=>{

 try {

    const {
        id
    } = req.params


    const getdatabyId = await User.findById(id);

    res.status(200).json({
        data : getdatabyId,
        message : "This is your data according to the ID..!"
    })


 } catch (err) {
    
    res.status(500).send("appointment server Down...!")
 }


}


const updateAppointment = async(req,res)=>{

    try {

        const {
            id
        } = req.params 

        const {
            userId,
            vehicleId,
            serviceId,
            garageId,
            appointmentDate,
            pickupRequest,
            status
        } = req.body

        const updateAppointmentData = await User.findByIdAndUpdate(id,
            {
            userId,
            vehicleId,
            serviceId,
            garageId,
            appointmentDate,
            pickupRequest,
            status
            }
        )


        res.status(200).json({
            data : updateAppointmentData,
            message : "Your Data is updated according to your ID...!"
        })


    } catch (err) {


        res.status(500).send("appointment server Down...!")
        
    }

}



const deleteAppointment = async(req,res)=>{

   try {

    const {
        id
    } = req.params

   


    const deleteAppointmentData = await User.findByIdAndDelete(id)


    res.status(200).json({
        data : deleteAppointmentData,
        message  : "Your Data is Deleted according to your id...!"
    })

   } catch (err) {
    
    res.status(500).send("appointment server Down...!")
   }

}


module.exports ={createAppointment, getallappointmentData, getappointmentsbyId, updateAppointment, deleteAppointment}