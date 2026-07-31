import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Medhin Primary Hospital in Woldia, Ethiopia. Find our address, phone, email, hours, and directions.",
  openGraph: {
    title: "Contact Us | Medhin Primary Hospital",
    description:
      "Get in touch with Medhin Primary Hospital in Woldia, Ethiopia. Find our address, phone, email, hours, and directions.",
  },
};

export default function Page() {
  return <ContactClient />;
}
