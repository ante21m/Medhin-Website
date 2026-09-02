'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetAppointmentsQuery, useUpdateAppointmentMutation, useDeleteAppointmentMutation,
} from '@/app/store/api/appointmentApi';
import type { Appointment } from '@/app/store/api/appointmentApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, SimpleGrid, Select, Modal,
} from '@mantine/core';
import { Trash2, Edit, AlertCircle, X, Check, Phone, Calendar, Clock, User } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLOR: Record<string, string> = {
  pending: 'yellow',
  confirmed: 'blue',
  completed: 'green',
  cancelled: 'red',
};

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetAppointmentsQuery();
  const [updateItem, { isLoading: isUpdating }] = useUpdateAppointmentMutation();
  const [deleteItem] = useDeleteAppointmentMutation();

  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<Appointment | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = items || [];
    if (filter) list = list.filter((a) => a.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.patientPhone.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

  const counts = useMemo(() => {
    const base = items || [];
    return {
      all: base.length,
      pending: base.filter((a) => a.status === 'pending').length,
      confirmed: base.filter((a) => a.status === 'confirmed').length,
      completed: base.filter((a) => a.status === 'completed').length,
      cancelled: base.filter((a) => a.status === 'cancelled').length,
    };
  }, [items]);

  const openEdit = (item: Appointment) => {
    setEditItem(item);
    setEditNotes(item.notes || '');
    setEditDate(item.appointmentDate);
    setEditTime(item.appointmentTime);
    setEditStatus(item.status);
    setFormError(null);
  };

  const closeEdit = () => {
    setEditItem(null);
    setFormError(null);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateItem({ id, data: { status } }).unwrap();
    } catch (err: any) {
      const s = err?.status || err?.originalStatus;
      if (s === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); }
    }
  };

  const handleEditSave = async () => {
    if (!editItem) return;
    setFormError(null);
    try {
      await updateItem({
        id: editItem.id,
        data: {
          notes: editNotes.trim() || undefined,
          appointmentDate: editDate,
          appointmentTime: editTime,
          status: editStatus,
        },
      }).unwrap();
      closeEdit();
    } catch (err: any) {
      const s = err?.status || err?.originalStatus;
      if (s === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); return; }
      setFormError(err?.data?.message || err?.message || 'Update failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this appointment?')) {
      try {
        await deleteItem(id).unwrap();
      } catch (err: any) {
        const s = err?.status || err?.originalStatus;
        if (s === 401) { localStorage.removeItem('auth_token'); router.push('/admin/login'); }
      }
    }
  };

  if (!mounted) return <Center mih="100vh"><Loader color="blue" /></Center>;
  if (!localStorage.getItem('auth_token')) return null;

  return (
    <Container size="lg" py="lg" style={{ maxWidth: 1200 }}>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={3}>Appointments</Title>
          <Text size="xs" c="gray.5">{items ? items.length : '—'} total bookings</Text>
        </div>
      </Group>

      {isLoading && <Center py={64}><Loader size="lg" color="blue" /></Center>}
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load appointments.</Alert>}

      {items && (
        <>
          {/* Status filter chips */}
          <Group gap="xs" mb="md">
            <Badge
              variant={filter === null ? 'filled' : 'light'}
              color="gray"
              size="lg"
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter(null)}
            >
              All ({counts.all})
            </Badge>
            {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
              <Badge
                key={s}
                variant={filter === s ? 'filled' : 'light'}
                color={STATUS_COLOR[s]}
                size="lg"
                style={{ cursor: 'pointer' }}
                onClick={() => setFilter(filter === s ? null : s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
              </Badge>
            ))}
          </Group>

          <TextInput
            placeholder="Search by patient, doctor, or phone..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={<User size={14} />}
            rightSection={search ? <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} /> : undefined}
            mb="md"
            size="sm"
          />

          {filtered.length === 0 && (
            <Center py={64}><Text c="gray.4">{filter || search ? 'No matching appointments.' : 'No appointments yet.'}</Text></Center>
          )}

          {filtered.length > 0 && (
            <Table.ScrollContainer minWidth={800}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Doctor</Table.Th>
                    <Table.Th>Patient</Table.Th>
                    <Table.Th>Date & Time</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Created</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filtered.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>{item.id}</Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={500}>{item.doctorName}</Text>
                        {item.doctorSpecialty && <Text size="xs" c="gray.5">{item.doctorSpecialty}</Text>}
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={500}>{item.patientName}</Text>
                        <Text size="xs" c="gray.5">{item.patientPhone}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap={4} wrap="nowrap">
                          <Calendar size={12} />
                          <Text size="sm">{item.appointmentDate}</Text>
                          <Clock size={12} />
                          <Text size="sm">{item.appointmentTime}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Select
                          size="xs"
                          data={STATUS_OPTIONS}
                          value={item.status}
                          onChange={(v) => v && handleStatusChange(item.id, v)}
                          style={{ width: 130 }}
                          comboboxProps={{ withinPortal: true }}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" c="gray.5">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap={4}>
                          <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => openEdit(item)}>
                            <Edit size={14} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" size="sm" onClick={() => handleDelete(item.id)}>
                            <Trash2 size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </>
      )}

      <Modal opened={!!editItem} onClose={closeEdit} title="Edit Appointment" size="md" centered>
        {editItem && (
          <Stack gap="sm">
            <Paper withBorder p="xs" radius="md" style={{ background: '#f8fafc' }}>
              <Group gap="xs">
                <User size={14} />
                <Text size="sm" fw={500}>{editItem.patientName}</Text>
                <Phone size={12} color="var(--mantine-color-gray-5)" />
                <Text size="sm" c="gray.5">{editItem.patientPhone}</Text>
              </Group>
              {editItem.patientEmail && (
                <Text size="xs" c="gray.5" ml="xs">{editItem.patientEmail}</Text>
              )}
            </Paper>

            <Paper withBorder p="xs" radius="md" style={{ background: '#f8fafc' }}>
              <Group gap="xs">
                <Text size="sm" fw={500}>Dr. {editItem.doctorName}</Text>
                {editItem.doctorSpecialty && <Badge size="xs" variant="light">{editItem.doctorSpecialty}</Badge>}
              </Group>
            </Paper>

            <SimpleGrid cols={2}>
              <TextInput
                label="Date"
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
              <TextInput
                label="Time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                placeholder="e.g. 10:00"
              />
            </SimpleGrid>

            <Select
              label="Status"
              data={STATUS_OPTIONS}
              value={editStatus}
              onChange={(v) => v && setEditStatus(v)}
            />

            <Textarea
              label="Notes"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={3}
            />

            {formError && <Alert icon={<AlertCircle size={14} />} color="red" variant="light" p="xs">{formError}</Alert>}

            <Group justify="flex-end" mt="sm">
              <Button variant="subtle" color="gray" onClick={closeEdit}>Cancel</Button>
              <Button leftSection={<Check size={14} />} onClick={handleEditSave} loading={isUpdating}>
                Save Changes
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}
