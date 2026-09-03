"use client";

import { FaPhone, FaEnvelope } from "react-icons/fa";

export default function TopBar() {
  return (
    <div style={{ background: "var(--bg-deep)" }}>
      <div className="m-container" style={{ padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a href="tel:0334314795" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: "var(--on-deep-soft)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            <FaPhone size={10} style={{ color: "#7FD9C4" }} /> 033 431 4795
          </a>
          <a href="mailto:info@medhinhospital.com" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: "var(--on-deep-soft)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            <FaEnvelope size={10} style={{ color: "#7FD9C4" }} /> info@medhinhospital.com
          </a>
        </div>
        <div style={{ fontSize: "0.76rem", color: "var(--on-deep-soft)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7FD9C4" }} />
          24/7 Emergency Care
        </div>
      </div>
    </div>
  );
}
