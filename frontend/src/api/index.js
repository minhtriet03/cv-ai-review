import axios from "axios";

const API_BASE_URL = "http://54.144.64.100/api"; // API Mongo cháº¡y á»Ÿ cá»•ng 5000

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
