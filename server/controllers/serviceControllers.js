// now will move on the services API's 

const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/serviceSchema")
const Service = require("../models/serviceSchema");

// 1. addService (create a service in DB through to the API)

// const createService = async (req,res)=>{

//     try {
        
//         const {
//             serviceName,
//             description,
//             price
//         } = req.body

//         const insertServicedata = await User.insertOne(
//             {
//                 serviceName : serviceName,
//                 description : description,
//                 price : price
//             }
//         )

//         res.status(201).json({
//             data : insertServicedata,
//             message : "Your Data is added successfully...!"
//         })



//     } catch (err) {
        
//         res.status(500).send("Server Down...!")
//     }

// }

// for dynamic payment 

const createService = async (req,res)=>{
    try {
        const { serviceName, description, price } = req.body

        const insertServicedata = await Service.create({
            serviceName,
            description,
            price
        })

        res.status(201).json({
            data : insertServicedata,
            message : "Your Data is added successfully...!"
        })

    } catch (err) {
        res.status(500).send("Server Down...!")
    }
}









// now we will get all the services

const getallServices = async(req,res)=>{

    try {
        
        const getServicedata = await User.find()

        res.status(200).json({
            data : getServicedata,
            message : "all services is displayed..!"
        })

    } catch (err) {
        res.status(500).send("Server Down....!!")
    }

}


// now get the services by ID 

const getservicebyId = async (req,res)=>{

    try {
        
        const {
            id
        } = req.params

      
        const getservicedatabyId =  await User.findById(id)

        res.status(200).json({
            data : getservicedatabyId,
            message : " yes, This is the data according to your ID..!"
        })





    } catch (err) {

        res.status(500).send("Server Down...!")

        
    }
}

// Now for Update services 

const updateServicebyId = async (req, res)=>{

  try {
    
    const {
        id
    } = req.params

    const {
        serviceName,
        description,
        price
    } = req.body
    
    const updateservicedata = await User.findByIdAndUpdate(
        id,
        {serviceName, description, price}
    
    )

    res.status(200).json({
        data : updateservicedata,
        message : "Your Data is updated...!"
    })


  } catch (err) {
    
    res.status(500).send("service Server Down...!")


  }


}



// for delete service by ID

const deleteservicebyId = async(req, res)=>{

    try {
        
        const {
            id
        } = req.params
    
    
    
        const deleteserviceData = await User.findByIdAndDelete(id)
    
    
        res.status(200).json({
            data : deleteserviceData,
            message : "Your Data is deleted...!"
    
        })


    } catch (err) {

        res.status(500).send("Service server Down..!")
        
    }


}






module.exports = {createService, getallServices, getservicebyId, updateServicebyId, deleteservicebyId}