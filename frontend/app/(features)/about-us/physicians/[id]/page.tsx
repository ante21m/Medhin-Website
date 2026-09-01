"use client";

import { physicians } from "@/app/data/about.config";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import { usePhysicianById } from "@/app/hooks/usePhysicians";
import {
  Paper, Table, Badge, Group, Stack, Text, Title, Grid,
  SimpleGrid, ThemeIcon, Divider, Anchor, List, Card,
  Avatar, Flex, Box, Space, Center
} from "@mantine/core";
import {
  GraduationCap, Award, Stethoscope, Activity, Star, Clock,
  Users, Languages, ArrowLeft, Calendar, MapPin, Phone,
  CircleCheck, BookOpen
} from "lucide-react";

export default function PhysicianProfile() {
  const { t, locale } = useLocale();
  const params = useParams<{ id: string }>();
  const { physician } = usePhysicianById(params.id);

  if (!physician) return notFound();

  const fullName = locale === "am" ? physician.name_am || physician.name : physician.name;
  const specialtyName = locale === "am" ? physician.specialty_am || physician.specialty : physician.specialty;

  const Th = ({ children }: { children: React.ReactNode }) => (
    <Table.Th style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", fontWeight: 700 }}>
      {children}
    </Table.Th>
  );

  return (
    <Box bg="gray.0" mih="100vh">
      <Box h={6} style={{ background: "linear-gradient(90deg, var(--primary), #1d4ed8, var(--primary))" }} />

      <Box maw={1120} mx="auto" px="md" py="lg">
        {/* BACK LINK */}
        <Anchor
          component={Link}
          href="/about-us/physicians"
          c="gray.6"
          size="sm"
          fw={500}
          mb="lg"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
        >
          <ArrowLeft size={14} />
          {t("profile.back")}
        </Anchor>

        {/* HERO CARD */}
        <Paper shadow="sm" radius="lg" withBorder mb="lg" style={{ overflow: "hidden" }}>
          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box
                pos="relative"
                h={{ base: 300, md: 380 }}
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, var(--primary))",
                  overflow: "hidden",
                }}
              >
                <Box
                  pos="absolute"
                  style={{
                    inset: 0,
                    background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 60%)",
                  }}
                />
                <Box pos="absolute" style={{ bottom: -32, right: -32, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <Box pos="absolute" style={{ top: -32, left: -32, width: 128, height: 128, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <Image
                  src={physician.image + imgVer}
                  alt={physician.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s" }}
                  className="hover:scale-105"
                  priority
                />
                {physician.available !== undefined && (
                  <Badge
                    pos="absolute"
                    top="md"
                    left="md"
                    size="lg"
                    radius="xl"
                    color={physician.available ? "blue" : "orange"}
                    style={{ backdropFilter: "blur(8px)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                  >
                    {physician.availabilityText}
                  </Badge>
                )}
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack p="xl" gap="md">
                <div>
                  <Title order={2} style={{ fontSize: 28, fontWeight: 800 }}>{fullName}</Title>
                  <Group gap="xs" mt={4}>
                    <Text c="blue.6" fw={600} size="md">{specialtyName}</Text>
                    <Text c="gray.3" size="sm">•</Text>
                    <Group gap={4}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <Text fw={700} size="sm">{physician.rating.toFixed(1)}</Text>
                      <Text c="gray.5" size="xs">({physician.reviews} {t("ratings.reviews")})</Text>
                    </Group>
                  </Group>
                </div>

                <Paper p="md" radius="md" bg="gray.0" withBorder>
                  <Group gap="sm" mb={8}>
                    <ThemeIcon variant="light" color="blue" size="sm" radius="xl">
                      <BookOpen size={12} />
                    </ThemeIcon>
                    <Text size="xs" c="gray.5" tt="uppercase" fw={600} lts="0.05em">
                      {locale === "am" ? "ስለ ሐኪሙ" : "About"}
                    </Text>
                  </Group>
                  <Text size="sm" c="gray.7" lh={1.7} style={{ fontStyle: "italic" }}>
                    {locale === "am" && physician.bio_am ? physician.bio_am : physician.bio}
                  </Text>
                </Paper>

                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                  {physician.experience_years && (
                    <Paper p="sm" radius="md" withBorder style={{ borderColor: "#dbeafe" }} bg="var(--primary-50)">
                      <Group gap="sm">
                        <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                          <Clock size={18} />
                        </ThemeIcon>
                        <div>
                          <Text fw={800} size="lg" c="blue.8">{physician.experience_years}+</Text>
                          <Text size="xs" c="blue.6" fw={500}>{t("profile.yearsExperience")}</Text>
                        </div>
                      </Group>
                    </Paper>
                  )}
                  {physician.patients_count && (
                  <Paper p="sm" radius="md" withBorder style={{ borderColor: "var(--primary-100)" }} bg="var(--primary-50)">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                        <Users size={18} />
                      </ThemeIcon>
                      <div>
                        <Text fw={800} size="lg" c="blue.8">{physician.patients_count}</Text>
                        <Text size="xs" c="blue.6" fw={500}>{t("profile.patientsTreated")}</Text>
                      </div>
                    </Group>
                  </Paper>
                  )}
                  <Paper p="sm" radius="md" withBorder style={{ borderColor: "#fef3c7" }} bg="#fffbeb">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="yellow" size="lg" radius="md">
                        <Star size={18} />
                      </ThemeIcon>
                      <div>
                        <Text fw={800} size="lg" c="yellow.8">{physician.rating.toFixed(1)}</Text>
                        <Text size="xs" c="yellow.6" fw={500}>{t("profile.avgRating")}</Text>
                      </div>
                    </Group>
                  </Paper>
                  {physician.languages && (
                    <Paper p="sm" radius="md" withBorder style={{ borderColor: "#f3e8ff" }} bg="#faf5ff">
                      <Group gap="sm">
                        <ThemeIcon variant="light" color="violet" size="lg" radius="md">
                          <Languages size={18} />
                        </ThemeIcon>
                        <div>
                          <Text fw={800} size="lg" c="violet.8">{physician.languages.length}</Text>
                          <Text size="xs" c="violet.6" fw={500}>{t("profile.languages")}</Text>
                        </div>
                      </Group>
                    </Paper>
                  )}
                </SimpleGrid>

                <Anchor
                  component={Link}
                  href={physician.id ? `/appointment?doctor=${physician.id}` : "/appointment"}
                  c="white"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                    padding: "10px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                    textDecoration: "none", boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                    alignSelf: "flex-start",
                  }}
                >
                  <Calendar size={16} />
                  {t("profile.book")}
                </Anchor>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* MAIN CONTENT: TABLES + SIDEBAR */}
        <Grid gutter="lg">
          {/* LEFT — TABLES */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="lg">
              {/* EDUCATION TABLE */}
              {physician.education && physician.education.length > 0 && (
                <Paper shadow="sm" radius="lg" withBorder p="lg">
                  <Group gap="sm" mb="md">
                    <ThemeIcon variant="light" color="blue" size="md" radius="md">
                      <GraduationCap size={16} />
                    </ThemeIcon>
                    <Text fw={700} size="md">{t("profile.education")}</Text>
                  </Group>
                  <Table striped highlightOnHover withTableBorder>
                    <Table.Thead>
                      <Table.Tr>
                        <Th>#</Th>
                        <Th>{locale === "am" ? "ተቋም / ዲግሪ" : "Institution / Degree"}</Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {physician.education.map((item, i) => (
                        <Table.Tr key={i}>
                          <Table.Td>
                            <Badge size="sm" circle color="blue" variant="filled">{i + 1}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="sm">
                              <Text size="sm" fw={600}>{item}</Text>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              )}

              {/* CERTIFICATIONS TABLE */}
              {physician.certifications && physician.certifications.length > 0 && (
                <Paper shadow="sm" radius="lg" withBorder p="lg">
                  <Group gap="sm" mb="md">
                    <ThemeIcon variant="light" color="blue" size="md" radius="md">
                      <Award size={16} />
                    </ThemeIcon>
                    <Text fw={700} size="md">{t("profile.certifications")}</Text>
                  </Group>
                  <Table striped highlightOnHover withTableBorder>
                    <Table.Thead>
                      <Table.Tr>
                        <Th>#</Th>
                        <Th>{locale === "am" ? "ማረጋገጫ" : "Certification"}</Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {physician.certifications.map((item, i) => (
                        <Table.Tr key={i}>
                          <Table.Td>
                            <Badge size="sm" circle color="blue" variant="filled">{i + 1}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="sm">
                              <CircleCheck size={14} color="var(--primary)" />
                              <Text size="sm">{item}</Text>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              )}

              {/* SPECIALTIES + PROCEDURES SPLIT */}
              <Grid gutter="lg">
                {physician.specialties && physician.specialties.length > 0 && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper shadow="sm" radius="lg" withBorder p="lg" h="100%">
                      <Group gap="sm" mb="md">
                        <ThemeIcon variant="light" color="violet" size="md" radius="md">
                          <Activity size={16} />
                        </ThemeIcon>
                        <Text fw={700} size="md">{t("profile.specialties")}</Text>
                      </Group>
                      <Table highlightOnHover withTableBorder>
                        <Table.Thead>
                          <Table.Tr>
                            <Th>{locale === "am" ? "ስፔሻሊቲ" : "Specialty"}</Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {physician.specialties.map((s, i) => (
                            <Table.Tr key={i}>
                              <Table.Td>
                                <Group gap="sm">
                                  <Badge size="sm" circle color="violet" variant="light">{i + 1}</Badge>
                                  <Text size="sm">{s}</Text>
                                </Group>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Paper>
                  </Grid.Col>
                )}

                {physician.procedures && physician.procedures.length > 0 && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper shadow="sm" radius="lg" withBorder p="lg" h="100%">
                      <Group gap="sm" mb="md">
                        <ThemeIcon variant="light" color="cyan" size="md" radius="md">
                          <Stethoscope size={16} />
                        </ThemeIcon>
                        <Text fw={700} size="md">{t("profile.procedures")}</Text>
                      </Group>
                      <Table highlightOnHover withTableBorder>
                        <Table.Thead>
                          <Table.Tr>
                            <Th>{locale === "am" ? "ሕክምና" : "Procedure"}</Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {physician.procedures.map((p, i) => (
                            <Table.Tr key={i}>
                              <Table.Td>
                                <Group gap="sm">
                                  <Badge size="sm" circle color="cyan" variant="light">{i + 1}</Badge>
                                  <Text size="sm">{p}</Text>
                                </Group>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Paper>
                  </Grid.Col>
                )}
              </Grid>
            </Stack>
          </Grid.Col>

          {/* RIGHT — SIDEBAR */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="lg">
              {/* QUICK INFO */}
              <Paper shadow="sm" radius="lg" withBorder p="lg">
                <Group gap="sm" mb="md">
                  <ThemeIcon variant="light" color="gray" size="md" radius="md">
                    <Phone size={16} />
                  </ThemeIcon>
                  <Text fw={700} size="md">{locale === "am" ? "ፈጣን መረጃ" : "Quick Info"}</Text>
                </Group>
                <Stack gap="sm">
                  <Group gap="md">
                    <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                      <Clock size={18} />
                    </ThemeIcon>
                    <div>
                      <Text size="xs" c="gray.5" fw={600} tt="uppercase" lts="0.05em">{t("profile.experience")}</Text>
                      <Text fw={600} size="sm">{physician.experience}</Text>
                    </div>
                  </Group>
                  <Divider />
                  <Group gap="md">
                    <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                      <Users size={18} />
                    </ThemeIcon>
                    <div>
                      <Text size="xs" c="gray.5" fw={600} tt="uppercase" lts="0.05em">{t("profile.patients")}</Text>
                      <Text fw={600} size="sm">{physician.patients_count || "—"}</Text>
                    </div>
                  </Group>
                  <Divider />
                  <Group gap="md">
                    <ThemeIcon variant="light" color="violet" size="lg" radius="md">
                      <Languages size={18} />
                    </ThemeIcon>
                    <div>
                      <Text size="xs" c="gray.5" fw={600} tt="uppercase" lts="0.05em">{t("profile.languages")}</Text>
                      <Text fw={600} size="sm">{physician.languages?.join(", ")}</Text>
                    </div>
                  </Group>
                  <Divider />
                  <Group gap="md">
                    <ThemeIcon variant="light" color="orange" size="lg" radius="md">
                      <MapPin size={18} />
                    </ThemeIcon>
                    <div>
                      <Text size="xs" c="gray.5" fw={600} tt="uppercase" lts="0.05em">{locale === "am" ? "ቦታ" : "Location"}</Text>
                      <Text fw={600} size="sm">Medhin Primary Hospital</Text>
                    </div>
                  </Group>
                </Stack>
              </Paper>

              {/* AVAILABILITY */}
              <Paper shadow="sm" radius="lg" withBorder p="lg" pb="md">
                <Group gap="sm" mb="md">
                  <ThemeIcon variant="light" color={physician.available ? "blue" : "orange"} size="md" radius="md">
                    <Calendar size={16} />
                  </ThemeIcon>
                  <Text fw={700} size="md">{locale === "am" ? "መገኘት" : "Availability"}</Text>
                </Group>
                <Paper
                  p="lg"
                  radius="md"
                  ta="center"
                  withBorder
                  bg={physician.available ? "blue.0" : "orange.0"}
                  style={{ borderColor: physician.available ? "var(--primary-100)" : "#fed7aa" }}
                >
                  <ThemeIcon
                    variant="light"
                    color={physician.available ? "blue" : "orange"}
                    size={56}
                    radius={100}
                    mx="auto"
                    mb="sm"
                  >
                    {physician.available ? <Calendar size={26} /> : <Clock size={26} />}
                  </ThemeIcon>
                  <Text fw={700} size="md" c={physician.available ? "blue.7" : "orange.7"}>
                    {physician.availabilityText}
                  </Text>
                  <Text size="xs" c="gray.5" mt={4}>
                    {physician.available
                      ? (locale === "am" ? "ለቀጠሮ ይገኛሉ" : "Accepting appointments")
                      : (locale === "am" ? "በአሁኑ ጊዜ አይገኙም" : "Currently unavailable")
                    }
                  </Text>
                </Paper>
              </Paper>

              {/* BOOK CTA */}
              <Anchor
                component={Link}
                href={physician.id ? `/appointment?doctor=${physician.id}` : "/appointment"}
                c="white"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                  padding: "14px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                  textDecoration: "none", boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                }}
              >
                <Calendar size={16} />
                {t("profile.book")}
              </Anchor>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
