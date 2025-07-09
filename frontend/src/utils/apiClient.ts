import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
