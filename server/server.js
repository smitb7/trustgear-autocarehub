
const express = require("express")
const app = express();
const dbconnect = require("./config/dbconnection");
const { usersRouter } = require("./routs/userRoutes");


app.use(express.json()); // for parshing the data 

app.use("/users", usersRouter)



app.listen(8080, ()=>{
    
    console.log ("Your server is running on Localhost:8080");
    dbconnect()  // so that we will know if there's an problem in connection 

})

