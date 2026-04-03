import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  headers: {
    "Accept-Language": "en",
  },
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default authAxiosInstance;