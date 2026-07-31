"use client";

import Link from "next/link";
import { FaCalendarCheck, FaPhone } from "react-icons/fa";
import { useLocale } from "@/app/locale-provider";

export default function CtaBanner() {
  const { t } = useLocale();
  return (
    <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, var(--bg-deep) 0%, var(--primary-700) 50%, var(--bg-deep) 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ position: "absolute", bottom: -100, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />
      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "5px 16px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>
          {t("cta.badge")}
        </div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em" }}>
          {t("cta.title")}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", marginBottom: 32, lineHeight: 1.65 }}>
          {t("cta.subtitle")}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/appointment" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "var(--primary)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "var(--shadow)", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <FaCalendarCheck size={16} /> {t("cta.bookAppointment")}
          </Link>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "#fff", borderRadius: 12, fontWeight: 600, fontSize: "0.95rem", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            <FaPhone size={16} /> {t("cta.contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
