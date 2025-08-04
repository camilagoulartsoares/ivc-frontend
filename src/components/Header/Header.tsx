import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaChartLine, FaMoon, FaSun } from "react-icons/fa"
import styles from "./Header.module.css"

export default function Header() {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.setAttribute("data-theme", storedTheme)
    }
  }, [])

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  function handleCreateStartupClick() {
    const token = localStorage.getItem("token")
    if (!token) {
      setShowModal(true)
    } else {
      router.push("/startups/cadastrar?from=home")
    }
  }

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className={styles.header}>
      <div className={styles.topbar}>
        <Link href="/" className={styles.logo} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FaChartLine size={20} style={{ color: "#0ea5e9" }} />
          <span>Investidores.vc</span>
        </Link>

        <div className={styles.actions}>
          {isLoggedIn && (
            <Link href="/dashboard">
              <button className={styles.secondaryButton}>Dashboard</button>
            </Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.primaryButton}>Logout</button>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.secondaryButton}>Entrar</button>
              </Link>
              <Link href="/register" className={styles.primaryButton}>Cadastrar</Link>
            </>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={toggleTheme} className={styles.iconButton}>
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className={styles.languageSelect}
            >
              <option value="pt">🇧🇷</option>
              <option value="en">🇺🇸</option>
            </select>
          </div>
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
          <button
            className={styles.primaryButton}
            onClick={() => {
              const element = document.getElementById("startup-cards")
              if (element) {
                window.scrollTo({ top: element.offsetTop, behavior: "smooth" })
              }
            }}
          >
            Conheça Mais
          </button>
          <button onClick={handleCreateStartupClick} className={styles.secondaryButton}>
            Cadastrar sua Startup
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} data-show="true">
          <div className={styles.modal}>
            <p className={styles.modalText}>
              Oi, fundador, você precisa estar logado para criar uma startup.
            </p>
            <button onClick={() => setShowModal(false)} className={styles.modalButton}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
