"use client";

import PhysicianCarousel from "./PhysicianCarousel";
import { useLocale } from "@/app/locale-provider";
import "../about-us.css";

export default function PhysiciansClient() {
  const { t } = useLocale();

  return (
    <div className="physicians-page">
      <section className="physicians-hero">
        <h1>{t("about.physicians")}</h1>
        <p>{t("about.physiciansDesc")}</p>
      </section>

      <section className="physicians-list-section">
        <div className="physicians-list-container">
          <PhysicianCarousel />
        </div>
      </section>
    </div>
  );
}
