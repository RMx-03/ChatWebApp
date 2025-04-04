import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002", // Update if backend is hosted
  withCredentials: true, // Ensures cookies are sent for authentication
});

// Attach token to requests if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const loginUser = (credentials) => API.post("/api/auth/login", credentials);
export const registerUser = (userData) => API.post("/api/auth/signup", userData);
export const getUserProfile = () => API.get("/api/users/profile");


export const getChats = () => API.get("/api/chats");
export const sendMessage = (chatId, message) => API.post(`/api/chats/${chatId}/messages`, { message });

export default API;
