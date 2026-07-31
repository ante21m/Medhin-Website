"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { imgVer } from "@/lib/imgver";

const slides = [
  {
    src: `/images/hospital-hero.jpg${imgVer}`,
    titleKey: "hero.title",
    subtitleKey: "hero.subtitle",
  },
  {
    src: `/images/hospital-1.jpg${imgVer}`,
    titleKey: "typed.line1",
    subtitleKey: "typed.line2",
  },
  {
    src: `/images/hospital-2.jpg${imgVer}`,
    titleKey: "typed.line3",
    subtitleKey: "typed.line4",
  },
];

const SLIDE_MS = 5500;

export default function SmartHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(
    new Array(slides.length).fill(false)
  );
  const [brightness, setBrightness] = useState<number[]>(
    new Array(slides.length).fill(0.5)
  );
  const startX = useRef<number | null>(null);

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
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

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
