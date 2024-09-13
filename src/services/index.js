import axios from "axios";

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 1000,
  });

  //Interceptor
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Change 'your_token_key' to the actual key used in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;
      if (error?.response?.data?.errors)
        error.errors = error?.response?.data?.errors;
      if (error?.response?.status === 401) {
        window.location.href = "/logout";
      }
      return Promise.reject(error);
    }
  );

  const headers = {
    "Content-Type": "multipart/form-data",
  };



  /*==========    POST REQUESTS JTC   ==========*/
  const authLogin = async (body) =>
    api.post("kitchen/accounts-employees/login", body);

  // const authLogout = async (body) => api.post("logout", body);
   const authLogout = async (userId) => {
    return api.post("logout", { "user_id": userId });
  };
  
  return {

    authLogin,
    authLogout,
  };
};

const apis = createBackendServer(import.meta.env.VITE_REACT_APP_SERVER_URL);

export default apis;
