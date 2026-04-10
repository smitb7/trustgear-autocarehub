import API from "./axios";

export const getGarages = () => API.get("/garage");

export const getGarageById = (id) => API.get(`/garage/${id}`);

export const createGarage = (data) => API.post("/garage", data);

export const updateGarage = (id, data) => API.put(`/garage/${id}`, data);

export const deleteGarage = (id) => API.delete(`/garage/${id}`);