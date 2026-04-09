import API from "./axios";

// get all garages
export const getGarages = () => API.get("/garages");

// get garage by id
export const getGarageById = (id) => API.get(`/garages/${id}`);

// create garage
export const createGarage = (data) => API.post("/garages", data);

// update garage
export const updateGarage = (id, data) => API.put(`/garages/${id}`, data);

// delete garage
export const deleteGarage = (id) => API.delete(`/garages/${id}`);