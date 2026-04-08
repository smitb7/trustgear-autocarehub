const express = require('express')
const mongoose = require('mongoose')

const Appointments = require('../models/appointmentsSchema')




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
        

        const createappointmentData = await Appointments.create({
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

const getallappointmentData = async (req, res) => {
    try {
      const appointments = await Appointments.find()
        .populate("userId", "name email")
        .populate("vehicleId", "model brand")
        .populate("serviceId", "serviceName")
        .populate("garageId", "name");
  
      res.status(200).json({
        data: appointments,
        message: "Appointments fetched successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  };

// Get appointments by ID 

const getappointmentsbyId = async(req,res)=>{

 try {

    const {
        id
    } = req.params


    const getdatabyId = await Appointments.findById(id);

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

        const updateAppointmentData = await Appointments.findByIdAndUpdate(id,
            {
            userId,
            vehicleId,
            serviceId,
            garageId,
            appointmentDate,
            pickupRequest,
            status
            },
            { new: true }
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

   


    const deleteAppointmentData = await Appointments.findByIdAndDelete(id)


    res.status(200).json({
        data : deleteAppointmentData,
        message  : "Your Data is Deleted according to your id...!"
    })

   } catch (err) {
    
    res.status(500).send("appointment server Down...!")
   }

}


module.exports ={createAppointment, getallappointmentData, getappointmentsbyId, updateAppointment, deleteAppointment}


