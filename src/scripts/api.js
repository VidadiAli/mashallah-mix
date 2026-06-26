import axios from "axios";

const BASE_URL = "https://mashallah-mix-back.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

// const getLoginPath = () => {
//   return "/";
// };

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;

    const url = originalRequest?.url || "";
    const isAuthEndpoint =
      url.includes(`/auth/${localStorage.getItem("role") == 'admin' ? 'admin' : 'user'}/refresh`) ||
      url.includes("/admin/logout") ||
      url.includes("/admin/login");

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api.post(`/auth/${localStorage.getItem("role") == 'admin' ? 'admin' : 'user'}/refresh`);
        }

        await refreshPromise;

        isRefreshing = false;
        refreshPromise = null;

        return api(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        refreshPromise = null;

        try {
          // await api.post(`/auth/${localStorage.getItem("role") == 'admin' ? 'admin' : 'user'}/logout`);
          // localStorage.removeItem('role');
        } catch (e) {
          // localStorage.removeItem('role');
        }

        // window.location.href = getLoginPath();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;