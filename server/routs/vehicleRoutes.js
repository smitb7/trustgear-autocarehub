const express = require("express")

const vehicleRoute = express.Router()
const{getallVehicles, getvehiclesbyId,createVehicleData} = require("../controllers/vehicleControllers")


vehicleRoute.get("/", getallVehicles)
vehicleRoute.get("/:id", getvehiclesbyId)
vehicleRoute.post("/", createVehicleData)



module.exports = {vehicleRoute}