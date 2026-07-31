"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/app/locale-provider";
import SearchOverlay from "./SearchOverlay";

export default function SearchTrigger() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label={t("search.label")}
      >
        <Search size={18} />
        <span className="search-trigger-text">{t("search.label")}</span>
        <kbd className="search-kbd">Ctrl+K</kbd>
      </button>
      <SearchOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
