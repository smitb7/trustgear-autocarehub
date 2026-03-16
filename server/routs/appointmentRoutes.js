
const express = require("express")
const {getallappointmentData, createAppointment, getappointmentsbyId} = require("../controllers/appointmentControllers")
const appointmentRouter = express.Router()


appointmentRouter.get("/", getallappointmentData)
appointmentRouter.get("/:id", getappointmentsbyId)
appointmentRouter.post("/", createAppointment)



module.exports = {appointmentRouter}