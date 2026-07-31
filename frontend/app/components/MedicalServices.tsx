"use client";

import { FaAmbulance, FaBaby, FaFlask, FaXRay, FaDesktop, FaBrain, FaCut, FaHeartbeat } from "react-icons/fa";
import { useLocale } from "@/app/locale-provider";
import Link from "next/link";

const services = [
  { key: "emergency", icon: <FaAmbulance size={20} />, color: "#ef4444", bg: "#fef2f2" },
  { key: "delivery", icon: <FaBaby size={20} />, color: "#ec4899", bg: "#fdf2f8" },
  { key: "laboratory", icon: <FaFlask size={20} />, color: "#8b5cf6", bg: "#f5f3ff" },
  { key: "xray", icon: <FaXRay size={20} />, color: "#f97316", bg: "#fff7ed" },
  { key: "ultrasound", icon: <FaDesktop size={20} />, color: "#06b6d4", bg: "#ecfeff" },
  { key: "ct-scan", icon: <FaBrain size={20} />, color: "#14b8a6", bg: "#f0fdfa" },
  { key: "surgical", icon: <FaCut size={20} />, color: "var(--primary)", bg: "var(--primary-50)" },
  { key: "ecg", icon: <FaHeartbeat size={20} />, color: "#7FD9C4", bg: "var(--primary-100)" },
];

const taglines = [
  "Immediate Response",
  "Safe & Compassionate",
  "Accurate & Fast",
  "Digital Precision",
  "3D/4D Imaging",
  "Advanced Scanning",
  "Expert Precision",
  "Heart Monitoring",
];

export default function MedicalServices() {
  const { t } = useLocale();

  return (
    <section style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div className="m-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="m-eyebrow" style={{ justifyContent: "center" }}>Our Departments</div>
          <h2 className="m-h2" style={{ marginBottom: 12 }}>
            {t("medicalServices.title")}
          </h2>
          <p className="m-lede" style={{ maxWidth: 560, margin: "0 auto" }}>
            Advanced care with modern technology and dedicated specialists across every department.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {services.map((service, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={service.key}
                href={`/services/${service.key}`}
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  padding: "32px 28px",
                  textDecoration: "none",
                  transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
                  overflow: "hidden",
                  display: "block",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                  e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                {/* Number */}
                <div style={{ position: "absolute", top: 20, right: 20, fontSize: "3rem", fontWeight: 800, color: "var(--bg-tint)", lineHeight: 1, fontFamily: "system-ui, sans-serif", letterSpacing: "-0.04em", userSelect: "none" }}>
                  {num}
                </div>

                {/* Top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${service.color}, ${service.color}88)` }} />

                {/* Icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: service.bg, color: service.color, marginBottom: 20, transition: "transform 0.3s ease" }}>
                  {service.icon}
                </div>

                {/* Tagline */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 8 }}>
                  {taglines[i]}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: 8, margin: "0 0 8px 0", lineHeight: 1.3 }}>
                  {t(`services.${service.key}.title`)}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
                  {t(`services.${service.key}.description`)}
                </p>

                {/* View Detail link */}
                <div className="m-view-detail" style={{ marginTop: 20 }}>
                  View Detail
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
