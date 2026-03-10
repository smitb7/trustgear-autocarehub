const express = require("express")
const User = require("../models/usersSchema")



// so now we will get the all users first 

const getUsers = async(req,res)=>{

    try {

    // query for read the data 
    const readDataofUsers = await User.find()  // get the data according to the usermodel(schema)

    res.status(200).json(

        {
            data : readDataofUsers,
            message : "Yes , Here's the list of your data "
        }

    )
    } catch (err) {
        
        res.status(500).send("Check Your Server..!")
    }




}


module.exports = {getUsers}