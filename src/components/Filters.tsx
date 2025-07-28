import { SearchIcon } from "../icons/SearchIcon"

type Props = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedVertical: string
  setSelectedVertical: (value: string) => void
  selectedLocation: string
  setSelectedLocation: (value: string) => void
  getUniqueVerticals: () => string[]
  getUniqueLocations: () => string[]
}

export function Filters({
  searchTerm,
  setSearchTerm,
  selectedVertical,
  setSelectedVertical,
  selectedLocation,
  setSelectedLocation,
  getUniqueVerticals,
  getUniqueLocations,
}: Props) {
  return (
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
  )
}
