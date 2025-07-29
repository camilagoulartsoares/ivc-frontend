import { useState } from "react"
import React from "react"
import { api } from "@/services/api"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleRegister() {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      })

      const token = response.data.token

      localStorage.setItem("token", token)
      toast.success("Cadastro realizado com sucesso!")

      setTimeout(() => {
        router.push("/") // Redireciona para a home
      }, 1000)

    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao cadastrar"
      toast.error(message)
    }
  }

  return (
    <div>
      <h2>Cadastrar</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  )
}
