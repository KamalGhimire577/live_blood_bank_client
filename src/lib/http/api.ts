import axios from "axios";

const API = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to requests automatically
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
