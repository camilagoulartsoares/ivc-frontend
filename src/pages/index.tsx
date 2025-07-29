import React, { useEffect, useState } from "react"
import StartupCard from "@/components/StartupCard"
import StartupModal from "@/components/StartupModal/StartupModal"
import Filters from "@/components/Filters/Filters"
import { Startup } from "@/types/Startup"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { apiPublic } from "@/services/apiPublic"

export default function Home() {
  const [data, setData] = useState<Startup[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Startup | null>(null)
  const [search, setSearch] = useState("")
  const [vertical, setVertical] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiPublic.get("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")
        setData(response.data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  if (error) return <p>Erro: {error}</p>
  if (!data.length) return <p>Carregando...</p>

  const verticalOptions = Array.from(new Set(data.map((s) => s.vertical)))
  const localizacaoOptions = Array.from(new Set(data.map((s) => s.localizacao)))

  const filtered = data.filter((startup) =>
    startup.nome_da_startup.toLowerCase().includes(search.toLowerCase()) &&
    (vertical ? startup.vertical === vertical : true) &&
    (localizacao ? startup.localizacao === localizacao : true)
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>

      <Header />
      <div style={{ padding: "24px" }}>
        <Filters
          search={search}
          vertical={vertical}
          localizacao={localizacao}
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
          verticalOptions={verticalOptions}
          localizacaoOptions={localizacaoOptions}
        />

        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))"
          }}
        >
          {currentItems.map((startup) => (
            <StartupCard
              key={startup.id}
              nome={startup.nome_da_startup}
              vertical={startup.vertical}
              mrr={startup.mrr}
              imagem={startup.imagem_de_capa}
              onClick={() => setSelected(startup)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  margin: "0 8px",
                  padding: "8px 16px",
                  fontWeight: page === currentPage ? "bold" : "normal",
                  border: "1px solid #ccc",
                  backgroundColor: page === currentPage ? "#eee" : "white",
                  cursor: "pointer"
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <StartupModal
          startup={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <Footer />
    </>
  )

}
