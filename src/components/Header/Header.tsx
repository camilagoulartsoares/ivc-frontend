import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./Header.module.css"
import { FaChartLine } from "react-icons/fa"

export default function Header() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  function handleCreateStartupClick() {
    const token = localStorage.getItem("token")
    if (!token) {
      setShowModal(true)
    } else {
      router.push("/startups/cadastrar")
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
          <FaChartLine size={20} />
          <span>Investidores.vc</span>
        </Link>

        <div className={styles.actions}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.textButton}>Logout</button>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.secondaryButton}>Entrar</button>
              </Link>
              <Link href="/register" className={styles.primaryButton}>Cadastrar</Link>
            </>
          )}
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
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalText}>Oi, fundador, você precisa estar logado para criar uma startup.</p>
            <button onClick={() => setShowModal(false)} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}
    </header>
  )
}
