// src/lib/api.js
import axios from "axios";

const baseURL =
    import.meta.env.VITE_API_BASE ||
    "https://api.example.com"; // change or override via .env.local

export const api = axios.create({
    baseURL,
    timeout: 15_000,
});

api.interceptors.request.use((cfg) => {
    // attach auth headers if needed
    // const token = localStorage.getItem("token");
    // if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        // central error logging
        console.error("API Error:", err?.response?.data || err.message);
        return Promise.reject(err);
    }
);

// helpers
export const getJSON = (url, params) => api.get(url, { params }).then(r => r.data);
export const postJSON = (url, data) => api.post(url, data).then(r => r.data);
export const putJSON = (url, data) => api.put(url, data).then(r => r.data);
export const delJSON = (url) => api.delete(url).then(r => r.data);
