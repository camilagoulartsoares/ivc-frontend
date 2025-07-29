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
          <Link href="/login" className={styles.textButton}>Entrar</Link>
          <Link href="/register" className={styles.primaryButton}>Cadastrar</Link>
        </div>
      </div>

      <div className={styles.hero}>
        <h1 className={styles.title}>O Netflix das Startups</h1>
        <p className={styles.description}>
          Conheça startups promissoras antes de todo mundo.
          <br />
          Enquanto você investe, os próprios fundadores estão por trás cadastrando, atualizando e gerenciando suas startups em um painel exclusivo — tudo para garantir dados reais, atualizados e validados antes de entrar na vitrine.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryButton}>Começar a Investir</button>
          <Link href="/register" className={styles.secondaryButton}>
            Cadastrar sua Startup
          </Link>
        </div>
      </div>
    </header>
  )
}
