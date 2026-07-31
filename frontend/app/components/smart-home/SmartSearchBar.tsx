"use client";

import { useState } from "react";
import { useLocale } from "@/app/locale-provider";
import { useRouter } from "next/navigation";

export default function SmartSearchBar() {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ text: string; links: { label: string; href: string }[] } | null>(null);

  const suggestions = [
    { label: "chest pain", icon: "\u2764\uFE0F" },
    { label: "book pediatrician", icon: "\uD83D\uDC76" },
    { label: "lab results", icon: "\uD83D\uDD2C" },
    { label: "emergency care", icon: "\uD83D\uDEA8" },
    { label: "CT scan cost", icon: "\uD83E\uDDE0" },
  ];

  const runSearch = () => {
    if (!query.trim()) return;
    const lower = query.toLowerCase();

    if (lower.includes("chest") || lower.includes("pain")) {
      setResult({ text: t("smartSearch.chestPain"), links: [{ label: "Cardiology Dept \u2192", href: "/departments/cardiology" }, { label: `${t("cta.bookAppointment")} \u2192`, href: "/appointment" }] });
    } else if (lower.includes("pediatric") || lower.includes("child") || lower.includes("baby")) {
      setResult({ text: t("smartSearch.pediatric"), links: [{ label: "Pediatrics Dept \u2192", href: "/departments/pediatrics" }, { label: `${t("cta.bookAppointment")} \u2192`, href: "/appointment" }] });
    } else if (lower.includes("lab") || lower.includes("test") || lower.includes("result")) {
      setResult({ text: t("smartSearch.labResults"), links: [{ label: "Lab Service \u2192", href: "/services/laboratory" }, { label: `${t("nav.contact")} \u2192`, href: "/contact" }] });
    } else if (lower.includes("emergency")) {
      setResult({ text: t("smartSearch.emergency"), links: [{ label: "Emergency Service \u2192", href: "/services/emergency" }, { label: "Get Directions \u2192", href: "/contact" }] });
    } else if (lower.includes("ct scan") || lower.includes("scan")) {
      setResult({ text: t("smartSearch.ctScan"), links: [{ label: "CT Scan Service \u2192", href: "/services/ct-scan" }, { label: `${t("cta.bookAppointment")} \u2192`, href: "/appointment" }] });
    } else {
      setResult({ text: t("smartSearch.fallback"), links: [{ label: "All Services \u2192", href: "/services" }, { label: `${t("nav.contact")} \u2192`, href: "/contact" }] });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className="smart-bar">
      <div className="smart-bar-in">
        <div className="smart-bar-icon">{"\u2728"}</div>
        <input
          className="smart-bar-inp"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("smartSearch.placeholder")}
        />
        <button className="smart-bar-btn" onClick={runSearch}>{t("smartSearch.askButton")}</button>
      </div>

      {!result && (
        <div className="smart-bar-suggestions">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="smart-sug"
              onClick={() => { setQuery(s.label); }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="smart-bar-result show">
          <strong>{t("smartSearch.aiResponse")}</strong> {result.text}
          <div className="sr-links">
            {result.links.map((link, i) => (
              <button key={i} className="sr-lnk" onClick={() => router.push(link.href)}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
