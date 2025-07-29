import { useState } from "react"
import React from "react"

import { useRouter } from "next/router"
import { api } from "@/services/api"
import { toast } from "react-toastify"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", { email, password })
      const token = response.data.token

      localStorage.setItem("token", token)

      toast.success("Login realizado com sucesso!")

      setTimeout(() => {
        router.push("/") // redireciona após toast
      }, 1000)

    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao fazer login"
      toast.error(errorMsg)
    }
  }

  return (
    <div>
      <h2>Entrar</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}

