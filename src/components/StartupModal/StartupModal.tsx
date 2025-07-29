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
        <div className={styles.header}>
          <h2 className={styles.title}>{startup.nome_da_startup}</h2>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>

        <div className={styles.imageWrapper}>
          <img src={startup.imagem_de_capa} alt={startup.nome_da_startup} className={styles.image} />
          <span className={styles.growthTag}>↑ {(startup.cresimento_mom * 100).toFixed(1)}% crescimento</span>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoBlock}><span>{startup.vertical}</span><small>Vertical</small></div>
          <div className={styles.infoBlock}><span>{startup.localizacao}</span><small>Localização</small></div>
          <div className={styles.infoBlock}><span>R$ {startup.mrr.toLocaleString("pt-BR")}</span><small>MRR</small></div>
        </div>

        <div className={styles.content}>
          <h3>Sobre a Startup</h3>
          <p>{startup.descricao}</p>
        </div>

        <div className={styles.foundersSection}>
          <h3 className={styles.foundersTitle}>Fundadores</h3>
          <div className={styles.foundersList}>
            {startup.fundadores?.map((founder) => (
              <div key={founder.email} className={styles.founderCard}>
                <img src={founder.foto} alt={founder.nome} className={styles.founderPhoto} />
                <div className={styles.founderName}>{founder.nome}</div>
                <div className={styles.founderRole}>{founder.cargo}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <a href={startup.site} target="_blank" className={styles.button}>Visitar site</a>
        </div>
      </div>
    </div>
  )
}
