import axios from "axios"

export const api = axios.create({
  baseURL: "https://make.investidores.vc/webhook",
  headers: {
    "Content-Type": "application/json",
    api_key: "alkj239j9csdociva-av98n2vsdoia-asoijf20as",
  },
})
