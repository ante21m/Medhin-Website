"use client";

import { useEffect, useRef, useState } from "react";
import PhysicianCard from "./PhysicianCard";
import { useLocale } from "@/app/locale-provider";
import { usePhysicians } from "@/app/hooks/usePhysicians";

export default function PhysicianCarousel() {
  const { t } = useLocale();
  const { physicians } = usePhysicians();
  const [dept, setDept] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  const departments = ["All", ...new Set(physicians.map(p => p.specialty))];

  const filtered =
    dept === "All"
      ? physicians
      : physicians.filter(p => p.specialty === dept);

  /* AUTOPLAY */
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [dept]);

  /* Cancel smooth scroll if modal opens mid-animation */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const handler = () => {
      if (document.querySelector(".modal-backdrop")) {
        el.scrollTo({ left: el.scrollLeft, behavior: "auto" });
      }
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

 const startAuto = () => {
  stopAuto();
  if (document.querySelector(".modal-backdrop")) return;

  autoRef.current = setInterval(() => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.querySelector(".slide");
    if (!card) return;

    const cardWidth = card.clientWidth;

    sliderRef.current.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  }, 3000);
};



  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  return (
    <>
      {/* DEPARTMENT TABS */}
      <div className="department-tabs">
        {departments.map(d => (
          <button
            key={d}
            className={dept === d ? "active" : ""}
            onClick={() => setDept(d)}
          >
            {d === "All" ? "All" : t(`departments.${d.toLowerCase()}`)}
          </button>
        ))}
      </div>
 
      {/* CAROUSEL */}
      <div
        className="carousel"
        ref={sliderRef}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        {filtered.map(p => (
          <div key={p.id} className="slide">
            <PhysicianCard physician={p} />
          </div>
        ))}
      </div>
    </>
  );
}
