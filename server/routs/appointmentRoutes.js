
const express = require("express")
const {getallappointmentData, createAppointment, getappointmentsbyId, updateAppointment, deleteAppointment} = require("../controllers/appointmentControllers")
const appointmentRouter = express.Router()


appointmentRouter.get("/", getallappointmentData)
appointmentRouter.get("/:id", getappointmentsbyId)
appointmentRouter.post("/", createAppointment)
appointmentRouter.put("/:id", updateAppointment)
appointmentRouter.delete("/:id", deleteAppointment)



module.exports = {appointmentRouter}