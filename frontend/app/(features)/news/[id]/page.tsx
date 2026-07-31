import type { Metadata } from "next";
import NewsDetailClient from "./news-detail-client";

export const metadata: Metadata = {
  title: "News Article",
  description: "Read the latest news and updates from Medhin Primary Hospital.",
};

export default function Page() {
  return <NewsDetailClient />;
}
