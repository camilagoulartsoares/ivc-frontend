import React, { useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"
import { toast } from "react-toastify"
import "./AuthForm.css" // vamos criar esse CSS também

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
        router.push("/")
      }, 1000)
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao fazer login"
      toast.error(errorMsg)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Entrar</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" onClick={handleLogin}>Entrar</button>
    </div>
  )
}
