'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AppShell, NavLink, Group, Title, Button, Box, Text, Stack,
} from '@mantine/core';
import {
  Newspaper, Briefcase, Building2, Image as ImageIcon, Share2, Stethoscope, ConciergeBell, LogOut, ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Vacancies', href: '/admin/vacancies', icon: Briefcase },
  { label: 'Departments', href: '/admin/departments', icon: Building2 },
  { label: 'Physicians', href: '/admin/physicians', icon: Stethoscope },
  { label: 'Services', href: '/admin/services', icon: ConciergeBell },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Social Links', href: '/admin/social', icon: Share2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/admin/login');
  };

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: 'sm' }}
      padding={0}
      layout="default"
    >
      <AppShell.Navbar p="md" style={{ background: '#f8fafc', borderRight: '1px solid #e5e7eb' }}>
        <Stack justify="space-between" h="100%">
          <Box>
            <Group gap="sm" mb="xl" px="xs">
              <img src="/hospital-logo.jpg" alt="" width={36} height={36} style={{ borderRadius: 8, objectFit: 'cover' }} />
              <Text fw={700} size="sm">Medhin Primary Hospital</Text>
            </Group>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  leftSection={<Icon size={18} />}
                  active={pathname === item.href}
                  variant="light"
                  color="blue"
                  mb={4}
                  style={{ borderRadius: 8 }}
                />
              );
            })}
          </Box>

          <Stack gap="xs">
            <Button
              component={Link}
              href="/"
              variant="subtle"
              color="gray"
              size="sm"
              leftSection={<ExternalLink size={14} />}
              fullWidth
              justify="flex-start"
            >
              View Site
            </Button>
            <Button
              variant="subtle"
              color="red"
              size="sm"
              leftSection={<LogOut size={14} />}
              fullWidth
              justify="flex-start"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
