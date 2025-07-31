import React, { useEffect, useState } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  useDroppable
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { api } from "@/services/api"
import { apiPublic } from "@/services/apiPublic"
import { Startup } from "@/types/Startup"
import styles from "./DashboardTrello.module.css"
import { useRouter } from "next/router"

type ColumnId = "para_estudar" | "em_analise" | "due_diligence" | "investido" | "rejeitado"

const COLUMN_LABELS: Record<ColumnId, string> = {
  para_estudar: "Para Estudar",
  em_analise: "Em Análise",
  due_diligence: "Due Diligence",
  investido: "Investido",
  rejeitado: "Rejeitado"
}

function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={styles.column}>
      {children}
    </div>
  )
}

function CardContent({ item }: { item: Startup }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img src={item.imagem_de_capa} alt="Avatar" className={styles.avatar} />
      </div>
      <strong className={styles.title}>{item.nome_da_startup}</strong>
      <p className={styles.description}>{item.descricao}</p>
      <span className={`${styles.tag} ${item.vertical}`}>{item.vertical}</span>
    </div>
  )
}

function SortableCard({ item, activeId }: { item: Startup; activeId: string | null }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0 : 1 // invisível na coluna
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent item={item} />
    </div>
  )
}

export default function PainelTrello() {
  const [columns, setColumns] = useState<Record<ColumnId, Startup[]>>({
    para_estudar: [],
    em_analise: [],
    due_diligence: [],
    investido: [],
    rejeitado: []
  })
  const [isClient, setIsClient] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)

    async function fetchData() {
      try {
        const resPublic = await apiPublic.get<Startup[]>("/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups")
        const publicas = resPublic.data.map((s) => ({ ...s, id: String(s.id) }))

        let privadas: Startup[] = []
        const token = localStorage.getItem("token")
        if (token) {
          try {
            const resPrivadas = await api.get<Startup[]>("/startup", {
              headers: { Authorization: `Bearer ${token}` }
            })
            privadas = resPrivadas.data.map((s) => ({ ...s, id: String(s.id) }))
          } catch (err) {
            console.warn("Erro ao buscar startups privadas:", err)
          }
        }

        const todas = [...publicas, ...privadas]

        setColumns({
          para_estudar: todas,
          em_analise: [],
          due_diligence: [],
          investido: [],
          rejeitado: []
        })
      } catch (error) {
        console.error("Erro ao carregar startups:", error)
      }
    }

    fetchData()
  }, [router.asPath])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const from = (Object.keys(columns) as ColumnId[]).find((col) =>
      columns[col].some((s) => s.id === active.id)
    )

    const to = (Object.keys(columns) as ColumnId[]).find((col) =>
      columns[col].some((s) => s.id === over.id)
    ) || over.id as ColumnId

    if (!from || !to) return

    const activeItem = columns[from].find((s) => s.id === active.id)
    const overIndex = columns[to].findIndex((s) => s.id === over.id)

    if (!activeItem) return

    // Mesma coluna: mover internamente
    if (from === to) {
      const oldList = [...columns[from]]
      const fromIndex = oldList.findIndex((s) => s.id === active.id)

      if (fromIndex !== overIndex) {
        const updated = [...oldList]
        const [moved] = updated.splice(fromIndex, 1)
        updated.splice(overIndex, 0, moved)

        setColumns({
          ...columns,
          [from]: updated
        })
      }
      return
    }

    const updatedFrom = columns[from].filter((s) => s.id !== active.id)
    const updatedTo = [...columns[to]]
    updatedTo.splice(overIndex === -1 ? updatedTo.length : overIndex, 0, activeItem)

    setColumns({
      ...columns,
      [from]: updatedFrom,
      [to]: updatedTo
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.header}>Painel de Organização de Startups</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/" className={styles.backButton}>Voltar ao Início</a>
          <a href="/startups/cadastrar" className={styles.createButton}>+ Cadastrar Startup</a>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event) => setActiveId(String(event.active.id))}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className={styles.board}>
          {(Object.keys(COLUMN_LABELS) as ColumnId[]).map((colId) => (
            <DroppableColumn key={colId} id={colId}>
              <h3 className={styles.columnTitle}>{COLUMN_LABELS[colId]}</h3>
              <div className={styles.cardList}>
                {isClient && columns[colId].length > 0 ? (
                  <SortableContext
                    id={colId}
                    items={columns[colId].map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columns[colId].map((s) => (
                      <SortableCard key={s.id} item={s} activeId={activeId} />
                    ))}
                  </SortableContext>
                ) : (
                  columns[colId].map((s) => <SortableCard key={s.id} item={s} activeId={activeId} />)
                )}
              </div>
            </DroppableColumn>
          ))}
        </div>

        <DragOverlay>
          {activeId
            ? (() => {
              const allItems = Object.values(columns).flat()
              const item = allItems.find((s) => s.id === activeId)
              return item ? <CardContent item={item} /> : null
            })()
            : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
