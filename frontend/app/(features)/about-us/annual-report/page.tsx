'use client';

import React from 'react';
import { useLocale } from '@/app/locale-provider';
import {
  Box, Container, Title, Text, Stack, Loader, Center, Group, Badge, ThemeIcon,
} from '@mantine/core';
import { FileText, Download } from 'lucide-react';
import { useGetReportsQuery } from '@/app/store/api/reportApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

function resolveAsset(path: string) {
  if (path.startsWith('http') || path.startsWith('/images/')) return path;
  return `${API_URL}/${path}`;
}

export default function AnnualReportPage() {
  const { t } = useLocale();
  const { data: reports, isLoading, error } = useGetReportsQuery();

  return (
    <Box bg="gray.0" mih="100vh">
      <Box py={56} pos="relative" style={{ background: 'var(--bg-deep)', overflow: 'hidden' }}>
        <Box pos="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)' }} />
        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <Badge variant="white" size="lg" radius="xl" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', textTransform: 'none' }}>
              <Group gap={6}><FileText size={14} /> {t('annualReport')}</Group>
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>
              {t('annualReportPage.title')}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={560} lh={1.6}>
              {t('annualReportDesc')}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="sm" py={48}>
        {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
        {error && <Center py={64}><Text c="gray.4">Could not load reports.</Text></Center>}
        {reports && reports.length === 0 && (
          <Center py={64}>
            <Stack align="center" gap={4}>
              <Text c="gray.5" fw={600}>No reports available yet.</Text>
              <Text size="sm" c="gray.4">Check back later.</Text>
            </Stack>
          </Center>
        )}
        {reports && reports.length > 0 && (
          <Stack gap="md">
            {reports.map((r) => (
              <Box
                key={r.id}
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  background: '#fff',
                  padding: '20px 24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
                  <Box style={{ flex: '1 1 260px' }}>
                    <Text fw={700} size="lg" c="#1f2937">{r.title}</Text>
                    {r.description && (
                      <Text size="sm" c="var(--ink-soft)" lh={1.7} mt={4}>{r.description}</Text>
                    )}
                  </Box>
                  {r.file && (
                    <a
                      href={resolveAsset(r.file)}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Group gap={6} style={{ border: '1px solid rgba(11,71,61,0.35)', borderRadius: 8, padding: '8px 14px', color: '#0B473D', background: 'rgba(11,71,61,0.05)' }}>
                        <Download size={15} />
                        <Text size="sm" fw={600}>Open PDF</Text>
                      </Group>
                    </a>
                  )}
                </Group>
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}