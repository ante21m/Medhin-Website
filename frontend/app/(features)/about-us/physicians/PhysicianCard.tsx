"use client";

import Image from "next/image";
import { useState } from "react";
import { Physician } from "@/app/data/about.config";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import AppointmentModal from "@/app/components/AppointmentModal";
import Lightbox from "@/app/components/ui/Lightbox";

export default function PhysicianCard({ physician }: { physician: Physician }) {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const name = locale === "am" && physician.name_am ? physician.name_am : physician.name;
  const specialty = locale === "am" && physician.specialty_am ? physician.specialty_am : physician.specialty;

  return (
    <div className="relative" style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--primary-100)", overflow: "hidden", transition: "border-color .35s ease, box-shadow .35s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(37,99,235,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--primary-100)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ height: 5, background: "linear-gradient(90deg, #06b6d4, #0891b2)" }} />
      <div style={{ padding: "1rem" }} className="text-center">
      {/* IMAGE */}
      <div className="relative h-[320px] rounded-2xl overflow-hidden" style={{ cursor: "zoom-in" }} onClick={() => setPreview(true)}>
        <Image
          src={physician.image + imgVer}
          alt={physician.name}
          fill
          className="object-cover transition-all duration-500 hover:scale-105"
        />
        <div
          className="absolute top-3 right-3"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(4,14,11,0.65)", backdropFilter: "blur(4px)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0, transform: "scale(0.8)", transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; e.currentTarget.style.transform = "scale(0.8)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
        </div>
      </div>

      {/* NAME */}
      <h3 className="mt-4 font-bold" style={{ fontSize: "1rem", color: "var(--bg-deep)" }}>
        {name}
      </h3>

      {/* SPECIALTY */}
      <p style={{ fontSize: ".84rem", color: "var(--primary)", fontWeight: 600, marginBottom: 9 }}>
        {specialty}
      </p>

      {/* RATING */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".82rem", color: "var(--ink-soft)", justifyContent: "center" }}>
        <span style={{ color: "#f59e0b" }}>★★★★★</span> {physician.rating.toFixed(1)}
      </div>

      {/* BOOK APPOINTMENT */}
      <button className="book-btn mt-3" onClick={() => setOpen(true)}>
        {t("nav.book")}
      </button>

      {/* MODAL */}
      <AppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        doctor={physician.name}
      />
      </div>

      {/* IMAGE LIGHTBOX */}
      <Lightbox
        open={preview}
        src={physician.image + imgVer}
        caption={name}
        onClose={() => setPreview(false)}
      />
    </div>
  );
}
