import { useEffect, useState } from "react"
import { api } from "@/services/api"
import React from "react"

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/")
        setData(response.data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  if (error) return <p>Erro: {error}</p>
  if (!data) return <p>Carregando...</p>

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
