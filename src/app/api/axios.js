import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://niambackend.cyclic.app/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
