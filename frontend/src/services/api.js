import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Contact API services
export const fetchContacts = () => api.get("/contacts");
export const getContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (contact) => api.post("/contacts", contact);
export const updateContact = (id, contact) =>
  api.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Weather API service
export const getWeather = (city) => api.get(`/weather/${city}`);
