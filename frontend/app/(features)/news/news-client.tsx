"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useGetNewsQuery } from "@/app/store/api/newsApi";
import {
  Box, Container, Title, Text, Stack, Group,
  SimpleGrid, Card, Center, Loader, Modal, CloseButton
} from "@mantine/core";
import { Calendar, ArrowRight, User, ZoomIn } from "lucide-react";
import Lightbox from "@/app/components/ui/Lightbox";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

function resolveAsset(path?: string) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/images/")) return path;
  return `${API_URL}/${path}`;
}

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "am" ? "am-ET" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsClient() {
  const { t, locale } = useLocale();
  const { data: articles, isLoading } = useGetNewsQuery();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  const visible = articles?.filter((a) => a.isActive) ?? [];

  if (isLoading) {
    return <Center mih={400}><Loader size="lg" color="blue" /></Center>;
  }

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
            background:
              "radial-gradient(ellipse at 18% 28%, rgba(11,93,82,0.5) 0%, transparent 65%), radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)",
          }}
        />
        <Box className="bykm-grid-overlay" />
        <Box className="bykm-geo" style={{ top: -80, right: -80, width: 340, height: 340, transform: "rotate(12deg)" }} />
        <Box className="bykm-geo" style={{ bottom: -120, left: -60, width: 240, height: 240, transform: "rotate(-10deg)", opacity: 0.6 }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash" />
              <span className="bykm-kicker">{t("nav.news")}</span>
            </div>
            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 44px)", marginTop: 14 }}>
              {t("newsPage.title")}
            </Title>
            <div style={{ width: 64, height: 3, background: "#7FD9C4", marginTop: 16 }} />
            <Text size="md" ta="center" maw={560} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("newsPage.subtitle")}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* News Grid */}
      <Container size={1300} py={48}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {visible.map((article) => (
            <Card
              key={article.id}
              radius={3}
              withBorder
              padding={0}
              shadow="sm"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                borderTop: "3px solid var(--primary)",
              }}
              className="group"
            >
              {/* Image */}
              <Box
                style={{ position: "relative", height: 200, overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setPreview({ src: resolveAsset(article.image) || "/images/hospital-hero.jpg", alt: article.title })}
              >
                <Image
                  src={resolveAsset(article.image) || "/images/hospital-hero.jpg"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-110"
                />
                <Box
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(4,14,11,0.65)",
                    backdropFilter: "blur(4px)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0.8)",
                    transition: "all 0.3s ease",
                    pointerEvents: "none",
                  }}
                  className="group-hover:opacity-100 group-hover:scale-100"
                >
                  <ZoomIn size={16} />
                </Box>
              </Box>

              {/* Content */}
              <Box p="lg" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Date + Author */}
                <Group gap="md" mb={6}>
                  <Group gap={4}>
                    <Calendar size={12} color="var(--ink-faint)" />
                    <Text size="xs" c="gray.5">{formatDate(article.createdAt, locale)}</Text>
                  </Group>
                  <Group gap={4}>
                    <User size={12} color="var(--ink-faint)" />
                    <Text size="xs" c="gray.5">{t("newsPage.by")} {article.author}</Text>
                  </Group>
                </Group>

                {/* Title */}
                <Text fw={700} size="md" c="gray.9" mb={8} lineClamp={2}>
                  {locale === "am" && article.titleAm ? article.titleAm : article.title}
                </Text>

                {/* Description */}
                <Text size="sm" c="gray.6" lh={1.6} style={{ flex: 1 }} lineClamp={3}>
                  {(locale === "am" ? article.summaryAm || article.contentAm : null) || article.summary || article.content}
                </Text>

                {/* Read More */}
                <Box mt="md">
                  <Box
                    component={Link}
                    href={`/news/${article.id}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "var(--primary)",
                      textDecoration: "none", transition: "gap 0.2s ease",
                    }}
                    className="group/link"
                  >
                    <Text size="sm" fw={700} component="span" style={{ fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>{t("newsPage.readMore")}</Text>
                    <ArrowRight size={14} style={{ transition: "transform 0.2s ease" }} className="group-hover/link:translate-x-1" />
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Video Modal */}
      <Modal.Root opened={!!videoUrl} onClose={() => { setVideoUrl(null); }} size="auto" centered>
        <Modal.Overlay style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />
        <Modal.Content style={{ background: "transparent", boxShadow: "none", maxWidth: 800, margin: "0 auto" }}>
          <Box style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#000" }}>
            <Box
              style={{
                position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
              }}
            >
              <Text size="sm" fw={600} c="white">Clinic Virtual Tour</Text>
              <CloseButton size="lg" style={{ color: "#fff" }} onClick={() => setVideoUrl(null)} />
            </Box>
            <video
              controls
              autoPlay
              style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
            >
              <source src={videoUrl!} type="video/mp4" />
            </video>
          </Box>
        </Modal.Content>
      </Modal.Root>

      {/* Image Lightbox */}
      <Lightbox
        open={!!preview}
        src={preview?.src}
        caption={preview?.alt}
        onClose={() => setPreview(null)}
      />
    </Box>
  );
}
