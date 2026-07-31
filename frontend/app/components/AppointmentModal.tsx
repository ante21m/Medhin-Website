"use client";

import { useLocale } from "@/app/locale-provider";
import { useEffect, useState, useMemo } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  doctor?: string;
}

function getMinDate(): string {
  return new Date().toISOString().split("T")[0];
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h < 18; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

export default function AppointmentModal({ open, onClose, doctor }: Props) {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = useMemo(generateTimeSlots, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (!open) {
      setName(""); setPhone(""); setDate(""); setTime(""); setNote(""); setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) return;
    setSubmitted(true);
  };

  if (!open) return null;

  if (submitted) {
    return (
      <div className="modal-backdrop">
        <div className="modal" role="dialog" aria-modal>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h2 style={{ margin: "0 0 8px" }}>{t("appointment.successTitle")}</h2>
            <p style={{ color: "var(--ink-soft)", margin: "0 0 20px", fontSize: 14 }}>{t("appointment.successDesc")}</p>
            <div style={{ textAlign: "left", background: "#f9fafb", borderRadius: 10, padding: 14, marginBottom: 18, fontSize: 13 }}>
              <div style={{ marginBottom: 6 }}><strong>{t("appointment.doctor")}:</strong> {doctor}</div>
              <div style={{ marginBottom: 6 }}><strong>{t("appointment.date")}:</strong> {date}</div>
              <div style={{ marginBottom: 6 }}><strong>{t("appointment.time")}:</strong> {time}</div>
              <div><strong>{t("appointment.name")}:</strong> {name}</div>
            </div>
            <button className="book-btn" onClick={onClose} style={{ background: "var(--primary)" }}>
              {t("appointment.bookAnother")}
            </button>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div
        className="modal"
        role="dialog"
        aria-modal
      >
        <h2>{t("nav.book")}</h2>

        {doctor && <p className="modal-doctor">{doctor}</p>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            required
            placeholder={t("appointment.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="tel"
            placeholder={t("appointment.phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getMinDate()}
          />

          <div className="modal-times">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`modal-time-btn ${time === slot ? "active" : ""}`}
                onClick={() => setTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <textarea
            placeholder={t("appointment.note")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            type="submit"
            className="book-btn"
            disabled={!name.trim() || !phone.trim() || !date || !time}
          >
            {t("nav.book")}
          </button>
        </form>

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
