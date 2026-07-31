import type { Metadata } from "next";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description:
    "Explore our clinic facilities, staff, and services at Medhin Primary Hospital in Woldia, Ethiopia.",
};

export default function Page() {
  return <GalleryClient />;
}
