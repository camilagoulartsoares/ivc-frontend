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
import Chatbot from "../components/Chatbot/Chatbot"

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

  const itemsPerPage = 10

  useEffect(() => {
    async function fetchData() {
      try {
        const publicasRes = await apiPublic.get<Startup[]>("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")
        let minhasResData: Startup[] = []
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
          try {
            const minhasRes = await api.get<Startup[]>("/startup")
            minhasResData = minhasRes.data
          } catch { }
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
    const stored = typeof window !== "undefined" ? localStorage.getItem("favoritos") : null
    if (stored) setFavoritos(JSON.parse(stored))
  }, [])

  function toggleFavorite(id: string) {
    setFavoritos((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      return updated
    })
  }

  const verticalOptions = useMemo(() => Array.from(new Set(data.map((s) => s.vertical))), [data])
  const localizacaoOptions = useMemo(() => Array.from(new Set(data.map((s) => s.localizacao))), [data])

  const filtered = data.filter((startup) =>
    startup.nome_da_startup?.toLowerCase().includes(search.toLowerCase()) &&
    (vertical ? startup.vertical === vertical : true) &&
    (localizacao ? startup.localizacao === localizacao : true) &&
    (!onlyFavorites || favoritos.includes(String(startup.id)))
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  if (error) return <p>Erro: {error}</p>

  return (
    <>
      <Head>
        <title>Investidores.vc</title>
        <meta name="description" content="Explore startups promissoras na plataforma Investidores.vc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.page}>
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
              <div key={index} style={{ background: "#f3f4f6", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", height: "160px", backgroundColor: "#e5e7eb" }} />
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
                  <button key={page} onClick={() => setCurrentPage(page)} style={{ width: "40px", height: "40px", borderRadius: "8px", fontWeight: 500, border: isActive ? "none" : "1px solid #d1d5db", backgroundColor: isActive ? "#34d399" : "white", color: isActive ? "white" : "#111827", cursor: "pointer", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.color = "white"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#111827"; } }}>
                    {page}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {selected && (
        <StartupModal startup={selected} onClose={() => setSelected(null)} />
      )}

      <Chatbot data={data} onSelectStartup={setSelected} />

      <Footer />
    </>
  )
}
