import axios from "axios"

// Set config defaults when creating the instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
  });


  // lam 1 hanh dong gi do truoc khi call api
  const handleBefore = (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  };
  
  const handleError = (error) => {
    console.log(error);
  };
  
  api.interceptors.request.use(handleBefore, handleError);

export default api;