import type { Metadata } from "next";
import PhysiciansClient from "./physicians-client";

export const metadata: Metadata = {
  title: "Our Physicians",
  description:
    "Meet our team of experienced physicians at Medhin Primary Hospital. Specialists in cardiology, neurology, orthopedics, pediatrics, and more.",
  openGraph: {
    title: "Our Physicians | Medhin Primary Hospital",
    description:
      "Meet our team of experienced physicians at Medhin Primary Hospital. Specialists in cardiology, neurology, orthopedics, pediatrics, and more.",
  },
};

export default function Page() {
  return <PhysiciansClient />;
}
