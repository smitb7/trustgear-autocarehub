const express = require('express')
const garageRouter = express.Router()
const {insertgarageData,getdatabyId ,displaygarageData, updategarageData, deletegarageData} = require('../controllers/garageControllers')

garageRouter.get("/", displaygarageData)
garageRouter.get("/:id", getdatabyId)
garageRouter.post("/", insertgarageData)
garageRouter.put("/:id", updategarageData)
garageRouter.delete("/:id", deletegarageData)

module.exports = {garageRouter}