export interface LeadershipData {
  id: number;
  name: string;
  nameAm?: string;
  role: string;
  roleAm?: string;
  bio?: string;
  image?: string;
  experience?: string;
  certificates?: string[];
  awards?: string[];
}

export const fallbackLeadership: LeadershipData[] = [
  {
    id: 1,
    name: "Dr. Kassaw Alemayehu",
    nameAm: "ዶ/ር ቃሳው አለማየሁ",
    role: "CEO & Medical Director",
    roleAm: "ስልጣኔ ኃላፊ እና የሕክምና መሪ",
    bio: "Dr. Kassaw brings over 20 years of leadership experience in healthcare administration and clinical practice.",
    image: "/leadership/dr-kassaw.jpg",
    experience: "20+ Years",
    certificates: ["MD - Addis Ababa University", "MBA in Healthcare Management"],
    awards: ["Healthcare Leadership Award 2023"],
  },
  {
    id: 2,
    name: "Dr. Hana Tesfaye",
    nameAm: "ዶ/ር ሀና ተስፋዬ",
    role: "Chief of Medical Services",
    roleAm: "የሕክምና አገልግሎት ዋና ኃላፊ",
    bio: "Dr. Hana oversees all clinical operations and ensures the highest standards of patient care.",
    image: "/leadership/dr-hana.jpg",
    experience: "15+ Years",
    certificates: ["MD - Jimma University", "Specialty in Internal Medicine"],
    awards: ["Excellence in Patient Care 2022"],
  },
  {
    id: 3,
    name: "Samuel Bekele",
    nameAm: "ሳሙኤል በቀለ",
    role: "Chief Operations Officer",
    roleAm: "የስራ ኃላፊ",
    bio: "Samuel manages hospital operations, ensuring efficient service delivery and resource management.",
    image: "/leadership/samuel-bekele.jpg",
    experience: "12+ Years",
    certificates: ["BSc in Health Administration", "MPH - Ethiopian Civil Service University"],
    awards: [],
  },
];

export interface FaqData {
  id: number;
  question: string;
  questionAm?: string;
  answer: string;
  answerAm?: string;
  category?: string;
}

export const fallbackFaqs: FaqData[] = [
  {
    id: 1,
    question: "What are the hospital's visiting hours?",
    answer: "General visiting hours are from 2:00 PM to 8:00 PM daily. ICU and critical care units have separate visiting schedules. Please contact the front desk for specific ward visiting arrangements.",
    category: "General",
  },
  {
    id: 2,
    question: "How can I book an appointment?",
    answer: "You can book an appointment by calling our reception at +251 11 123 4567, using our online appointment system on this website, or by visiting the hospital in person during working hours.",
    category: "Appointments",
  },
  {
    id: 3,
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major insurance providers in Ethiopia. Please bring your insurance card and referral letter (if applicable) during your visit. Contact our billing department for specific insurance inquiries.",
    category: "Billing",
  },
  {
    id: 4,
    question: "What should I bring for my first visit?",
    answer: "Please bring a valid ID, any previous medical records, a list of current medications, your insurance card (if applicable), and any referral letters from other healthcare providers.",
    category: "Appointments",
  },
  {
    id: 5,
    question: "Is the emergency department open 24/7?",
    answer: "Yes, our emergency department operates 24 hours a day, 7 days a week with qualified emergency physicians and nurses always on duty.",
    category: "Emergency",
  },
  {
    id: 6,
    question: "How do I get my lab results?",
    answer: "Lab results are typically available within 24-48 hours. You can collect them in person from the laboratory, or request digital delivery via the contact information provided during registration.",
    category: "Services",
  },
];

interface SiteSettingsData {
  [key: string]: string;
}

export const fallbackSiteSettings: SiteSettingsData = {
  home_stats_experience: "25",
  home_stats_experience_suffix: "+",
  home_stats_doctors: "50",
  home_stats_doctors_suffix: "+",
  home_stats_patients: "100",
  home_stats_patients_suffix: "K+",
  home_stats_departments: "12",
  home_stats_departments_suffix: "+",
  home_partners: JSON.stringify(["Woldia University", "North Wollo Health Bureau", "Ethiopian Medical Association", "WHO Ethiopia", "UNICEF Ethiopia"]),
  home_departments: JSON.stringify([
    { id: "emergency", icon: "FaAmbulance", color: "#ef4444" },
    { id: "laboratory", icon: "FaFlask", color: "#8b5cf6" },
    { id: "xray", icon: "FaXRay", color: "#f97316" },
    { id: "surgical", icon: "FaCut", color: "var(--primary)" },
    { id: "ecg", icon: "FaHeartbeat", color: "#7FD9C4" },
    { id: "delivery", icon: "FaBaby", color: "#ec4899" },
    { id: "ultrasound", icon: "FaDesktop", color: "#06b6d4" },
    { id: "ct-scan", icon: "FaBrain", color: "#14b8a6" },
  ]),
};
