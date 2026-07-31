import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Medhin Primary Hospital — Quality Healthcare in Woldia",
  description:
    "Medhin Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.",
  openGraph: {
    title: "Medhin Primary Hospital — Quality Healthcare in Woldia",
    description:
      "Medhin Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.",
  },
};

export default function Page() {
  return <HomeClient />;
}
