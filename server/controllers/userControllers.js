const express = require("express")
const User = require("../models/usersSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



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

   try {

    const {
        id
    } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    res.status(200).json(
        {
            data : deletedUser,
            message : "Data Deleted Successfully...!!"
        })
    


   } catch (err) {
    
    
    res.status(500).send("Check Your Server..!")
    
   }

}


// auth sign-up
const auth = async(req,res)=>{

    try {

        
        
        const {
            name , email, password, role
        } = req.body;
        
        //hashing (security) 
        // we can compromise with the time but not with the security
        const hashedPassword = await bcrypt.hashSync(password, 16)


        const createUser = await User.create({
            name ,
            email, 
            password : hashedPassword, 
            role
        })

        res.status(201).json({
            data : createUser,
            message : "User is created..!"
        })


    } catch (err) {

        console.log(err);
        res.status(500).json({
            message : "something wrong"
        })
        
        
    }


}


//login


const loginUser = async(req,res)=>{
    try {
        
        const token = req.headers["authorization"]
        console.log(token);

        const {
            email,
            password
        } = req.body

        //step.1 (User is found or not ?)
        const userFound = await User.findOne({
            email
        })
        // if user is not found 
        if(!userFound){
            res.status(404).json({
                message : "user not userFound..!!"
            })
        }

        // if found 
        //step.2 , now check the password 

        const isPasswordCorrect = bcrypt.compareSync(password, userFound.password)

        // if password correct  
        if(isPasswordCorrect){



            // json web token 
            const token = jwt.sign(
            // first parimeter
                {
                id : userFound._id,
                email : userFound.email,
            },
            //  second parimeter (signature- secret)
            "This-is-super-secret-string-which-can-be-anything",
            //third parimeter
            {expiresIn : "2h"}
        )




            res.json({

                message : "logged in successfully..!",
                data : {
                    name : userFound.name,
                    email : userFound.email,
                    token
                    
                }
            })
        }



    } catch (error) {
        res.status(404).json({
            message : "invalid Credentials...!"
        })
    }
}

module.exports = {getUsers, updateUser, getUsersbyId, deleteUserbyId, auth, loginUser}

