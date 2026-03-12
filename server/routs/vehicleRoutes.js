const express = require("express")

const vehicleRoute = express.Router()
const{getallVehicles, getvehiclesbyId,createVehicleData, deletevehicleData } = require("../controllers/vehicleControllers")


vehicleRoute.get("/", getallVehicles)
vehicleRoute.get("/:id", getvehiclesbyId)
vehicleRoute.post("/", createVehicleData)
vehicleRoute.delete("/:id", deletevehicleData)




module.exports = {vehicleRoute}

