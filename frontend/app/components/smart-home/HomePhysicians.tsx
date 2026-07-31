"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useRouter } from "next/navigation";
import { imgVer } from "@/lib/imgver";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { FaArrowRight } from "react-icons/fa";

export default function HomePhysicians() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const { physicians } = usePhysicians();
  const displayDoctors = physicians.slice(0, 10);

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => prev >= displayDoctors.length - 1 ? 0 : prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused, displayDoctors.length]);

  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".phys-card") as HTMLElement;
    if (!card) return;
    const gap = 28;
    const cardWidth = card.offsetWidth + gap;
    trackRef.current.style.transform = `translateX(-${activeIdx * cardWidth}px)`;
  }, [activeIdx]);

  return (
    <section style={{ padding: "96px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "var(--primary-100)", color: "var(--primary)", padding: "4px 14px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>
            {t("homePhysicians.teamEyebrow")}
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 8 }}>{t("staff.title")}</h2>
          <p style={{ fontSize: "0.93rem", color: "var(--ink-soft)", maxWidth: 500, margin: "0 auto" }}>{t("homePhysicians.teamSubtitle")}</p>
        </div>

        <div
          style={{ overflow: "hidden", position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={trackRef} style={{ display: "flex", gap: 28, transition: "transform 0.6s ease" }}>
            {displayDoctors.map((doc) => {
              const name = locale === "am" ? doc.name_am || doc.name : doc.name;
              const specialty = locale === "am" ? doc.specialty_am || doc.specialty : doc.specialty;
              return (
                <div key={doc.id} className="phys-card" style={{ minWidth: 260, cursor: "pointer" }} onClick={() => router.push(`/about-us/physicians/${doc.id}`)}>
                  <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 45px rgba(0,0,0,0.1)", border: "1px solid var(--line-soft)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 28px 65px rgba(0,0,0,0.16)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "var(--line-soft)" }}>
                      <Image src={doc.image + imgVer} alt={name} fill sizes="260px" style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
                    </div>
                    <div style={{ padding: "22px 18px 20px", textAlign: "center" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--bg-deep)", marginBottom: 4 }}>{name}</h3>
                      <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.84rem", marginBottom: 14 }}>{specialty}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", fontWeight: 600, color: "var(--primary)", borderBottom: "2px solid transparent", transition: "border-color 0.2s", paddingBottom: 2 }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        {t("leadership.viewProfile")} <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/about-us/physicians" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none", padding: "10px 24px", borderRadius: 8, border: "1px solid var(--primary-100)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-50)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--primary-100)"; }}>
            {t("homePhysicians.viewAll")} <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
