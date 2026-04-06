import axios from "axios";

// create axios instance
const API = axios.create({
  baseURL: "http://localhost:8080",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;