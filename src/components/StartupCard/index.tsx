import React, { useState } from "react"
import styles from "./styles.module.css"
import { MapPin, LineChart, Heart, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { api } from "@/services/api"

interface StartupCardProps {
  id: string
  nome_da_startup: string
  imagem_de_capa: string
  descricao: string
  vertical: string
  localizacao: string
  cresimento_mom?: number
  isFavorited: boolean
  onToggleFavorite?: (id: string) => void
  onClickSaibaMais: () => void
  isMinha?: boolean
}

export default function StartupCard({
  id,
  nome_da_startup,
  imagem_de_capa,
  descricao,
  vertical,
  localizacao,
  cresimento_mom,
  onClickSaibaMais,
  isFavorited,
  onToggleFavorite,
  isMinha,
}: StartupCardProps) {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token")

      await api.delete(`/startup/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Startup deletada com sucesso!")
      router.refresh()
    } catch (error) {
      toast.error("Erro ao deletar startup.")
    }
  }

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["external-buttons"]}>
        <button
          className={styles["icon-circle-button"]}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(id)
          }}
        >
          <Heart
            size={16}
            fill={isFavorited ? "#ef4444" : "#d1d5db"}
            color={isFavorited ? "#ef4444" : "#d1d5db"}
          />
        </button>

        {isMinha && (
          <>
            <button
              className={styles["icon-circle-button"]}
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/editar-startup/${id}`)
              }}
            >
              <Pencil size={14} color="#6b7280" />
            </button>

            <button
              className={styles["icon-circle-button"]}
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteModal(true)
              }}
            >
              <Trash2 size={14} color="#6b7280" />
            </button>
          </>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles["image-container"]}>
          <img
            src={
              imagem_de_capa?.startsWith("http") || imagem_de_capa?.startsWith("/")
                ? imagem_de_capa
                : `/assets/${imagem_de_capa}`
            }
            alt={`Imagem de capa da startup ${nome_da_startup}`}
            className={styles.image}
          />

          {cresimento_mom !== undefined && (
            <div className={styles["growth-badge"]}>
              <LineChart size={14} />
              <span>{`+${(cresimento_mom * 100).toFixed(1)}%`}</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles["header-content"]}>
            <h2 className={styles.nome}>{nome_da_startup}</h2>
            <span className={styles["vertical-tag"]}>{vertical}</span>
          </div>

          <p className={styles.description}>{descricao}</p>

          <div className={styles["footer-row"]}>
            <div className={styles["location-container"]}>
              <MapPin size={16} className={styles["location-icon"]} />
              <p className={styles["location-text"]}>{localizacao}</p>
            </div>

            <button onClick={onClickSaibaMais} className={styles.button}>
              Saiba mais
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalText}>Tem certeza que deseja excluir essa startup?</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.modalButton}
                style={{ backgroundColor: "#6b7280" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete()
                  setShowDeleteModal(false)
                }}
                className={styles.modalButton}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
