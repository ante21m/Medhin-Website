'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetLeadershipQuery, useCreateLeadershipMutation, useUpdateLeadershipMutation, useDeleteLeadershipMutation,
} from '@/app/store/api/leadershipApi';
import type { Leadership } from '@/app/store/api/leadershipApi';
import {
  useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation,
} from '@/app/store/api/faqsApi';
import type { Faq } from '@/app/store/api/faqsApi';
import {
  useGetReportsQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation,
} from '@/app/store/api/reportApi';
import type { Report } from '@/app/store/api/reportApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, Collapse, Image, Divider, SimpleGrid, Switch, Tabs,
} from '@mantine/core';
import {
  Plus, Trash2, Edit, AlertCircle, X, Check, Users, HelpCircle, FileText, Paperclip,
} from 'lucide-react';
import { FileUpload } from '@/app/components/admin/FileUpload';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

function resolveAsset(path?: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/images/')) return path;
  return `${API_URL}/${path}`;
}

/* ─────────────────────────── Leadership tab ─────────────────────────── */

const EMPTY_LEADER = {
  name: '', nameAm: '', role: '', roleAm: '', bio: '', image: undefined as string | undefined,
  experience: '', certificatesText: '', awardsText: '', order: 0,
};

function LeadershipTab() {
  const router = useRouter();
  const { data, isLoading, error } = useGetLeadershipQuery();
  const [createLead, { isLoading: isCreating }] = useCreateLeadershipMutation();
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadershipMutation();
  const [deleteLead] = useDeleteLeadershipMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_LEADER);
  const [active, setActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (k: keyof typeof EMPTY_LEADER) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setForm(EMPTY_LEADER); setActive(true); setFormError(null);
  };

  const startEdit = (it: Leadership) => {
    setEditId(it.id);
    setForm({
      name: it.name || '', nameAm: it.nameAm || '', role: it.role || '', roleAm: it.roleAm || '',
      bio: it.bio || '', image: it.image || undefined, experience: it.experience || '',
      certificatesText: (it.certificates || []).join('\n'), awardsText: (it.awards || []).join('\n'),
      order: it.order || 0,
    });
    setActive(!!it.isActive); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      const payload = {
        name: form.name.trim() || undefined, nameAm: form.nameAm.trim() || undefined,
        role: form.role.trim() || undefined, roleAm: form.roleAm.trim() || undefined,
        bio: form.bio.trim() || undefined, image: form.image || undefined,
        experience: form.experience.trim() || undefined,
        certificates: form.certificatesText.split('\n').map((s) => s.trim()).filter(Boolean),
        awards: form.awardsText.split('\n').map((s) => s.trim()).filter(Boolean),
        order: Number(form.order) || 0,
      };
      if (isEditing) {
        await updateLead({ id: editId, data: { ...payload, isActive: active } as any }).unwrap();
      } else {
        await createLead(payload as any).unwrap();
      }
      resetForm();
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      if (status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/admin/login');
        return;
      }
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this leadership member?')) {
      try { await deleteLead(id).unwrap(); } catch (err: any) {
        const status = err?.status || err?.originalStatus;
        if (status === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); }
      }
    }
  };

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text c="gray.5" size="sm">Manage the leadership team shown on the About page.</Text>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Add Member
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Leadership Member' : 'Add Leadership Member'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="sm">
              <TextInput label="Name" value={form.name} onChange={set('name')} placeholder="English name" />
              <TextInput label="ስም (Amharic)" value={form.nameAm} onChange={set('nameAm')} placeholder="Optional" />
              <TextInput label="Role" value={form.role} onChange={set('role')} placeholder="English role" />
              <TextInput label="የስራ መደብ (Amharic)" value={form.roleAm} onChange={set('roleAm')} placeholder="Optional" />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
              <Textarea label="Bio" value={form.bio} onChange={set('bio')} rows={3} placeholder="Short biography (optional)" />
              <Stack gap="sm">
                <TextInput label="Experience (summary)" value={form.experience} onChange={set('experience')} placeholder="e.g. 20+ Years" />
                <TextInput label="Display Order" type="number" value={form.order.toString()} onChange={set('order')} placeholder="0" />
              </Stack>
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
              <Textarea label="Certificates (one per line)" value={form.certificatesText} onChange={set('certificatesText')} rows={4} placeholder={'MD - Addis Ababa University\nMBA in Healthcare Management'} />
              <Textarea label="Awards (one per line)" value={form.awardsText} onChange={set('awardsText')} rows={4} placeholder={'Healthcare Leadership Award'} />
            </SimpleGrid>

            <Divider label="Media" labelPosition="left" />
            <div>
              <Text size="xs" fw={600} mb={6}>Photo</Text>
              <FileUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} accept="image/*" label="Upload Photo" />
            </div>

            {isEditing && (
              <Switch
                label="Active"
                checked={active}
                onChange={(e) => setActive(e.currentTarget.checked)}
              />
            )}

            {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
            <Group justify="flex-end">
              <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
                {isEditing ? 'Save Changes' : 'Save'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Collapse>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load leadership.</Alert>}
      {data && data.length === 0 && <Center py={64}><Text c="gray.4">No leadership members yet.</Text></Center>}
      {data && data.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Photo</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Order</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((it) => (
                <Table.Tr key={it.id}>
                  <Table.Td>{it.id}</Table.Td>
                  <Table.Td>
                    {it.image
                      ? <Image src={resolveAsset(it.image)} alt="" width={40} height={52} radius="sm" fit="cover" />
                      : <Text c="gray.4">—</Text>}
                  </Table.Td>
                  <Table.Td><Text lineClamp={1} maw={220}>{it.name}{it.nameAm ? ` · ${it.nameAm}` : ''}</Text></Table.Td>
                  <Table.Td><Text lineClamp={1} maw={220}>{it.role}{it.roleAm ? ` · ${it.roleAm}` : ''}</Text></Table.Td>
                  <Table.Td>{it.order}</Table.Td>
                  <Table.Td><Badge color={it.isActive ? 'green' : 'gray'} size="sm">{it.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => startEdit(it)}><Edit size={14} /></ActionIcon>
                      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(it.id)}><Trash2 size={14} /></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
}

/* ─────────────────────────── FAQs tab ─────────────────────────── */

const EMPTY_FAQ = { question: '', questionAm: '', answer: '', answerAm: '', category: '', order: 0 };

function FaqTab() {
  const router = useRouter();
  const { data, isLoading, error } = useGetFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FAQ);
  const [active, setActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (k: keyof typeof EMPTY_FAQ) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isEditing = editId !== null;

  const resetForm = () => { setEditId(null); setShowForm(false); setForm(EMPTY_FAQ); setActive(true); setFormError(null); };

  const startEdit = (it: Faq) => {
    setEditId(it.id);
    setForm({
      question: it.question || '', questionAm: it.questionAm || '', answer: it.answer || '',
      answerAm: it.answerAm || '', category: it.category || '', order: it.order || 0,
    });
    setActive(!!it.isActive); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      const payload = {
        question: form.question.trim() || undefined, questionAm: form.questionAm.trim() || undefined,
        answer: form.answer.trim() || undefined, answerAm: form.answerAm.trim() || undefined,
        category: form.category.trim() || undefined, order: Number(form.order) || 0,
      };
      if (isEditing) {
        await updateFaq({ id: editId, data: { ...payload, isActive: active } as any }).unwrap();
      } else {
        await createFaq(payload as any).unwrap();
      }
      resetForm();
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      if (status === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); return; }
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this FAQ?')) {
      try { await deleteFaq(id).unwrap(); } catch (err: any) {
        const status = err?.status || err?.originalStatus;
        if (status === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); }
      }
    }
  };

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text c="gray.5" size="sm">Frequently asked questions shown on the FAQ page.</Text>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Add FAQ
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit FAQ' : 'Add FAQ'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
              <TextInput label="Question (EN)" value={form.question} onChange={set('question')} placeholder="Question" />
              <TextInput label="ጥያቄ (Amharic)" value={form.questionAm} onChange={set('questionAm')} placeholder="Optional" />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
              <Textarea label="Answer (EN)" value={form.answer} onChange={set('answer')} rows={4} placeholder="Answer" />
              <Textarea label="መልስ (Amharic)" value={form.answerAm} onChange={set('answerAm')} rows={4} placeholder="Optional" />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
              <TextInput label="Category" value={form.category} onChange={set('category')} placeholder="e.g. Appointments" />
              <TextInput label="Display Order" type="number" value={form.order.toString()} onChange={set('order')} placeholder="0" />
            </SimpleGrid>

            {isEditing && (
              <Switch label="Active" checked={active} onChange={(e) => setActive(e.currentTarget.checked)} />
            )}

            {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
            <Group justify="flex-end">
              <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
                {isEditing ? 'Save Changes' : 'Save'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Collapse>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load FAQs.</Alert>}
      {data && data.length === 0 && <Center py={64}><Text c="gray.4">No FAQs yet.</Text></Center>}
      {data && data.length > 0 && (
        <Table.ScrollContainer minWidth={760}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Question</Table.Th>
                <Table.Th>Answer</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Order</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((it) => (
                <Table.Tr key={it.id}>
                  <Table.Td>{it.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={260}>{it.question}</Text></Table.Td>
                  <Table.Td><Text lineClamp={2} maw={320}>{it.answer}</Text></Table.Td>
                  <Table.Td>{it.category || '—'}</Table.Td>
                  <Table.Td>{it.order}</Table.Td>
                  <Table.Td><Badge color={it.isActive ? 'green' : 'gray'} size="sm">{it.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => startEdit(it)}><Edit size={14} /></ActionIcon>
                      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(it.id)}><Trash2 size={14} /></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
}

/* ─────────────────────────── Reports tab ─────────────────────────── */

const EMPTY_REPORT = { title: '', description: '', file: undefined as string | undefined };

function ReportsTab() {
  const router = useRouter();
  const { data, isLoading, error } = useGetReportsQuery();
  const [createRep, { isLoading: isCreating }] = useCreateReportMutation();
  const [updateRep, { isLoading: isUpdating }] = useUpdateReportMutation();
  const [deleteRep] = useDeleteReportMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_REPORT);
  const [active, setActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (k: keyof typeof EMPTY_REPORT) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isEditing = editId !== null;

  const resetForm = () => { setEditId(null); setShowForm(false); setForm(EMPTY_REPORT); setActive(true); setFormError(null); };

  const startEdit = (it: Report) => {
    setEditId(it.id);
    setForm({ title: it.title || '', description: it.description || '', file: it.file || undefined });
    setActive(!!it.isActive); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      const payload = {
        title: form.title.trim() || undefined, description: form.description.trim() || undefined,
        file: form.file || undefined,
      };
      if (isEditing) {
        await updateRep({ id: editId, data: { ...payload, isActive: active } as any }).unwrap();
      } else {
        await createRep(payload as any).unwrap();
      }
      resetForm();
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      if (status === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); return; }
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this report?')) {
      try { await deleteRep(id).unwrap(); } catch (err: any) {
        const status = err?.status || err?.originalStatus;
        if (status === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); }
      }
    }
  };

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text c="gray.5" size="sm">Annual / performance reports shown on the annual report page.</Text>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Add Report
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Report' : 'Add Report'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <TextInput label="Title" value={form.title} onChange={set('title')} placeholder="e.g. Annual Report 2025" />
            <Textarea label="Description" value={form.description} onChange={set('description')} rows={3} placeholder="Short description (optional)" />
            <div>
              <Text size="xs" fw={600} mb={6}>Document</Text>
              <FileUpload value={form.file} onChange={(url) => setForm((f) => ({ ...f, file: url }))} accept=".pdf,.doc,.docx,.xls,.xlsx" label="Upload Document" />
            </div>

            {isEditing && (
              <Switch label="Active" checked={active} onChange={(e) => setActive(e.currentTarget.checked)} />
            )}

            {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
            <Group justify="flex-end">
              <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
                {isEditing ? 'Save Changes' : 'Save'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Collapse>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load reports.</Alert>}
      {data && data.length === 0 && <Center py={64}><Text c="gray.4">No reports yet.</Text></Center>}
      {data && data.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Document</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((it) => (
                <Table.Tr key={it.id}>
                  <Table.Td>{it.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={220}>{it.title}</Text></Table.Td>
                  <Table.Td><Text lineClamp={2} maw={300}>{it.description || '—'}</Text></Table.Td>
                  <Table.Td>
                    {it.file
                      ? <Group gap={4}><Paperclip size={13} color="var(--primary)" /><Text size="sm" truncate maw={140} component="a" href={resolveAsset(it.file)} target="_blank">{it.file.split('/').pop()}</Text></Group>
                      : '—'}
                  </Table.Td>
                  <Table.Td><Badge color={it.isActive ? 'green' : 'gray'} size="sm">{it.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>{new Date(it.createdAt).toLocaleDateString()}</Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => startEdit(it)}><Edit size={14} /></ActionIcon>
                      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(it.id)}><Trash2 size={14} /></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function AdminAboutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  if (!localStorage.getItem('auth_token')) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Title order={3} mb="md">About Page</Title>

      <Tabs defaultValue="leadership">
        <Tabs.List mb="md">
          <Tabs.Tab value="leadership" leftSection={<Users size={14} />}>Leadership</Tabs.Tab>
          <Tabs.Tab value="faqs" leftSection={<HelpCircle size={14} />}>FAQs</Tabs.Tab>
          <Tabs.Tab value="reports" leftSection={<FileText size={14} />}>Annual Reports</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="leadership"><LeadershipTab /></Tabs.Panel>
        <Tabs.Panel value="faqs"><FaqTab /></Tabs.Panel>
        <Tabs.Panel value="reports"><ReportsTab /></Tabs.Panel>
      </Tabs>
    </Container>
  );
}