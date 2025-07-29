import React from "react"
import styles from "./styles.module.css"


interface StartupCardProps {
  nome: string
  vertical: string
  mrr: number
  imagem: string
  onClick: () => void
}

export default function StartupCard({ nome, vertical, mrr, imagem, onClick }: StartupCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={imagem || "/placeholder.svg?height=160&width=300"}
        alt={`Imagem de capa da startup ${nome}`}
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.vertical}>Vertical: {vertical}</p>
        <p className={styles.mrr}>MRR: R$ {mrr.toLocaleString("pt-BR")}</p>
        <button className={styles.button} onClick={onClick}>
          Ver detalhes
        </button>
      </div>
    </div>
  )
}
