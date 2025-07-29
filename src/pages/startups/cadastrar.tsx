
import { useState } from "react"
import { useRouter } from "next/navigation" // Changed to next/navigation for App Router
import { api } from "@/services/api" // Assuming this path is correct
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

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Você precisa estar logado para cadastrar uma startup.")
        router.push("/login") // Redirect to login if no token
        return
      }

      await api.post(
        "/startup",
        {
          nome_da_startup: nome,
          descricao,
          imagem_de_capa: imagemSelecionada,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast.success("Startup cadastrada com sucesso!")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error: any) {
      console.error("Erro ao cadastrar a startup:", error.response?.data || error.message)
      toast.error("Erro ao cadastrar a startup. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div className={styles.pageBackground}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Voltar para Home
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
              src={url || "/placeholder.svg"}
              alt={`Imagem de capa ${url}`}
              width={120} // Slightly larger images
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