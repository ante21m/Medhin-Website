"use client";

import PhysicianCarousel from "./PhysicianCarousel";
import { useLocale } from "@/app/locale-provider";
import "../about-us.css";

const MINT = "#7FD9C4";

export default function PhysiciansClient() {
  const { t } = useLocale();

  return (
    <div className="physicians-page">
      {/* ══════════════ HERO ══════════════ */}
      <section className="physicians-hero bk-deep">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 28%, rgba(11,93,82,0.55) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)" }} />
        <div className="bk-grid-overlay" />
        <div className="bk-geo" style={{ width: 360, height: 360, top: -90, right: -80, transform: "rotate(12deg)", opacity: 0.5 }} />
        <div className="bk-geo" style={{ width: 200, height: 200, bottom: 40, left: "34%", transform: "rotate(45deg)", opacity: 0.3 }} />
        <div className="physicians-hero-inner">
          <div className="bykm-kicker-line">
            <span className="bykm-kicker-dash" />
            <span className="bykm-kicker">Our Team</span>
          </div>
          <h1 className="bk-display">
            <span style={{ background: "linear-gradient(90deg, #ffffff 35%, rgba(127,217,196,0.85))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {t("about.physicians")}
            </span>
          </h1>
          <div style={{ width: 64, height: 4, background: MINT, marginTop: 22 }} />
          <p className="physicians-hero-desc">{t("about.physiciansDesc")}</p>
        </div>
      </section>

      {/* ══════════════ TEAM / CAROUSEL ══════════════ */}
      <section className="physicians-list-section">
        <div className="physicians-list-container">
          <div className="physicians-section-head">
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash bykm-kicker-dash--primary" />
              <span className="bykm-kicker bykm-kicker--primary">Specialists</span>
            </div>
            <h2 className="bk-display">{t("staff.title")}</h2>
          </div>
          <PhysicianCarousel />
        </div>
      </section>
    </div>
  );
}
