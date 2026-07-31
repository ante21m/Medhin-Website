import type { Metadata } from "next";
import NewsClient from "./news-client";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news and updates from Medhin Primary Hospital in Woldia, Ethiopia.",
};

export default function Page() {
  return <NewsClient />;
}
