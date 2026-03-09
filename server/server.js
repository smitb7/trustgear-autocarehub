
const express = require("express")
const app = express();
const dbconnect = require("./config/dbconnection")


app.get("/", (req,res)=>{
    res.send("Hellow Welcome Home..!")
    
})

app.get("/admin", (req,res)=>{
    res.send("Hellow Welcome admin..!")
    
})

app.get("/user", (req,res)=>{
    res.send("Hellow Welcome User...!")
})

app.listen(8080, ()=>{
    
    console.log ("Your server is running on Localhost:8080");
    dbconnect()  // so that we will know if there's an problem in connection 

})

