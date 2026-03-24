const express = require("express")

const serviceRouter = express.Router()

const {createService, getallServices, getservicebyId, updateServicebyId, deleteservicebyId} = require("../controllers/serviceControllers")
const authMiddleware = require("../middlewares/authMiddleware")

serviceRouter.post("/",authMiddleware, createService)
serviceRouter.get("/",authMiddleware, getallServices)
serviceRouter.get("/:id",authMiddleware, getservicebyId)
serviceRouter.put("/:id",authMiddleware, updateServicebyId )
serviceRouter.delete("/:id",authMiddleware, deleteservicebyId)





module.exports = {serviceRouter}