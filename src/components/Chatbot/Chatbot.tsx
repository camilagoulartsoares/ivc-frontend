import React, { useEffect, useMemo, useRef, useState } from "react"
import { api } from "@/services/api"
import { Startup } from "@/types/Startup"
import styles from "./chatbot.module.css"

type RespostaBot =
  | { tipo: "erro"; resposta: string }
  | { tipo: "nenhum_resultado"; resposta: string }
  | { tipo: "resultado"; resposta: Startup[] }

type ChatRole = "user" | "bot"

type ChatItem = {
  id: string
  role: ChatRole
  text: string
  startups?: Startup[]
  ts: number
}

type Props = {
  onSelectStartup: (s: Startup) => void
  data: Startup[]
}

export default function Chatbot({ onSelectStartup, data }: Props) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState<ChatItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const ctrlRef = useRef<AbortController | null>(null)

  const suggestions = useMemo(
    () => ["me mostra fintech", "quero ver São Paulo", "procuro healthtech em Minas", "quero saber sobre Nubank"],
    []
  )

  useEffect(() => {
    try {
      const persisted = localStorage.getItem("chat_widget_v1")
      if (persisted) setChat(JSON.parse(persisted))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("chat_widget_v1", JSON.stringify(chat.slice(-100)))
    } catch {}
  }, [chat])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [chat, loading, open])

  function newId() {
    return (globalThis.crypto || window.crypto).randomUUID()
  }

  function push(role: ChatRole, text: string, startups?: Startup[]) {
    setChat((prev) => [...prev, { id: newId(), role, text, startups, ts: Date.now() }])
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    setError(null)
    push("user", text)
    setLoading(true)
    try {
      ctrlRef.current?.abort()
      const ctrl = new AbortController()
      ctrlRef.current = ctrl
      const { data: json } = await api.get<RespostaBot>("/chatbot", { params: { mensagem: text }, signal: ctrl.signal })
      if (json.tipo === "resultado") {
        const found = Array.isArray(json.resposta) ? json.resposta : []
        push("bot", `Encontrei ${found.length} startup(s).`, found)
      } else {
        push("bot", json.resposta)
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return
      const m = e?.response?.data?.message || "Erro ao falar com o chatbot. Tente novamente."
      setError(m)
      push("bot", m)
    } finally {
      setLoading(false)
    }
  }

  function handleStartupClick(s: Startup) {
    const inList = data.find((d) => String(d.id) === String(s.id))
    if (inList) onSelectStartup(inList)
    else onSelectStartup({ ...s, id: String(s.id) })
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={styles.chatToggle}
        aria-label={open ? "Fechar chatbot" : "Abrir chatbot"}
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div className={styles.chatContainer} role="dialog" aria-label="Chatbot de Startups">
          <div className={styles.header}>
            <div>Assistente de Startups</div>
            <div className={styles.status}>{loading ? "respondendo..." : "online"}</div>
          </div>

          {chat.length === 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => { setInput(s); setTimeout(send, 0) }} className={styles.suggestionBtn}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={listRef} className={styles.messages} aria-live="polite">
            {chat.length === 0 && (
              <div className={styles.emptyMsg}>
                Pergunte por nome, vertical ou localização. Ex.: "me mostra fintech", "quero ver São Paulo", "quero saber sobre Nubank".
              </div>
            )}

            {chat.map((item) => (
              <div key={item.id} className={`${styles.message} ${item.role === "user" ? styles.userMsg : styles.botMsg}`}>
                <div>{item.text}</div>
                {item.startups && item.startups.length > 0 && (
                  <div className={styles.startupList}>
                    {item.startups.slice(0, 5).map((s) => (
                      <button key={String((s as any).id || s.nome_da_startup)} onClick={() => handleStartupClick(s)} className={styles.startupBtn}>
                        <div className={styles.startupTitle}>{s.nome_da_startup}</div>
                        <div className={styles.startupSub}>{(s.vertical as string) || "Outro"} • {(s.localizacao as string) || "Não informada"}</div>
                      </button>
                    ))}
                  </div>
                )}
                <div className={`${styles.time} ${item.role === "user" ? styles.userTime : styles.botTime}`}>
                  {new Date(item.ts).toLocaleTimeString()}
                </div>
              </div>
            ))}

            {loading && <div className={styles.typing}>Digitando…</div>}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputArea}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Digite sua mensagem"
              rows={2}
              aria-label="Mensagem"
              className={styles.textarea}
            />
            <button
              onClick={send}
              disabled={loading || input.trim().length === 0}
              className={`${styles.sendBtn} ${(loading || input.trim().length === 0) ? styles.sendBtnDisabled : ""}`}
              aria-disabled={loading || input.trim().length === 0}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
