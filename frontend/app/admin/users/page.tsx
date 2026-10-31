'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation,
} from '@/app/store/api/userApi';
import type { UserItem } from '@/app/store/api/userApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Select, PasswordInput, Paper, Collapse,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check } from 'lucide-react';

const ROLE_COLORS: Record<string, string> = {
  admin: 'blue',
  editor: 'grape',
  user: 'green',
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('admin');
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setName(''); setEmail(''); setPhone('');
    setUsername(''); setPassword(''); setRole('admin'); setFormError(null);
  };

  const startEdit = (item: UserItem) => {
    setEditId(item.id);
    setName(item.name || ''); setEmail(item.email || ''); setPhone(item.phone || '');
    setUsername(item.username || ''); setPassword(''); setRole(item.role || 'admin');
    setFormError(null); setShowForm(true);
  };

  const handleToggleEdit = (item: UserItem) => {
    if (isEditing && editId === item.id) {
      resetForm();
    } else {
      startEdit(item);
    }
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      if (isEditing) {
        await updateUser({
          id: editId,
          data: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            username: username.trim(),
            role,
            ...(password ? { password } : {}),
          },
        }).unwrap();
      } else {
        await createUser({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          username: username.trim(),
          password,
          role,
        }).unwrap();
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
    if (confirm('Delete this user?')) {
      try { await deleteUser(id).unwrap(); } catch (err: any) {
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
        <Title order={3}>Users</Title>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Add User
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit User' : 'Add User'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <Group grow>
              <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
              />
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </Group>
            <Group grow>
              <TextInput
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251..."
              />
              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username for login"
                required
              />
            </Group>
            <Group grow>
              <Select
                label="Role"
                value={role}
                onChange={(value) => setRole(value || 'admin')}
                data={['admin', 'editor', 'user']}
                placeholder="Select role"
                required
              />
              <PasswordInput
                label={isEditing ? 'New Password (leave empty to keep current)' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required={!isEditing}
              />
            </Group>

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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load users.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No users yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.name || '—'}</Table.Td>
                  <Table.Td>{item.email || '—'}</Table.Td>
                  <Table.Td>{item.phone || '—'}</Table.Td>
                  <Table.Td>{item.username}</Table.Td>
                  <Table.Td>
                    <Badge color={ROLE_COLORS[item.role] || 'gray'} size="sm" tt="capitalize">
                      {item.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{new Date(item.createdAt).toLocaleDateString()}</Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon
                        variant="subtle"
                        color={isEditing && editId === item.id ? 'blue' : 'gray'}
                        size="sm"
                        onClick={() => handleToggleEdit(item)}
                      >
                        <Edit size={14} />
                      </ActionIcon>
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
