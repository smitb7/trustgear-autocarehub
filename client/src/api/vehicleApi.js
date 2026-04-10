import API from "./axios";

export const getVehicles = () => API.get("/vehicle");

export const getVehicleById = (id) => API.get(`/vehicle/${id}`);

export const createVehicle = (data) => API.post("/vehicle", data);

export const updateVehicle = (id, data) => API.put(`/vehicle/${id}`, data);

export const deleteVehicle = (id) => API.delete(`/vehicle/${id}`);