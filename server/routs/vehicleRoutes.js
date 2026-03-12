const express = require("express")

const vehicleRoute = express.Router()
const{getallVehicles, getvehiclesbyId,createVehicleData, deletevehicleData, updtevehiclebyId } = require("../controllers/vehicleControllers")


vehicleRoute.get("/", getallVehicles)
vehicleRoute.get("/:id", getvehiclesbyId)
vehicleRoute.post("/", createVehicleData)
vehicleRoute.delete("/:id", deletevehicleData)
vehicleRoute.put("/:id", updtevehiclebyId)




module.exports = {vehicleRoute}

