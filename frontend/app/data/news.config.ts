export interface NewsArticle {
  id: string;
  image: string;
  category: string;
  date: string;
  author: string;
  videoUrl?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "new-emergency-wing",
    image: "/images/hospital-hero.jpg",
    category: "Facility",
    date: "2026-05-15",
    author: "Medhin Communications",
  },
  {
    id: "community-health-outreach",
    image: "/images/hospital-1.jpg",
    category: "Community",
    date: "2026-04-28",
    author: "Medhin Communications",
  },
  {
    id: "new-ct-scanner-installed",
    image: "/images/hospital-2.jpg",
    category: "Technology",
    date: "2026-04-10",
    author: "Medhin Communications",
  },
  {
    id: "pediatric-care-expansion",
    image: "/images/hospital-3.jpg",
    category: "Facility",
    date: "2026-03-22",
    author: "Medhin Communications",
  },
  {
    id: "annual-health-awareness",
    image: "/images/clinic-poster.jpg",
    category: "Community",
    date: "2026-03-05",
    author: "Medhin Communications",
  },
  {
    id: "new-specialists-join",
    image: "/images/clinic.jpg",
    category: "Staff",
    date: "2026-02-18",
    author: "Medhin Communications",
  },
  {
    id: "clinic-virtual-tour",
    image: "/images/hospital-hero.jpg",
    category: "Facility",
    date: "2026-01-10",
    author: "Medhin Communications",
    videoUrl: "/videos/clinic.mp4",
  },
];

export default newsArticles;
