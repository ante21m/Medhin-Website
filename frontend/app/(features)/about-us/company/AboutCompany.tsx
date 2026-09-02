"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import Lightbox from "@/app/components/ui/Lightbox";
import "../../../../app/(features)/about-us/about-us.css";

/* =========================
   TYPES
========================= */
type Leader = {
  id: number;
  image: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
  experienceKey?: string;
  certificatesKey?: string;
  awardsKey?: string;
};

/* =========================
   LEADERSHIP DATA
========================= */
const leadership: Leader[] = [
  {
    id: 1,
    image: "/leadership/dr-kassaw.jpg",
    nameKey: "leadership.kassaw.name",
    roleKey: "leadership.kassaw.role",
    bioKey: "leadership.kassaw.bio",
    experienceKey: "leadership.kassaw.experience",
    certificatesKey: "leadership.kassaw.certificates",
    awardsKey: "leadership.kassaw.awards",
  },
  {
    id: 2,
    image: "/leadership/dr-hana.jpg",
    nameKey: "leadership.hana.name",
    roleKey: "leadership.hana.role",
    bioKey: "leadership.hana.bio",
    experienceKey: "leadership.hana.experience",
    certificatesKey: "leadership.hana.certificates",
    awardsKey: "leadership.hana.awards",
  },
  {
    id: 3,
    image: "/leadership/samuel-bekele.jpg",
    nameKey: "leadership.samuel.name",
    roleKey: "leadership.samuel.role",
    bioKey: "leadership.samuel.bio",
    experienceKey: "leadership.samuel.experience",
    certificatesKey: "leadership.samuel.certificates",
    awardsKey: "leadership.samuel.awards",
  },
];

export default function AboutCompany() {
  const { t } = useLocale();

  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [aboutPreview, setAboutPreview] = useState(false);
  const [leaderPreview, setLeaderPreview] = useState<Leader | null>(null);

  /* =========================
     AUTOPLAY CAROUSEL
  ========================= */
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === leadership.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [paused]);

  /* =========================
     ESC KEY CLOSE
  ========================= */
  useEffect(() => {
    if (!activeLeader) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLeader(null);
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeLeader]);

  /* =========================
     SAFE LIST HELPER
  ========================= */
  const getList = (key?: string) => {
    if (!key) return [];
    const value = t(key);
    if (!value || value === key) return [];
    return value.split("|");
  };

  return (
    <>
      {/* =========================
          ABOUT COMPANY
      ========================= */}
      <section className="about-company">
        <div className="about-company-container">
          {/* TEXT */}
          <div className="about-company-text fade-left">
            <h1>{t("about.title")}</h1>
            <p>{t("about.intro")}</p>
            <p>{t("about.history")}</p>
            <p>{t("about.today")}</p>
          </div>

          {/* IMAGE */}
          <div className="about-company-image fade-right" style={{ cursor: "zoom-in" }} onClick={() => setAboutPreview(true)}>
            <Image
              src={"/images/clinic.jpg" + imgVer}
              alt="Medhin Primary Hospital"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* =========================
          LEADERSHIP SECTION
      ========================= */}
      <section className="leadership">
        <h2>{t("leadership.title")}</h2>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * 320}px)`,
            }}
          >
            {leadership.map((leader) => (
              <div
                key={leader.id}
                className="carousel-slide"
                onClick={() => setActiveLeader(leader)}
              >
                <div className="leader-card">
                  {/* SMART LEADER IMAGE */}
                  <div className="physician-image" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); setLeaderPreview(leader); }}>
                    <Image
                      src={leader.image + imgVer}
                      alt={t(leader.nameKey)}
                      fill
                      sizes="(max-width: 768px) 70vw, 260px"
                      style={{ objectFit: "cover" }}
                      priority={leader.id === 1}
                    />
                  </div>

                  <h3>{t(leader.nameKey)}</h3>
                  <p>{t(leader.roleKey)}</p>

                  <span className="view-profile-btn">
                    {t("leadership.viewProfile")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PROFILE MODAL
      ========================= */}
      {activeLeader && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveLeader(null)}
        >
          <div
            className="modal modal-animate"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              className="modal-close"
              aria-label="Close profile"
              onClick={() => setActiveLeader(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="modal-image">
              <Image
                src={activeLeader.image + imgVer}
                alt={t(activeLeader.nameKey)}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* TEXT */}
            <h3>{t(activeLeader.nameKey)}</h3>
            <span className="modal-role">
              {t(activeLeader.roleKey)}
            </span>

            <div className="modal-content">
              <section>
                <h4>{t("leadership.about")}</h4>
                <p>{t(activeLeader.bioKey)}</p>
              </section>

              {activeLeader.experienceKey && (
                <section>
                  <h4>{t("leadership.experience")}</h4>
                  <p>{t(activeLeader.experienceKey)}</p>
                </section>
              )}

              {activeLeader.certificatesKey && (
                <section>
                  <h4>{t("leadership.certificates")}</h4>
                  <ul>
                    {getList(activeLeader.certificatesKey).map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </section>
              )}

              {activeLeader.awardsKey && (
                <section>
                  <h4>{t("leadership.awards")}</h4>
                  <ul>
                    {getList(activeLeader.awardsKey).map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOXES */}
      <Lightbox
        open={aboutPreview}
        src={"/images/clinic.jpg" + imgVer}
        caption={t("about.title")}
        onClose={() => setAboutPreview(false)}
      />
      <Lightbox
        open={!!leaderPreview}
        src={leaderPreview ? leaderPreview.image + imgVer : undefined}
        caption={leaderPreview ? t(leaderPreview.nameKey) : undefined}
        onClose={() => setLeaderPreview(null)}
      />
    </>
  );
}
