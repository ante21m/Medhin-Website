"use client";

import { useLocale } from "@/app/locale-provider";
import {
  Paper, Group, Stack, Text, Title, Box, Container, Grid,
  ThemeIcon, TextInput, Textarea, Button, Badge, SimpleGrid, Flex
} from "@mantine/core";
import {
  MapPin, Phone, Mail, Clock, Send, ArrowRight, Navigation,
  MessageSquare, Headphones, Building2, Globe
} from "lucide-react";

const contactInfo = [
  { icon: MapPin, labelKey: "contactPage.office", descKey: "contactPage.address", color: "blue", isHours: false as const, phone: null as string | null, email: null as string | null },
  { icon: Clock, labelKey: "contactPage.hours", descKey: null, color: "violet", isHours: true as const, phone: null, email: null },
  { icon: Phone, labelKey: "footer.phoneLabel", descKey: null, color: "orange", isHours: false, phone: "+251 9XX XXX XXX", email: null },
  { icon: Mail, labelKey: "footer.emailLabel", descKey: null, color: "blue", isHours: false, phone: null, email: "info@medhinprimaryhospital.com" },
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
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
        <Box pos="absolute" style={{ top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <Box pos="absolute" style={{ bottom: -120, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6} mb={48}>
            <Badge
              variant="white"
              size="lg"
              radius="xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", fontWeight: 600, textTransform: "none" }}
            >
              <Group gap={6}>
                <Mail size={14} />
                {t("nav.contact")}
              </Group>
            </Badge>

            <Title order={1} c="white" ta="center" lh={1.15} fw={800} style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
              {t("nav.contact")}
            </Title>

            <Text c="blue.2" size="md" ta="center" maw={520} lh={1.65}>
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

      <Container size={1300} py={64}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Stack gap="lg">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                if (info.isHours) {
                  return (
                    <Paper key={i} shadow="sm" radius="lg" withBorder p="xl" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} className="group">
                      <Group gap="sm" mb="md">
                        <Box style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${info.color === "violet" ? "#8b5cf6" : "var(--primary)"}22, ${info.color === "violet" ? "#7c3aed" : "#1d4ed8"}11)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                          <Icon size={18} color={info.color === "violet" ? "#8b5cf6" : "var(--primary)"} />
                        </Box>
                        <Text fw={700} size="md">{t(info.labelKey)}</Text>
                      </Group>
                      <Box p="lg" ta="center" style={{ background: "var(--primary-50)", border: "1px solid var(--primary-100)", borderRadius: 12 }}>
                        <Text fw={800} size="xl" c="blue.7" style={{ fontSize: 28, letterSpacing: 1 }}>
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
                    <Paper key={i} shadow="sm" radius="lg" withBorder p="xl" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} className="group">
                      <Group gap="md">
                        <Box style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${info.color === "orange" ? "#f97316" : "var(--primary)"}22, ${info.color === "orange" ? "#ea580c" : "#1d4ed8"}11)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                          <Icon size={20} color={info.color === "orange" ? "#f97316" : "var(--primary)"} />
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
                  <Paper key={i} shadow="sm" radius="lg" withBorder p="xl" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} className="group">
                    <Group gap="sm" mb="md">
                      <Box style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, var(--primary)22, #1d4ed811)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                        <Icon size={18} color="var(--primary)" />
                      </Box>
                      <Text fw={700} size="md">{t(info.labelKey)}</Text>
                    </Group>
                    <Text c="gray.6" size="sm" lh={1.7}>
                      {t(info.descKey!)}
                    </Text>
                  </Paper>
                );
              })}

              <Paper shadow="sm" radius="lg" withBorder p="xl" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} className="group">
                <Group gap="sm" mb="md">
                  <Box style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #f9731622, #ea580c11)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                    <MapPin size={18} color="#f97316" />
                  </Box>
                  <Text fw={700} size="md">{t("contactPage.mapTitle")}</Text>
                </Group>

                <Box style={{ borderRadius: 10, overflow: "hidden", height: 200, border: "1px solid #f3f4f6" }} mb="md">
                  <iframe
                    title={locale === "am" ? "ምድህን ፕራይማሪ ሆስፒታል አድራሻ" : "Medhin Primary Hospital Location"}
                    src={embedMapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                </Box>

                <Button
                  onClick={handleGetDirections}
                  fullWidth
                  variant="light"
                  color="orange"
                  radius="md"
                  leftSection={<Navigation size={16} />}
                  rightSection={<ArrowRight size={14} />}
                >
                  {t("contactPage.directions")}
                </Button>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Paper shadow="sm" radius="lg" withBorder p="xl" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} className="group">
              <Group gap="sm" mb="lg">
                <Box style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, var(--primary)22, #1d4ed811)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                  <Send size={18} color="var(--primary)" />
                </Box>
                <Title order={3} fw={700} size="h4" c="gray.9">
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
                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan" }}
                    rightSection={<Send size={16} />}
                    style={{ boxShadow: "0 4px 14px rgba(37,99,235,0.25)" }}
                  >
                    {t("contactPage.formSubmit")}
                  </Button>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Box py={56} style={{ background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
        <Box pos="absolute" style={{ top: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <Box pos="absolute" style={{ bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <Container size="sm" ta="center" pos="relative">
          <Badge
            variant="white"
            size="lg"
            radius="xl"
            mb="sm"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", textTransform: "none" }}
          >
            {locale === "am" ? "ጉብኝት ያድርጉ" : "Visit Us"}
          </Badge>

          <Title order={3} c="white" fw={800} mb={8}>
            {locale === "am" ? "ወደ ሆስፒታላችን ይምጡ" : "Visit Our Hospital"}
          </Title>

          <Text c="blue.2" size="sm" mb="xl" maw={460} mx="auto" lh={1.6}>
            {locale === "am" ? "በወልድያ ከተማ በሚገኘው የምድህን ፕራይማሪ ሆስፒታል እንጠብቅዎታለን" : "We look forward to welcoming you at Medhin Primary Hospital in Woldia"}
          </Text>

          <Button
            onClick={handleGetDirections}
            size="lg"
            radius="md"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            rightSection={<ArrowRight size={18} />}
            style={{ boxShadow: "0 6px 24px rgba(37,99,235,0.3)" }}
          >
            {locale === "am" ? "አቅጣጫ ይመልከቱ" : "Get Directions"}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
