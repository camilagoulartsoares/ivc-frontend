import axios from "axios"

const API_KEY = "alkj239j9csdociva-av98n2vsdoia-asoijf20as"

export const api = axios.create({
  baseURL: "https://make.investidores.vc/webhook",
  headers: {
    "Content-Type": "application/json",
    api_key: API_KEY,
  },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error)
    if (error.code === "ECONNABORTED") throw new Error("Timeout na requisição")
    if (error.response?.status === 401) throw new Error("API key inválida")
    if (error.response?.status === 403) throw new Error("Acesso negado")
    if (error.code === "ERR_NETWORK") throw new Error("Erro de rede - verifique sua conexão ou tente novamente")
    throw error
  },
)
