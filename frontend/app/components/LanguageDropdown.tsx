"use client";

import { Globe, Check } from "lucide-react";
import { useLocale } from "@/app/locale-provider";
import { useState, useRef, useEffect } from "react";

export default function LanguageDropdown() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang" ref={ref}>
      <button
        className="lang-btn"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={15} />
        <span>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul className="lang-menu" role="listbox">
          <li
            className={locale === "en" ? "active" : ""}
            onClick={() => {
              setLocale("en");
              setOpen(false);
            }}
          >
            English
            {locale === "en" && <Check size={14} />}
          </li>

          <li
            className={locale === "am" ? "active" : ""}
            onClick={() => {
              setLocale("am");
              setOpen(false);
            }}
          >
            አማርኛ
            {locale === "am" && <Check size={14} />}
          </li>
        </ul>
      )}
    </div>
  );
}
