import API from "./axios";

export const getAppointments = () => API.get("/appointment");
export const getAppointmentById = (id) => API.get(`/appointment/${id}`);
export const createAppointment = (data) => API.post("/appointment", data);
export const updateAppointment = (id, data) => API.put(`/appointment/${id}`, data);
export const deleteAppointment = (id) => API.delete(`/appointment/${id}`);