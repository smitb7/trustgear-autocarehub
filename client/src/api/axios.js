import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  const publicRoutes = [
    "users/login",
    "users/sign-up"
  ];

  // If request URL includes any public route → skip token
  if (publicRoutes.some((route) => req.url.includes(route))) {
    return req;
  }

  // Otherwise attach token
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;