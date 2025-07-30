import axios from "axios"

export const api = axios.create({
  baseURL: "https://ivc-backend.onrender.com/",
})
