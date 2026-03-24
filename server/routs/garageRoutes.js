const express = require('express')
const garageRouter = express.Router()
const {insertgarageData,getdatabyId ,displaygarageData, updategarageData, deletegarageData} = require('../controllers/garageControllers')
const authMiddleware = require("../middlewares/authMiddleware")

garageRouter.get("/", authMiddleware, displaygarageData)
garageRouter.get("/:id", authMiddleware, getdatabyId)
garageRouter.post("/",authMiddleware, insertgarageData)
garageRouter.put("/:id",authMiddleware, updategarageData)
garageRouter.delete("/:id",authMiddleware, deletegarageData)

module.exports = {garageRouter}