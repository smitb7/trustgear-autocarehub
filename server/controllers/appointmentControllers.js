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
            userId : req.user.id,
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


// const updateAppointment = async(req,res)=>{

//     try {

//         const {
//             id
//         } = req.params 

//         const {
//             userId,
//             vehicleId,
//             serviceId,
//             garageId,
//             appointmentDate,
//             pickupRequest,
//             status
//         } = req.body

//         const updateAppointmentData = await Appointments.findByIdAndUpdate(id,
//             {
//             userId,
//             vehicleId,
//             serviceId,
//             garageId,
//             appointmentDate,
//             pickupRequest,
//             status
//             },
//             { new: true }
//         )


//         res.status(200).json({
//             data : updateAppointmentData,
//             message : "Your Data is updated according to your ID...!"
//         })


//     } catch (err) {


//         res.status(500).send("appointment server Down...!")
        
//     }

// }

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅SAFE CHECK
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user found",
      });
    }

    const userId = req.user.id;
    const userRole = req.user.role;

    const appointment = await Appointments.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    //  EXTRA SAFETY (this was your crash line)
    if (!appointment.userId) {
      return res.status(400).json({
        message: "Appointment has no userId",
      });
    }

    // 👤 USER → can ONLY cancel own appointment
    if (userRole !== "admin") {
      if (appointment.userId.toString() !== userId) {
        return res.status(403).json({
          message: "Not allowed",
        });
      }

      if (status !== "Cancelled") {
        return res.status(403).json({
          message: "Users can only cancel appointments",
        });
      }
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: "Appointment updated",
      data: appointment,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};







// const updateAppointment = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { status } = req.body;
  
//       const userId = req.user.id;
//       const userRole = req.user.role;
  
//       const appointment = await Appointments.findById(id);
  
//       if (!appointment) {
//         return res.status(404).json({
//           message: "Appointment not found",
//         });
//       }
  
//       // 👤 USER → can ONLY cancel own appointment
//       if (userRole !== "admin") {
//         if (appointment.userId.toString() !== userId) {
//           return res.status(403).json({
//             message: "Not allowed",
//           });
//         }
  
//         // user can only cancel
//         if (status !== "Cancelled") {
//           return res.status(403).json({
//             message: "Users can only cancel appointments",
//           });
//         }
//       }
  
//       appointment.status = status;
//       await appointment.save();
  
//       res.status(200).json({
//         message: "Appointment updated",
//         data: appointment,
//       });
  
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Server error",
//       });
//     }
//   };

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


