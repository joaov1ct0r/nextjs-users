import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  withCredentials: true,
  responseType: "json",
});

export { api };
