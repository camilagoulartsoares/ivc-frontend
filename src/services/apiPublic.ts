import axios from "axios"

/** Em local, usa o proxy do Next para o Nest. Webhook externo fica como fallback opcional. */
const baseURL =
  process.env.NEXT_PUBLIC_PUBLIC_API_URL?.replace(/\/$/, "") || "/api-backend"

export const apiPublic = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
})
