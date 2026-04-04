import axios from "axios";
import i18n from "../../i18netx";
import useAuthStore from "../store/useAuthStore";

const authAxiosInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  withCredentials: true,
});

authAxiosInstance.interceptors.request.use((config) => {
  const {token}=useAuthStore.getState();
  config.headers["Accept-Language"] = i18n.language;
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
})

authAxiosInstance.interceptors.response.use((response) => response,
async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try{
      const refreshToken = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/RefreshToken',{},{
        withCredentials:true,
      });
      const newAccessToken = refreshToken.data.accessToken;
      useAuthStore.getState().setToken(newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return authAxiosInstance(originalRequest);
    }catch(error){
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
  }
);
export default authAxiosInstance;