import React from "react"
import styles from "./Filters.module.css"
import { Search } from "lucide-react"

interface FiltersProps {
  search: string
  vertical: string
  localizacao: string
  onSearchChange: (value: string) => void
  onVerticalChange: (value: string) => void
  onLocalizacaoChange: (value: string) => void
  verticalOptions: string[]
  localizacaoOptions: string[]
}

export default function Filters({
  search,
  vertical,
  localizacao,
  onSearchChange,
  onVerticalChange,
  onLocalizacaoChange,
  verticalOptions,
  localizacaoOptions,
}: FiltersProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscar startups...</h1>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar startups..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select value={vertical} onChange={(e) => onVerticalChange(e.target.value)} className={styles.select}>
          <option value="">Vertical</option>
          {verticalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={localizacao} onChange={(e) => onLocalizacaoChange(e.target.value)} className={styles.select}>
          <option value="">Localização</option>
          {localizacaoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}