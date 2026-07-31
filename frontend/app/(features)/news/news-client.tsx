"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useGetNewsQuery } from "@/app/store/api/newsApi";
import type { NewsItem } from "@/app/store/api/newsApi";
import {
  Box, Container, Title, Text, Stack, Badge, Group,
  SimpleGrid, Card, Center, Loader, Modal, CloseButton
} from "@mantine/core";
import { Calendar, ArrowRight, User, Newspaper } from "lucide-react";

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
              <Group gap={6}>
                <Newspaper size={14} />
                {t("nav.news")}
              </Group>
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
              {t("newsPage.title")}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={560} lh={1.6}>
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
              radius="lg"
              withBorder
              padding={0}
              shadow="sm"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              className="group"
            >
              {/* Image */}
              <Box style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <Image
                  src={article.image || "/images/hospital-hero.jpg"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-110"
                />
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
                <Text fw={700} size="md" lh={1.4} c="gray.9" mb={8} lineClamp={2}>
                  {article.title}
                </Text>

                {/* Description */}
                <Text size="sm" c="gray.6" lh={1.6} style={{ flex: 1 }} lineClamp={3}>
                  {article.summary || article.content}
                </Text>

                {/* Read More */}
                <Box mt="md">
                  <Box
                    component={Link}
                    href={`/news/${article.id}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: 13, fontWeight: 700, color: "var(--primary)",
                      textDecoration: "none", transition: "gap 0.2s ease",
                    }}
                    className="group/link"
                  >
                    <Text size="sm" fw={700} component="span">{t("newsPage.readMore")}</Text>
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
    </Box>
  );
}
