'use client';

import { useGetVacanciesQuery, type Vacancy } from '@/app/store/api/vacancyApi';
import { useLocale } from '@/app/locale-provider';
import {
  Box, Container, Title, Text, Stack, Group,
  SimpleGrid, Center, Loader, Alert, Anchor,
} from '@mantine/core';
import { Briefcase, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function VacancyPage() {
  const { data: vacancies, isLoading, error } = useGetVacanciesQuery();
  const { t, locale } = useLocale();

  function VacancyCard({ vacancy, num }: { vacancy: Vacancy; num: string }) {
    const title = locale === 'am' && vacancy.titleAm ? vacancy.titleAm : vacancy.title;
    const description = locale === 'am' && vacancy.descriptionAm ? vacancy.descriptionAm : vacancy.description;
    const requirements = locale === 'am' && vacancy.requirementsAm ? vacancy.requirementsAm : vacancy.requirements;

    return (
      <div className="bykm-card">
        <div className="bykm-badge"><span>{num}</span></div>
        <Stack gap="sm">
          <Group gap={8} wrap="nowrap">
            <Box style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--primary-50)', color: 'var(--primary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} />
            </Box>
            <Box style={{ flex: 1 }}>
              <Text fw={700} size="md" lh={1.3}>{title}</Text>
              {vacancy.location && (
                <Group gap={4} mt={2}>
                  <MapPin size={12} color="var(--ink-faint)" />
                  <Text size="xs" c="gray.5">{vacancy.location}</Text>
                </Group>
              )}
            </Box>
          </Group>

          {description && (
            <Text size="sm" c="gray.6" lineClamp={3} lh={1.6}>
              {description}
            </Text>
          )}

          {requirements && (
            <Text size="xs" c="gray.5" style={{ whiteSpace: 'pre-line' }}>
              {requirements}
            </Text>
          )}

          <Group gap="md" mt="xs">
            {vacancy.deadline && (
              <Group gap={4}>
                <Calendar size={12} color="var(--ink-faint)" />
                <Text size="xs" c="gray.5">
                  {t("vacancyPage.deadline")} {formatDate(vacancy.deadline)}
                </Text>
              </Group>
            )}
            <Group gap={4}>
              <Clock size={12} color="var(--ink-faint)" />
                <Text size="xs" c="gray.5">
                  {t("vacancyPage.posted")} {formatDate(vacancy.createdAt)}
              </Text>
            </Group>
          </Group>
        </Stack>
      </div>
    );
  }

  return (
    <Box bg="gray.0" mih="100vh">
      <Box
        py={72}
        pos="relative"
        style={{
          background: 'var(--bg-deep)',
          overflow: 'hidden',
        }}
      >
        <Box
          pos="absolute"
          style={{
            inset: 0,
            background:
              'radial-gradient(ellipse at 18% 28%, rgba(11,93,82,0.5) 0%, transparent 65%), radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)',
          }}
        />
        <Box className="bykm-grid-overlay" />
        <Box className="bykm-geo" style={{ top: -80, right: -80, width: 340, height: 340, transform: 'rotate(12deg)' }} />
        <Box className="bykm-geo" style={{ bottom: -120, left: -60, width: 240, height: 240, transform: 'rotate(-10deg)', opacity: 0.6 }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash" />
              <span className="bykm-kicker">{t("vacancyPage.badge")}</span>
            </div>
            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', marginTop: 14 }}>
              {t("vacancyPage.title")}
            </Title>
            <div style={{ width: 64, height: 3, background: '#7FD9C4', marginTop: 16 }} />
            <Text size="md" ta="center" maw={560} lh={1.65} style={{ color: 'rgba(255,255,255,0.62)' }}>
              {t("vacancyPage.subtitle")}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size={1300} py={48}>
        {isLoading && (
          <Center py={64}>
            <Loader size="lg" color="blue" />
          </Center>
        )}

        {error && (
          <Alert icon={<AlertCircle size={16} />} color="red" title="Failed to load vacancies">
            <Stack gap="xs">
              <Text size="sm">Make sure:</Text>
              <Text size="sm" component="ul" style={{ margin: 0, paddingLeft: 20 }}>
                <li>Backend running at <b>http://localhost:3001</b> (<code>npm run start:dev</code> in backend folder)</li>
                <li>PostgreSQL running with <b>web_business</b> database created</li>
                <li>Backend <code>.env</code> has correct DB credentials</li>
                <li>Check backend terminal for any connection errors</li>
              </Text>
              <Anchor href="http://localhost:3001/health" target="_blank" size="sm">
                Test backend health &rarr;
              </Anchor>
            </Stack>
          </Alert>
        )}

        {vacancies && vacancies.length === 0 && (
          <Center py={64}>
            <Stack align="center" gap="sm">
              <Briefcase size={48} color="#d1d5db" />
              <Text c="gray.4" size="sm" fw={600}>{t("vacancyPage.noPositions")}</Text>
              <Text c="gray.4" size="sm">{t("vacancyPage.checkLater")}</Text>
            </Stack>
          </Center>
        )}

        {vacancies && vacancies.length > 0 && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {vacancies.map((vacancy, i) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} num={String(i + 1).padStart(2, '0')} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
