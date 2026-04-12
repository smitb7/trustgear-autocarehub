import API from "./axios";

// GET all appointments
export const getAppointments = () => API.get("/appointment");

// CREATE appointment
export const createAppointment = (data) =>
  API.post("/appointment", data);

// GET by ID
export const getAppointmentById = (id) =>
  API.get(`/appointment/${id}`);

// UPDATE
export const updateAppointment = (id, data) =>
  API.put(`/appointment/${id}`, data);

// DELETE
export const deleteAppointment = (id) =>
  API.delete(`/appointment/${id}`);