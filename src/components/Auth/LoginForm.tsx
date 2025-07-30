import React, { useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"
import { toast } from "react-toastify"
import { FiDollarSign } from "react-icons/fi"
import "./AuthForm.css"

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
      setTimeout(() => router.push("/"), 1000)
    } catch (err: any) {
      toast.error("Erro ao fazer login")
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="icon-container">
          <FiDollarSign size={28} />
        </div>

        <h2 className="title">Bem-vindo de volta</h2>
        <p className="subtitle">Acesse sua conta para continuar</p>

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

        <button className="button" onClick={handleLogin}>
          Entrar
        </button>

        <p className="footer-text">
          Não tem conta? <a href="/register" className="link">Criar conta</a>
        </p>
      </div>

      <div className="login-banner">
        <div className="banner-content">
          <h2 className="banner-title">Entre no futuro dos pagamentos</h2>
          <p className="banner-subtitle">
            Tudo que você precisa para gerenciar sua startup em um só lugar.
          </p>
          <div className="cards">
            <div className="card big-card">
              <p className="balance">12.347,23 R$</p>
              <p className="card-label">Saldo Total</p>
              <p className="card-number">•••• 6917</p>
            </div>
       <div className="card credit-card">
  <div className="card-logo">🌀</div>
  <p className="credit-balance">12,347.23 $</p>
  <p className="credit-subtitle">Combined balance</p>

  <div className="credit-footer">
    <div className="credit-info">
      <p className="credit-label">Primary Card</p>
      <p className="credit-number">3495 •••• 6917</p>
    </div>
    <p className="credit-amount">2,546.64$</p>
  </div>

  <div className="credit-bottom">
    <span className="credit-brand">VISA</span>
    <button className="credit-button">View All</button>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}
