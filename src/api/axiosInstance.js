import axios from "axios"
import i18n from "../../i18netx";

const axiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
        withCredentials: true,
});
axiosInstance.interceptors.request.use((config)=>{
    config.headers["Accept-Language"]=i18n.language;
    return config;
})
export default axiosInstance;