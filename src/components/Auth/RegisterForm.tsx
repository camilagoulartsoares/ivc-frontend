import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { api } from "@/services/api"
import AuthLayout from "./AuthLayout"
import { z } from "zod"
import React from "react"

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
})

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleRegister() {
    const result = registerSchema.safeParse({ name, email, password })

    if (!result.success) {
      const firstError = result.error.issues[0].message
      toast.error(firstError)
      return
    }

    try {
      const response = await api.post("/auth/register", { name, email, password })
      localStorage.setItem("token", response.data.token)
      toast.success("Cadastro realizado com sucesso!")
      setTimeout(() => router.push("/"), 1000)
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao cadastrar"
      toast.error(message)
    }
  }

  return (
    <AuthLayout
      title="Criar Conta"
      subtitle="Preencha os dados para se cadastrar"
      footerText={<span>Já tem conta? <a href="/login" className="link">Entrar</a></span>}
    >
      <input
        className="input"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="button" onClick={handleRegister}>Cadastrar</button>
    </AuthLayout>
  )
}
