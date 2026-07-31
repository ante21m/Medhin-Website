"use client";

const specs = [
  { label: "Response Time", value: "< 5 min", detail: "Emergency triage" },
  { label: "Monitoring", value: "24/7", detail: "Vitals & ICU telemetry" },
  { label: "Diagnostic Accuracy", value: "CT · X-Ray · Lab", detail: "Cross-validated results" },
  { label: "Data Integrity", value: "Encrypted", detail: "Patient records" },
];

export default function ClinicalPrecision() {
  return (
    <section className="m-blueprint" style={{ padding: "100px 0", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      <div className="m-blueprint--dark" style={{ position: "absolute", inset: 0 }} />
      <div className="m-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }}>

          {/* Left: copy */}
          <div>
            <div className="m-eyebrow m-eyebrow--light">Our Engineering Mindset</div>
            <h2 className="m-h2" style={{ color: "#fff", marginBottom: 18 }}>Clinical Precision, by Design</h2>
            <p style={{ color: "var(--on-deep-soft)", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: 32, maxWidth: 46 + "ch" }}>
              Every workflow at Medhin — from intake to diagnosis to discharge — is built like a system: measured, monitored, and continuously verified. Precision isn&apos;t a slogan here, it&apos;s the operating standard.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {specs.map((s, i) => (
                <div key={i} style={{ background: "var(--bg-deep)", padding: "18px 20px" }}>
                  <div className="m-spec-label" style={{ color: "#7FD9C4", marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#fff", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--on-deep-soft)" }}>{s.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: circuit-style vitals convergence schematic */}
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 520 380" style={{ width: "100%", height: "auto" }} aria-hidden="true">
              {/* Circuit trace lines converging on a central node */}
              <g fill="none" stroke="rgba(127,217,196,0.45)" strokeWidth="1.5">
                <path d="M20 60 H160 L190 90 V180" />
                <path d="M20 190 H130 L160 190" />
                <path d="M20 320 H160 L190 290 V210" />
                <path d="M500 60 H360 L330 90 V180" />
                <path d="M500 190 H390 L360 190" />
                <path d="M500 320 H360 L330 290 V210" />
              </g>
              {/* Junction dots */}
              {[[20,60],[20,190],[20,320],[190,90],[160,190],[190,290],[500,60],[500,190],[500,320],[330,90],[360,190],[330,290]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="#7FD9C4" />
              ))}

              {/* Node labels (left) */}
              <text x="20" y="50" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">INTAKE</text>
              <text x="20" y="180" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">DIAGNOSTICS</text>
              <text x="20" y="310" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">TREATMENT</text>
              {/* Node labels (right) */}
              <text x="410" y="50" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">MONITORING</text>
              <text x="430" y="180" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">RECORDS</text>
              <text x="440" y="310" fill="#7FD9C4" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">FOLLOW-UP</text>

              {/* Central convergence ring */}
              <circle cx="260" cy="190" r="56" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <circle cx="260" cy="190" r="40" fill="var(--primary-900)" stroke="#7FD9C4" strokeWidth="1.5" />

              {/* Pulse line inside the node */}
              <path d="M232 190 H246 L253 174 L263 206 L270 182 L276 190 H288" fill="none" stroke="#7FD9C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
