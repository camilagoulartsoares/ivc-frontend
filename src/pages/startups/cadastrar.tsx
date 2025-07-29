import React, { useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"
import styles from "./CadastrarStartup.module.css"

export default function CadastrarStartupPage() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const router = useRouter()

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token")
      await api.post(
        "/startup",
        { nome, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      router.push("/")
    } catch (error: any) {
      console.error(error)
      alert("Erro ao cadastrar a startup")
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastrar Startup</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Nome da Startup"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>Cadastrar</button>
    </div>
  )
}
