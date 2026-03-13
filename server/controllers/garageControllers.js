const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/garageSchema");
const { data } = require("react-router-dom");

//  create for garage

const insertgarageData = async (req, res) => {
  try {
    const { name, location, contactNumber } = req.body;

    const createData = await User.insertOne({
      name: name,
      location: location,
      contactNumber: contactNumber,

  
    });

    res.status(200).json({
        data : createData,
        message : "Your data has been created..!" 
    })




  } catch (err) {

    res.status(500).send("Garage Server Down...!")

  }
};
