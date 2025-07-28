import type { AppProps } from "next/app"
import { useEffect } from "react"
import { api } from "@/services/api"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/")
        console.log("Resposta da API:", response.data)
      } catch (error) {
        console.error("Erro ao buscar API:", error)
      }
    }
    fetchData()
  }, [])

  return <Component {...pageProps} />
}
