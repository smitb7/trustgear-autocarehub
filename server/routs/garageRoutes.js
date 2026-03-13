const express = require('express')
const garageRouter = express.Router()
const {insertgarageData, displaygarageData, updategarageData} = require('../controllers/garageControllers')

garageRouter.get("/", displaygarageData)
garageRouter.post("/", insertgarageData)
garageRouter.put("/:id", updategarageData)

module.exports = {garageRouter}