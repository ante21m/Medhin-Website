"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useLocale } from "@/app/locale-provider";
import { useSiteSettings, parseJsonSetting } from "@/app/hooks/useSiteSettings";
import Link from "next/link";

interface SearchItem {
  label: string;
  href: string;
  category: string;
}

const defaultSearchData: SearchItem[] = [
  { label: "Cardiology", href: "/departments", category: "Departments" },
  { label: "Neurology", href: "/departments", category: "Departments" },
  { label: "Orthopedics", href: "/departments", category: "Departments" },
  { label: "Pediatrics", href: "/departments", category: "Departments" },
  { label: "All Departments", href: "/departments", category: "Departments" },
  { label: "Emergency Care", href: "/services", category: "Services" },
  { label: "Delivery Service", href: "/services", category: "Services" },
  { label: "Laboratory", href: "/services", category: "Services" },
  { label: "Surgical Service", href: "/services", category: "Services" },
  { label: "X-Ray", href: "/services", category: "Services" },
  { label: "Ultrasound", href: "/services", category: "Services" },
  { label: "CT Scan", href: "/services", category: "Services" },
  { label: "ECG", href: "/services", category: "Services" },
  { label: "Book Appointment", href: "/appointment", category: "Pages" },
  { label: "Contact Us", href: "/contact", category: "Pages" },
  { label: "About Our Clinic", href: "/about-us/company", category: "Pages" },
  { label: "Our Physicians", href: "/about-us/physicians", category: "Pages" },
  { label: "Vision & Mission", href: "/about-us/vision-mission", category: "Pages" },
  { label: "Careers / Vacancy", href: "/vacancy", category: "Pages" },
  { label: "News & Updates", href: "/news", category: "Pages" },
  { label: "FAQs", href: "/about-us/faqs", category: "Pages" },
  { label: "Gallery", href: "/about-us/gallery", category: "Pages" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const { t } = useLocale();
  const { settings } = useSiteSettings("search");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const searchData = parseJsonSetting<SearchItem[]>(settings.search_items, defaultSearchData);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  const filtered = query
    ? searchData.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchData;

  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="search-input"
          />
          <button className="search-overlay-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-results">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="search-group">
              <h4 className="search-category">{category}</h4>
              {items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="search-item"
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          ))}
          {query && filtered.length === 0 && (
            <p className="search-empty">{t("search.noResults")} &quot;{query}&quot;</p>
          )}
        </div>
      </div>
    </div>
  );
}
