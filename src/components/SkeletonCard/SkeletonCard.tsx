import React from "react"

export default function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: "#f3f4f6",
      borderRadius: "10px",
      padding: "16px",
      border: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      height: "160px"
    }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#e5e7eb" }} />
      <div style={{ width: "60%", height: "14px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
      <div style={{ width: "100%", height: "10px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
      <div style={{ width: "40%", height: "10px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
    </div>
  )
}
