"use client"

import { useEffect, useState } from "react"
import { api } from "./service/services/api"

type Founder = {
  nome: string
  foto: string
  cargo: string
  email: string
}

type Startup = {
  id: number
  nome_da_startup: string
  imagem_de_capa: string
  descricao: string
  mercado: string
  problema: string
  solucao: string
  vertical: string
  localizacao: string
  fundadores: Founder[]
  site: string
  cresimento_mom: number
  mrr: number
}

// Componentes de ícones SVG
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const TrendingUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
)

const GlobeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const LargeSearchIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const TrendingUpLargeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
)

export default function App() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVertical, setSelectedVertical] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    console.log("🚀 Iniciando busca das startups...")
    fetchStartups()
  }, [])

  useEffect(() => {
    filterStartups()
  }, [startups, searchTerm, selectedVertical, selectedLocation])

  const fetchStartups = async () => {
    try {
      setLoading(true)
      const response = await api.get<Startup[]>("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")
      console.log("✅ Dados recebidos da API:", response.data)
      setStartups(response.data)
      setError(null)
    } catch (err) {
      console.error("❌ Erro ao buscar startups:", err)
      setError("Erro ao carregar as startups. Verifique sua conexão e a API key.")
      setStartups([]) // Array vazio em caso de erro
    } finally {
      setLoading(false)
    }
  }

  const filterStartups = () => {
    let filtered = startups

    // Filtro por nome
    if (searchTerm) {
      filtered = filtered.filter((startup) => startup.nome_da_startup.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filtro por vertical
    if (selectedVertical !== "all") {
      filtered = filtered.filter((startup) => startup.vertical.toLowerCase() === selectedVertical.toLowerCase())
    }

    // Filtro por localização
    if (selectedLocation !== "all") {
      filtered = filtered.filter((startup) =>
        startup.localizacao.toLowerCase().includes(selectedLocation.toLowerCase()),
      )
    }

    setFilteredStartups(filtered)
  }

  const getUniqueVerticals = () => {
    const verticals = startups.map((startup) => startup.vertical)
    return [...new Set(verticals)]
  }

  const getUniqueLocations = () => {
    const locations = startups.map((startup) => startup.localizacao.split(",")[0].trim())
    return [...new Set(locations)]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const openModal = (startup: Startup) => {
    setSelectedStartup(startup)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedStartup(null)
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#64748b" }}>Carregando startups...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          background: #3b82f6;
          color: white;
        }
        
        .badge-secondary {
          background: #e2e8f0;
          color: #475569;
        }
        
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .button-primary {
          background: #3b82f6;
          color: white;
        }
        
        .button-primary:hover {
          background: #2563eb;
        }
        
        .button-outline {
          background: transparent;
          color: #475569;
          border: 1px solid #d1d5db;
        }
        
        .button-outline:hover {
          background: #f8fafc;
        }
        
        .input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
            Netflix das Startups
          </h1>
          <p style={{ color: "#64748b", fontSize: "18px" }}>Descubra as startups mais promissoras do ecossistema IVC</p>
        </div>

        {/* Filtros */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              >
                <SearchIcon />
              </div>
              <input
                className="input"
                style={{ paddingLeft: "40px" }}
                placeholder="Buscar por nome da startup..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select className="select" value={selectedVertical} onChange={(e) => setSelectedVertical(e.target.value)}>
              <option value="all">Todas as verticais</option>
              {getUniqueVerticals().map((vertical) => (
                <option key={vertical} value={vertical.toLowerCase()}>
                  {vertical}
                </option>
              ))}
            </select>

            <select className="select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="all">Todas as localizações</option>
              {getUniqueLocations().map((location) => (
                <option key={location} value={location.toLowerCase()}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p style={{ color: "#dc2626", marginBottom: "8px" }}>{error}</p>
            <button onClick={fetchStartups} className="button button-outline" style={{ fontSize: "12px" }}>
              Tentar novamente
            </button>
          </div>
        )}

        {/* Startups Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="card"
              onClick={() => openModal(startup)}
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
                    `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(startup.nome_da_startup) || "/placeholder.svg"}`
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
          ))}
        </div>

        {/* Empty State */}
        {filteredStartups.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ color: "#cbd5e1", margin: "0 auto 16px" }}>
              <LargeSearchIcon />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#64748b", marginBottom: "8px" }}>
              Nenhuma startup encontrada
            </h3>
            <p style={{ color: "#9ca3af" }}>Tente ajustar os filtros para encontrar mais resultados.</p>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <p style={{ color: "#9ca3af" }}>Desenvolvido para o desafio técnico da Investidores.vc</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStartup && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
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
              {/* Header do Modal */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
                <img
                  src={
                    selectedStartup.imagem_de_capa ||
                    `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(selectedStartup.nome_da_startup) || "/placeholder.svg"}`
                  }
                  alt={selectedStartup.nome_da_startup}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(selectedStartup.nome_da_startup)}`
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "4px" }}>
                    {selectedStartup.nome_da_startup}
                  </h2>
                  <p style={{ fontSize: "16px", color: "#64748b", marginBottom: "8px" }}>{selectedStartup.descricao}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span className="badge badge-secondary">{selectedStartup.vertical}</span>
                    <div style={{ display: "flex", alignItems: "center", color: "#64748b" }}>
                      <div style={{ marginRight: "4px" }}>
                        <MapPinIcon />
                      </div>
                      {selectedStartup.localizacao}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}
              >
                {/* Informações do Negócio */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Mercado</h3>
                    <p style={{ color: "#64748b" }}>{selectedStartup.mercado}</p>
                  </div>

                  <div>
                    <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Problema</h3>
                    <p style={{ color: "#64748b" }}>{selectedStartup.problema}</p>
                  </div>

                  <div>
                    <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Solução</h3>
                    <p style={{ color: "#64748b" }}>{selectedStartup.solucao}</p>
                  </div>

                  <div style={{ display: "flex", gap: "24px" }}>
                    <div>
                      <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>Crescimento MoM</h3>
                      <div style={{ display: "flex", alignItems: "center", color: "#059669" }}>
                        <div style={{ marginRight: "4px" }}>
                          <TrendingUpLargeIcon />
                        </div>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                          {(selectedStartup.cresimento_mom * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>MRR</h3>
                      <span style={{ fontSize: "20px", fontWeight: "bold", color: "#3b82f6" }}>
                        {formatCurrency(selectedStartup.mrr)}
                      </span>
                    </div>
                  </div>

                  {selectedStartup.site && (
                    <a
                      href={selectedStartup.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-outline"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                      <GlobeIcon />
                      Visitar Site
                    </a>
                  )}
                </div>

                {/* Fundadores */}
                <div>
                  <h3 style={{ fontWeight: "600", color: "#1e293b", marginBottom: "16px" }}>Fundadores</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {selectedStartup.fundadores.map((founder, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "12px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={
                            founder.foto ||
                            `/placeholder.svg?height=40&width=40&text=${
                              encodeURIComponent(
                                founder.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join(""),
                              ) || "/placeholder.svg"
                            }`
                          }
                          alt={founder.nome}
                          className="avatar"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(
                              founder.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join(""),
                            )}`
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: "500", color: "#1e293b", marginBottom: "2px" }}>{founder.nome}</p>
                          <p style={{ fontSize: "14px", color: "#64748b" }}>{founder.cargo}</p>
                        </div>
                        <a
                          href={`mailto:${founder.email}`}
                          className="button button-outline"
                          style={{ padding: "8px" }}
                        >
                          <MailIcon />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
