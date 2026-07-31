'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Container, Title, Text, Stack, SimpleGrid, Card, Group, Center, Loader, Paper, Flex,
} from '@mantine/core';
import {
  Newspaper, Briefcase, Building2, Image as ImageIcon, FileText, Share2, Stethoscope, ConciergeBell,
  Activity, Users, Eye, Database,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useGetDashboardStatsQuery } from '@/app/store/api/dashboardApi';

const modules = [
  { label: 'News', href: '/admin/news', icon: Newspaper, color: 'blue', desc: 'Manage news articles' },
  { label: 'Vacancies', href: '/admin/vacancies', icon: Briefcase, color: 'violet', desc: 'Manage job openings' },
  { label: 'Departments', href: '/admin/departments', icon: Building2, color: 'orange', desc: 'Manage departments' },
  { label: 'Physicians', href: '/admin/physicians', icon: Stethoscope, color: 'green', desc: 'Manage physicians' },
  { label: 'Services', href: '/admin/services', icon: ConciergeBell, color: 'yellow', desc: 'Manage services' },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon, color: 'cyan', desc: 'Manage gallery images' },
  { label: 'Reports', href: '/admin/reports', icon: FileText, color: 'teal', desc: 'Manage reports' },
  { label: 'Social Links', href: '/admin/social', icon: Share2, color: 'pink', desc: 'Manage social media links' },
];

const entityLabels: Record<string, string> = {
  physicians: 'Physicians',
  departments: 'Departments',
  services: 'Services',
  news: 'News',
  vacancies: 'Vacancies',
  gallery: 'Gallery',
  reports: 'Reports',
  social: 'Social',
};

const barColors = ['#2563eb', '#06b6d4', '#6366f1', '#f59e0b', '#8b5cf6', '#14b8a6', '#ec4899', '#f97316'];

const donutColors = ['#2563eb', '#e5e7eb'];

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined, { skip: !mounted });

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const token = localStorage.getItem('auth_token');
  if (!token) return null;

  const counts = stats?.counts;
  const totals = stats?.totals;

  const barData = counts ? Object.entries(counts).map(([key, val]) => ({
    name: entityLabels[key] || key,
    value: val.total,
  })) : [];

  const donutData = totals ? [
    { name: 'Active', value: totals.active },
    { name: 'Inactive', value: totals.inactive },
  ] : [];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Container size="lg" py="xl" style={{ maxWidth: 1100 }}>
      {/* Header */}
      <Group justify="space-between" mb="lg">
        <Box>
          <Title order={2}>Dashboard</Title>
          <Text c="gray.5" size="sm">{today}</Text>
        </Box>
        {totals && (
          <Paper withBorder p="xs" px="md" radius="md" style={{ borderColor: '#bfdbfe', background: '#eff6ff' }}>
            <Group gap="xs">
              <Database size={16} color="#2563eb" />
              <Text size="sm" fw={600} c="#2563eb">{totals.total} total items</Text>
            </Group>
          </Paper>
        )}
      </Group>

      {/* Stat cards */}
      {statsLoading && <Center py={32}><Loader color="blue" size="sm" /></Center>}
      {counts && (
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="xl">
          {Object.entries(counts).map(([key, val], i) => (
            <Paper key={key} withBorder radius="md" p="md" style={{ borderColor: '#bfdbfe', transition: 'all 0.2s' }}>
              <Group justify="space-between" align="flex-start" mb={4}>
                <Text size="xs" c="gray.5" tt="uppercase" fw={600}>{entityLabels[key] || key}</Text>
                <Box style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Database size={14} color="#2563eb" />
                </Box>
              </Group>
              <Text fw={800} style={{ fontSize: 28, lineHeight: 1.1 }} c="gray.9">{val.total}</Text>
              <Group gap={6} mt={4}>
                <Text size="xs" c="green" fw={600}>{val.active} active</Text>
                {val.inactive > 0 && <Text size="xs" c="gray.4">• {val.inactive} inactive</Text>}
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      )}

      {/* Charts */}
      {counts && totals && (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
          {/* Bar chart */}
          <Paper withBorder radius="md" p="lg" style={{ borderColor: '#e5e7eb' }}>
            <Text fw={700} size="sm" mb="md">Content Distribution</Text>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value) => [value ?? 0, 'Items']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Donut chart */}
          <Paper withBorder radius="md" p="lg" style={{ borderColor: '#e5e7eb' }}>
            <Text fw={700} size="sm" mb="md">Active vs Inactive</Text>
            <Flex direction="column" align="center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={donutColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                    formatter={(value) => [value ?? 0, 'Items']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Group gap="lg" mt="sm">
                <Group gap={6}>
                  <Box style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563eb' }} />
                  <Text size="xs" c="gray.6">{totals.active} Active</Text>
                </Group>
                <Group gap={6}>
                  <Box style={{ width: 10, height: 10, borderRadius: '50%', background: '#e5e7eb' }} />
                  <Text size="xs" c="gray.6">{totals.inactive} Inactive</Text>
                </Group>
              </Group>
            </Flex>
          </Paper>
        </SimpleGrid>
      )}

      {/* Quick Actions */}
      <Text fw={700} size="sm" mb="md">Quick Actions</Text>
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
        {modules.slice(0, 8).map((mod) => {
          const Icon = mod.icon;
          return (
            <Card
              key={mod.href}
              component={Link}
              href={mod.href}
              withBorder
              radius="md"
              padding="sm"
              style={{
                borderColor: '#e5e7eb',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Group gap="sm" wrap="nowrap">
                <Box
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: `var(--mantine-color-${mod.color}-light)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={`var(--mantine-color-${mod.color}-filled)`} />
                </Box>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={600} size="sm" lineClamp={1}>{mod.label}</Text>
                  <Text size="xs" c="gray.5" lineClamp={1}>{mod.desc}</Text>
                </Box>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
