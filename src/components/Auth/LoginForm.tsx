import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { api } from "@/services/api"
import AuthLayout from "./AuthLayout"
import { z } from "zod"
import React from "react"

const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin() {
    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const firstError = result.error.issues[0].message
      toast.error(firstError)
      return
    }

    try {
      const response = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      toast.success("Login realizado com sucesso!")
      setTimeout(() => router.push("/"), 1000)
    } catch {
      toast.error("Erro ao fazer login")
    }
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para continuar"
      footerText={<span>Não tem conta? <a href="/register" className="link">Criar conta</a></span>}
    >
      <input
        className="input"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleLogin}>Entrar</button>
    </AuthLayout>
  )
}
