const express = require("express")

const serviceRouter = express.Router()

const {createService, getallServices, getservicebyId, updateServicebyId, deleteservicebyId} = require("../controllers/serviceControllers")


serviceRouter.post("/", createService)
serviceRouter.get("/", getallServices)
serviceRouter.get("/:id", getservicebyId)
serviceRouter.put("/:id", updateServicebyId )
serviceRouter.delete("/:id", deleteservicebyId)





module.exports = {serviceRouter}