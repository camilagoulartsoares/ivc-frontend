import { StartupCard } from "./StartupCard"
import type { Startup } from "../types/startup"

type Props = {
  startups: Startup[]
  onSelect: (startup: Startup) => void
}

export function StartupGrid({ startups, onSelect }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} onClick={() => onSelect(startup)} />
      ))}
    </div>
  )
}
