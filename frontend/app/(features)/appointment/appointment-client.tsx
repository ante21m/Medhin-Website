"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Paper, Badge, Group, Stack, Text, Title, Grid,
  SimpleGrid, ThemeIcon, Anchor,
  Flex, Box, Center, TextInput,
  Container
} from "@mantine/core";
import {
  Check, Clock, Star, User, Calendar, ArrowRight, MapPin
} from "lucide-react";
import { useLocale } from "@/app/locale-provider";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { useCreateAppointmentMutation } from "@/app/store/api/appointmentApi";
import type { Physician } from "@/app/data/about.config";
import { imgVer } from "@/lib/imgver";

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h < 18; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

function getMinDate(): string {
  return new Date().toISOString().split("T")[0];
}

type FormData = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export default function AppointmentClient() {
  const { t, locale } = useLocale();
  const { physicians } = usePhysicians();
  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();
  const ALL_SPECIALTIES = useMemo(() => ["All", ...new Set(physicians.map(p => p.specialty))], [physicians]);
  const [specialty, setSpecialty] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<Physician | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedDoctor) dateRef.current?.focus();
  }, [selectedDoctor]);

  const filtered = specialty === "All" ? physicians : physicians.filter((p) => p.specialty === specialty);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const doctorName = locale === "am"
    ? selectedDoctor?.name_am || selectedDoctor?.name
    : selectedDoctor?.name;
  const specialtyName = locale === "am"
    ? selectedDoctor?.specialty_am || selectedDoctor?.specialty
    : selectedDoctor?.specialty;

  const handleSubmit = async () => {
    if (!selectedDoctor || !form.name.trim() || !form.phone.trim() || !selectedDate || !selectedTime) return;
    try {
      await createAppointment({
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        patientName: form.name,
        patientPhone: form.phone,
        patientEmail: form.email || undefined,
        notes: form.notes || undefined,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      }).unwrap();
    } catch { /* ignore */ }
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const reset = () => {
    setSpecialty("All");
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setForm({ name: "", phone: "", email: "", notes: "" });
    setSubmitted(false);
  };

  const doctorSidebar = selectedDoctor ? (
    <Paper radius={3} withBorder p="lg" style={{ position: "sticky", top: 100, borderTop: "4px solid var(--primary)", borderColor: "var(--primary-100)", background: "linear-gradient(180deg, var(--primary-50) 0%, #fff 40%)" }}>
      <Stack align="center" gap="xs" mb="md">
        <Box pos="relative" style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "3px solid #fff", boxShadow: "0 4px 20px rgba(37,99,235,0.15)" }}>
          <Image src={selectedDoctor.image + imgVer} alt={selectedDoctor.name} fill style={{ objectFit: "cover" }} />
        </Box>
        <Text fw={800} size="lg" ta="center" style={{ lineHeight: 1.3 }}>{doctorName}</Text>
        <Badge variant="light" color="blue" size="lg" radius="xl">{specialtyName}</Badge>
      </Stack>
      <Group justify="center" gap={4} mb="xs">
        <Star size={14} color="#f59e0b" fill="#f59e0b" />
        <Text fw={700} size="sm">{selectedDoctor.rating.toFixed(1)}</Text>
        <Text c="gray.5" size="xs">({selectedDoctor.reviews} {t("ratings.reviews")})</Text>
      </Group>
      {selectedDoctor.available !== undefined && (
        <Group justify="center" mb="md" gap={6}>
          <Box style={{ width: 8, height: 8, borderRadius: "50%", background: selectedDoctor.available ? "var(--primary)" : "#d97706" }} />
          <Text size="xs" fw={600} c={selectedDoctor.available ? "blue.7" : "orange.7"}>{selectedDoctor.availabilityText}</Text>
        </Group>
      )}
      <Stack gap={8} mb="md">
        <Group gap="sm">
          <ThemeIcon variant="light" color="gray" size="sm" radius="xl"><Clock size={12} /></ThemeIcon>
          <Text size="xs" c="gray.6">{selectedDoctor.experience}</Text>
        </Group>
        {selectedDoctor.languages && (
          <Group gap="sm">
            <ThemeIcon variant="light" color="gray" size="sm" radius="xl"><MapPin size={12} /></ThemeIcon>
            <Text size="xs" c="gray.6">{selectedDoctor.languages.join(", ")}</Text>
          </Group>
        )}
      </Stack>
      <Anchor component={Link} href={`/about-us/physicians/${selectedDoctor.id}`} size="sm" c="blue.6" fw={600} style={{ textDecoration: "none" }}>
        <Group gap={4} justify="center">
          <span>{locale === "am" ? "ዝርዝር መገለጫ ይመልከቱ" : "View Profile Detail"}</span>
          <ArrowRight size={14} />
        </Group>
      </Anchor>
    </Paper>
  ) : (
    <Paper radius={3} withBorder p="lg" style={{ position: "sticky", top: 100 }}>
      <Stack align="center" gap="md" py="lg">
        <ThemeIcon variant="light" color="gray" size={60} radius={100}><User size={28} /></ThemeIcon>
        <Text ta="center" size="sm" c="gray.5" fw={500}>
          {locale === "am" ? "እባክዎ ሐኪም ይምረጡ" : "Select a doctor to view details"}
        </Text>
      </Stack>
    </Paper>
  );

  if (submitted) {
    return (
      <Box bg="gray.0" mih="100vh">
        <Box className="bykm-hero" py={40}>
          <Box
            pos="absolute"
            style={{
              inset: 0,
              background: "radial-gradient(ellipse at 18% 28%, rgba(11,93,82,0.5) 0%, transparent 65%), radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)",
            }}
          />
          <Box className="bykm-grid-overlay" />
          <Container size="sm" pos="relative">
            <Stack align="center" gap={6}>
              <div className="bykm-kicker-line">
                <span className="bykm-kicker-dash" />
                <span className="bykm-kicker">{locale === "am" ? "ተጠናቅቋል" : "Confirmed"}</span>
              </div>
              <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(26px, 4vw, 38px)", marginTop: 12 }}>
                {t("appointment.successTitle")}
              </Title>
              <div style={{ width: 64, height: 3, background: "#7FD9C4", marginTop: 14 }} />
            </Stack>
          </Container>
        </Box>
        <Container size="sm" py={64}>
          <Paper shadow="sm" radius={3} withBorder p="xl" ta="center">
            <Text c="gray.5" mb="lg">{t("appointment.successDesc")}</Text>
            {selectedDoctor && (
              <Paper bg="gray.0" radius="md" p="md" mb="lg" style={{ textAlign: "left" }}>
                <Stack gap={8}>
                  <Group gap="sm"><Text size="xs" c="gray.5" fw={600} w={70}>{t("appointment.doctor")}</Text><Text size="sm" fw={600}>{doctorName}</Text></Group>
                  <Group gap="sm"><Text size="xs" c="gray.5" fw={600} w={70}>{t("appointment.date")}</Text><Text size="sm" fw={600}>{selectedDate}</Text></Group>
                  <Group gap="sm"><Text size="xs" c="gray.5" fw={600} w={70}>{t("appointment.time")}</Text><Text size="sm" fw={600}>{selectedTime}</Text></Group>
                  <Group gap="sm"><Text size="xs" c="gray.5" fw={600} w={70}>{t("appointment.name")}</Text><Text size="sm" fw={600}>{form.name}</Text></Group>
                </Stack>
              </Paper>
            )}
            <Group gap="sm" mt="lg" justify="center">
              <Box component="button" type="button" className="bykm-outline-btn" onClick={() => setSubmitted(false)}>
                {locale === "am" ? "ተመለስ" : "Back"}
              </Box>
              <Box component="button" type="button" className="bykm-btn" onClick={reset}>
                <span>{t("appointment.bookAnother")}</span>
              </Box>
            </Group>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="gray.0" mih="100vh">
      <Box className="bykm-hero" py={{ base: 48, md: 64 }}>
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
              <span className="bykm-kicker">{locale === "am" ? "ቀጠሮ" : "Appointment"}</span>
            </div>

            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 44px)", marginTop: 14 }}>
              {locale === "am" ? "ቀጠሮ ያስይዙ" : "Book an Appointment"}
            </Title>

            <div style={{ width: 64, height: 3, background: "#7FD9C4", marginTop: 16 }} />

            <Text size="md" ta="center" maw={520} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {locale === "am" ? "ሐኪም ይምረጡ፣ ቀን እና ሰዓት ይምረጡ፣ ስምዎን ያስገቡ" : "Pick a doctor, choose date & time, enter your details"}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt={40}>
            {[
              { n: "01", label: t("appointment.chooseDoctor") },
              { n: "02", label: t("appointment.chooseDateTime") },
              { n: "03", label: t("appointment.yourDetails") },
            ].map((s) => (
              <Flex key={s.n} gap="md" align="center" p="sm" px="md" className="bykm-stat-chip">
                <Text ff="var(--font-mono), monospace" fw={700} size="lg" c="#7FD9C4">{s.n}</Text>
                <Text c="white" fw={600} size="sm">{s.label}</Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container size="xl" py="xl">

        <Grid gutter="lg" justify="center">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Paper shadow="sm" radius={3} withBorder p="xl" style={{ borderTop: "4px solid var(--primary)" }}>
              {/* DOCTOR */}
              <Title order={3} size="h4" fw={700} mb="lg">
                {t("appointment.chooseDoctor")}
              </Title>
              <Group gap={8} mb="lg">
                {ALL_SPECIALTIES.map((s) => (
                  <button key={s} type="button"
                    className={"bykm-chip" + (specialty === s ? " active" : "")}
                    onClick={() => setSpecialty(s)}
                  >
                    {s === "All" ? t("appointment.all") : t(`departments.${s.toLowerCase()}`)}
                  </button>
                ))}
              </Group>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="xl">
                {filtered.map((doc) => {
                  const sel = selectedDoctor?.id === doc.id;
                  return (
                    <Paper key={doc.id} radius={3} withBorder p="md"
                      style={{ cursor: "pointer", borderColor: sel ? "var(--primary)" : "var(--line)", background: sel ? "var(--primary-50)" : "#fff", transition: "all 0.2s ease", position: "relative" }}
                      onClick={() => setSelectedDoctor(doc)}
                    >
                      <Group gap="md" wrap="nowrap">
                        <Box pos="relative" style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} bg="gray.1">
                          <Image src={doc.image + imgVer} alt={doc.name} fill style={{ objectFit: "cover" }} />
                        </Box>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                          <Text fw={700} size="sm" truncate>{doc.name}</Text>
                          <Text size="xs" c="blue.6" fw={600}>{doc.specialty}</Text>
                          <Group gap={4} mt={4}>
                            <Badge size="xs" radius="xl" color={doc.available ? "blue" : "orange"} variant="light">{doc.availabilityText}</Badge>
                          </Group>
                          <Group gap={4} mt={4}>
                            <Star size={11} color="#f59e0b" fill="#f59e0b" />
                            <Text size="xs" fw={700}>{doc.rating.toFixed(1)}</Text>
                            <Text size="xs" c="gray.4">({doc.reviews})</Text>
                          </Group>
                        </Box>
                      </Group>
                      {sel && (
                        <Box pos="absolute" style={{ top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: "var(--primary)" }}>
                          <Center h="100%"><Check size={13} color="#fff" /></Center>
                        </Box>
                      )}
                    </Paper>
                  );
                })}
              </SimpleGrid>

              {selectedDoctor && (
                <>
                  {/* DATE & TIME */}
                  <Title order={3} size="h4" fw={700} mb="lg">
                    {t("appointment.chooseDateTime")}
                  </Title>
                  <Paper p="sm" radius="md" bg="blue.0" withBorder mb="lg" style={{ borderColor: "var(--primary-100)" }}>
                    <Group gap="sm">
                      <User size={14} color="var(--primary)" />
                      <Text size="sm" fw={600} c="blue.8">{doctorName}</Text>
                      <Text size="xs" c="blue.5">— {specialtyName}</Text>
                    </Group>
                  </Paper>
                  <Grid gutter="md" mb="xl">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={6} c="gray.7">
                        <Calendar size={14} style={{ marginRight: 6, verticalAlign: -2 }} />{t("appointment.date")}
                      </Text>
                      <input ref={dateRef} type="date" value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)} min={getMinDate()}
                        style={{ padding: "10px 14px", fontSize: 15, borderRadius: 8, border: "1px solid #d1d5db", outline: "none", width: "100%" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={6} c="gray.7">
                        <Clock size={14} style={{ marginRight: 6, verticalAlign: -2 }} />{t("appointment.timeSlot")}
                      </Text>
                      <Flex wrap="wrap" gap={6}>
                        {timeSlots.map((slot) => (
                          <button key={slot} type="button"
                            className={"bykm-chip" + (selectedTime === slot ? " active" : "")}
                            style={{ padding: "8px 14px" }}
                            onClick={() => setSelectedTime(slot)}
                          >{slot}</button>
                        ))}
                      </Flex>
                    </Grid.Col>
                  </Grid>

                  {/* YOUR DETAILS */}
                  <Title order={3} size="h4" fw={700} mb="lg">
                    {t("appointment.yourDetails")}
                  </Title>
                  <Grid gutter="md" mb="xl">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={4} c="gray.7">{t("appointment.fullName")} *</Text>
                      <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("appointment.fullName")} required />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={4} c="gray.7">{t("appointment.phoneNumber")} *</Text>
                      <TextInput value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+251 9XX XXX XXX" required />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={4} c="gray.7">{t("appointment.note")}</Text>
                      <TextInput value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Text size="sm" fw={600} mb={4} c="gray.7">{t("appointment.additionalNotes")}</Text>
                      <TextInput value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={t("appointment.additionalNotes")} />
                    </Grid.Col>
                  </Grid>

                  <Box
                    component="button"
                    type="button"
                    w="100%"
                    className="bykm-btn"
                    disabled={!form.name.trim() || !form.phone.trim() || !selectedDate || !selectedTime || isSubmitting}
                    onClick={handleSubmit}
                  >
                    <span>{isSubmitting ? (locale === "am" ? "በመመዝገብ ላይ..." : "Submitting...") : t("appointment.book")}</span>
                    <Check size={15} />
                  </Box>
                </>
              )}
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            {doctorSidebar}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}


