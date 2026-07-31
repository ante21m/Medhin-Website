'use client';

import { useGetVacanciesQuery, type Vacancy } from '@/app/store/api/vacancyApi';
import { useLocale } from '@/app/locale-provider';
import {
  Box, Container, Title, Text, Stack, Badge, Group,
  SimpleGrid, Card, Center, Loader, Alert, Anchor,
} from '@mantine/core';
import { Briefcase, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function VacancyPage() {
  const { data: vacancies, isLoading, error } = useGetVacanciesQuery();
  const { t } = useLocale();

  function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
    return (
      <Card radius="lg" withBorder padding="lg" shadow="sm">
        <Stack gap="sm">
          <Group gap={8}>
            <Box style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} color="var(--primary)" />
            </Box>
            <Box style={{ flex: 1 }}>
              <Text fw={700} size="md" lh={1.3}>{vacancy.title}</Text>
              {vacancy.location && (
                <Group gap={4} mt={2}>
                  <MapPin size={12} color="var(--ink-faint)" />
                  <Text size="xs" c="gray.5">{vacancy.location}</Text>
                </Group>
              )}
            </Box>
          </Group>

          {vacancy.description && (
            <Text size="sm" c="gray.6" lineClamp={3} lh={1.6}>
              {vacancy.description}
            </Text>
          )}

          {vacancy.requirements && (
            <Text size="xs" c="gray.5" style={{ whiteSpace: 'pre-line' }}>
              {vacancy.requirements}
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
      </Card>
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
        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <Badge
              variant="white"
              size="lg"
              radius="xl"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', textTransform: 'none' }}
            >
              <Group gap={6}>
                <Briefcase size={14} />
                {t("vacancyPage.badge")}
              </Group>
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>
              {t("vacancyPage.title")}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={560} lh={1.6}>
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
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
