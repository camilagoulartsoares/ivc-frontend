import { ReactNode } from "react"
import { FiDollarSign } from "react-icons/fi"
import "./AuthForm.css"
import React from "react"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footerText?: ReactNode
}

export default function AuthLayout({ title, subtitle, children, footerText }: AuthLayoutProps) {
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="icon-container">
          <FiDollarSign size={28} />
        </div>

        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>

        {children}

        {footerText && <p className="footer-text">{footerText}</p>}
      </div>

      <div className="login-banner">
        <div className="banner-content">
          <h1 className="banner-title typing">Conheça as Startups do Futuro.</h1>
          <div className="banner-bottom">
            <p className="banner-subtitle">
              Uma plataforma onde investidores encontram startups reais<br />
              e fundadores têm total controle sobre suas criações — do cadastro à atualização.
            </p>

            <div className="cards">
              <div className="card credit-card">
                <div className="card-logo">🌀</div>
                <div className="credit-chip"></div>
                <p className="credit-balance">12,347.23 $</p>
                <p className="credit-subtitle">Combined balance</p>

                <div className="credit-footer">
                  <div className="credit-info">
                    <p className="credit-label">Primary Card</p>
                    <p className="credit-number">3495 •••• 6917</p>
                  </div>
                  <p className="credit-amount">2,546.64$</p>
                </div>

                <div className="credit-bottom">
                  <span className="credit-brand">VISA</span>
                  <button className="credit-button">View All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
