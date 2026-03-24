const jwt = require("jsonwebtoken")
const BlacklistToken = require("../models/blackListTokenschema");



const authMiddleware = async(req,res,next)=>{

    try {
        
        const token = req.headers["authorization"]

        if(!token){
            res.status(401).json({

                message : "Please Login first"
                
            })
        }

        // check blacklist
        const tokenExist = await BlacklistToken.findOne({token})

        if(tokenExist){
            res.status(403).json({
                message : "Token expired, login again..!"
            })
        }

        // verify token 
        const decoded = jwt.verify(
            token,
            "This-is-super-secret-string-which-can-be-anything"
        )

        req.user = decoded;
        next() // you permitted 


    } catch (err) {
        
        res.status(401).json({
            message : "invalid or expired token"
        })

    }

}

module.exports = authMiddleware; 