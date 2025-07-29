import React from "react"
import Link from "next/link"
import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="#" className={styles.logo}>
        <span className={styles.logoText}>StartupInvest</span>
      </Link>
      <nav className={styles.nav}>
        <Link href="#" className={styles.navLink}>Descobrir</Link>
        <Link href="#" className={styles.navLink}>Como Funciona</Link>
        <Link href="#" className={styles.navLink}>Sobre Nós</Link>
        <Link href="#" className={styles.navLink}>Contato</Link>
      </nav>
      <div className={styles.actions}>
        <button className={styles.ghostButton}>Entrar</button>
        <button className={styles.primaryButton}>Cadastrar</button>
      </div>
    </header>
  )
}
