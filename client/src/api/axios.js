import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  // Don't attach token to login or sign-up
  if (
    req.url === "/users/login" ||
    req.url === "/users/sign-up"
  ) {
    return req;
  }

  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;