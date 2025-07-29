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
        <h1 className={styles.title}>
          Conheça as Startups do Futuro.<br />
          Ou Crie a Sua e Controle Tudo em um Só Lugar.
        </h1>

        <p className={styles.description}>
          Uma plataforma onde investidores encontram startups reais<br />
          e fundadores têm total controle sobre suas criações — do cadastro à atualização.
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
