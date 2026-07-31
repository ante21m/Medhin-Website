"use client";

import dynamic from "next/dynamic";
import { useLocale } from "./locale-provider";
import { useSiteSettings, parseJsonSetting } from "./hooks/useSiteSettings";
import SmartHero from "./components/smart-home/SmartHero";
import ScrollReveal from "./components/ScrollReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import Link from "next/link";
import { FaCalendarCheck, FaPhone, FaAmbulance, FaFlask, FaXRay, FaCut, FaHeartbeat, FaBaby, FaDesktop, FaBrain } from "react-icons/fa";

const WhyChooseUs = dynamic(() => import("./components/smart-home/WhyChooseUs"));
const HomePhysicians = dynamic(() => import("./components/smart-home/HomePhysicians"));
const AskAISection = dynamic(() => import("./components/smart-home/AskAISection"));

const iconMap: Record<string, React.ReactNode> = {
  FaAmbulance: <FaAmbulance size={18} />,
  FaFlask: <FaFlask size={18} />,
  FaXRay: <FaXRay size={18} />,
  FaCut: <FaCut size={18} />,
  FaHeartbeat: <FaHeartbeat size={18} />,
  FaBaby: <FaBaby size={18} />,
  FaDesktop: <FaDesktop size={18} />,
  FaBrain: <FaBrain size={18} />,
};

const defaultDepartments = [
  { id: "emergency", icon: "FaAmbulance", color: "#ef4444" },
  { id: "laboratory", icon: "FaFlask", color: "#8b5cf6" },
  { id: "xray", icon: "FaXRay", color: "#f97316" },
  { id: "surgical", icon: "FaCut", color: "var(--primary)" },
  { id: "ecg", icon: "FaHeartbeat", color: "#7FD9C4" },
  { id: "delivery", icon: "FaBaby", color: "#ec4899" },
  { id: "ultrasound", icon: "FaDesktop", color: "#06b6d4" },
  { id: "ct-scan", icon: "FaBrain", color: "#14b8a6" },
];

export default function HomePage() {
  const { t } = useLocale();
  const { settings } = useSiteSettings("home");

  const deptConfigs = parseJsonSetting<Array<{ id: string; icon: string; color: string }>>(
    settings.home_departments,
    defaultDepartments
  );

  const departments = deptConfigs.map((d) => ({
    id: d.id,
    name: t(`homePage.dept${d.id.charAt(0).toUpperCase() + d.id.slice(1).replace(/-./g, (m) => m[1].toUpperCase())}`),
    desc: t(`homePage.dept${d.id.charAt(0).toUpperCase() + d.id.slice(1).replace(/-./g, (m) => m[1].toUpperCase())}Desc`),
    icon: iconMap[d.icon] || <FaAmbulance size={18} />,
    color: d.color,
  }));

  const partners = parseJsonSetting<string[]>(settings.home_partners, []).map((p) => p);

  const stats = [
    { end: parseInt(settings.home_stats_experience || "25"), suffix: settings.home_stats_experience_suffix || "+", label: t("homePage.statsExperience"), icon: "🏥", color: "var(--primary)" },
    { end: parseInt(settings.home_stats_doctors || "50"), suffix: settings.home_stats_doctors_suffix || "+", label: t("homePage.statsDoctors"), icon: "👨‍⚕️", color: "#0B5D52" },
    { end: parseInt(settings.home_stats_patients || "100"), suffix: settings.home_stats_patients_suffix || "K+", label: t("homePage.statsPatients"), icon: "❤️", color: "var(--urgent)" },
    { end: parseInt(settings.home_stats_departments || "12"), suffix: settings.home_stats_departments_suffix || "+", label: t("homePage.statsDepartments"), icon: "🩺", color: "var(--accent)" },
  ];

  return (
    <main>
      <SmartHero />

      {/* ── HERO CTA BAR ── */}
      <div style={{ background: "var(--primary-900)", borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid var(--line)", padding: "18px 24px" }}>
        <div className="m-container" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/appointment" className="m-btn m-btn-primary" style={{ padding: "12px 28px", fontSize: "0.88rem" }}>
            <FaCalendarCheck size={14} /> {t("homePage.bookAppointment")}
          </Link>
          <Link href="/services" className="m-btn m-btn-ghost-light" style={{ padding: "12px 28px", fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {t("homePage.exploreServices")}
          </Link>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <section style={{ padding: "28px 0", background: "var(--bg-tint)", borderBottom: "1px solid var(--line)" }}>
        <div className="m-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "16px 12px", textAlign: "center", position: "relative", borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 auto" }}>
                  <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}>
                      <AnimatedCounter end={s.end} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)", fontWeight: 500, letterSpacing: "0.03em" }}>{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR DEPARTMENTS ── */}
      <section style={{ padding: "80px 0", background: "#f5f4ef" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="m-h2">{t("homePage.servicesTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {departments.map((d, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="bykm-card"
                >
                  <div className="bykm-badge"><span>{num}</span></div>
                  <h3 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4, marginTop: 0, marginRight: 0, marginBottom: 8, marginLeft: 0 }}>
                    {d.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
                    {d.desc}
                  </p>
                  <Link href={`/services/${d.id}`} className="bykm-view-detail" onClick={e => e.stopPropagation()}>
                    {t("homePage.viewDetail")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <ScrollReveal direction="left">
        <HomePhysicians />
      </ScrollReveal>

      {/* ── INSTITUTIONAL PARTNERS ── */}
      <section style={{ padding: "80px 0", background: "#f5f4ef" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="bykm-eyebrow">{t("homePage.partnersEyebrow")}</div>
            <h2 className="m-h2" style={{ marginBottom: 0 }}>{t("homePage.partnersTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {partners.map((partner, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={i} className="bykm-partner-card">
                  <div className="bykm-partner-badge"><span>{num}</span></div>
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4, margin: 0 }}>
                    {partner}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AskAISection />

      {/* ── CTA ── */}
      <section className="m-section m-section--deep" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="m-pattern-dots--light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="m-blob" style={{ width: 360, height: 360, top: -120, left: "50%", transform: "translateX(-50%)", background: "var(--primary-700)", opacity: 0.5 }} />
        <div className="m-container" style={{ maxWidth: 620, position: "relative", zIndex: 1 }}>
          <svg className="m-vital" viewBox="0 0 300 34" style={{ maxWidth: 220, margin: "0 auto 22px", color: "#7FD9C4" }} aria-hidden="true">
            <path d="M0 17 H100 L115 3 L131 31 L147 5 L159 17 H300" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          <h2 className="m-h2" style={{ marginBottom: 14 }}>{t("homePage.ctaReady")}</h2>
          <p style={{ color: "var(--on-deep-soft)", fontSize: "1rem", marginBottom: 34, lineHeight: 1.65 }}>
            {t("homePage.ctaSubtitle")}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/appointment" className="m-btn m-btn-primary" style={{ padding: "15px 30px" }}>
              <FaCalendarCheck size={16} /> {t("homePage.bookAppointment")}
            </Link>
            <Link href="/contact" className="m-btn m-btn-ghost-light" style={{ padding: "15px 30px" }}>
              <FaPhone size={15} /> {t("homePage.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
