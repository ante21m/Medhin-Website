'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetReportsQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation,
} from '@/app/store/api/reportApi';
import type { Report } from '@/app/store/api/reportApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check } from 'lucide-react';

export default function AdminReportsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetReportsQuery();
  const [createItem, { isLoading: isCreating }] = useCreateReportMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateReportMutation();
  const [deleteItem] = useDeleteReportMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setTitle(''); setDescription(''); setFormError(null);
  };

  const startEdit = (item: Report) => {
    setEditId(item.id); setTitle(item.title); setDescription(item.description || ''); setFormError(null);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!title.trim()) { setFormError('Title is required'); return; }
    try {
      const payload = { title: title.trim(), description: description.trim() || undefined };
      if (isEditing) {
        await updateItem({ id: editId, data: payload as any }).unwrap();
      } else {
        await createItem(payload as any).unwrap();
      }
      resetForm();
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this report?')) {
      try { await deleteItem(id).unwrap(); } catch { /* */ }
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const hasToken = localStorage.getItem('auth_token');
  if (!hasToken) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Title order={3} mb="lg">Reports</Title>

      <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
        <Group justify="space-between" mb="sm">
          <Text fw={600} size="sm">{isEditing ? 'Edit Report' : 'Add Report'}</Text>
          {isEditing && (
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          )}
        </Group>
        <Stack gap="sm">
          <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Report title" />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} />
          {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
          <Group justify="flex-end">
            <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
              {isEditing ? 'Save Changes' : 'Save'}
            </Button>
          </Group>
        </Stack>
      </Paper>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load reports.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No reports yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>File</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={220}>{item.title}</Text></Table.Td>
                  <Table.Td><Badge color={item.isActive ? 'green' : 'gray'} size="sm">{item.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>{item.file ? <Text size="sm" c="blue" truncate maw={200} component="a" href={item.file} target="_blank">{item.file}</Text> : '—'}</Table.Td>
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
