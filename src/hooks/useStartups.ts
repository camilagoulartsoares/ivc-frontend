import { useEffect, useState } from "react"
import { api } from "../service/services/api"
import type { Startup } from "../types/startup"

export function useStartups() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVertical, setSelectedVertical] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  useEffect(() => {
    fetchStartups()
  }, [])

  useEffect(() => {
    filterStartups()
  }, [startups, searchTerm, selectedVertical, selectedLocation])

  const fetchStartups = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<Startup[]>("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")
      setStartups(data)
      setError(null)
    } catch {
      setError("Erro ao carregar as startups. Verifique sua conexão e a API key.")
      setStartups([])
    } finally {
      setLoading(false)
    }
  }

  const filterStartups = () => {
    let filtered = startups

    if (searchTerm) {
      filtered = filtered.filter((s) =>
        s.nome_da_startup.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedVertical !== "all") {
      filtered = filtered.filter(
        (s) => s.vertical.toLowerCase() === selectedVertical.toLowerCase(),
      )
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter((s) =>
        s.localizacao.toLowerCase().includes(selectedLocation.toLowerCase()),
      )
    }

    setFilteredStartups(filtered)
  }

  const getUniqueVerticals = () => {
    return [...new Set(startups.map((s) => s.vertical))]
  }

  const getUniqueLocations = () => {
    return [...new Set(startups.map((s) => s.localizacao.split(",")[0].trim()))]
  }

  return {
    startups,
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
  }
}
