"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useRouter } from "next/navigation";
import { imgVer } from "@/lib/imgver";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GAP = 28;
const MIN_COL = 280;

export default function HomePhysicians() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const { physicians } = usePhysicians();
  const displayDoctors = physicians.slice(0, 10);

  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);
  const [measure, setMeasure] = useState({ w: 0, cols: 3 });
  const [page, setPage] = useState(0);
  const [hovering, setHovering] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const cols = Math.max(1, Math.floor((w + GAP) / (MIN_COL + GAP)));
      setMeasure({ w, cols });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = measure.w > 0 ? measure.cols : 3;
  const totalRows = Math.ceil(displayDoctors.length / cols);
  const needsCarousel = totalRows > 2;
  const maxPage = Math.max(0, Math.ceil(displayDoctors.length / cols) - 1);

  useEffect(() => { setPage(0); }, [cols]);

  useEffect(() => {
    if (!needsCarousel || hovering) return;
    const id = setInterval(() => {
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(id);
  }, [needsCarousel, hovering, maxPage]);

  const initials = (fullName: string) =>
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const cardW = cols > 0 ? (measure.w - (cols - 1) * GAP) / cols : MIN_COL;

  const renderCard = (doc: (typeof displayDoctors)[number]) => {
    const name = locale === "am" ? doc.name_am || doc.name : doc.name;
    const specialty = locale === "am" ? doc.specialty_am || doc.specialty : doc.specialty;
    return (
      <div
        key={doc.id}
        className="group"
        style={{ background: "#fff", border: "1px solid var(--line)", overflow: "hidden", transition: "border-color .3s ease, box-shadow .3s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 18px 42px rgba(6,47,42,0.12)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <button
          onClick={() => setLightbox({ src: doc.image + imgVer, name })}
          aria-label={name}
          style={{ display: "block", width: "100%", padding: 0, border: "none", background: "transparent", cursor: "zoom-in" }}
        >
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "linear-gradient(135deg, var(--primary-50), var(--primary-100))" }}>
            {doc.image ? (
              <Image
                src={doc.image + imgVer}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", transition: "transform .5s ease" }}
                className="group-hover:scale-105"
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#7FD9C4", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26 }}>
                    {initials(name || doc.name)}
                  </span>
                </div>
                <span style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--primary)" }}>
                  {t("homePhysicians.teamEyebrow")}
                </span>
              </div>
            )}
          </div>
        </button>

        <div style={{ padding: "20px 20px 22px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--bg-deep)", margin: 0 }}>{name}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--primary)", margin: "6px 0 16px", letterSpacing: "0.02em" }}>{specialty}</p>
          <Link
            href={`/about-us/physicians/${doc.id}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", color: "var(--primary)", border: "1px solid var(--primary)", padding: "8px 16px", transition: "all .25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}
            onClick={(e) => { e.stopPropagation(); }}
          >
            {t("leadership.viewProfile")} <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    );
  };

  const prev = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setPage((p) => Math.max(0, p - 1)); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setPage((p) => Math.min(maxPage, p + 1)); };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.9)",
    color: "var(--primary)",
    border: "1px solid var(--line)",
    borderRadius: "50%",
    boxShadow: "0 6px 20px rgba(6,47,42,0.15)",
    cursor: "pointer",
    zIndex: 5,
    transition: "background .25s ease, color .25s ease",
  };

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

        <div ref={gridRef} style={{ position: "relative" }}>
          {needsCarousel ? (
            <div
              style={{ overflow: "hidden" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <div style={{ display: "flex", transition: "transform .55s ease", transform: `translateX(${-page * cols * (cardW + GAP)}px)` }}>
                {displayDoctors.map((doc, i) => (
                  <div key={doc.id} style={{ flex: `0 0 ${cardW}px`, marginRight: i < displayDoctors.length - 1 ? GAP : 0 }}>
                    {renderCard(doc)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP }}>
              {displayDoctors.map((doc) => renderCard(doc))}
            </div>
          )}

          {needsCarousel && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                style={{ ...arrowStyle, left: -20, opacity: page === 0 ? 0.35 : 1, pointerEvents: page === 0 ? "none" : "auto" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = "var(--primary)"; }}
              >
                <FaChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                style={{ ...arrowStyle, right: -20, opacity: page === maxPage ? 0.35 : 1, pointerEvents: page === maxPage ? "none" : "auto" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = "var(--primary)"; }}
              >
                <FaChevronRight size={15} />
              </button>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                {Array.from({ length: maxPage + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Page ${i + 1}`}
                    style={{ width: i === page ? 26 : 8, height: 8, borderRadius: 999, border: "none", cursor: "pointer", background: i === page ? "var(--primary)" : "var(--primary-100)", transition: "all .3s ease" }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/about-us/physicians" className="bykm-outline-btn">
            {t("homePhysicians.viewAll")} <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{ position: "absolute", top: 24, right: 24, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
          >
            <FaTimes size={18} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.name}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 8, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
          />
        </div>
      )}
    </section>
  );
}