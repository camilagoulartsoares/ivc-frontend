import React from "react"
import { Startup } from "@/types/Startup"
import styles from "./StartupModal.module.css"

interface Props {
  startup: Startup
  onClose: () => void
}

export default function StartupModal({ startup, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>✕</button>

        <img src={startup.imagem_de_capa} alt={startup.nome_da_startup} className={styles.coverImage} />
        <h2>{startup.nome_da_startup}</h2>
        <p><strong>Descrição:</strong> {startup.descricao}</p>
        <p><strong>Problema:</strong> {startup.problema}</p>
        <p><strong>Solução:</strong> {startup.solucao}</p>
        <p><strong>Vertical:</strong> {startup.vertical}</p>
        <p><strong>Mercado:</strong> {startup.mercado}</p>
        <p><strong>Localização:</strong> {startup.localizacao}</p>
        <p><strong>Site:</strong> <a href={startup.site} target="_blank">{startup.site}</a></p>
        <p><strong>MRR:</strong> R$ {startup.mrr.toLocaleString("pt-BR")}</p>
        <p><strong>Crescimento MoM:</strong> {startup.cresimento_mom * 100}%</p>

        <div className={styles.founders}>
          <h3>Fundadores</h3>
          <div className={styles.founderList}>
            {startup.fundadores.map((f, index) => (
              <div key={index} className={styles.founderCard}>
                <img src={f.foto} alt={f.nome} className={styles.founderImage} />
                <p>{f.nome}</p>
                <p>{f.cargo}</p>
                <p>{f.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
