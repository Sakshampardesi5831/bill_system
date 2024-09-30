import axios from "axios";
const baseURL = "/api"
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});