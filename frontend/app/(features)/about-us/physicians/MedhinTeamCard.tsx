"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Physician } from "@/app/data/about.config";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import { resolveAssetUrl } from "@/lib/asset-url";
import { physicianImageUrl, physicianImageFallback, PHYSICIAN_PLACEHOLDER } from "@/lib/physician-image";
import AppointmentModal from "@/app/components/AppointmentModal";
import Lightbox from "@/app/components/ui/Lightbox";
import { ArrowRight } from "lucide-react";

export default function MedhinTeamCard({ physician }: { physician: Physician }) {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const name = locale === "am" && physician.name_am ? physician.name_am : physician.name;
  const specialty = locale === "am" && physician.specialty_am ? physician.specialty_am : physician.specialty;

  return (
    <article className="medhin-team-card">
      <div className="medhin-team-photo" onClick={() => setPreview(true)}>
        <Image
          src={physicianImageUrl(physician.image) + imgVer}
          alt={name}
          fill
          sizes="(max-width: 1200px) 45vw, 240px"
          className="medhin-team-img"
          onError={physicianImageFallback}
        />
        {physician.available !== undefined && (
          <span className={`medhin-team-status ${physician.available ? "on" : "off"}`}>
            {physician.availabilityText}
          </span>
        )}
      </div>

      <div className="medhin-team-info">
        <h3>{name}</h3>
        <p className="medhin-team-specialty">{specialty}</p>

        <Link href={`/about-us/physicians/${physician.id}`} className="medhin-team-link">
          {t("leadership.viewProfile")} <ArrowRight size={13} />
        </Link>

        <button className="medhin-team-book" onClick={() => setOpen(true)}>
          {t("nav.book")}
        </button>
      </div>

      <AppointmentModal open={open} onClose={() => setOpen(false)} doctor={physician.name} />
      <Lightbox open={preview} src={resolveAssetUrl(physician.image) + imgVer} caption={name} fallbackSrc={PHYSICIAN_PLACEHOLDER} onClose={() => setPreview(false)} />
    </article>
  );
}