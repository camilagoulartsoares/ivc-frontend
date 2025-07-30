import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/services/api"
import styles from "./CadastrarStartup.module.css"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"

const imagensPredefinidas = ["/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png"]

export default function CadastrarStartupPage() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [imagemSelecionada, setImagemSelecionada] = useState(imagensPredefinidas[0])

  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams?.get("from") ?? "home"

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Você precisa estar logado para cadastrar uma startup.")
        router.push("/login")
        return
      }

      await api.post(
        "/startup",
        {
          nome_da_startup: nome,
          descricao,
          imagem_de_capa: imagemSelecionada
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success("Startup cadastrada com sucesso!")

      setTimeout(() => {
        if (from === "dashboard") {
          router.push("/dashboard")
        } else {
          router.push("/")
        }
      }, 2000)
    } catch (error: any) {
      console.error("Erro ao cadastrar a startup:", error.response?.data || error.message)
      toast.error("Erro ao cadastrar a startup. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div className={styles.pageBackground}>
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        className={styles.backButton}
        onClick={() => {
          if (from === "dashboard") {
            router.push("/dashboard")
          } else {
            router.push("/")
          }
        }}
      >
        Voltar
      </button>

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
          placeholder="Descrição da Startup"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <p className={styles.subtitle}>Escolha uma imagem de capa</p>
        <div className={styles.imageGrid}>
          {imagensPredefinidas.map((url) => (
            <Image
              key={url}
              src={url}
              alt={`Imagem de capa ${url}`}
              width={120}
              height={80}
              className={`${styles.imageOption} ${imagemSelecionada === url ? styles.selected : ""}`}
              onClick={() => setImagemSelecionada(url)}
            />
          ))}
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          Cadastrar Startup
        </button>
      </div>
    </div>
  )
}
