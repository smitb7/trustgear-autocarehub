
const express = require("express")
const app = express()

const dbconnect = require("./config/dbconnection");


//import user Router 
const { usersRouter } = require("./routs/userRoutes");
//import serviceRouter
const {serviceRouter} = require("./routs/serviceRoutes")
//import vehiclerouters
const {vehicleRoute} = require("./routs/vehicleRoutes")
//import garagerouters
const {garageRouter} = require("./routs/garageRoutes")
//appointment router
const {appointmentRouter} = require("./routs/appointmentRoutes")
//invoice router
const {invoiceRouter} = require("./routs/invoiceRoutes");
// const { loginUser } = require("./controllers/userControllers");

//auth require



app.use(express.json()); // for parshing the data 


//auth middleware (use)


//use userRouters
app.use("/users", usersRouter)
//use serviceRouters
app.use("/service", serviceRouter)
//use vehicleRoutes
app.use("/vehicle", vehicleRoute)
//use garageRouter
app.use("/garage", garageRouter)
//use appointmentRouter
app.use("/appointment", appointmentRouter)
//use invoiceRoutes
app.use("/invoice", invoiceRouter)


app.listen(8080, ()=>{
    
    console.log ("Your server is running on Localhost:8080");
    dbconnect()  // so that we will know if there's an problem in connection 

})

