import axios from "axios"

export const api = axios.create({
  baseURL: "https://backend-production-e7e3.up.railway.app/",
})
