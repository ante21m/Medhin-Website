"use client";

import Link from "next/link";
import { services } from "./services.data";
import { iconMap } from "@/app/components/icon-map";
import { useLocale } from "@/app/locale-provider";
import {
  Stack, Text, Title, SimpleGrid,
  Box, Container, Flex
} from "@mantine/core";
import {
  ArrowRight, Clock, ShieldCheck, Users, Microscope
} from "lucide-react";

export default function ServicesClient() {
  const { t } = useLocale();

  return (
    <Box bg="gray.0" mih="100vh">
      <Box
        py={72}
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
          <Stack align="center" gap={6} mb={48}>
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash" />
              <span className="bykm-kicker">{t("medicalServices.title")}</span>
            </div>

            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", marginTop: 14 }}>
              {t("servicesPage.title")}
            </Title>

            <div style={{ width: 64, height: 3, background: "#7FD9C4", marginTop: 16 }} />

            <Text size="md" ta="center" maw={520} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("servicesPage.heroSubtitle")}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {[
              { icon: <Clock size={18} />, label: t("servicesPage.stat24h"), sub: t("servicesPage.stat24hSub") },
              { icon: <Users size={18} />, label: t("servicesPage.statServices"), sub: t("servicesPage.statServicesSub") },
              { icon: <ShieldCheck size={18} />, label: t("servicesPage.statExperts"), sub: t("servicesPage.statExpertsSub") },
              { icon: <Microscope size={18} />, label: t("servicesPage.statEquipment"), sub: t("servicesPage.statEquipmentSub") },
            ].map((s) => (
              <Flex key={s.label} gap="md" align="center" p="sm" px="md" className="bykm-stat-chip">
                <Box c="#7FD9C4" style={{ flexShrink: 0 }}>{s.icon}</Box>
                <Box>
                  <Text c="white" fw={700} size="sm" lh={1.2}>{s.label}</Text>
                  <Text c="white" size="xs" style={{ opacity: 0.5 }}>{s.sub}</Text>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <section style={{ padding: "80px 24px", background: "#f5f4ef" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="m-h2">{t("servicesPage.whatWeOffer")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {services.map((svc, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={svc.id} className="bykm-card">
                  <div className="bykm-badge"><span>{num}</span></div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {iconMap[svc.icon]}
                    </div>
                  </div>
                  <h3 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4, marginTop: 0, marginRight: 0, marginBottom: 8, marginLeft: 0 }}>
                    {t(`services.${svc.id}.title`)}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
                    {t(`services.${svc.id}.description`)}
                  </p>
                  <Link href={`/services/${svc.id}`} className="bykm-view-detail" onClick={e => e.stopPropagation()}>
                    {t("servicesPage.viewDetails")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Box
        py={56}
        style={{
          background: "var(--bg-deep)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          pos="absolute"
          className="bykm-geo"
          style={{ top: -100, left: -100, width: 300, height: 300, transform: "rotate(12deg)" }}
        />
        <Box
          pos="absolute"
          className="bykm-geo"
          style={{ bottom: -60, right: -60, width: 200, height: 200, transform: "rotate(-8deg)", opacity: 0.7 }}
        />
        <Box className="bykm-grid-overlay" />

        <Container size="sm" ta="center" pos="relative">
          <div className="bykm-kicker-line">
            <span className="bykm-kicker-dash" />
            <span className="bykm-kicker">{t("servicesPage.ctaBadge")}</span>
            <span className="bykm-kicker-dash" />
          </div>

          <Title order={3} c="white" fw={600} mt={14} mb={10} className="bykm-display" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
            {t("servicesPage.ctaTitle")}
          </Title>

          <Text size="sm" mb="xl" maw={460} mx="auto" lh={1.6} style={{ color: "rgba(255,255,255,0.62)" }}>
            {t("servicesPage.ctaSubtitle")}
          </Text>

          <Link href="/appointment" className="bykm-btn">
            <span>{t("servicesPage.ctaButton")}</span>
            <ArrowRight size={15} />
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
