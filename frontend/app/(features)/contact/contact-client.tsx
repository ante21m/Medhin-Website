"use client";

import { useLocale } from "@/app/locale-provider";
import {
  Paper, Group, Stack, Text, Title, Box, Container, Grid,
  TextInput, Textarea, SimpleGrid, Flex
} from "@mantine/core";
import {
  MapPin, Phone, Mail, Clock, Send, ArrowRight,
  MessageSquare, Headphones, Building2, Globe
} from "lucide-react";

const contactInfo = [
  { icon: MapPin, labelKey: "contactPage.office", descKey: "contactPage.address", isHours: false as const, phone: null as string | null, email: null as string | null },
  { icon: Clock, labelKey: "contactPage.hours", descKey: null, isHours: true as const, phone: null, email: null },
  { icon: Phone, labelKey: "footer.phoneLabel", descKey: null, isHours: false, phone: "+251 9XX XXX XXX", email: null },
  { icon: Mail, labelKey: "footer.emailLabel", descKey: null, isHours: false, phone: null, email: "info@medhinhospital.com" },
];

export default function ContactClient() {
  const { t, locale } = useLocale();

  const embedMapUrl =
    "https://www.google.com/maps?q=11.830075,39.599407&output=embed";

  const handleGetDirections = () => {
    window.open("https://www.google.com/maps/dir/?api=1&destination=11.830075,39.599407", "_blank");
  };

  return (
    <Box bg="gray.0" mih="100vh">
      <Box
        py={{ base: 56, md: 72 }}
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
              <span className="bykm-kicker">{t("nav.contact")}</span>
            </div>

            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", marginTop: 14 }}>
              {t("nav.contact")}
            </Title>

            <div style={{ width: 64, height: 3, background: "#7FD9C4", marginTop: 16 }} />

            <Text size="md" ta="center" maw={520} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("footer.description")}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {[
              { icon: <MessageSquare size={18} />, label: locale === "am" ? "ፈጣን ምላሽ" : "Fast Response", sub: locale === "am" ? "በስራ ሰዓት" : "Within business hours" },
              { icon: <Headphones size={18} />, label: locale === "am" ? "ድጋፍ" : "24/7 Support", sub: locale === "am" ? "ሙሉ ሰዓት" : "Round the clock" },
              { icon: <Building2 size={18} />, label: locale === "am" ? "ቀላል ተደራሽ" : "Easy Access", sub: locale === "am" ? "በወልድያ ከተማ" : "In Woldia city" },
              { icon: <Globe size={18} />, label: locale === "am" ? "ሁለገብ አገልግሎት" : "Multilingual", sub: locale === "am" ? "እንግሊዝኛ እና አማርኛ" : "English & Amharic" },
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

      <Container size={1300} py={64}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Stack gap="lg">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                if (info.isHours) {
                  return (
                    <Paper key={i} shadow="sm" radius={3} withBorder p="xl" style={{ borderTop: "3px solid var(--primary)" }}>
                      <Group gap="sm" mb="md">
                        <Box style={{ width: 44, height: 44, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={18} />
                        </Box>
                        <Text fw={700} size="md">{t(info.labelKey)}</Text>
                      </Group>
                      <Box p="lg" ta="center" style={{ background: "var(--primary-50)", border: "1px solid var(--primary-100)", borderRadius: 3 }}>
                        <Text fw={800} size="xl" c="blue.7" className="bykm-display" style={{ fontSize: 28, letterSpacing: 1 }}>
                          24/7
                        </Text>
                        <Text size="sm" fw={600} c="blue.7" mt={2}>
                          {locale === "am" ? "ከእሁድ እስከ ሰኞ ሁሉም ሳምንት" : "Sunday – Monday · All Week"}
                        </Text>
                        <Text size="xs" c="blue.6" mt={4} style={{ opacity: 0.8 }}>
                          {locale === "am" ? "ሙሉ ሰዓት አገልግሎት" : "24 Hours Service"}
                        </Text>
                      </Box>
                    </Paper>
                  );
                }
                if (info.phone || info.email) {
                  return (
                    <Paper key={i} shadow="sm" radius={3} withBorder p="xl">
                      <Group gap="md">
                        <Box style={{ width: 48, height: 48, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={20} />
                        </Box>
                        <Box>
                          <Text size="xs" c="gray.5" fw={600} tt="uppercase" lts="0.05em">{t(info.labelKey)}</Text>
                          <Text fw={600} size="sm" c="gray.8">{info.phone || info.email}</Text>
                        </Box>
                      </Group>
                    </Paper>
                  );
                }
                return (
                  <Paper key={i} shadow="sm" radius={3} withBorder p="xl">
                    <Group gap="sm" mb="md">
                      <Box style={{ width: 44, height: 44, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={18} />
                      </Box>
                      <Text fw={700} size="md">{t(info.labelKey)}</Text>
                    </Group>
                    <Text c="gray.6" size="sm" lh={1.7}>
                      {t(info.descKey!)}
                    </Text>
                  </Paper>
                );
              })}

              <Paper shadow="sm" radius={3} withBorder p="xl" style={{ borderTop: "3px solid var(--primary)" }}>
                <Group gap="sm" mb="md">
                  <Box style={{ width: 44, height: 44, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={18} />
                  </Box>
                  <Text fw={700} size="md">{t("contactPage.mapTitle")}</Text>
                </Group>

                <Box style={{ borderRadius: 3, overflow: "hidden", height: 200, border: "1px solid #f3f4f6" }} mb="md">
                  <iframe
                    title={locale === "am" ? "መድህን ፕራይማሪ ሆስፒታል አድራሻ" : "Medhin Primary Hospital Location"}
                    src={embedMapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                </Box>

                <Box
                  component="button"
                  onClick={handleGetDirections}
                  w="100%"
                  className="bykm-outline-btn"
                >
                  {t("contactPage.directions")}
                  <ArrowRight size={14} />
                </Box>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Paper shadow="sm" radius={3} withBorder p="xl" style={{ borderTop: "3px solid var(--primary)" }}>
              <Group gap="sm" mb="lg">
                <Box style={{ width: 44, height: 44, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Send size={18} />
                </Box>
                <Title order={3} fw={600} size="h4" c="gray.9" className="bykm-display">
                  {t("contactPage.formTitle")}
                </Title>
              </Group>

              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Text size="sm" fw={600} mb={4} c="gray.7">{t("contactPage.formName")}</Text>
                  <TextInput
                    placeholder={t("contactPage.formNamePlaceholder")}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Text size="sm" fw={600} mb={4} c="gray.7">{t("contactPage.formEmail")}</Text>
                  <TextInput
                    type="email"
                    placeholder={t("contactPage.formEmailPlaceholder")}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" fw={600} mb={4} c="gray.7">{t("contactPage.formMessage")}</Text>
                  <Textarea
                    rows={5}
                    placeholder={t("contactPage.formMessagePlaceholder")}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box
                    component="button"
                    type="submit"
                    w="100%"
                    className="bykm-btn"
                  >
                    <span>{t("contactPage.formSubmit")}</span>
                    <Send size={14} />
                  </Box>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Box py={56} style={{ background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
        <Box pos="absolute" className="bykm-geo" style={{ top: -100, left: -100, width: 300, height: 300, transform: "rotate(12deg)" }} />
        <Box pos="absolute" className="bykm-geo" style={{ bottom: -60, right: -60, width: 200, height: 200, transform: "rotate(-8deg)", opacity: 0.7 }} />
        <Box className="bykm-grid-overlay" />

        <Container size="sm" ta="center" pos="relative">
          <div className="bykm-kicker-line">
            <span className="bykm-kicker-dash" />
            <span className="bykm-kicker">{locale === "am" ? "ጉብኝት ያድርጉ" : "Visit Us"}</span>
            <span className="bykm-kicker-dash" />
          </div>

          <Title order={3} c="white" fw={600} mt={14} mb={10} className="bykm-display" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
            {locale === "am" ? "ወደ ሆስፒታላችን ይምጡ" : "Visit Our Hospital"}
          </Title>

          <Text size="sm" mb="xl" maw={460} mx="auto" lh={1.6} style={{ color: "rgba(255,255,255,0.62)" }}>
            {locale === "am" ? "በወልድያ ከተማ በሚገኘው የመድህን ፕራይማሪ ሆስፒታል እንጠብቅዎታለን" : "We look forward to welcoming you at Medhin Primary Hospital in Woldia"}
          </Text>

          <Box
            component="button"
            onClick={handleGetDirections}
            className="bykm-btn"
          >
            <span>{locale === "am" ? "አቅጣጫ ይመልከቱ" : "Get Directions"}</span>
            <ArrowRight size={15} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
