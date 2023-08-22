import axios from "axios";

export const api = axios.create({
    // https://back-fun.onrender.com
  baseURL: 'https://back-fun.onrender.com'
})