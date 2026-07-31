import type { MetadataRoute } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const fallbackPhysicianIds = [
  "dr-derneke-kebede",
  "dr-abebe-kebede",
  "dr-alemnesh-bekele",
  "dr-hibist-tefera",
  "dr-selam-habtu",
  "dr-tibebu-bekele",
];

const fallbackServiceIds = [
  "emergency",
  "delivery",
  "laboratory",
  "surgical",
  "xray",
  "ultrasound",
  "ct-scan",
  "ecg",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://medhinprimaryhospital.com";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${base}/about-us`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about-us/company`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/about-us/physicians`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${base}/about-us/vision-mission`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${base}/about-us/gallery`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${base}/about-us/faqs`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/about-us/annual-report`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/departments`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/appointment`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${base}/news`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/vacancy`, priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const physicians = await fetchJson<Array<{ id: number; name: string }>>("/physicians");
  const physicianPages = (physicians || []).map((p) => ({
    url: `${base}/about-us/physicians/${p.id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const services = await fetchJson<Array<{ id: string }>>("/services");
  const servicePages = (services || []).map((s) => ({
    url: `${base}/services/${s.id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const news = await fetchJson<Array<{ id: number }>>("/news");
  const newsPages = (news || []).map((n) => ({
    url: `${base}/news/${n.id}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...physicianPages, ...servicePages, ...newsPages];
}
