import React, { useEffect, useMemo, useRef, useState } from "react"
import { api } from "@/services/api"
import { Startup } from "@/types/Startup"

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
        style={{ position: "fixed", right: 24, bottom: 24, width: 56, height: 56, borderRadius: 999, backgroundColor: "#111827", color: "white", border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", fontSize: 18, cursor: "pointer", zIndex: 50 }}
        aria-label={open ? "Fechar chatbot" : "Abrir chatbot"}
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div
          style={{ position: "fixed", right: 24, bottom: 92, width: 360, maxHeight: 520, background: "white", borderRadius: 16, boxShadow: "0 16px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 50 }}
          role="dialog"
          aria-label="Chatbot de Startups"
        >
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 600 }}>Assistente de Startups</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{loading ? "respondendo..." : "online"}</div>
          </div>

          {chat.length === 0 && (
            <div style={{ padding: 12, borderBottom: "1px solid #e5e7eb", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s)
                    setTimeout(send, 0)
                  }}
                  style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={listRef} style={{ flex: 1, padding: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }} aria-live="polite">
            {chat.length === 0 && (
              <div style={{ fontSize: 14, color: "#6b7280" }}>
                Pergunte por nome, vertical ou localização. Ex.: "me mostra fintech", "quero ver São Paulo", "quero saber sobre Nubank".
              </div>
            )}

            {chat.map((item) => (
              <div key={item.id} style={{ alignSelf: item.role === "user" ? "flex-end" : "flex-start", background: item.role === "user" ? "#2563eb" : "#f3f4f6", color: item.role === "user" ? "white" : "#111827", padding: "8px 12px", borderRadius: 12, maxWidth: "90%" }}>
                <div style={{ whiteSpace: "pre-wrap" }}>{item.text}</div>
                {item.startups && item.startups.length > 0 && (
                  <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                    {item.startups.slice(0, 5).map((s) => (
                      <button
                        key={String((s as any).id || s.nome_da_startup)}
                        onClick={() => handleStartupClick(s)}
                        style={{ textAlign: "left", border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 10px", background: "white", cursor: "pointer" }}
                      >
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{s.nome_da_startup}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                          {(s.vertical as string) || "Outro"} • {(s.localizacao as string) || "Não informada"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: 10, color: item.role === "user" ? "#dbeafe" : "#6b7280", marginTop: 4 }}>
                  {new Date(item.ts).toLocaleTimeString()}
                </div>
              </div>
            ))}


            {loading && (
              <div style={{ alignSelf: "flex-start", background: "#f3f4f6", color: "#111827", padding: "8px 12px", borderRadius: 12, maxWidth: "80%", opacity: 0.8 }}>
                Digitando…
              </div>
            )}
          </div>

          {error && (
            <div style={{ padding: 8, color: "#b91c1c", fontSize: 12, textAlign: "center" }}>
              {error}
            </div>
          )}
          <div style={{ padding: 12, borderTop: "1px solid #e5e7eb", display: "flex", gap: 8 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder="Digite sua mensagem"
              rows={2}
              aria-label="Mensagem"
              style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 10, padding: "10px 12px", outline: "none", resize: "none" }}
            />
            <button
              onClick={send}
              disabled={loading || input.trim().length === 0}
              style={{ background: "#10b981", color: "white", border: "none", padding: "0 14px", borderRadius: 10, fontWeight: 600, cursor: loading || input.trim().length === 0 ? "not-allowed" : "pointer", opacity: loading || input.trim().length === 0 ? 0.6 : 1, height: 42 }}
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