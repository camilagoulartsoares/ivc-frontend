import { useState } from "react"
import { useStartups } from "./hooks/useStartups"
import { Header } from "./components/Header"
import { Filters } from "./components/Filters"
import { StartupGrid } from "./components/StartupGrid"
import { StartupModal } from "./components/StartupModal"
import { LargeSearchIcon } from "./icons/LargeSearchIcon"
import type { Startup } from "./types/startup"

export default function App() {
  const {
    filteredStartups,
    loading,
    error,
    searchTerm,
    selectedVertical,
    selectedLocation,
    setSearchTerm,
    setSelectedVertical,
    setSelectedLocation,
    getUniqueVerticals,
    getUniqueLocations,
    fetchStartups,
  } = useStartups()

  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const isModalOpen = !!selectedStartup

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Carregando startups...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "32px 16px", maxWidth: "1200px", margin: "0 auto" }}>
      <Header />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedVertical={selectedVertical}
        setSelectedVertical={setSelectedVertical}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        getUniqueVerticals={getUniqueVerticals}
        getUniqueLocations={getUniqueLocations}
      />

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={fetchStartups}>Tentar novamente</button>
        </div>
      )}

      <StartupGrid startups={filteredStartups} onSelect={(s) => setSelectedStartup(s)} />

      {filteredStartups.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <LargeSearchIcon />
          <h3>Nenhuma startup encontrada</h3>
        </div>
      )}

      {isModalOpen && selectedStartup && (
        <StartupModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} formatCurrency={formatCurrency} />
      )}
    </div>
  )
}
