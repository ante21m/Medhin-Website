"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { useLeadership } from "@/app/hooks/useLeadership";
import PhysicianCard from "./physicians/PhysicianCard";
import { FaHeartbeat } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import "./about-us.css";

/* =========================================================
   BYKM-STYLE DESIGN TOKENS (adapted to Medhin palette)
========================================================= */
const MINT = "#7FD9C4"; // signature accent on dark sections

/* Local bilingual copy for strings not in the translation files */
const copy = {
  en: {
    eyebrow: "About Us",
    storyLabel: "Our Story",
    storyTitle: "Who We Are",
    cards: [{ title: "The Foundation" }, { title: "Our Journey" }, { title: "Medhin Today" }],
    vmLabel: "Purpose",
    missionKicker: "Mission",
    visionKicker: "Vision",
    values: [
      { icon: "❤️", title: "Compassion First", desc: "Every patient is treated with dignity, kindness and respect.", stat: "Patient-centered care" },
      { icon: "🏥", title: "Clinical Excellence", desc: "Skilled specialists delivering international-standard treatment.", stat: "50+ specialists" },
      { icon: "🤝", title: "Community Trust", desc: "Built on years of trusted service to the Woldia community.", stat: "Serving since 2000" },
      { icon: "🔬", title: "Modern Medicine", desc: "Continuous investment in advanced diagnostics and technology.", stat: "24/7 emergency care" },
    ],
    journeyLabel: "Our Journey",
    journeyTitle: "Milestones of Care",
    timeline: [
      { year: "2000", title: "The Beginning", desc: "Medhin Primary Hospital opened its doors in Woldia with one promise — quality healthcare, close to home." },
      { year: "Growth", title: "Expanding Services", desc: "New departments, more specialists and broader medical services grew our capacity to serve." },
      { year: "Technology", title: "Modern Diagnostics", desc: "Investment in modern laboratory and imaging technology brought faster, more accurate diagnoses." },
      { year: "24/7", title: "Always Open", desc: "Our emergency department never closes — round-the-clock critical care when every minute counts." },
      { year: "Today", title: "A Trusted Name", desc: "Recognized as a trusted, leading healthcare provider in the region — still guided by compassion and expertise." },
    ],
    promiseLabel: "Our Promise",
    staffLabel: "Our Specialists",
  },
  am: {
    eyebrow: "ስለ እኛ",
    storyLabel: "ታሪካችን",
    storyTitle: "ማን እንደሆንን",
    cards: [{ title: "መሠረቱ" }, { title: "ጉዞአችን" }, { title: "መድኅን ዛሬ" }],
    vmLabel: "ተልዕኮ",
    missionKicker: "ተልዕክ",
    visionKicker: "ራዕይ",
    values: [
      { icon: "❤️", title: "ርኅራኄ ቀዳሚ", desc: "እያንዳንዱ ታካሚ በክብር፣ በደግነት እና በአክብሮት ይመታከላል።", stat: "ታካሚ ተኮር አገልግሎት" },
      { icon: "🏥", title: "የሕክምና ብቃት", desc: "ሙያተኞች ስፔሻሊስቶች ዓለም አቀፍ ደረጃ ያለው ሕክምና ይሰጣሉ።", stat: "50+ ስፔሻሊስቶች" },
      { icon: "🤝", title: "የማህበረሰብ እምነት", desc: "ለወልድያ ማህበረሰብ ባለመቶ ዘመናት በታመነ አገልግሎት የተገኘ እምነት።", stat: "ከ2000 ጀምሮ በአገልግሎት" },
      { icon: "🔬", title: "ዘመናዊ ሕክምና", desc: "በዘመናዊ ምርመራ እና ቴክኖሎጂ የሚቀጥል ኢንቨስትመንት።", stat: "የ24/7 ድንገተኛ አገልግሎት" },
    ],
    journeyLabel: "ጉዞአችን",
    journeyTitle: "የእንክብካቤ ምዕራፎች",
    timeline: [
      { year: "2000", title: "መጀመሪያ", desc: "መድኅን ሆስፒታል በወልድያ በሩን ከፈተ፤ አንድ ቃል ገባ፦ ጥራት ያለው የጤና አገልግሎት ከቤት ቅርብ።" },
      { year: "ዕድገት", title: "አገልግሎቶችን ማስፋፋት", desc: "አዲስ ዲፓርትመንቶች፣ ተጨማሪ ስፔሻሊስቶች እና ሰፊ የሕክምና አገልግሎቶች የአገልግሎት አቅማችንን አሳድገዋል።" },
      { year: "ቴክኖሎጂ", title: "ዘመናዊ ምርመራ", desc: "በዘመናዊ ላቦራቶሪ እና የምስል ምርመራ ቴክኖሎጂ ፈጣን እና ትክክለኛ ውጤቶችን አምጥቷል።" },
      { year: "24/7", title: "ሁልጊዜ ክፍት", desc: "የድንገተኛ ክፍላችን ሳይዘጋ ይከፍታል፦ እያንዳንዱ ደቂቃ በሚቆጠርበት ጊዜ የ24 ሰዓት አስቸኳይ እንክብካቤ።" },
      { year: "ዛሬ", title: "ታመነ ስም", desc: "በክልሉ እንደ ታመነ እና መሪ የጤና አገልግሎት ተቋም ተደርጎ ይወሰዳል — አሁንም በርኅራኄ እና በሙያ ብቃት የሚመራ።" },
    ],
    promiseLabel: "ቃል ኪዳናችን",
    staffLabel: "ባለሙያችን",
  },
} as const;

type Copy = typeof copy.en;

/* Scroll reveal (same behavior as Bykm) */
function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {children}
    </div>
  );
}

/* Mono eyebrow label with accent dash */
function Eyebrow({ children, color = MINT }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 28, height: 1, background: color }} />
      <span className="bk-eyebrow" style={{ color }}>{children}</span>
    </div>
  );
}

export default function AboutClient() {
  const { t, locale } = useLocale();
  const c: Copy = locale === "am" ? (copy.am as unknown as Copy) : copy.en;

  const { physicians: docs } = usePhysicians();
  const { leadership: leadershipData } = useLeadership();

  /* Leadership carousel + modal */
  const [activeLeader, setActiveLeader] = useState<(typeof leadershipData)[0] | null>(null);
  const [leaderIdx, setLeaderIdx] = useState(0);
  const [leaderPaused, setLeaderPaused] = useState(false);

  /* Physicians */
  const [physDept, setPhysDept] = useState("All");
  const [physAuto, setPhysAuto] = useState(true);
  const departments = ["All", ...new Set(docs.map((p) => p.specialty))];
  const filteredDocs = physDept === "All" ? docs : docs.filter((p) => p.specialty === physDept);

  useEffect(() => {
    if (leaderPaused) return;
    const timer = setInterval(
      () => setLeaderIdx((prev) => (prev === leadershipData.length - 1 ? 0 : prev + 1)),
      3500
    );
    return () => clearInterval(timer);
  }, [leaderPaused, leadershipData.length]);

  useEffect(() => {
    if (!activeLeader) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLeader(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeLeader]);

  useEffect(() => {
    if (!physAuto || physDept !== "All") return;
    const el = document.querySelector(".phys-carousel-track") as HTMLElement;
    if (!el) return;
    const timer = setInterval(() => {
      const card = el.querySelector(".phys-slide") as HTMLElement;
      if (!card) return;
      el.scrollBy({ left: card.offsetWidth + 20, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(timer);
  }, [physAuto, physDept]);

  const lname = (l: { name: string; nameAm?: string }) => (locale === "am" && l.nameAm ? l.nameAm : l.name);
  const lrole = (l: { role: string; roleAm?: string }) => (locale === "am" && l.roleAm ? l.roleAm : l.role);

  return (
    <div>
      {/* ══════════════ HERO ══════════════ */}
      <Reveal>
        <section className="bk-deep" style={{ padding: "96px 24px 84px" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 28%, rgba(11,93,82,0.55) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)" }} />
          <div className="bk-grid-overlay" />
          <div className="bk-geo" style={{ width: 380, height: 380, top: -90, right: -90, transform: "rotate(12deg)", opacity: 0.5 }} />
          <div className="bk-geo" style={{ width: 210, height: 210, bottom: 30, right: "32%", transform: "rotate(45deg)", opacity: 0.3 }} />
          <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div className="bk-hero-grid">
              <div>
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h1 className="bk-display" style={{ fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)", fontWeight: 600, lineHeight: 1.08, margin: "18px 0 0" }}>
                  <span style={{ background: "linear-gradient(90deg, #ffffff 35%, rgba(127,217,196,0.85))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    {t("aboutPage.heroTitle")}
                  </span>
                </h1>
                <div style={{ width: 64, height: 4, background: MINT, marginTop: 32 }} />
              </div>
              <div style={{ paddingTop: 10 }}>
                <div className="bk-glass-card">
                  <div className="bk-glass-bar" />
                  <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.68)" }}>
                    {t("aboutPage.heroSubtitle")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ WHO WE ARE ══════════════ */}
      <Reveal>
        <section style={{ padding: "96px 24px", background: "#fff" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <Eyebrow color="var(--primary)">{c.storyLabel}</Eyebrow>
            <h2 className="bk-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--ink)", margin: "14px 0 44px" }}>
              {c.storyTitle}
            </h2>
            <div className="bk-cards-3">
              {[t("about.intro"), t("about.history"), t("about.today")].map((text, i) => (
                <div key={i} className="bk-card">
                  <div className="bk-numbadge"><span>{String(i + 1).padStart(2, "0")}</span></div>
                  <div style={{ width: 40, height: 3, background: "var(--primary-900)", marginBottom: 16 }} />
                  <h3 className="bk-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>{c.cards[i].title}</h3>
                  <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.75, color: "var(--ink-soft)" }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ MISSION & VISION ══════════════ */}
      <Reveal>
        <section className="bk-deep" style={{ padding: "90px 24px" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 22% 38%, rgba(11,93,82,0.45) 0%, transparent 60%)" }} />
          <div className="bk-grid-overlay" style={{ backgroundSize: "60px 60px" }} />
          <div className="bk-geo" style={{ width: 220, height: 220, top: 40, right: -40, transform: "rotate(12deg)", opacity: 0.35 }} />
          <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 10 }}>
            <Eyebrow>{c.vmLabel}</Eyebrow>
            <div className="bk-vm-grid" style={{ marginTop: 26 }}>
              {/* Mission */}
              <div style={{ background: "linear-gradient(135deg, rgba(11,93,82,0.30), rgba(6,47,42,0.70))", border: "1px solid rgba(127,217,196,0.22)", padding: "38px 34px" }}>
                <span className="bk-eyebrow" style={{ color: MINT, fontSize: "0.66rem" }}>{c.missionKicker}</span>
                <h2 className="bk-display" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 600, color: "#fff", margin: "14px 0 12px" }}>
                  {t("mission.title")}
                </h2>
                <p style={{ margin: "0 0 26px", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>
                  {t("mission.description")}
                </p>
                <div className="bk-mini-grid">
                  {c.values.map((v, i) => (
                    <div key={i} className="bk-mini-card">
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 999, background: "linear-gradient(135deg, #0B5D52, #062F2A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", marginBottom: 14, boxShadow: "0 8px 20px rgba(11,93,82,0.35)" }}>
                          {v.icon}
                        </div>
                        <h3 className="bk-display" style={{ fontSize: "0.98rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>{v.title}</h3>
                        <p style={{ margin: "0 0 10px", fontSize: "0.86rem", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" }}>{v.desc}</p>
                        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: MINT }}>{v.stat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Vision */}
              <div style={{ background: "rgba(6,47,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", padding: "30px 28px" }}>
                <span className="bk-eyebrow" style={{ color: MINT, fontSize: "0.66rem" }}>{c.visionKicker}</span>
                <h2 className="bk-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: "#fff", margin: "12px 0 10px" }}>
                  {t("vision.title")}
                </h2>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}>
                  {t("vision.description")}
                </p>
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: MINT }}>
                    <FaHeartbeat size={14} /> {t("aboutPage.isoCertified")} · {t("aboutPage.years25")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ JOURNEY TIMELINE ══════════════ */}
      <Reveal>
        <section style={{ padding: "96px 24px", background: "#F5F4EF" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Eyebrow color="var(--primary)">{c.journeyLabel}</Eyebrow>
              </div>
              <h2 className="bk-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--ink)", margin: "14px 0 0" }}>
                {c.journeyTitle}
              </h2>
            </div>
            <div className="bk-journey-grid">
              {c.timeline.map((item, i) => (
                <div key={i} className="bk-card">
                  <div className="bk-numbadge"><span>{String(i + 1).padStart(2, "0")}</span></div>
                  <div style={{ width: 40, height: 3, background: "var(--primary-900)", marginBottom: 16 }} />
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 8, fontWeight: 600 }}>
                    {item.year}
                  </div>
                  <h3 className="bk-display" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.75, color: "var(--ink-soft)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ COMMITMENT BANNER ══════════════ */}
      <Reveal>
        <section style={{ background: "linear-gradient(90deg, #0B5D52, #0E2622)", color: "#fff", padding: "72px 24px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 36 }}>
            <div style={{ maxWidth: 720 }}>
              <Eyebrow>{c.promiseLabel}</Eyebrow>
              <h2 className="bk-display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 600, margin: "14px 0 16px" }}>
                {t("aboutPage.commitmentTitle")}
              </h2>
              <p style={{ margin: "0 0 12px", lineHeight: 1.75, color: "rgba(255,255,255,0.72)", fontSize: "0.95rem" }}>
                {t("aboutPage.commitmentP1")}
              </p>
              <p style={{ margin: 0, lineHeight: 1.75, color: "rgba(255,255,255,0.72)", fontSize: "0.95rem" }}>
                {t("aboutPage.commitmentP2")}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 96, height: 96, borderRadius: 999, background: "linear-gradient(135deg, #0E8371, #062F2A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
                <FaHeartbeat size={40} color="#fff" />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ LEADERSHIP ══════════════ */}
      <Reveal>
        <section className="bk-deep" style={{ padding: "96px 24px" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 30%, rgba(11,93,82,0.4) 0%, transparent 65%)" }} />
          <div className="bk-grid-overlay" style={{ backgroundSize: "60px 60px" }} />
          <div className="bk-geo" style={{ width: 250, height: 250, top: -70, right: -30, transform: "rotate(12deg)", opacity: 0.3 }} />
          <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Eyebrow>Leadership</Eyebrow>
              </div>
              <h2 className="bk-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, color: "#fff", margin: "14px 0 10px" }}>
                {t("leadership.title")}
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.58)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                {t("aboutPage.leadershipSubtitle")}
              </p>
            </div>
            <div
              style={{ overflow: "hidden", position: "relative" }}
              onMouseEnter={() => setLeaderPaused(true)}
              onMouseLeave={() => setLeaderPaused(false)}
              onTouchStart={() => setLeaderPaused(true)}
              onTouchEnd={() => setLeaderPaused(false)}
            >
              <div className="bk-leader-track" style={{ transform: `translateX(-${leaderIdx * 324}px)` }}>
                {leadershipData.map((leader) => (
                  <div key={leader.id} style={{ minWidth: 296, cursor: "pointer" }} onClick={() => setActiveLeader(leader)}>
                    <div
                      className="bk-leader-card"
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 50px rgba(0,0,0,0.4)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                    >
                      <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "var(--line-soft)" }}>
                        <Image src={(leader.image || "/leadership/placeholder.jpg") + imgVer} alt={lname(leader)} fill sizes="296px" style={{ objectFit: "cover", transition: "transform .5s ease" }} />
                      </div>
                      <div style={{ padding: "22px 18px 20px", textAlign: "center" }}>
                        <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>{lname(leader)}</h3>
                        <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--primary)" }}>
                          {lrole(leader)}
                        </p>
                        <span
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--primary)", borderBottom: "2px solid transparent", paddingBottom: 2 }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                        >
                          {t("leadership.viewProfile")} <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── LEADERSHIP MODAL ── */}
      {activeLeader && (
        <div
          style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "rgba(4,14,11,0.7)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setActiveLeader(null)}
        >
          <div
            style={{ background: "#fff", width: "100%", maxWidth: 740, maxHeight: "90vh", overflowY: "auto", borderRadius: 3, padding: 28, position: "relative", animation: "modalFade 0.35s ease", borderTop: `3px solid ${MINT}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 999, border: "none", background: "rgba(6,47,42,0.85)", color: "#fff", fontSize: 18, cursor: "pointer", display: "grid", placeItems: "center", zIndex: 10, transition: "background .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6,47,42,1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(6,47,42,0.85)"; }}
              onClick={() => setActiveLeader(null)}
            >
              ✕
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28, alignItems: "start" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 2, overflow: "hidden", background: "var(--line-soft)" }}>
                <Image src={(activeLeader.image || "/leadership/placeholder.jpg") + imgVer} alt={lname(activeLeader)} fill sizes="280px" style={{ objectFit: "cover" }} />
              </div>
              <div>
                <h3 className="bk-display" style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>{lname(activeLeader)}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--primary)", display: "block", marginBottom: 20 }}>{lrole(activeLeader)}</span>
                {activeLeader.bio && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 8px" }}>{t("leadership.about")}</h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--ink-soft)", lineHeight: 1.7 }}>{activeLeader.bio}</p>
                  </section>
                )}
                {activeLeader.experience && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 8px" }}>{t("leadership.experience")}</h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--ink-soft)" }}>{activeLeader.experience}</p>
                  </section>
                )}
                {activeLeader.certificates && activeLeader.certificates.length > 0 && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 8px" }}>{t("leadership.certificates")}</h4>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.88rem", color: "var(--ink-soft)", lineHeight: 1.8 }}>
                      {activeLeader.certificates.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
                {activeLeader.awards && activeLeader.awards.length > 0 && (
                  <section>
                    <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 8px" }}>{t("leadership.awards")}</h4>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.88rem", color: "var(--ink-soft)", lineHeight: 1.8 }}>
                      {activeLeader.awards.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PHYSICIANS ══════════════ */}
      <Reveal>
        <section style={{ padding: "96px 24px", background: "#fff" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 34 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Eyebrow color="var(--primary)">{c.staffLabel}</Eyebrow>
              </div>
              <h2 className="bk-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--ink)", margin: "14px 0 0" }}>
                {t("staff.title")}
              </h2>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              {departments.map((d) => (
                <button key={d} onClick={() => setPhysDept(d)} className={`bk-chip${physDept === d ? " active" : ""}`}>
                  {d === "All" ? "All" : t(`departments.${d.toLowerCase()}`)}
                </button>
              ))}
            </div>

            <div
              className="phys-carousel-track"
              style={{ display: "flex", gap: 20, overflowX: "auto", scrollBehavior: "smooth", padding: "8px 4px 16px", scrollbarWidth: "none" } as React.CSSProperties}
              onMouseEnter={() => setPhysAuto(false)}
              onMouseLeave={() => setPhysAuto(true)}
            >
              {filteredDocs.slice(0, 10).map((p) => (
                <div key={p.id} className="phys-slide" style={{ minWidth: 260, maxWidth: 260, flexShrink: 0 }}>
                  <PhysicianCard physician={p} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 28 }}>
              <Link href="/about-us/physicians" className="bk-outline-btn">
                {t("aboutPage.viewAllDoctors")} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ CTA ══════════════ */}
      <Reveal>
        <section style={{ background: "linear-gradient(90deg, #0B5D52, #0E2622)", color: "#fff", padding: "84px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 className="bk-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, margin: "0 0 14px" }}>
              {t("aboutPage.ctaTitle")}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 34px" }}>
              {t("aboutPage.ctaSubtitle")}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/appointment" className="bk-btn">
                <span>{t("nav.book")}</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="bk-btn-ghost">
                <span>{t("aboutPage.contactUs")}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <style>{`
        @keyframes modalFade { from { opacity: 0; transform: scale(0.96) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
