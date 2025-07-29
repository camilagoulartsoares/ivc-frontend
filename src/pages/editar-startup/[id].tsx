import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"
import styles from "../startups/CadastrarStartup.module.css"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"

const imagensPredefinidas = ["/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png"]

export default function EditarStartupPage() {
  const router = useRouter()
  const { id } = router.query

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [imagemSelecionada, setImagemSelecionada] = useState(imagensPredefinidas[0])

  useEffect(() => {
    if (!id || typeof id !== "string") return

    async function fetchStartup() {
      try {
        const token = localStorage.getItem("token")
        const response = await api.get(`/startup/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const { nome_da_startup, descricao, imagem_de_capa } = response.data
        setNome(nome_da_startup)
        setDescricao(descricao)
        setImagemSelecionada(imagem_de_capa)
      } catch (error: any) {
        toast.error("Erro ao carregar dados da startup")
      }
    }

    fetchStartup()
  }, [id])

  async function handleUpdate() {
    try {
      const token = localStorage.getItem("token")
      await api.put(
        `/startup/${id}`,
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
      toast.success("Startup atualizada com sucesso!")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error: any) {
      toast.error("Erro ao atualizar startup.")
    }
  }

  return (
    <div className={styles.pageBackground}>
      <ToastContainer />
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Voltar para Home
      </button>
      <div className={styles.container}>
        <h2 className={styles.title}>Editar Startup</h2>
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
        <button className={styles.button} onClick={handleUpdate}>
          Salvar alterações
        </button>
      </div>
    </div>
  )
}
