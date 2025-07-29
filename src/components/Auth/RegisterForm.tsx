import React, { useState } from "react"
import { api } from "@/services/api"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import "./AuthForm.css"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleRegister() {
    try {
      const response = await api.post("/auth/register", { name, email, password })
      const token = response.data.token
      localStorage.setItem("token", token)
      toast.success("Cadastro realizado com sucesso!")
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao cadastrar"
      toast.error(message)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Cadastrar</h2>
      <input
        className="auth-input"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="auth-button" onClick={handleRegister}>Cadastrar</button>
    </div>
  )
}
