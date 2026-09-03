"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Physician } from "@/app/data/about.config";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import AppointmentModal from "@/app/components/AppointmentModal";
import Lightbox from "@/app/components/ui/Lightbox";
import { ArrowRight } from "lucide-react";

export default function PhysicianCard({ physician }: { physician: Physician }) {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const name = locale === "am" && physician.name_am ? physician.name_am : physician.name;
  const specialty = locale === "am" && physician.specialty_am ? physician.specialty_am : physician.specialty;

  return (
    <div className="physician-card">
      {/* IMAGE */}
      <div className="physician-card-image" onClick={() => setPreview(true)}>
        <Image
          src={physician.image + imgVer}
          alt={physician.name}
          fill
          sizes="(max-width: 600px) 85vw, (max-width: 1024px) 45vw, 280px"
          className="physician-card-img"
        />
        {physician.available !== undefined && (
          <span className={`physician-avail ${physician.available ? "is-avail" : "is-busy"}`}>
            <span className="physician-avail-dot" />
            {physician.availabilityText}
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="physician-card-body">
        <h3 className="physician-card-name">{name}</h3>
        <p className="physician-card-specialty">{specialty}</p>

        <Link href={`/about-us/physicians/${physician.id}`} className="physician-card-profile">
          {t("leadership.viewProfile")} <ArrowRight size={12} />
        </Link>

        <button className="book-btn" onClick={() => setOpen(true)}>
          {t("nav.book")}
        </button>
      </div>

      {/* MODAL */}
      <AppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        doctor={physician.name}
      />

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
