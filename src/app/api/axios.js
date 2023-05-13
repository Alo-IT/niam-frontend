import axios from "axios";

// const dotenv = require("dotenv");

const instance = axios.create({
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default instance;
