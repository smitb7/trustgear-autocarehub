const express = require("express")
const jwt = require("jsonwebtoken")
const BlacklistToken = require("../models/blackListTokenschema");






const authMiddleware = async (req,res,next)=>{

    try {
        
        const authHeader = req.headers["authorization"]
                // console.log(token);

        const token = authHeader.split(" ")[1];

                if(!token){
                    res.status(401).send("Please login first...!")
                }
                
                const tokenExist = await BlacklistToken.findOne({
                    token
                })

                if(tokenExist){
                    res.status(403).json({
                        message : " You are logged out . please generate a new token"
                    })
                }

                const decoded = jwt.verify(token, "This-is-super-secret-string-which-can-be-anything", (err,decoded)=>{
                    if(err){
                        res.status(401).send("Your Token is not valid..!")
                    }
                    // console.log (decoded);
                    req.user = decoded;
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