'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetServicesQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useSeedServicesMutation,
} from '@/app/store/api/serviceApi';
import type { ServiceItem } from '@/app/store/api/serviceApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, NumberInput, Paper, Collapse,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check } from 'lucide-react';

export default function AdminServicesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetServicesQuery();
  const [createItem, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteItem] = useDeleteServiceMutation();
  const [seedServices] = useSeedServicesMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null);
    setName('');
    setIcon('');
    setDescription('');
    setOrder(0);
    setFormError(null);
    setShowForm(false);
  };

  const startEdit = (item: ServiceItem) => {
    setEditId(item.id);
    setName(item.name);
    setIcon(item.icon || '');
    setDescription(item.description || '');
    setOrder(item.order ?? 0);
    setFormError(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!name.trim()) { setFormError('Name is required'); return; }
    try {
      const payload = { name: name.trim(), icon: icon.trim() || undefined, description: description.trim() || undefined, order: order || undefined };
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
    if (confirm('Delete this service?')) {
      try { await deleteItem(id).unwrap(); } catch (err: any) {
        const status = err?.status || err?.originalStatus;
        if (status === 401) {
          localStorage.removeItem('auth_token');
          router.push('/admin/login');
        }
      }
    }
  };

  const handleSeed = async () => {
    if (!confirm('Seed 8 services from config into the database?')) return;
    try {
      await seedServices().unwrap();
    } catch { /* ignore */ }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const hasToken = localStorage.getItem('auth_token');
  if (!hasToken) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Services</Title>
        <Group>
          <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            Add Service
          </Button>
        </Group>
      </Group>

      {/* INLINE FORM */}
      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Service' : 'Add Service'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
        <Stack gap="sm">
          <Group grow>
            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Emergency Care" />
            <TextInput label="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g. ambulance, baby, flask" />
            <NumberInput label="Display Order" value={order} onChange={(v) => setOrder(Number(v) || 0)} min={0} />
          </Group>
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Service description..." rows={3} />
          {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}
          <Group justify="flex-end">
            <Button leftSection={isEditing ? <Check size={14} /> : <Plus size={14} />} onClick={handleSubmit} loading={isCreating || isUpdating}>
              {isEditing ? 'Save Changes' : 'Save'}
            </Button>
          </Group>
        </Stack>
        </Paper>
      </Collapse>

      {/* TABLE */}
      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load services.</Alert>}

      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No services yet.</Text></Center>}

      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Icon</Table.Th>
                <Table.Th>Order</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={200}>{item.name}</Text></Table.Td>
                  <Table.Td>{item.icon || '—'}</Table.Td>
                  <Table.Td>{item.order}</Table.Td>
                  <Table.Td><Badge color={item.isActive ? 'green' : 'gray'} size="sm">{item.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
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
