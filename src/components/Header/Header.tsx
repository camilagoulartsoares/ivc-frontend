import React from "react"
import Link from "next/link"
import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topbar}>
        <Link href="#" className={styles.logo}>
          Startup<span className={styles.logoGray}>Invest</span>
        </Link>
        <div className={styles.actions}>
          <button className={styles.textButton}>Entrar</button>
          <button className={styles.primaryButton}>Cadastrar</button>
        </div>
      </div>

      <div className={styles.hero}>
        <h1 className={styles.title}>O Netflix das Startups</h1>
        <p className={styles.description}>
          Descubra, analise e invista nas startups mais promissoras do Brasil. Dados em tempo real,
          análises detalhadas e oportunidades exclusivas.
        </p>
        <div className={styles.buttons}>
          <button className={styles.primaryButton}>Começar a Investir</button>
          <button className={styles.secondaryButton}>Saiba Mais</button>
        </div>
      </div>
    </header>
  )
}
