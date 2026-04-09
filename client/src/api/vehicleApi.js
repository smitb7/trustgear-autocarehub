import axios from "axios";

const BASE_URL = "/api/vehicles";

export const getVehicles = () => axios.get(BASE_URL);

export const getVehicleById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createVehicle = (data) => axios.post(BASE_URL, data);

export const updateVehicle = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteVehicle = (id) => axios.delete(`${BASE_URL}/${id}`);