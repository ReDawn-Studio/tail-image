// utils/axiosConfig.ts
import axios from "axios";

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const tokenKey = "tail-token";

// 请求拦截器，添加token到请求头
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      /* TODO: 
        考虑了很久，我们觉得 SSR 首屏带来的 SEO 优势才是市场竞争中最重要的点，
        所以我们仍然决定使用 location.href，哪怕它会导致页面重新加载 
      */
      // document.dispatchEvent(new CustomEvent("token-expired"));
      location.href = "/login";
      return Promise.reject(new Error("No token found, request aborted!"));
    }
  },
  (error) => {
    console.log("why", error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        localStorage.removeItem(tokenKey);
        // const router = useRouter();
        // router.push("/login");
        return Promise.reject(error);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default request;
