'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetVacanciesQuery, useCreateVacancyMutation, useUpdateVacancyMutation, useDeleteVacancyMutation,
} from '@/app/store/api/vacancyApi';
import type { Vacancy } from '@/app/store/api/vacancyApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, Collapse,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check } from 'lucide-react';

export default function AdminVacanciesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetVacanciesQuery();
  const [createItem, { isLoading: isCreating }] = useCreateVacancyMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateVacancyMutation();
  const [deleteItem] = useDeleteVacancyMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setTitle(''); setDescription(''); setRequirements(''); setLocation(''); setDeadline(''); setFormError(null);
  };

  const startEdit = (item: Vacancy) => {
    setEditId(item.id); setTitle(item.title); setDescription(item.description || ''); setRequirements(item.requirements || ''); setLocation(item.location || ''); setDeadline(item.deadline || ''); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!title.trim()) { setFormError('Title is required'); return; }
    if (!description.trim()) { setFormError('Description is required'); return; }
    try {
      const payload = { title: title.trim(), description: description.trim(), requirements: requirements.trim() || undefined, location: location.trim() || undefined, deadline: deadline.trim() || undefined };
      if (isEditing) {
        await updateItem({ id: editId, data: payload as any }).unwrap();
      } else {
        await createItem(payload as any).unwrap();
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
    if (confirm('Delete this vacancy?')) {
      try { await deleteItem(id).unwrap(); } catch (err: any) {
        const status = err?.status || err?.originalStatus;
        if (status === 401) {
          localStorage.removeItem('auth_token');
          router.push('/admin/login');
        }
      }
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const hasToken = localStorage.getItem('auth_token');
  if (!hasToken) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Vacancies</Title>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Create Vacancy
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Vacancy' : 'Add Vacancy'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <Group grow>
              <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Job title" />
              <TextInput label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Job location (optional)" />
            </Group>
            <Group grow>
              <TextInput label="Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Requirements (optional)" />
              <TextInput label="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 2025-03-15 (optional)" />
            </Group>
            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Job description..." rows={4} />
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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load vacancies.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No vacancies yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={200}>{item.title}</Text></Table.Td>
                  <Table.Td>{item.location || '—'}</Table.Td>
                  <Table.Td><Badge color={item.isActive ? 'green' : 'gray'} size="sm">{item.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>{new Date(item.createdAt).toLocaleDateString()}</Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => startEdit(item)}><Edit size={14} /></ActionIcon>
                      <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </Container>
  );
}
