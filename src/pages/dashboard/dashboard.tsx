import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Dashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  if (!isLoggedIn) return null

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Bem-vindo ao seu Dashboard</h1>
      <p>Aqui você pode gerenciar suas startups e ver suas informações.</p>
    </main>
  )
}
