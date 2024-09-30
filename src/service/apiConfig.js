import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://bill-system-eight.vercel.app/',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  