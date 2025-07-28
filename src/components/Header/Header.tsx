import styles from "./Header.module.css"
import { useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src="/logo.svg" alt="IVC Logo" className={styles.logo} />
        <span className={styles.title}>IVC Startups</span>
      </div>

      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>Favoritos</a>
        {isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(false)}
            className={`${styles.navLink} ${styles.logoutBtn}`}
          >
            Sair
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsLoggedIn(true)}
              className={`${styles.navLink} ${styles.loginBtn}`}
            >
              Entrar
            </button>
            <button className={styles.signupBtn}>Cadastrar</button>
          </>
        )}
      </nav>
    </header>
  )
}
