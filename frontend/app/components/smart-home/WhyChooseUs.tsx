"use client";

import { useLocale } from "@/app/locale-provider";

export default function WhyChooseUs() {
  const { t } = useLocale();
  const items = [
    { key: "i1" },
    { key: "i2" },
    { key: "i3" },
    { key: "i4" },
    { key: "i5" },
    { key: "i6" },
    { key: "i7" },
    { key: "i8" },
    { key: "i9" },
  ];
  return (
    <section style={{ padding: "80px 0", background: "var(--bg-tint)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="m-h2">{t("whyChooseUs.title")}</h2>
        </div>
        <div className="hgrid grid-3">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={i} className="bykm-card">
                <div className="bykm-badge"><span>{num}</span></div>
                <h3 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4, marginTop: 0, marginRight: 0, marginBottom: 8, marginLeft: 0 }}>
                  {t(`whyChooseUs.${item.key}Title`)}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
                  {t(`whyChooseUs.${item.key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
