
const express = require("express")
const app = express();
const dbconnect = require("./config/dbconnection");


//import user Router 
const { usersRouter } = require("./routs/userRoutes");
//import serviceRouter
const {serviceRouter} = require("./routs/serviceRoutes")
//import vehiclerouters
const {vehicleRoute} = require("./routs/vehicleRoutes")


app.use(express.json()); // for parshing the data 

//use userRouters
app.use("/users", usersRouter)
//use serviceRouters
app.use("/service", serviceRouter)
//use vehicleRoutes
app.use("/vehicle", vehicleRoute)



app.listen(8080, ()=>{
    
    console.log ("Your server is running on Localhost:8080");
    dbconnect()  // so that we will know if there's an problem in connection 

})

