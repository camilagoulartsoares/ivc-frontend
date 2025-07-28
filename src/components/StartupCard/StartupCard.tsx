import { MapPinIcon } from "../icons/MapPinIcon"
import { TrendingUpIcon } from "../icons/TrendingUpIcon"
import type { Startup } from "../types/startup"

type Props = {
  startup: Startup
  onClick: () => void
}

export function StartupCard({ startup, onClick }: Props) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={
            startup.imagem_de_capa ||
            `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(startup.nome_da_startup)}`
          }
          alt={startup.nome_da_startup}
          style={{ width: "100%", height: "192px", objectFit: "cover" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(startup.nome_da_startup)}`
          }}
        />
        <div className="badge" style={{ position: "absolute", top: "8px", right: "8px" }}>
          {startup.vertical}
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {startup.nome_da_startup}
        </h3>

        <div style={{ display: "flex", alignItems: "center", color: "#64748b", marginBottom: "12px" }}>
          <div style={{ marginRight: "4px" }}>
            <MapPinIcon />
          </div>
          {startup.localizacao}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", color: "#059669" }}>
            <div style={{ marginRight: "4px" }}>
              <TrendingUpIcon />
            </div>
            <span style={{ fontWeight: "600" }}>{(startup.cresimento_mom * 100).toFixed(1)}%</span>
          </div>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>MoM</span>
        </div>
      </div>
    </div>
  )
}
