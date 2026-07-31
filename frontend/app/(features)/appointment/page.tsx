import type { Metadata } from "next";
import AppointmentClient from "./appointment-client";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Schedule your visit at Medhin Primary Hospital. Choose a doctor, pick a date and time, and confirm your appointment online.",
  openGraph: {
    title: "Book Appointment | Medhin Primary Hospital",
    description:
      "Schedule your visit at Medhin Primary Hospital. Choose a doctor, pick a date and time, and confirm your appointment online.",
  },
};

export default function Page() {
  return <AppointmentClient />;
}
