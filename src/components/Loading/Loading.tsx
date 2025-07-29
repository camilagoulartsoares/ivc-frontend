import React from "react"

export default function Loading() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #2e2e2e, #c0c0c0)"
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        border: "5px solid #ffffff",
        borderTop: "5px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  )
}
