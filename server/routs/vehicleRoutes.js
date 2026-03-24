const express = require("express")

const vehicleRoute = express.Router()
const{getallVehicles, getvehiclesbyId,createVehicleData, deletevehicleData, updtevehiclebyId } = require("../controllers/vehicleControllers")
const authMiddleware = require("../middlewares/authMiddleware")

vehicleRoute.get("/",authMiddleware, getallVehicles)
vehicleRoute.get("/:id",authMiddleware, getvehiclesbyId)
vehicleRoute.post("/", authMiddleware,  createVehicleData)
vehicleRoute.delete("/:id",authMiddleware, deletevehicleData)
vehicleRoute.put("/:id",authMiddleware, updtevehiclebyId)




module.exports = {vehicleRoute}

