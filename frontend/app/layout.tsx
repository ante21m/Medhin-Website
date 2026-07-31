import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { LocaleProvider } from "./locale-provider";
import { Inter, Noto_Sans_Ethiopic, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "./providers";
import BackToTop from "./components/BackToTop";
import JsonLd from "./components/JsonLd";

const AiAssistant = dynamic(() => import("./components/AiAssistant"));

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const ethiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Medhin Primary Hospital — Quality Healthcare in Woldia";
const description =
  "Medhin Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B5D52",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://medhinprimaryhospital.com"),
  title: {
    default: title,
    template: "%s | Medhin Primary Hospital",
  },
  description,
  keywords: [
    "Medhin Primary Hospital",
    "Woldia hospital",
    "healthcare Woldia",
    "clinic in Woldia",
    "emergency care",
    "doctor Woldia",
    "medical clinic Ethiopia",
    "specialized clinic",
  ],
  authors: [{ name: "Medhin Primary Hospital" }],
  openGraph: {
    title,
    description,
    url: "https://medhinprimaryhospital.com",
    siteName: "Medhin Primary Hospital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${ethiopic.className} ${fraunces.variable} ${plexMono.variable}`}>
        <JsonLd />
        <Providers>
          <LocaleProvider>
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
            <AiAssistant />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}