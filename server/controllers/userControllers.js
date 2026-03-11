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


// now we will make a findbyID so that we can find the user by there ID 


const getUsersbyId = async (req,res)=>{

   
    try {

        const {
            id
        } = req.params 
        
        const findDatabyId = await User.findById(id)

        res.status(200).json({
            data : findDatabyId,
            message : "Here's your data according your ID..!"
        })
    
    } catch (err) {
        console.log(err);
        res.status(500).send(" Something is wrong in your server...!")
                
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
            {
                name:name,
                email : email,
                password : password,
                role : role
            },
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



//  Delete By ID 

const deleteUserbyId = async (req,res)=>{


}




module.exports = {getUsers, updateUser, getUsersbyId}

