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



// get vehicle by ID 


const getvehiclesbyId = async (req,res)=>{

    try {

        const {
            id
        } = req.params

        const displayvehiclesbyId = await User.findById(id)

        res.status(200).json({
            data : displayvehiclesbyId,
            message : "this is your data according to your ID...!"
        })


    } catch (err) {
        res.status(500).send("Vehicle Server is Down...!")
    }




}


// add data by createVehicleData

const createVehicleData = async(req, res)=>{

    try {
        
        const {brand, model, year, plateNumber, runKm} = req.body

        const createVehicleData = await User.insertOne(
            {
                brand : brand,
                model : model,
                year : year,
                plateNumber : plateNumber,
                runKm : runKm
            }
       


        )

         
        res.status(201).json({
            data : createVehicleData,
            message : "Your data is created successfully...!"
        })  


    } catch (err) {

        res.status(500).send("Vehicle Server Down...!")
        
    }

}


// if you want to insert many data at once , 
//

// const createmultiplevehicleData = async(req, res)=>{


//     try {
        

//     const {data} = req.body.data

//     const createmultipledata = await User.insertMany(
//         data
//     )

//     res.status(201).json({
//         data : createmultipledata,
//         message : " Your data is created successfully..!" 
//     })

    

//     } catch (err) {
        
//         res.status(500).send("vehicle server error...!")

//     }

// }




// Update API

const updtevehiclebyId = async(req,res)=>{

   try {
    
    const {
        id 
    } = req.params

    const {brand, model, year, plateNumber, runKm} = req.body

    const updateVehicle = await User.findByIdAndUpdate(
        id,
        {
            brand : brand,
            model : model,
            year : year,
            plateNumber : plateNumber,
            runKm : runKm 
        }
    )

    res.status(201).json({
        data : updateVehicle,
        message : "Your data updated successfully...!"
    })



   } catch (error) {
        res.status(500).send("Vehicle server Down...!")
   }

}









// now we will move on delete

const deletevehicleData = async(req,res)=>{

    try {
        
    const {id} = req.params

    const deleteData = await User.findByIdAndDelete(id) 

    res.status(200).json({
        data : deleteData,
        message : "Your data is deleted successfully..!"
    })


    } catch (err) {
        res.status(500).send("Vehicle server Down..!")  
    }


}












module.exports ={getallVehicles,getvehiclesbyId, createVehicleData , deletevehicleData,updtevehiclebyId }
