import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardStats = () => {
  return axios.get(`${API_URL}/admin/dashboard-stats`, {
    withCredentials: true,
  });
};