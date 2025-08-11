import React, { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import StartupCard from "@/components/StartupCard"
import StartupModal from "@/components/StartupModal/StartupModal"
import Filters from "@/components/Filters/Filters"
import { Startup } from "@/types/Startup"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { api } from "@/services/api"
import { apiPublic } from "@/services/apiPublic"
import styles from "./Home.module.css"

type RespostaBot =
  | { tipo: "erro"; resposta: string }
  | { tipo: "nenhum_resultado"; resposta: string }
  | { tipo: "resultado"; resposta: Startup[] }

type ChatItem =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "bot"; text: string; startups?: Startup[] }

export default function Home() {
  const [data, setData] = useState<Startup[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Startup | null>(null)
  const [search, setSearch] = useState("")
  const [vertical, setVertical] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [chat, setChat] = useState<ChatItem[]>([])

  const itemsPerPage = 10

  useEffect(() => {
    async function fetchData() {
      try {
        const publicasRes = await apiPublic.get<Startup[]>("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")

        let minhasResData: Startup[] = []

        const token = localStorage.getItem("token")
        if (token) {
          try {
            const minhasRes = await api.get<Startup[]>("/startup")
            minhasResData = minhasRes.data
          } catch {
          }
        }

        const minhasFormatadas = minhasResData.map((s) => ({
          ...s,
          id: String(s.id),
          vertical: s.vertical || "Outro",
          localizacao: s.localizacao || "Não informada",
          cresimento_mom: s.cresimento_mom || 0,
          isMinha: true
        }))

        const publicasFormatadas = publicasRes.data.map((s) => ({
          ...s,
          id: String(s.id),
          vertical: s.vertical || "Outro",
          localizacao: s.localizacao || "Não informada",
          cresimento_mom: s.cresimento_mom || 0,
          isMinha: false
        }))

        const todas = [...publicasFormatadas, ...minhasFormatadas]
        setData(todas)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar startups")
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem("favoritos")
    if (stored) {
      setFavoritos(JSON.parse(stored))
    }
  }, [])

  function toggleFavorite(id: string) {
    setFavoritos((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
      localStorage.setItem("favoritos", JSON.stringify(updated))
      return updated
    })
  }

  const verticalOptions = useMemo(
    () => Array.from(new Set(data.map((s) => s.vertical))),
    [data]
  )
  const localizacaoOptions = useMemo(
    () => Array.from(new Set(data.map((s) => s.localizacao))),
    [data]
  )

  const filtered = data.filter((startup) =>
    startup.nome_da_startup?.toLowerCase().includes(search.toLowerCase()) &&
    (vertical ? startup.vertical === vertical : true) &&
    (localizacao ? startup.localizacao === localizacao : true) &&
    (!onlyFavorites || favoritos.includes(String(startup.id)))
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  function newId() {
    return crypto.randomUUID()
  }

  async function sendChat() {
    const text = chatInput.trim()
    if (!text || chatLoading) return

    setChat((prev) => [...prev, { id: newId(), role: "user", text }])
    setChatInput("")
    setChatLoading(true)

    try {
      const { data: json } = await api.get<RespostaBot>("/chatbot", {
        params: { mensagem: text }
      })

      const botMessage: ChatItem =
        json.tipo === "resultado"
          ? {
              id: newId(),
              role: "bot",
              text: `Encontrei ${json.resposta.length} startup(s).`,
              startups: json.resposta
            }
          : {
              id: newId(),
              role: "bot",
              text: json.resposta
            }

      setChat((prev) => [...prev, botMessage])
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Erro ao falar com o chatbot. Tente novamente."
      setChat((prev) => [...prev, { id: newId(), role: "bot", text: message }])
    } finally {
      setChatLoading(false)
    }
  }

  if (error) return <p>Erro: {error}</p>

  return (
    <>
      <Head>
        <title>Investidores.vc</title>
        <meta name="description" content="Explore startups promissoras na plataforma Investidores.vc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div style={{ padding: "24px" }}>
        <Filters
          search={search}
          vertical={vertical}
          localizacao={localizacao}
          onlyFavorites={onlyFavorites}
          onSearchChange={(value) => {
            setSearch(value)
            setCurrentPage(1)
          }}
          onVerticalChange={(value) => {
            setVertical(value)
            setCurrentPage(1)
          }}
          onLocalizacaoChange={(value) => {
            setLocalizacao(value)
            setCurrentPage(1)
          }}
          onOnlyFavoritesChange={(value) => {
            setOnlyFavorites(value)
            setCurrentPage(1)
          }}
          verticalOptions={verticalOptions}
          localizacaoOptions={localizacaoOptions}
        />

        {!data.length ? (
          <div className={styles["card-grid"]}>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                style={{
                  background: "#f3f4f6",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    backgroundColor: "#e5e7eb"
                  }}
                />
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ width: "70%", height: "16px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
                  <div style={{ width: "100%", height: "12px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
                  <div style={{ width: "40%", height: "12px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ marginTop: "40px", fontSize: "18px", textAlign: "center", color: "#6b7280" }}>
            Nenhuma startup encontrada com esses filtros.
          </p>
        ) : (
          <>
            <div id="startup-cards" className={styles["card-grid"]}>
              {currentItems.map((startup) => (
                <StartupCard
                  key={startup.id}
                  id={startup.id}
                  nome_da_startup={startup.nome_da_startup}
                  imagem_de_capa={startup.imagem_de_capa}
                  descricao={startup.descricao}
                  vertical={startup.vertical}
                  localizacao={startup.localizacao}
                  cresimento_mom={startup.cresimento_mom}
                  isFavorited={favoritos.includes(String(startup.id))}
                  onToggleFavorite={toggleFavorite}
                  onClickSaibaMais={() => setSelected(startup)}
                  isMinha={startup.isMinha}
                />
              ))}
            </div>

            <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "12px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === currentPage
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      fontWeight: 500,
                      border: isActive ? "none" : "1px solid #d1d5db",
                      backgroundColor: isActive ? "#34d399" : "white",
                      color: isActive ? "white" : "#111827",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#2563eb"
                        e.currentTarget.style.color = "white"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "white"
                        e.currentTarget.style.color = "#111827"
                      }
                    }}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {selected && (
        <StartupModal
          startup={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <button
        onClick={() => setChatOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: 999,
          backgroundColor: "#111827",
          color: "white",
          border: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          fontSize: 18,
          cursor: "pointer",
          zIndex: 50
        }}
        aria-label={chatOpen ? "Fechar chatbot" : "Abrir chatbot"}
      >
        {chatOpen ? "×" : "💬"}
      </button>

      {chatOpen && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 92,
            width: 360,
            maxHeight: 520,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 50
          }}
          role="dialog"
          aria-label="Chatbot de Startups"
        >
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 600 }}>Assistente de Startups</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{chatLoading ? "respondendo..." : "online"}</div>
          </div>

          <div style={{ flex: 1, padding: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {chat.length === 0 && (
              <div style={{ fontSize: 14, color: "#6b7280" }}>
                Pergunte por nome, vertical ou localização. Ex.: "me mostra fintech", "quero ver São Paulo", "quero saber sobre Nubank".
              </div>
            )}

            {chat.map((item) => {
              if (item.role === "user") {
                return (
                  <div key={item.id} style={{ alignSelf: "flex-end", background: "#2563eb", color: "white", padding: "8px 12px", borderRadius: 12, maxWidth: "80%" }}>
                    {item.text}
                  </div>
                )
              }
              return (
                <div key={item.id} style={{ alignSelf: "flex-start", background: "#f3f4f6", color: "#111827", padding: "8px 12px", borderRadius: 12, maxWidth: "90%" }}>
                  <div>{item.text}</div>
                  {item.startups && item.startups.length > 0 && (
                    <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                      {item.startups.slice(0, 5).map((s) => (
                        <button
                          key={String((s as any).id || s.nome_da_startup)}
                          onClick={() => {
                            const found = data.find((d) => String(d.id) === String((s as any).id))
                            if (found) setSelected(found)
                          }}
                          style={{
                            textAlign: "left",
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: "8px 10px",
                            background: "white",
                            cursor: "pointer"
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{s.nome_da_startup}</div>
                          <div style={{ fontSize: 12, color: "#6b7280" }}>
                            {(s.vertical as string) || "Outro"} • {(s.localizacao as string) || "Não informada"}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {chatLoading && (
              <div style={{ alignSelf: "flex-start", background: "#f3f4f6", color: "#111827", padding: "8px 12px", borderRadius: 12, maxWidth: "80%", opacity: 0.8 }}>
                Digitando…
              </div>
            )}
          </div>

          <div style={{ padding: 12, borderTop: "1px solid #e5e7eb", display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendChat()
              }}
              placeholder="Digite sua mensagem"
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: 10,
                padding: "10px 12px",
                outline: "none"
              }}
            />
            <button
              onClick={sendChat}
              disabled={chatLoading || chatInput.trim().length === 0}
              style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "0 14px",
                borderRadius: 10,
                fontWeight: 600,
                cursor: chatLoading || chatInput.trim().length === 0 ? "not-allowed" : "pointer",
                opacity: chatLoading || chatInput.trim().length === 0 ? 0.6 : 1
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
