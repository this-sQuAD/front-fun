import axios from "axios";

export const api = axios.create({
    // https://back-fun.onrender.com
  baseURL: 'http://localhost:3000'
})