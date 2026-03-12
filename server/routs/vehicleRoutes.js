const express = require("express")

const vehicleRoute = express.Router()
const{getallVehicles} = require("../controllers/vehicleControllers")


vehicleRoute.get("/", getallVehicles)



module.exports = {vehicleRoute}