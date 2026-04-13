import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  const publicRoutes = [
    "/api/users/login",
    "/api/users/sign-up",
  ];

  //  FIX: exact match using startsWith
  const isPublic = publicRoutes.some((route) =>
    req.url.startsWith(route)
  );

  if (isPublic) return req;

  // 🔥 attach token for all protected routes
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;



