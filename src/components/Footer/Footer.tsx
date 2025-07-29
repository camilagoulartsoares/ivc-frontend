import React from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.logoTitle}>StartupInvest</h3>
          <p className={styles.description}>
            Conectando investidores às startups mais inovadoras do Brasil.
          </p>
          <div className={styles.social}>
            <Link href="#" className={styles.socialLink}><Facebook size={20} /></Link>
            <Link href="#" className={styles.socialLink}><Twitter size={20} /></Link>
            <Link href="#" className={styles.socialLink}><Instagram size={20} /></Link>
            <Link href="#" className={styles.socialLink}><Linkedin size={20} /></Link>
          </div>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Navegação</h4>
          <ul className={styles.list}>
            <li><Link href="#" className={styles.link}>Descobrir Startups</Link></li>
            <li><Link href="#" className={styles.link}>Como Funciona</Link></li>
            <li><Link href="#" className={styles.link}>FAQ</Link></li>
            <li><Link href="#" className={styles.link}>Termos de Uso</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Recursos</h4>
          <ul className={styles.list}>
            <li><Link href="#" className={styles.link}>Blog</Link></li>
            <li><Link href="#" className={styles.link}>Webinars</Link></li>
            <li><Link href="#" className={styles.link}>Relatórios</Link></li>
            <li><Link href="#" className={styles.link}>Parcerias</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Contato</h4>
          <p className={styles.contact}>
            Rua Exemplo, 123<br />
            Cidade, Estado - CEP 00000-000<br />
            Email: contato@startupinvest.com<br />
            Telefone: (XX) XXXX-XXXX
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()} StartupInvest. Todos os direitos reservados.
      </div>
    </footer>
  )
}
