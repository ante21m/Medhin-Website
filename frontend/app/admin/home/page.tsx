'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetSiteSettingsByGroupQuery,
  useUpdateSiteSettingMutation,
  useCreateSiteSettingMutation,
} from '@/app/store/api/siteSettingsApi';
import {
  Container, Title, Text, Button, Group, Loader, Center, Alert, Paper, Stack,
  TextInput, ActionIcon, Divider, SimpleGrid, Badge,
} from '@mantine/core';
import { AlertCircle, Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { FileUpload } from '@/app/components/admin/FileUpload';

const ICON_OPTIONS = ['FaAmbulance', 'FaFlask', 'FaXRay', 'FaCut', 'FaHeartbeat', 'FaBaby', 'FaDesktop', 'FaBrain'];

interface DepartmentRow {
  id: string;
  icon: string;
  color: string;
}

interface HeroSlideRow {
  src: string;
  title: string;
  titleAm: string;
  subtitle: string;
  subtitleAm: string;
}

type Upsert = (key: string, value: string) => Promise<void>;

export default function AdminHomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data, isLoading, error } = useGetSiteSettingsByGroupQuery('home');
  const [updateSetting, { isLoading: isUpdating }] = useUpdateSiteSettingMutation();
  const [createSetting, { isLoading: isCreating }] = useCreateSiteSettingMutation();

  const [stats, setStats] = useState<Record<string, string>>({});
  const [partners, setPartners] = useState<string[]>([]);
  const [departments, setDepartments] = useState<DepartmentRow[]>([]);
  const [hero, setHero] = useState<HeroSlideRow[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!data) return;
    const map: Record<string, string> = {};
    data.forEach((s) => { map[s.key] = s.value; });

    setStats((prev) => {
      const next = { ...prev };
      [
        'home_stats_experience', 'home_stats_experience_suffix',
        'home_stats_doctors', 'home_stats_doctors_suffix',
        'home_stats_patients', 'home_stats_patients_suffix',
        'home_stats_departments', 'home_stats_departments_suffix',
      ].forEach((k) => { if (map[k] !== undefined) next[k] = map[k]; });
      return next;
    });

    try {
      const p = JSON.parse(map.home_partners || '[]');
      if (Array.isArray(p)) setPartners(p.map(String));
    } catch { setPartners([]); }

    try {
      const d = JSON.parse(map.home_departments || '[]');
      if (Array.isArray(d)) {
        const valid = d.map((x: any) => ({
          id: String(x?.id || ''), icon: x?.icon || 'FaAmbulance', color: x?.color || '#ef4444',
        }));
        setDepartments(valid);
      }
    } catch { setDepartments([]); }

    try {
      const h = JSON.parse(map.hero_slides || '[]');
      if (Array.isArray(h)) {
        setHero(h.map((x: any) => ({
          src: String(x?.src || ''),
          title: String(x?.title || ''),
          titleAm: String(x?.titleAm || ''),
          subtitle: String(x?.subtitle || ''),
          subtitleAm: String(x?.subtitleAm || ''),
        })));
      }
    } catch { setHero([]); }

    setReady(true);
  }, [data]);

  const checkAuthError = (err: any) => {
    const status = err?.status || err?.originalStatus;
    if (status === 401) {
      localStorage.removeItem('auth_token');
      router.push('/admin/login');
      return true;
    }
    return false;
  };

  const upsert: Upsert = async (key, value) => {
    const existing = (data || []).find((s) => s.key === key);
    if (existing) {
      await updateSetting({ key, data: { value } }).unwrap();
    } else {
      await createSetting({ key, value, group: 'home' }).unwrap();
    }
  };

  const handleSave = async () => {
    setMsg(null);
    try {
      const statKeys = [
        'home_stats_experience', 'home_stats_experience_suffix',
        'home_stats_doctors', 'home_stats_doctors_suffix',
        'home_stats_patients', 'home_stats_patients_suffix',
        'home_stats_departments', 'home_stats_departments_suffix',
      ];

      const tasks: Array<Promise<unknown>> = [];
      statKeys.forEach((k) => tasks.push(upsert(k, (stats[k] ?? '').trim())));
      tasks.push(upsert('home_partners', JSON.stringify(partners.map((p) => p.trim()).filter(Boolean))));
      tasks.push(upsert('home_departments', JSON.stringify(departments)));
      tasks.push(upsert('hero_slides', JSON.stringify(hero)));

      await Promise.all(tasks).catch((e: any) => { if (!checkAuthError(e)) throw e; });
      setMsg({ ok: true, text: 'Homepage settings saved.' });
    } catch (err: any) {
      setMsg({ ok: false, text: err?.data?.message || err?.message || 'Save failed' });
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  if (!localStorage.getItem('auth_token')) return null;

  const statFields: Array<[string, string, string]> = [
    ['home_stats_experience', 'Years of Experience', 'Number'],
    ['home_stats_experience_suffix', 'Experience Suffix', 'e.g. +'],
    ['home_stats_doctors', 'Doctors', 'Number'],
    ['home_stats_doctors_suffix', 'Doctors Suffix', 'e.g. +'],
    ['home_stats_patients', 'Patients', 'Number'],
    ['home_stats_patients_suffix', 'Patients Suffix', 'e.g. K+'],
    ['home_stats_departments', 'Departments Stat Count', 'Number'],
    ['home_stats_departments_suffix', 'Departments Suffix', 'e.g. +'],
  ];

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={3}>Homepage Content</Title>
          <Text size="xs" c="gray.5">Controlled via site settings (group: home)</Text>
        </div>
        <Button leftSection={<Save size={14} />} size="sm" onClick={handleSave} loading={isUpdating || isCreating}>
          Save Changes
        </Button>
      </Group>

      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed" mb="md">Could not load homepage settings.</Alert>}

      {!ready && isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}

      {ready && (
        <Stack gap="lg">
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600} size="sm">Hero Slides</Text>
              <Badge color="violet" variant="light" size="sm">{hero.length} slides</Badge>
            </Group>
            <Stack gap="md">
              {hero.map((s, i) => (
                <Paper key={i} withBorder style={{ borderStyle: 'dashed' }} p="sm" radius="md">
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={600} c="gray">Slide {i + 1}</Text>
                    <ActionIcon variant="subtle" color="red" size="sm" onClick={() => setHero(hero.filter((_, j) => j !== i))}>
                      <Trash2 size={14} />
                    </ActionIcon>
                  </Group>
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm" mb="sm">
                    <FileUpload
                      label="Slide image"
                      accept="image/*"
                      value={s.src}
                      onChange={(url) => setHero(hero.map((x, j) => (j === i ? { ...x, src: url ?? '' } : x)))}
                    />
                    <Stack gap="xs">
                      <TextInput
                        label="Title (English)" value={s.title}
                        onChange={(e) => setHero(hero.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
                      />
                      <TextInput
                        label="Title (Amharic)" value={s.titleAm}
                        onChange={(e) => setHero(hero.map((x, j) => (j === i ? { ...x, titleAm: e.target.value } : x)))}
                      />
                      <TextInput
                        label="Subtitle (English)" value={s.subtitle}
                        onChange={(e) => setHero(hero.map((x, j) => (j === i ? { ...x, subtitle: e.target.value } : x)))}
                      />
                      <TextInput
                        label="Subtitle (Amharic)" value={s.subtitleAm}
                        onChange={(e) => setHero(hero.map((x, j) => (j === i ? { ...x, subtitleAm: e.target.value } : x)))}
                      />
                    </Stack>
                  </SimpleGrid>
                </Paper>
              ))}
              <Button
                variant="light" size="xs" leftSection={<Plus size={14} />}
                onClick={() => setHero([...hero, { src: '', title: '', titleAm: '', subtitle: '', subtitleAm: '' }])}
                style={{ alignSelf: 'flex-start' }}
              >
                Add Slide
              </Button>
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600} size="sm">Stats Strip</Text>
              <Badge color="blue" variant="light" size="sm">4 counters</Badge>
            </Group>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="md">
              {statFields.map(([key, label, ph]) => (
                <TextInput
                  key={key}
                  label={label}
                  placeholder={ph}
                  value={stats[key] ?? ''}
                  onChange={(e) => setStats((s) => ({ ...s, [key]: e.target.value }))}
                />
              ))}
            </SimpleGrid>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Text fw={600} size="sm" mb="sm">Partners / Affiliations</Text>
            <Stack gap="xs">
              {partners.map((p, i) => (
                <Group key={i} gap="sm">
                  <ActionIcon variant="subtle" color="gray"><GripVertical size={14} /></ActionIcon>
                  <TextInput
                    style={{ flex: 1 }}
                    value={p}
                    onChange={(e) => setPartners(partners.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder="Partner name"
                  />
                  <ActionIcon variant="subtle" color="red" onClick={() => setPartners(partners.filter((_, j) => j !== i))}>
                    <Trash2 size={14} />
                  </ActionIcon>
                </Group>
              ))}
              <Button
                variant="light"
                size="xs"
                leftSection={<Plus size={14} />}
                onClick={() => setPartners([...partners, ''])}
                style={{ alignSelf: 'flex-start' }}
              >
                Add Partner
              </Button>
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600} size="sm">Departments shown on Home</Text>
              <Badge color="teal" variant="light" size="sm">{departments.length} items</Badge>
            </Group>
            <Stack gap="xs">
              {departments.map((d, i) => (
                <Group key={i} gap="sm" wrap="nowrap">
                  <ActionIcon variant="subtle" color="gray"><GripVertical size={14} /></ActionIcon>
                  <TextInput
                    label="" placeholder="id"
                    value={d.id}
                    onChange={(e) => setDepartments(departments.map((x, j) => (j === i ? { ...x, id: e.target.value } : x)))}
                    style={{ flex: 1, minWidth: 140 }}
                  />
                  <TextInput
                    label="" placeholder="icon e.g. FaAmbulance"
                    list="home-icon-options"
                    value={d.icon}
                    onChange={(e) => setDepartments(departments.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))}
                    style={{ flex: 1 }}
                  />
                  <TextInput
                    label="" placeholder="color e.g. #ef4444"
                    type="color"
                    value={/^#[0-9a-fA-F]{6}$/.test(d.color) ? d.color : '#ef4444'}
                    onChange={(e) => setDepartments(departments.map((x, j) => (j === i ? { ...x, color: e.target.value } : x)))}
                    style={{ width: 70 }}
                  />
                  <TextInput
                    label="" placeholder="color"
                    value={d.color}
                    onChange={(e) => setDepartments(departments.map((x, j) => (j === i ? { ...x, color: e.target.value } : x)))}
                    style={{ width: 130 }}
                  />
                  <ActionIcon variant="subtle" color="red" onClick={() => setDepartments(departments.filter((_, j) => j !== i))}>
                    <Trash2 size={14} />
                  </ActionIcon>
                </Group>
              ))}
              <datalist id="home-icon-options">
                {ICON_OPTIONS.map((ic) => <option key={ic} value={ic} />)}
              </datalist>
              <Button
                variant="light"
                size="xs"
                leftSection={<Plus size={14} />}
                onClick={() => setDepartments([...departments, { id: '', icon: 'FaAmbulance', color: '#ef4444' }])}
                style={{ alignSelf: 'flex-start' }}
              >
                Add Department
              </Button>
            </Stack>
          </Paper>

          <Divider />

          {msg && (
            <Alert
              color={msg.ok ? 'green' : 'red'}
              variant="light"
              icon={<AlertCircle size={14} />}
              onClick={() => setMsg(null)}
              style={{ cursor: 'pointer' }}
            >
              {msg.text}
            </Alert>
          )}
        </Stack>
      )}
    </Container>
  );
}