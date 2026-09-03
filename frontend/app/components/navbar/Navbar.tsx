"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/app/locale-provider";
import LanguageDropdown from "../LanguageDropdown";
import SearchTrigger from "../SearchTrigger";
import { FaCalendarCheck, FaTimes } from "react-icons/fa";
import { FiMenu, FiChevronRight } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const { t, locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about-us", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/departments", label: t("nav.departments") },
    { href: "/news", label: t("nav.news") },
    { href: "/about-us/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/appointment", label: t("nav.book") },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "#062F2A" : "#062F2A",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      <nav className="m-container" style={{ padding: scrolled ? "10px 24px" : "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, transition: "padding 0.35s ease" }}>

        {/* Logo */}
        <Link href="/" className="nav-logo-link" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.2)",
            transition: "border-color 0.3s, transform 0.3s",
            flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = ""; }}
          >
            <Image src="/hospital-logo.jpg" alt="Medhin Logo" width={38} height={38} style={{ borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.08rem", fontWeight: 500, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15 }}>
              {locale === "am" ? "መድህን" : "Medhin"}
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.03em", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              {locale === "am" ? "ፕራይመሪ ሆስፒታል" : "Primary Hospital"}
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="nav-menu" style={{ display: "flex", alignItems: "center", gap: 28, listStyle: "none", margin: 0, padding: 0, flexShrink: 0 }}>
          {links.map(item => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href}
                  style={{
                    fontSize: "0.87rem",
                    fontWeight: 500,
                    color: active ? "var(--accent)" : "rgba(255,255,255,0.8)",
                    background: "transparent",
                    padding: "4px 0",
                    borderRadius: 0,
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
                  {item.label}
                  <span style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: active ? "100%" : 0,
                    height: 2,
                    background: "var(--accent)",
                    borderRadius: 999,
                    transition: "width 0.3s ease",
                  }} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <SearchTrigger />
            <LanguageDropdown />
          </div>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={20} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div className={`nav-panel${menuOpen ? " open" : ""}`}>
        <ul className="nav-panel-list">
          {links.map(item => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="nav-panel-item">
                <Link href={item.href} className={`nav-panel-link${active ? " active" : ""}`}>
                  {item.label}
                </Link>
                <FiChevronRight size={14} style={{ color: active ? "var(--accent)" : "rgba(255,255,255,0.25)" }} />
              </li>
            );
          })}
        </ul>
        <div style={{ padding: "0 24px 26px" }}>
          <Link href="/appointment" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "13px 20px", borderRadius: 4, background: "linear-gradient(135deg, #0E8371, #0B5D52)", color: "#fff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
            <FaCalendarCheck size={13} /> {t("nav.book")}
          </Link>
        </div>
      </div>
    </header>
  );
}