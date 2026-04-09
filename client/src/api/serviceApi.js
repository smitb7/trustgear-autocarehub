import API from "./axios";

// get all services
export const getServices = () => API.get("/services");

// get service by id
export const getServiceById = (id) => API.get(`/services/${id}`);

// create service
export const createService = (data) => API.post("/services", data);

// update service
export const updateService = (id, data) => API.put(`/services/${id}`, data);

// delete service
export const deleteService = (id) => API.delete(`/services/${id}`);