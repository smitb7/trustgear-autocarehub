const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/garageSchema");

//  create for garage

const insertgarageData = async (req, res) => {
  try {
    const { name, location, contactNumber } = req.body;

    const createData = await User.insertOne({
      name: name,
      location: location,
      contactNumber: contactNumber,
    });

    res.status(201).json({
      data: createData,
      message: "Your data has been created..!",
    });
  } catch (err) {
    res.status(500).send("Garage Server Down...!");
  }
};

//read data for garage
const displaygarageData = async (req, res) => {
  try {
    const displayData = await User.find();

    res.status(200).json({
      data: displayData,
      message: "Your data is here...!",
    });
  } catch (err) {
    res.status(500).send("Your garage server down..!")
  }
};

// read the data by ID 

const getdatabyId = async(req,res)=>{

  try {
    

    const {
        id
    } = req.params

    const finddatabyId = await User.findById(id)

    res.status(200).json({
        data : finddatabyId,
        message : "here's your data according your ID...!"
    })

  } catch (err) {

    res.status(500).send("Your Garage Server is Down ")
    
  }

}





// update data 

const updategarageData = async(req,res)=>{

    try {
        
        const {
            id
        } = req.params   

        const {
            name,
            location,
            contactNumber
        } = req.body
    
    
        const updateData = await User.findByIdAndUpdate(id ,
            {
                name : name,
                location : location,
                contactNumber : contactNumber
            }
        )

        res.status(201).json({
            data : updateData,
            message : "Your data is Updated..!" 
        })


    } catch (err) {

        res.status(500).send('Your Garage Server is Down..!')
        
    }


}


// Delete API 

const deletegarageData = async(req,res)=>{

   try {
    
    const {
        id
    } = req.params


    const deleteData = await User.findByIdAndDelete(id)

    res.status(200).json({

        data : deleteData,
        message : "data is deleted...!"
    })


   } catch (err) {

    res.status(500).send("Garage Server Down..!")

   }


}










module.exports = {insertgarageData,getdatabyId, displaygarageData, updategarageData, deletegarageData}
