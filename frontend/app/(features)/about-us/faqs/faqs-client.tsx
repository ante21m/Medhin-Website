"use client";

import { useState } from "react";
import { useLocale } from "@/app/locale-provider";
import {
  Box, Container, Title, Text, Stack, Badge, Accordion, ThemeIcon
} from "@mantine/core";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useFAQs } from "@/app/hooks/useFAQs";

const FAQ_IDS = Array.from({ length: 8 }, (_, i) => i + 1);

export default function FaqsClient() {
  const { t, locale } = useLocale();
  const [value, setValue] = useState<string | null>(null);
  const { faqs, isFromApi } = useFAQs();

  const isAm = locale === "am";

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
              <HelpCircle size={14} /> FAQ
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
              {t("faqsPage.title")}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={560} lh={1.6}>
              {t("faqsPage.subtitle")}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Accordion */}
      <Container size="sm" py={48}>
        <Accordion
          value={value}
          onChange={setValue}
          variant="separated"
          chevron={<ChevronDown size={16} />}
          styles={{
            item: {
              border: "1px solid var(--line)",
              borderRadius: 12,
              marginBottom: 8,
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            },
            control: {
              padding: "16px 20px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              color: "#1f2937",
            },
            content: {
              padding: "4px 20px 16px",
              color: "var(--ink-soft)",
              fontSize: 14,
              lineHeight: 1.7,
            },
          }}
        >
          {isFromApi
            ? faqs.map((f) => (
                <Accordion.Item key={f.id} value={`q${f.id}`}>
                  <Accordion.Control icon={
                    <ThemeIcon variant="light" color="blue" size="sm" radius="xl">
                      <HelpCircle size={14} />
                    </ThemeIcon>
                  }>
                    {isAm && f.questionAm ? f.questionAm : f.question}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {isAm && f.answerAm ? f.answerAm : f.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))
            : FAQ_IDS.map((id) => (
                <Accordion.Item key={id} value={`q${id}`}>
                  <Accordion.Control icon={
                    <ThemeIcon variant="light" color="blue" size="sm" radius="xl">
                      <HelpCircle size={14} />
                    </ThemeIcon>
                  }>
                    {t(`faqsPage.q${id}`)}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {t(`faqsPage.a${id}`)}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
        </Accordion>
      </Container>
    </Box>
  );
}