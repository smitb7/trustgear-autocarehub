const express = require("express")
const User = require("../models/usersSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const BlacklistToken = require("../models/blacklistTokenschema")




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


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // STEP 1: Check user exists
      const userFound = await User.findOne({ email });
  
      if (!userFound) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      //  STEP 2: Check password
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        userFound.password
      );
  
      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
  
      //  STEP 3: Generate token
      const token = jwt.sign(
        {
          id: userFound._id,
          email: userFound.email,
          role: userFound.role,
        },
        "This-is-super-secret-string-which-can-be-anything",
        { expiresIn: "15m" }
      );
  
      //  STEP 4: Send response
      return res.json({
        message: "logged in successfully..!",
        data: {
          name: userFound.name,
          email: userFound.email,
          role: userFound.role,
          token,
        },
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };


// log OUT 

const logout = async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
  
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      const token = authHeader.split(" ")[1];
  
      await BlacklistToken.create({ token });
  
      res.status(200).json({
        message: "Logged out successfully..!",
      });
    } catch (err) {
      res.status(500).json({
        message: "Logout failed",
      });
    }
  };

module.exports = {getUsers, updateUser, getUsersbyId, deleteUserbyId, auth, loginUser, logout}

