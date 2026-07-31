"use client";

import Link from "next/link";
import { services } from "./services.data";
import { iconMap } from "@/app/components/icon-map";
import { useLocale } from "@/app/locale-provider";
import {
  Group, Stack, Text, Title, SimpleGrid,
  Badge, Box, Container, Button, Flex
} from "@mantine/core";
import {
  ArrowRight, Clock, ShieldCheck, Users, Microscope, Stethoscope
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
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
        <Box
          pos="absolute"
          style={{ top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }}
        />
        <Box
          pos="absolute"
          style={{ bottom: -120, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }}
        />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6} mb={48}>
            <Badge
              variant="white"
              size="lg"
              radius="xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", fontWeight: 600, textTransform: "none" }}
            >
              <Group gap={6}>
                <Stethoscope size={14} />
                {t("medicalServices.title")}
              </Group>
            </Badge>

            <Title order={1} c="white" ta="center" lh={1.15} fw={800} style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
              {t("servicesPage.title")}
            </Title>

            <Text c="blue.2" size="md" ta="center" maw={520} lh={1.65}>
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
              <Flex key={s.label} gap="md" align="center" p="sm" px="md" style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <Box c="white" style={{ opacity: 0.7 }}>{s.icon}</Box>
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
          style={{ top: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }}
        />
        <Box
          pos="absolute"
          style={{ bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }}
        />

        <Container size="sm" ta="center" pos="relative">
          <Badge
            variant="white"
            size="lg"
            radius="xl"
            mb="sm"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", textTransform: "none" }}
          >
            {t("servicesPage.ctaBadge")}
          </Badge>

          <Title order={3} c="white" fw={800} mb={8}>
            {t("servicesPage.ctaTitle")}
          </Title>

          <Text c="blue.2" size="sm" mb="xl" maw={460} mx="auto" lh={1.6}>
            {t("servicesPage.ctaSubtitle")}
          </Text>

          <Button
            component={Link}
            href="/appointment"
            size="lg"
            radius="md"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            rightSection={<ArrowRight size={18} />}
            style={{ boxShadow: "0 6px 24px rgba(37,99,235,0.3)" }}
          >
            {t("servicesPage.ctaButton")}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
