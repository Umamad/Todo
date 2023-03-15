import axios from "axios";

import { store } from "../redux/store";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json; charset=utf-8",
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
  },
});

api.interceptors.request.use(
  async (config) => {

    // Add accessToken to header
    const state = store.getState();
    const accessToken = state.user.currentUser?.accessToken;
    if (accessToken) config.headers["Authorization"] = "Bearer " + accessToken;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
