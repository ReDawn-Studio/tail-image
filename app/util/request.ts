import axios, { InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

// const source = axios.CancelToken.source();

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const tokenKey = "tail-token";
// const router = useRouter();

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      document.dispatchEvent(new CustomEvent("tokenInvalidate"));
      return null as unknown as InternalAxiosRequestConfig;
    }
    return config;
  },
  (error) => {
    console.log("why", error);
    return Promise.reject(error);
  }
);

// TODO: 响应拦截器这里，还要根据后端对 token 的检测结果进行一些操作
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        localStorage.removeItem(tokenKey);
        const router = useRouter();
        router.push("/login");
        return Promise.reject(error);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default request;
