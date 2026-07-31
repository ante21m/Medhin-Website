"use client";

// NOTE: placeholder sample content — swap in real, consented patient reviews before launch.
const testimonials = [
  { name: "Selamawit T.", role: "Maternity patient", quote: "The delivery ward staff were attentive every step of the way. I felt safe and well cared for during my whole stay.", initials: "ST", color: "#EC4899", bg: "#FDF2F8" },
  { name: "Getachew A.", role: "Cardiology patient", quote: "My ECG results were explained clearly and the follow-up scheduling was effortless. Genuinely modern care in Woldia.", initials: "GA", color: "var(--primary)", bg: "var(--primary-100)" },
  { name: "Hana M.", role: "Emergency care", quote: "We arrived late at night and the emergency team responded immediately. Grateful for how quickly they acted.", initials: "HM", color: "#F97316", bg: "#FFF7ED" },
];

export default function Testimonials() {
  return (
    <section className="m-section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="m-blob" style={{ width: 300, height: 300, bottom: -120, right: -60, background: "var(--accent-100)", opacity: 0.55 }} />
      <div className="m-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="m-eyebrow" style={{ justifyContent: "center" }}>Patient Stories</div>
          <h2 className="m-h2">What Our Patients Say</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {testimonials.map((item, i) => (
            <div key={i} className="m-card" style={{ padding: 28, position: "relative" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", color: "var(--line)", lineHeight: 0.5, marginBottom: 18 }}>&ldquo;</div>
              <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 24, minHeight: 96 }}>{item.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--line-soft)" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: item.bg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)" }}>{item.name}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--ink-faint)" }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
