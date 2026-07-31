"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-provider";
import {
  Box, Container, Title, Text, Stack, Badge, Group,
  SimpleGrid, Center, Overlay, Modal, CloseButton
} from "@mantine/core";
import { X } from "lucide-react";
import { imgVer } from "@/lib/imgver";

const categories = ["All", "Facilities", "Doctors", "Staff", "Equipment"] as const;

const catKeys: Record<string, string> = {
  All: "galleryPage.all",
  Facilities: "galleryPage.facilities",
  Doctors: "galleryPage.doctors",
  Staff: "galleryPage.staff",
  Equipment: "galleryPage.equipment",
};

const imageTitles: Record<string, Record<string, string>> = {
  en: {
    "Clinic Building": "Clinic Building",
    "Main Entrance": "Main Entrance",
    "Waiting Area": "Waiting Area",
    "Patient Room": "Patient Room",
    "Reception Desk": "Reception Desk",
    "Clinic Overview": "Clinic Overview",
    "Building Exterior": "Building Exterior",
    "Clinic Front": "Clinic Front",
    "Consultation Room": "Consultation Room",
    "Doctor at Work": "Doctor at Work",
    "Medical Team": "Medical Team",
    "Surgery in Progress": "Surgery in Progress",
    "Medhin Staff": "Medhin Staff",
    "X-Ray Machine": "X-Ray Machine",
    "CT Scanner": "CT Scanner",
    "Ultrasound Device": "Ultrasound Device",
    "Laboratory Equipment": "Laboratory Equipment",
  },
  am: {
    "Clinic Building": "የክሊኒክ ህንፃ",
    "Main Entrance": "ዋና መግቢያ",
    "Waiting Area": "የሚጠባበቂያ ክፍል",
    "Patient Room": "የታካሚ ክፍል",
    "Reception Desk": "የአቀባበል ዴስክ",
    "Clinic Overview": "የክሊኒክ አጠቃላይ እይታ",
    "Building Exterior": "የህንፃ ውጫዊ ገጽታ",
    "Clinic Front": "የክሊኒክ ፊት ለፊት",
    "Consultation Room": "የምክር ክፍል",
    "Doctor at Work": "ሐኪም በስራ ላይ",
    "Medical Team": "የሕክምና ቡድን",
    "Surgery in Progress": "የቀዶ ጥገና በሂደት ላይ",
    "Medhin Staff": "የመድህን ሰራተኞች",
    "X-Ray Machine": "ኤክስሬይ ማሽን",
    "CT Scanner": "ሲቲ ስካነር",
    "Ultrasound Device": "አልትራሳውንድ መሣሪያ",
    "Laboratory Equipment": "የላቦራቶሪ መሣሪያዎች",
  },
};

const rawImages = [
  { src: "/images/hospital-hero.jpg", cat: "Facilities", en: "Clinic Building" },
  { src: "/images/hospital-1.jpg", cat: "Facilities", en: "Main Entrance" },
  { src: "/images/hospital-2.jpg", cat: "Facilities", en: "Waiting Area" },
  { src: "/images/hospital-3.jpg", cat: "Facilities", en: "Patient Room" },
  { src: "/images/clinic.jpg", cat: "Facilities", en: "Reception Desk" },
  { src: "/images/clinic-poster.jpg", cat: "Facilities", en: "Clinic Overview" },
  { src: "/images/slide1.jpg", cat: "Facilities", en: "Building Exterior" },
  { src: "/images/slide2.jpg", cat: "Facilities", en: "Clinic Front" },
  { src: "/images/doctor-1.jpg", cat: "Doctors", en: "Consultation Room" },
  { src: "/images/doctor-2.jpg", cat: "Doctors", en: "Doctor at Work" },
  { src: "/images/doctor-3.jpg", cat: "Doctors", en: "Medical Team" },
  { src: "/images/doctor-4.jpg", cat: "Doctors", en: "Surgery in Progress" },
  { src: "/images/medhin-staff.jpg", cat: "Staff", en: "Medhin Staff" },
  { src: "/images/hospital-1.jpg", cat: "Equipment", en: "X-Ray Machine" },
  { src: "/images/hospital-2.jpg", cat: "Equipment", en: "CT Scanner" },
  { src: "/images/clinic.jpg", cat: "Equipment", en: "Ultrasound Device" },
  { src: "/images/hospital-3.jpg", cat: "Equipment", en: "Laboratory Equipment" },
];

export default function GalleryClient() {
  const { t, locale } = useLocale();
  const lang = locale as "en" | "am";
  const [active, setActive] = useState<string>("All");
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null);

  const images = rawImages.map((img) => ({
    ...img,
    src: img.src + imgVer,
    title: imageTitles[lang]?.[img.en] ?? img.en,
  }));

  const filtered = active === "All" ? images : images.filter((img) => img.cat === active);

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Hero */}
      <Box
        py={56}
        pos="relative"
        style={{
          background: "var(--bg-deep)",
          overflow: "hidden",
        }}
      >
        <Box
          pos="absolute"
          style={{
            inset: 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
        <Box pos="absolute" style={{ top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <Box pos="absolute" style={{ bottom: -120, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <Badge
              variant="white"
              size="lg"
              radius="xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", textTransform: "none" }}
            >
              {t("galleryPage.title")}
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
              {t("galleryPage.title")}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={500} lh={1.6}>
              {t("galleryPage.subtitle")}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size={1300} py={48}>
        {/* Filter pills */}
        <Group justify="center" gap="xs" mb="xl">
          {categories.map((cat) => (
            <Box
              key={cat}
              component="button"
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: active === cat ? "none" : "1px solid var(--line)",
                background: active === cat ? "var(--primary)" : "transparent",
                color: active === cat ? "#fff" : "#4b5563",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t(catKeys[cat])}
            </Box>
          ))}
        </Group>

        {/* Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {filtered.map((img, i) => (
            <Box
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--primary-100)",
                cursor: "pointer",
                transition: "border-color .35s ease, box-shadow .35s ease, transform 0.3s ease",
              }}
              className="group"
              onClick={() => { setSelected(img); setOpened(true); }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(37,99,235,0.12)"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--primary-100)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <div style={{ height: 5, background: "linear-gradient(90deg, #06b6d4, #0891b2)" }} />
              <Box
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-110"
                />
                <Box
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="group-hover:opacity-100"
                />
                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 16px",
                    opacity: 0,
                    transform: "translateY(8px)",
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <Text c="white" size="sm" fw={600}>{img.title}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Lightbox */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="xl"
        padding={0}
        withCloseButton={false}
        centered
        styles={{ body: { padding: 0 }, content: { background: "transparent", boxShadow: "none" } }}
      >
        {selected && (
          <Box pos="relative">
            <CloseButton
              onClick={() => setOpened(false)}
              style={{
                position: "absolute", top: 8, right: 8, zIndex: 10,
                background: "rgba(0,0,0,0.5)", color: "#fff",
                borderRadius: "50%",
              }}
              icon={<X size={18} />}
            />
            <Box
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Text ta="center" c="white" fw={600} size="sm" mt="sm">
              {selected.title}
            </Text>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
