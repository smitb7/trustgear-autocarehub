import axios from "axios";

const API = "http://localhost:8080/invoice";

export const getInvoices = (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const downloadInvoice = (id, token) => {
  return axios.get(`${API}/download/${id}`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};