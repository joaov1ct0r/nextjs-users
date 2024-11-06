import axios from "axios";

const controller = new AbortController();

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.crud.shop";
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  signal: controller.signal,
});

export { api, controller };
