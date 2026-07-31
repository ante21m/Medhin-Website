'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetDepartmentsQuery, useCreateDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation,
  useSeedDepartmentsMutation,
} from '@/app/store/api/departmentApi';
import type { Department } from '@/app/store/api/departmentApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, Collapse,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check, Database } from 'lucide-react';

export default function AdminDepartmentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetDepartmentsQuery();
  const [createItem, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteItem] = useDeleteDepartmentMutation();
  const [seedItems, { isLoading: isSeeding }] = useSeedDepartmentsMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [head, setHead] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setName(''); setDescription(''); setHead(''); setEmail(''); setPhone(''); setFormError(null);
  };

  const startEdit = (item: Department) => {
    setEditId(item.id); setName(item.name); setDescription(item.description || ''); setHead(item.headOfDepartment || ''); setEmail(item.email || ''); setPhone(item.phone || ''); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!name.trim()) { setFormError('Name is required'); return; }
    try {
      const payload = { name: name.trim(), description: description.trim() || undefined, headOfDepartment: head.trim() || undefined, email: email.trim() || undefined, phone: phone.trim() || undefined };
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
    if (confirm('Delete this department?')) {
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
    if (!confirm('Seed 4 departments from config into the database?')) return;
    try {
      await seedItems().unwrap();
    } catch { /* ignore */ }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  const hasToken = localStorage.getItem('auth_token');
  if (!hasToken) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Departments</Title>
        <Group>
          <Button leftSection={<Database size={14} />} size="sm" variant="outline" onClick={handleSeed} loading={isSeeding}>
            Seed
          </Button>
          <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            Add Department
          </Button>
        </Group>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Department' : 'Add Department'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <Group grow>
              <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Department name" />
              <TextInput label="Head of Department" value={head} onChange={(e) => setHead(e.target.value)} placeholder="e.g. Dr. John Doe" />
            </Group>
            <Group grow>
              <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="dept@company.com" />
              <TextInput label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" />
            </Group>
            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} />
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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load departments.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No departments yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Head</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td><Text lineClamp={1} maw={180}>{item.name}</Text></Table.Td>
                  <Table.Td>{item.headOfDepartment || '—'}</Table.Td>
                  <Table.Td>{item.email || '—'}</Table.Td>
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
