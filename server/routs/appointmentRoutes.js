
// const express = require("express")
// const {getallappointmentData, createAppointment, getappointmentsbyId, updateAppointment, deleteAppointment} = require("../controllers/appointmentControllers")
// const appointmentRouter = express.Router()
// const authMiddleware = require("../middlewares/authMiddleware")


// appointmentRouter.get("/",getallappointmentData)
// appointmentRouter.get("/:id",authMiddleware ,getappointmentsbyId)
// appointmentRouter.post("/",authMiddleware ,createAppointment)
// appointmentRouter.put("/:id", authMiddleware ,updateAppointment)
// appointmentRouter.delete("/:id", authMiddleware , deleteAppointment)



// module.exports = {appointmentRouter}



// final

const express = require("express");

const {
  getallappointmentData,
  createAppointment,
  getappointmentsbyId,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentControllers");

const appointmentRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// IMPORTANT → ADD authMiddleware HERE
appointmentRouter.get("/", authMiddleware, getallappointmentData);

appointmentRouter.get("/:id", authMiddleware, getappointmentsbyId);
appointmentRouter.post("/", authMiddleware, createAppointment);
appointmentRouter.put("/:id", authMiddleware, updateAppointment);
appointmentRouter.delete("/:id", authMiddleware, deleteAppointment);

module.exports = { appointmentRouter };