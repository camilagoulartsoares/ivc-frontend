import React from "react"
import { Star } from "lucide-react"
import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Star className={styles.starIcon} />
        <span className={styles.logoText}>Logo</span>
      </div>
      <div className={styles.nav}>
        <button className={styles.navButton}>Login</button>
        <button className={styles.navButton}>Tema Claro/Escuro</button>
      </div>
    </header>
  )
}
