"use client";

import { useEffect, useRef, useState } from "react";
import { imgVer } from "@/lib/imgver";
import { useSiteSettings, parseJsonSetting } from "@/app/hooks/useSiteSettings";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export interface HeroSlide {
  src: string;
  title?: string;
  titleAm?: string;
  subtitle?: string;
  subtitleAm?: string;
}

function resolveAsset(path?: string) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/images/")) return path;
  return `${API_URL}/${path}`;
}

const defaultSlides: HeroSlide[] = [
  { src: `/images/hospital-hero.jpg${imgVer}`, title: "Medhin Primary Hospital", titleAm: "መድህን ፕራይማሪ ሆስፒታል", subtitle: "Quality healthcare in Woldia — expert doctors, modern diagnostics, and compassionate care.", subtitleAm: "በወልዲያ የላቀ የጤና አገልግሎት — ባለሙያ ሐኪሞች፣ ዘመናዊ ምርምር እና ልቡና ያለው እንክብካቤ።" },
  { src: `/images/hospital-1.jpg${imgVer}`, title: "Your Health, Our Priority", titleAm: "ጤናዎ ቅድሚያችን ነው", subtitle: "Expert Care, Compassionate Hearts", subtitleAm: "ባለሙያ እንክብካቤ፣ አዛኝ ልቦች" },
  { src: `/images/hospital-2.jpg${imgVer}`, title: "Advanced Medical Technology", titleAm: "ዘመናዊ የሕክምና ቴክኖሎጂ", subtitle: "24/7 Emergency Services", subtitleAm: "የ24/7 የአደጋ ጊዜ አገልግሎት" },
];

const SLIDE_MS = 5500;

export default function SmartHero() {
  const { settings } = useSiteSettings("home");

  const apiSlides = parseJsonSetting<HeroSlide[]>(settings.hero_slides, []);
  const slides: HeroSlide[] =
    apiSlides.length > 0
      ? apiSlides.map((s) => ({
          ...s,
          src: resolveAsset(s.src) + (s.src.includes("?") ? "" : imgVer),
        }))
      : defaultSlides;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(
    new Array(slides.length).fill(false)
  );
  const [brightness, setBrightness] = useState<number[]>(
    new Array(slides.length).fill(0.5)
  );
  const startX = useRef<number | null>(null);

  /* Reset per-slide state when the slide list changes (admin edits) */
  useEffect(() => {
    setCurrent(0);
    setLoaded(new Array(slides.length).fill(false));
    setBrightness(new Array(slides.length).fill(0.5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.hero_slides]);

  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = slide.src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        const avg = total / (data.length / 4) / 255;
        setBrightness((prev) => {
          const c = [...prev];
          c[index] = avg;
          return c;
        });
        setLoaded((prev) => {
          const c = [...prev];
          c[index] = true;
          return c;
        });
      };
      img.onerror = () => {
        setLoaded((prev) => {
          const c = [...prev];
          c[index] = true;
          return c;
        });
      };
    });
  }, [settings.hero_slides]);

  useEffect(() => {
    if (slides.length === 0) return;
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  useEffect(() => {
    if (paused) return;
    if (slides.length === 0) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrent((p) =>
        diff > 0
          ? (p + 1) % slides.length
          : (p - 1 + slides.length) % slides.length
      );
    }
    startX.current = null;
  };

  const overlayOpacity = (index: number) => {
    const b = brightness[index];
    if (b > 0.7) return 0.65;
    if (b > 0.5) return 0.55;
    return 0.45;
  };

  if (slides.length === 0) return null;

  return (
    <section
      className="smart-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`smart-hero-slide ${index === current ? "active" : ""}`}
        >
          {loaded[index] ? (
            <img
              src={slide.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--bg-deep)" }} />
          )}
          <div
            className="smart-hero-overlay"
            style={{ opacity: overlayOpacity(index) }}
          />
        </div>
      ))}

      <div className="smart-hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`smart-hero-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}