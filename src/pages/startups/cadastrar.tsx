import React, { useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"
import styles from "./CadastrarStartup.module.css"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const imagensPredefinidas = ["/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png"]

export default function CadastrarStartupPage() {
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [imagemSelecionada, setImagemSelecionada] = useState(imagensPredefinidas[0])
    const router = useRouter()

    async function handleSubmit() {
        try {
            const token = localStorage.getItem("token")
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
                router.push("/")
            }, 2000)
        } catch (error: any) {
            console.error(error)
            toast.error("Erro ao cadastrar a startup")
        }
    }

    return (
        <div className={styles.pageBackground}>
            <ToastContainer />
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
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <p className={styles.subtitle}>Escolha uma imagem de capa</p>
                <div className={styles.imageGrid}>
                    {imagensPredefinidas.map((url) => (
                        <Image
                            key={url}
                            src={url}
                            alt="Imagem de capa"
                            width={100}
                            height={70}
                            className={`${styles.imageOption} ${imagemSelecionada === url ? styles.selected : ""}`}
                            onClick={() => setImagemSelecionada(url)}
                        />
                    ))}
                </div>

                <button className={styles.button} onClick={handleSubmit}>
                    Cadastrar
                </button>
            </div>
        </div>
    )



}
