"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { services } from "../services.data";
import { iconMap } from "@/app/components/icon-map";
import { useLocale } from "@/app/locale-provider";
import {
  Paper, Group, Stack, Text, Title, Box, Container,
  SimpleGrid, ThemeIcon, Anchor, Divider
} from "@mantine/core";
import {
  ArrowLeft, ArrowRight, CheckCircle, Clock, ShieldCheck
} from "lucide-react";

const unified = { c: "blue" as const, from: "var(--primary)", to: "#1d4ed8" };

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLocale();

  const service = services.find((s) => s.id === id);
  if (!service) return null;

  const raw = t(`services.${id}.items`);
  const items = Array.isArray(raw) ? (raw as string[]) : undefined;

  return (
    <Box bg="gray.0" mih="100vh">
      <Container size={1300} py={48}>
        {/* Back link */}
        <Anchor
          component={Link}
          href="/services"
          c="gray.6"
          size="sm"
          fw={600}
          mb="lg"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
        >
          <ArrowLeft size={14} />
          {t("appointment.back")}
        </Anchor>

        {/* Hero card */}
        <Paper shadow="sm" mb="lg" withBorder p={0} style={{ overflow: "hidden", position: "relative", borderRadius: 3, borderTop: "4px solid var(--primary)" }}>
          <Box p="xl">
            <Group align="flex-start" gap="xl" wrap="nowrap">
              <ThemeIcon
                variant="light"
                color={unified.c}
                size={72}
                radius={8}
                style={{ boxShadow: `0 8px 24px ${unified.from}33` }}
              >
                {iconMap[service.icon]}
              </ThemeIcon>

              <Box style={{ flex: 1 }}>
                <Title order={1} fw={600} c="gray.9" className="bykm-display" style={{ fontSize: "clamp(24px, 4vw, 34px)" }}>
                  {t(`services.${id}.title`)}
                </Title>
                <Text c="gray.6" size="md" mt={6} maw={600} lh={1.6}>
                  {t(`services.${id}.description`)}
                </Text>
              </Box>
            </Group>
          </Box>
        </Paper>

        {/* Content */}
        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
          {/* LEFT — Items */}
          <Box style={{ gridColumn: "span 2" }}>
            {items && items.length > 0 && (
              <Paper shadow="sm" radius={3} withBorder p="xl">
                <Group gap="sm" mb="lg">
                  <ThemeIcon variant="light" color={unified.c} size="md" radius="md">
                    <CheckCircle size={16} />
                  </ThemeIcon>
                  <Title order={3} fw={700} size="h4" c="gray.9">
                    {t("servicesPage.viewDetails")}
                  </Title>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {items.map((item, i) => (
                    <Paper
                      key={i}
                      p="md"
                      radius="md"
                      withBorder
                      style={{
                        borderColor: i % 2 === 0 ? `${unified.from}22` : "#f3f4f6",
                        background: i % 2 === 0 ? `${unified.from}08` : "#fff",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Group gap="md" wrap="nowrap">
                        <ThemeIcon
                          variant="light"
                          color={unified.c}
                          size="lg"
                          radius="xl"
                          style={{ boxShadow: `0 2px 8px ${unified.from}33` }}
                        >
                          <CheckCircle size={18} />
                        </ThemeIcon>
                        <Text size="sm" fw={600} c="gray.8" lh={1.4}>
                          {item}
                        </Text>
                      </Group>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Paper>
            )}

            {/* Extra info section */}
            <Paper shadow="sm" radius={3} withBorder p="xl" mt="lg">
              <Group gap="sm" mb="md">
                <ThemeIcon variant="light" color="gray" size="md" radius="md">
                  <ShieldCheck size={16} />
                </ThemeIcon>
                <Title order={3} fw={600} size="h4" c="gray.9" className="bykm-display">
                  {t("profile.about")}
                </Title>
              </Group>
              <Text c="gray.6" size="sm" lh={1.7}>
                {t(`services.${id}.description`)}
              </Text>
            </Paper>
          </Box>

          {/* RIGHT — Sidebar */}
          <Box>
            <Paper shadow="sm" radius={3} withBorder p="xl" style={{ position: "sticky", top: 100 }}>
              <Group gap="sm" mb="md">
                <ThemeIcon variant="light" color={unified.c} size="md" radius="md">
                  <Clock size={16} />
                </ThemeIcon>
                <Text fw={700} size="md">
                  {t("appointment.chooseDateTime")}
                </Text>
              </Group>

              <Text c="gray.6" size="sm" mb="lg" lh={1.6}>
                {t("appointment.subtitle")}
              </Text>

              <Stack gap="sm" mb="lg">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="green" size="sm" radius="xl">
                    <CheckCircle size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="gray.6">{t("servicesPage.stat24h")}</Text>
                </Group>
                <Group gap="sm">
                  <ThemeIcon variant="light" color="green" size="sm" radius="xl">
                    <CheckCircle size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="gray.6">{t("servicesPage.statExperts")}</Text>
                </Group>
                <Group gap="sm">
                  <ThemeIcon variant="light" color="green" size="sm" radius="xl">
                    <CheckCircle size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="gray.6">{t("servicesPage.statEquipment")}</Text>
                </Group>
              </Stack>

              <Divider my="md" />

              <Link href="/appointment" className="bykm-btn" style={{ width: "100%" }}>
                <span>{t("servicesPage.ctaButton")}</span>
                <ArrowRight size={15} />
              </Link>

              <Anchor
                component={Link}
                href="/services"
                c="gray.6"
                size="xs"
                mt="md"
                style={{ display: "block", textAlign: "center", textDecoration: "none" }}
              >
                <Group gap={4} justify="center">
                  <ArrowLeft size={12} />
                  <span>{t("appointment.back")}</span>
                </Group>
              </Anchor>
            </Paper>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
