const express = require("express")
const jwt = require("jsonwebtoken")




const authMiddleware = (req,res,next)=>{

    try {
        
        const authHeader = req.headers["authorization"]
                // console.log(token);

        const token = authHeader.split(" ")[1];
        
                if(!token){
                    res.status(401).send("Please login first...!")
                }
        
                const decoded = jwt.verify(token, "This-is-super-secret-string-which-can-be-anything", (err,decoded)=>{
                    if(err){
                        res.status(401).send("Your Token is not valid..!")
                    }
                    // console.log (decoded);
                    res.user = decoded;
                    next() ; 
                })


    } catch (error) {

        console.log(error);
        res.status(404).json({

            message : "Something went wrong"

        })
        
    }


}


module.exports = authMiddleware ;