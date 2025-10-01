// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Backend URL from .env
  withCredentials: true, // Keep true if using cookies
});

export default API;
