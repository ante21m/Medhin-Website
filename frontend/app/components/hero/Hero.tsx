"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/app/locale-provider";
import Typed from "typed.js";
import { imgVer } from "@/lib/imgver";

const slides = [
  { src: `/images/hospital-hero.jpg${imgVer}`, baseOverlay: 0.3 },
];

const SLIDE_DURATION = 4500;

export default function Hero() {
  const { t } = useLocale();

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(
    new Array(slides.length).fill(false)
  );
  const [brightness, setBrightness] = useState<number[]>(
    new Array(slides.length).fill(0.5)
  );

  const startX = useRef<number | null>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  /* 🔍 Analyze image brightness (AI-style) */
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = slide.src;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }

        const avg = total / (data.length / 4) / 255;

        setBrightness((prev) => {
          const copy = [...prev];
          copy[index] = avg;
          return copy;
        });

        setLoaded((prev) => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
      };
    });
  }, []);

  const getTypedStrings = useCallback(() => [
    t("typed.line1"),
    t("typed.line2"),
    t("typed.line3"),
    t("typed.line4"),
  ], [t]);

  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: getTypedStrings(),
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, [getTypedStrings]);

  /* Auto slide */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [paused]);

  /* Swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrent((p) =>
        diff > 0 ? (p + 1) % slides.length : (p - 1 + slides.length) % slides.length
      );
    }
    startX.current = null;
  };

  /* 🎯 AI-style overlay strength calculation */
  const getOverlayOpacity = (index: number) => {
    const b = brightness[index]; // 0 (dark) → 1 (bright)
    const base = slides[index].baseOverlay;

    // Brighter image → stronger overlay
    if (b > 0.7) return base + 0.2;
    if (b > 0.5) return base + 0.1;
    return base;
  };

  return (
    <header
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: loaded[index] ? `url(${slide.src})` : "none",
          }}
          aria-hidden
        >
          {/* Overlay per slide */}
          {loaded[index] && (
            <div
              className="hero-overlay"
              style={{
                opacity: getOverlayOpacity(index),
              }}
            />
          )}
        </div>
      ))}

      <div className="hero-content">
        <h1>{t("hero.title")}</h1>
        <p><span ref={typedRef} /></p>
        <a href="/appointment" className="hero-btn">
          {t("hero.cta")}
        </a>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </header>
  );
}
