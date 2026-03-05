const mongoose = require("mongoose")

const dbconnect = async ()=>{
    try {
        await mongoose.connect("URL")
        console.log("Database Connected...!");
        
    } catch (err) {
        console.log("Something went wrong check the database connection..!", err);
        
    }
} 

module.exports = dbconnect; 