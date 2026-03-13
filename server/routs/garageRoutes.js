const express = require('express')
const garageRouter = express.Router()
const {insertgarageData, displaygarageData} = require('../controllers/garageControllers')

garageRouter.get("/", displaygarageData)
garageRouter.post("/", insertgarageData)


module.exports = {garageRouter}