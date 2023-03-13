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
    const state = store.getState();
    console.log(state);

    // const accessToken = state.user.
    // const token = getUserAccessToken();
    // if (token) config.headers["Authorization"] = "Bearer " + token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
