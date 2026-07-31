"use client";

import { useState } from "react";
import PhysicianCard from "./PhysicianCard";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { useLocale } from "@/app/locale-provider";

export default function PhysicianList() {
  const { t } = useLocale();
  const { physicians } = usePhysicians();
  const [dept, setDept] = useState("All");

  const departments = [
    "All",
    ...Array.from(new Set(physicians.map(p => p.specialty))),
  ];

  const filtered =
    dept === "All"
      ? physicians
      : physicians.filter(p => p.specialty === dept);

  return (
    <>
      {/* DEPARTMENT FILTER */}
      <div className="dept-filter">
        {departments.map(d => (
          <button
            key={d}
            className={dept === d ? "active" : ""}
            onClick={() => setDept(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* PHYSICIANS GRID */}
      <div className="physician-grid">
        {filtered.map(p => (
          <div key={p.id} className="fade-in">
            <PhysicianCard physician={p} />
          </div>
        ))}
      </div>
    </>
  );
}
