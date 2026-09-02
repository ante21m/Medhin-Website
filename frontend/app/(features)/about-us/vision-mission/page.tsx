"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/app/locale-provider";
import Lightbox from "@/app/components/ui/Lightbox";
import "../about-us.css";

export default function VisionMission() {
  const { t } = useLocale();
  const [preview, setPreview] = useState(false);

  return (
    <section className="vision-mission">
      <div className="vision-mission-container">
        {/* LEFT: TEXT */}
        <div className="vision-mission-text fade-left">
          <h1>{t("about.visionMission")}</h1>

          <div className="vm-block">
            <h3> {t("vision.title")}</h3>
            <p>{t("vision.description")}</p>
          </div>

          <div className="vm-block">
            <h3> {t("mission.title")}</h3>
            <p>{t("mission.description")}</p>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="vision-mission-image fade-right" style={{ cursor: "zoom-in" }} onClick={() => setPreview(true)}>
          <Image
            src="/images/clinic.jpg"
            alt="Clinic Vision and Mission"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* IMAGE LIGHTBOX */}
      <Lightbox
        open={preview}
        src="/images/clinic.jpg"
        caption={t("about.visionMission")}
        onClose={() => setPreview(false)}
      />
    </section>
  );
}
