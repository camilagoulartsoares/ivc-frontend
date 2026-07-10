import axios from "axios"

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api-backend"

export const api = axios.create({
  baseURL,
  timeout: 8000,
})
