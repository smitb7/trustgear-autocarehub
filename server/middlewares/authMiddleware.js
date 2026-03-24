const jwt = require("jsonwebtoken")
const BlacklistToken = require("../models/blackListTokenschema");



const authMiddleware = async(req,res,next)=>{

    try {
        
        const token = req.headers["authorization"]
        const authHeader = authHeader.split(" ")[1];
        
        if(!token){
             return res.status(401).json({

                message : "Please Login first"
                
            })
        }

        


        // check blacklist
        const tokenExist = await BlacklistToken.findOne({token})

        if(tokenExist){
             return res.status(403).json({
                message : "Token expired, login again..!"
            })
        }

        // verify token 
        const decoded = jwt.verify(
            token,
            "This-is-super-secret-string-which-can-be-anything"
        )

        req.user = decoded;
        return next() // you permitted 


    } catch (err) {
        
        return res.status(401).json({
            message : "invalid or expired token"
        })

    }

}

module.exports = authMiddleware; 