import { XIcon } from "../icons/XIcon"
import { GlobeIcon } from "../icons/GlobeIcon"
import { MailIcon } from "../icons/MailIcon"
import { MapPinIcon } from "../icons/MapPinIcon"
import { TrendingUpLargeIcon } from "../icons/TrendingUpLargeIcon"
import type { Startup } from "../types/startup"

type Props = {
  startup: Startup
  onClose: () => void
  formatCurrency: (value: number) => string
}

export function StartupModal({ startup, onClose, formatCurrency }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <XIcon />
        </button>

        <div style={{ padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
            <img
              src={
                startup.imagem_de_capa ||
                `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(startup.nome_da_startup)}`
              }
              alt={startup.nome_da_startup}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(startup.nome_da_startup)}`
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "4px" }}>
                {startup.nome_da_startup}
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", marginBottom: "8px" }}>{startup.descricao}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span className="badge badge-secondary">{startup.vertical}</span>
                <div style={{ display: "flex", alignItems: "center", color: "#64748b" }}>
                  <div style={{ marginRight: "4px" }}>
                    <MapPinIcon />
                  </div>
                  {startup.localizacao}
                </div>
              </div>
            </div>
          </div>

          {/* ...outros detalhes que você pode colar da versão original */}
        </div>
      </div>
    </div>
  )
}
