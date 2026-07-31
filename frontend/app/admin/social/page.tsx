'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetSocialLinksQuery, useCreateSocialMutation, useUpdateSocialMutation, useDeleteSocialMutation,
} from '@/app/store/api/socialApi';
import type { SocialLink } from '@/app/store/api/socialApi';
import {
  Container, Title, Text, Button, Group, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Paper,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check } from 'lucide-react';

export default function AdminSocialPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetSocialLinksQuery();
  const [createItem, { isLoading: isCreating }] = useCreateSocialMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateSocialMutation();
  const [deleteItem] = useDeleteSocialMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setPlatform(''); setUrl(''); setIcon(''); setFormError(null);
  };

  const startEdit = (item: SocialLink) => {
    setEditId(item.id); setPlatform(item.platform); setUrl(item.url); setIcon(item.icon || ''); setFormError(null);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!platform.trim()) { setFormError('Platform is required'); return; }
    if (!url.trim()) { setFormError('URL is required'); return; }
    try {
      const payload = { platform: platform.trim(), url: url.trim(), icon: icon.trim() || undefined };
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
    if (confirm('Delete this social link?')) {
      try { await deleteItem(id).unwrap(); } catch { /* */ }
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const hasToken = localStorage.getItem('auth_token');
  if (!hasToken) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Title order={3} mb="lg">Social Links</Title>

      <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
        <Group justify="space-between" mb="sm">
          <Text fw={600} size="sm">{isEditing ? 'Edit Social Link' : 'Add Social Link'}</Text>
          {isEditing && (
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          )}
        </Group>
        <Stack gap="sm">
          <Group grow>
            <TextInput label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required placeholder="e.g. Facebook" />
            <TextInput label="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Icon identifier (optional)" />
          </Group>
          <TextInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://facebook.com/company" />
          {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
          <Group justify="flex-end">
            <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
              {isEditing ? 'Save Changes' : 'Save'}
            </Button>
          </Group>
        </Stack>
      </Paper>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load social links.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No social links yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Platform</Table.Th>
                <Table.Th>URL</Table.Th>
                <Table.Th>Icon</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td><Text fw={600} size="sm">{item.platform}</Text></Table.Td>
                  <Table.Td><Text size="sm" c="blue" truncate maw={300} component="a" href={item.url} target="_blank">{item.url}</Text></Table.Td>
                  <Table.Td>{item.icon || '—'}</Table.Td>
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
