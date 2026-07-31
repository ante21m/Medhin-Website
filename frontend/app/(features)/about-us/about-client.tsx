"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { useLeadership } from "@/app/hooks/useLeadership";
import PhysicianCard from "./physicians/PhysicianCard";
import { FaArrowRight, FaCheck, FaHeart, FaHandsHelping, FaStar } from "react-icons/fa";
import "./about-us.css";

/* =========================
   SECTION BADGE
========================= */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-block", background: "var(--primary-100)", color: "var(--primary)", padding: "4px 14px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </span>
  );
}

export default function AboutClient() {
  const { t } = useLocale();
  const { physicians: docs } = usePhysicians();
  const { leadership: leadershipData } = useLeadership();

  /* Leadership */
  const [activeLeader, setActiveLeader] = useState<typeof leadershipData[0] | null>(null);
  const [leaderIdx, setLeaderIdx] = useState(0);
  const [leaderPaused, setLeaderPaused] = useState(false);

  /* FAQs */
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  /* Physicians */
  const [physDept, setPhysDept] = useState("All");
  const [physAuto, setPhysAuto] = useState(true);
  const departments = ["All", ...new Set(docs.map(p => p.specialty))];
  const filteredDocs = physDept === "All" ? docs : docs.filter(p => p.specialty === physDept);

  useEffect(() => {
    if (leaderPaused) return;
    const timer = setInterval(() => setLeaderIdx(prev => prev === leadershipData.length - 1 ? 0 : prev + 1), 3500);
    return () => clearInterval(timer);
  }, [leaderPaused, leadershipData.length]);

  useEffect(() => {
    if (!activeLeader) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveLeader(null); };
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

  const getLeaderName = (leader: typeof leadershipData[0]) => {
    if (leader.nameAm && t("aboutPage.heroTitle") !== "aboutPage.heroTitle") {
      return leader.name;
    }
    return leader.name;
  };

  return (
    <div>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "70px 24px 50px", background: "var(--bg-deep)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.12 }}>{t("aboutPage.heroTitle")}</h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", lineHeight: 1.65 }}>{t("aboutPage.heroSubtitle")}</p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPANY INTRO
      ════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}>
          <div>
            <Badge>{t("about.company")}</Badge>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 18, lineHeight: 1.2 }}>{t("about.title")}</h2>
            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8, marginBottom: 14 }}>{t("about.intro")}</p>
            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8, marginBottom: 14 }}>{t("about.history")}</p>
            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8 }}>{t("about.today")}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.84rem", color: "var(--primary)", fontWeight: 600 }}>
                <FaCheck size={12} /> {t("aboutPage.isoCertified")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.84rem", color: "var(--primary)", fontWeight: 600 }}>
                <FaCheck size={12} /> {t("aboutPage.years25")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.84rem", color: "var(--primary)", fontWeight: 600 }}>
                <FaCheck size={12} /> {t("aboutPage.specialists50")}
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: 440, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
            <Image src={"/images/clinic.jpg" + imgVer} alt="Medhin Primary Hospital" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS
      ════════════════════════════════════════ */}
      <section style={{ padding: "64px 24px", background: "var(--bg-tint)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { value: "25+", label: t("homePage.statsExperience") },
            { value: "50+", label: t("homePage.statsDoctors") },
            { value: "100K+", label: t("homePage.statsPatients") },
            { value: "12+", label: t("homePage.statsDepartments") },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", background: "#fff", borderRadius: 16, border: "1px solid var(--line)", borderTop: "4px solid var(--primary)", padding: "30px 20px", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 4, letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: "0.88rem", color: "var(--ink-soft)", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          VISION & MISSION
      ════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)" }}>{t("about.visionMission")}</h2>
        </div>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "44px 36px", border: "1px solid var(--line)", position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--primary), #7FD9C4)" }} />
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "var(--primary-50)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--primary), #1d4ed8)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
                <FaStar size={24} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 14 }}>{t("vision.title")}</h3>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8 }}>{t("vision.description")}</p>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "44px 36px", border: "1px solid var(--line)", position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--primary), var(--primary))" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "var(--primary-50)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--primary), #059669)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
                <FaHeart size={24} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 14 }}>{t("mission.title")}</h3>
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8 }}>{t("mission.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMMITMENT
      ════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <Badge>{t("aboutPage.commitmentTitle")}</Badge>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 20, lineHeight: 1.2, marginTop: 8 }}>{t("aboutPage.commitmentTitle")}</h2>
            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8, marginBottom: 16 }}>{t("aboutPage.commitmentP1")}</p>
            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.8 }}>{t("aboutPage.commitmentP2")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { icon: <FaHandsHelping size={22} />, label: t("aboutPage.patientCentered"), gradient: "linear-gradient(135deg, var(--primary), #1d4ed8)" },
              { icon: <FaHeart size={22} />, label: t("aboutPage.compassionateTeam"), gradient: "linear-gradient(135deg, var(--primary), #059669)" },
              { icon: <FaStar size={22} />, label: t("aboutPage.qualityStandards"), gradient: "linear-gradient(135deg, var(--primary), #7C3AED)" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 18, boxShadow: "0 8px 30px rgba(0,0,0,0.04)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: item.gradient, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--bg-deep)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LEADERSHIP
      ════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 8 }}>{t("leadership.title")}</h2>
            <p style={{ fontSize: "0.93rem", color: "var(--ink-soft)", maxWidth: 500, margin: "0 auto" }}>{t("aboutPage.leadershipSubtitle")}</p>
          </div>
          <div
            style={{ overflow: "hidden", position: "relative" }}
            onMouseEnter={() => setLeaderPaused(true)}
            onMouseLeave={() => setLeaderPaused(false)}
            onTouchStart={() => setLeaderPaused(true)}
            onTouchEnd={() => setLeaderPaused(false)}
          >
            <div style={{ display: "flex", gap: 28, transition: "transform 0.6s ease", transform: `translateX(-${leaderIdx * 324}px)` }}>
              {leadershipData.map((leader) => (
                <div key={leader.id} style={{ minWidth: 296, cursor: "pointer" }} onClick={() => setActiveLeader(leader)}>
                  <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 45px rgba(0,0,0,0.1)", border: "1px solid var(--line-soft)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 28px 65px rgba(0,0,0,0.16)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "var(--line-soft)" }}>
                      <Image src={(leader.image || "/leadership/placeholder.jpg") + imgVer} alt={leader.name} fill sizes="296px" style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
                    </div>
                    <div style={{ padding: "22px 18px 20px", textAlign: "center" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 4 }}>{leader.name}</h3>
                      <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.84rem", marginBottom: 14 }}>{leader.role}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", fontWeight: 600, color: "var(--primary)", borderBottom: "2px solid transparent", transition: "border-color 0.2s", paddingBottom: 2 }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        {t("leadership.viewProfile")} <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP MODAL ── */}
      {activeLeader && (
        <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setActiveLeader(null)}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 740, maxHeight: "90vh", overflowY: "auto", borderRadius: 20, padding: 28, position: "relative", animation: "modalFade 0.35s ease" }} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 20, cursor: "pointer", display: "grid", placeItems: "center", zIndex: 10, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.55)"}
              onClick={() => setActiveLeader(null)}>✕</button>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28, alignItems: "start" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 14, overflow: "hidden" }}>
                <Image src={(activeLeader.image || "/leadership/placeholder.jpg") + imgVer} alt={activeLeader.name} fill sizes="280px" style={{ objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 4 }}>{activeLeader.name}</h3>
                <span style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: 16 }}>{activeLeader.role}</span>
                {activeLeader.bio && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("leadership.about")}</h4>
                    <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.7 }}>{activeLeader.bio}</p>
                  </section>
                )}
                {activeLeader.experience && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("leadership.experience")}</h4>
                    <p style={{ fontSize: "0.88rem", color: "#475569" }}>{activeLeader.experience}</p>
                  </section>
                )}
                {activeLeader.certificates && activeLeader.certificates.length > 0 && (
                  <section style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("leadership.certificates")}</h4>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.88rem", color: "#475569", lineHeight: 1.8 }}>
                      {activeLeader.certificates.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
                {activeLeader.awards && activeLeader.awards.length > 0 && (
                  <section>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("leadership.awards")}</h4>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.88rem", color: "#475569", lineHeight: 1.8 }}>
                      {activeLeader.awards.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          PHYSICIANS
      ════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", background: "var(--bg-tint)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)" }}>{t("staff.title")}</h2>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {departments.map(d => (
              <button key={d} onClick={() => setPhysDept(d)}
                style={{ padding: "8px 20px", borderRadius: 999, border: physDept === d ? "none" : "1px solid #d1d5db", background: physDept === d ? "var(--primary)" : "transparent", color: physDept === d ? "#fff" : "#4b5563", fontWeight: 600, fontSize: "0.84rem", cursor: "pointer", transition: "all 0.2s" }}>
                {d === "All" ? "All" : t(`departments.${d.toLowerCase()}`)}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 20, overflowX: "auto", scrollBehavior: "smooth", padding: "8px 4px 16px", scrollbarWidth: "none" } as any}
            onMouseEnter={() => setPhysAuto(false)}
            onMouseLeave={() => setPhysAuto(true)}
          >
            {filteredDocs.slice(0, 10).map(p => (
              <div key={p.id} className="phys-slide" style={{ minWidth: 260, maxWidth: 260, flexShrink: 0 }}>
                <PhysicianCard physician={p} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/about-us/physicians" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none", padding: "10px 24px", borderRadius: 8, border: "1px solid var(--primary-100)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-50)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--primary-100)"; }}>
              {t("aboutPage.viewAllDoctors")} <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQS
      ════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 90px", background: "var(--bg-tint)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)" }}>{t("faqsPage.title")}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3,4,5,6,7,8].map((id) => {
              const isOpen = faqOpen === `q${id}`;
              return (
                <div key={id} style={{ border: "1px solid var(--line)", borderRadius: 14, background: "#fff", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
                  <button onClick={() => setFaqOpen(isOpen ? null : `q${id}`)}
                    style={{ width: "100%", padding: "18px 22px", border: "none", background: isOpen ? "#fafafa" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 600, color: "#1f2937", textAlign: "left", transition: "background 0.2s" }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>?</span>
                    <span style={{ flex: 1 }}>{t(`faqsPage.q${id}`)}</span>
                    <span style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "", color: "var(--ink-faint)", fontSize: 14 }}>▾</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 22px 18px 62px", color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.75 }}>{t(`faqsPage.a${id}`)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section style={{ padding: "70px 24px", background: "var(--bg-deep)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>{t("aboutPage.ctaTitle")}</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginBottom: 28, lineHeight: 1.65 }}>{t("aboutPage.ctaSubtitle")}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/appointment" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", background: "linear-gradient(135deg, var(--primary), #1d4ed8)", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 8px 28px rgba(37,99,235,0.35)", textDecoration: "none", transition: "transform 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}>
              {t("nav.book")} <FaArrowRight size={14} />
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "#fff", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
              {t("aboutPage.contactUs")} <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes modalFade { from { opacity: 0; transform: scale(0.96) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
