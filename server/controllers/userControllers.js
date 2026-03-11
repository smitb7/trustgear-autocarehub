const express = require("express")
const User = require("../models/usersSchema")



// so now we will get the all users first 
const getUsers = async(req,res)=>{

    try {

    // query for read the data 
    const readDataofUsers = await User.find()  // get the data from Users collection

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

// now we will Update a users by ID  

const updateUser = async(req,res)=>{

    try {

        const {
            id 
        } = req.params

        const {name , email, password, role} = req.body

        const updateUserdata =  await User.findByIdAndUpdate(
            id,
            {new:true} // for confirmation only
        )

        res.status(200).json({
            data : updateUserdata,
            message : "Your Document is updated..."

        })


        
    } catch (err) {
        
            console.log(err);
            res.status(500).json(
                {
                    message : "Check in your user update API something wrong...!!"
                }
            )

    }
}




module.exports = {getUsers, updateUser}

