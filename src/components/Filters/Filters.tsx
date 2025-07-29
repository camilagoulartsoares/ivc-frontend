import React from "react"
import styles from "./Filters.module.css"
import { Search } from "lucide-react"

interface FiltersProps {
  search: string
  vertical: string
  localizacao: string
  onlyFavorites: boolean
  onSearchChange: (value: string) => void
  onVerticalChange: (value: string) => void
  onLocalizacaoChange: (value: string) => void
  onOnlyFavoritesChange: (value: boolean) => void
  verticalOptions: string[]
  localizacaoOptions: string[]
}

export default function Filters({
  search,
  vertical,
  localizacao,
  onlyFavorites,
  onSearchChange,
  onVerticalChange,
  onLocalizacaoChange,
  onOnlyFavoritesChange,
  verticalOptions,
  localizacaoOptions,
}: FiltersProps) {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select value={vertical} onChange={(e) => onVerticalChange(e.target.value)} className={styles.select}>
          <option value="">Vertical</option>
          {verticalOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select value={localizacao} onChange={(e) => onLocalizacaoChange(e.target.value)} className={styles.select}>
          <option value="">Localização</option>
          {localizacaoOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button
          onClick={() => onOnlyFavoritesChange(!onlyFavorites)}
          className={`${styles.favoriteButton} ${onlyFavorites ? styles.active : ""}`}
        >
          {onlyFavorites ? "Todos" : "Mostrar Favoritos"}
        </button>
      </div>
    </div>
  )
}
