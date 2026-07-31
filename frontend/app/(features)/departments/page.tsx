import type { Metadata } from "next";
import DepartmentsClient from "./departments-client";

export const metadata: Metadata = {
  title: "Our Departments",
  description:
    "Explore our specialized medical departments at Medhin Primary Hospital — Cardiology, Neurology, Orthopedics, Pediatrics, and more.",
  openGraph: {
    title: "Our Departments | Medhin Primary Hospital",
    description:
      "Explore our specialized medical departments at Medhin Primary Hospital — Cardiology, Neurology, Orthopedics, Pediatrics, and more.",
  },
};

export default function Page() {
  return <DepartmentsClient />;
}
