"use client";

import { useEffect, useRef, useState } from "react";

interface LightboxProps {
  open: boolean;
  src?: string;
  caption?: string;
  onClose: () => void;
}

/* Shared full-screen image lightbox.
   - Prominent × close button (top-right, always visible)
   - Closes on backdrop click, Esc key
   - Smooth fade/zoom open & close animations
   - Mobile friendly: responsive sizing, body scroll lock
*/
export default function Lightbox({ open, src, caption, onClose }: LightboxProps) {
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    setClosing(false);
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      onCloseRef.current();
    }, 260);
  };

  if (!open) return null;

  return (
    <div
      className={`lightbox-overlay${closing ? " lightbox-overlay--closing" : ""}`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Image preview"}
    >
      <button className="lightbox-close" onClick={requestClose} aria-label="Close image" tabIndex={0}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      {src && (
        <figure
          className={`lightbox-figure${closing ? " lightbox-figure--closing" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={caption || "Image"} className="lightbox-img" />
          {caption && <figcaption className="lightbox-caption">{caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}