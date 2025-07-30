import React, { useEffect, useState } from "react"
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useDroppable
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Startup } from "@/types/Startup"
import { apiPublic } from "@/services/apiPublic"
import styles from "./DashboardTrello.module.css"

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

function SortableCard({ item }: { item: Startup }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} className={styles.card} style={style} {...attributes} {...listeners}>
      <strong>{item.nome_da_startup}</strong>
      <span className={styles.details}>{item.descricao}</span>
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

  useEffect(() => {
    async function fetchData() {
      const res = await apiPublic.get<Startup[]>(
        "/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups"
      )
      const startups = res.data.map((s) => ({ ...s, id: String(s.id) }))

      setColumns({
        para_estudar: startups.slice(0, 2),
        em_analise: startups.slice(2, 3),
        due_diligence: startups.slice(3, 4),
        investido: startups.slice(4, 5),
        rejeitado: startups.slice(5, 6)
      })
    }

    fetchData()
  }, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const from = (Object.keys(columns) as ColumnId[]).find((col) =>
      columns[col].some((s) => s.id === active.id)
    )

    let to = (Object.keys(columns) as ColumnId[]).find((col) => col === over.id)

    if (!to) {
      const found = (Object.entries(columns) as [ColumnId, Startup[]][]).find(([_, list]) =>
        list.some((s) => s.id === over.id)
      )
      to = found?.[0]
    }

    if (!from || !to || from === to) return

    const item = columns[from].find((s) => s.id === active.id)
    if (!item) return

    setColumns({
      ...columns,
      [from]: columns[from].filter((s) => s.id !== item.id),
      [to]: [...columns[to], item]
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Painel de Organização de Startups</h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={styles.board}>
          {(Object.keys(COLUMN_LABELS) as ColumnId[]).map((colId) => (
            <DroppableColumn key={colId} id={colId}>
              <h3 className={styles.columnTitle}>{COLUMN_LABELS[colId]}</h3>
              <SortableContext
                id={colId}
                items={columns[colId].map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {columns[colId].map((s) => (
                  <SortableCard key={s.id} item={s} />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </div>
  )
}
