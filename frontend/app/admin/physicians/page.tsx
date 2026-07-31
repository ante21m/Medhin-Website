'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  useGetPhysiciansQuery, useCreatePhysicianMutation, useUpdatePhysicianMutation, useDeletePhysicianMutation,
} from '@/app/store/api/physicianApi';
import type { Physician } from '@/app/store/api/physicianApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, NumberInput, Paper, Collapse,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check, Eye } from 'lucide-react';
import { FileUpload } from '@/app/components/admin/FileUpload';

export default function AdminPhysiciansPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: physicians, isLoading, error } = useGetPhysiciansQuery();
  const [createPhysician, { isLoading: isCreating }] = useCreatePhysicianMutation();
  const [updatePhysician, { isLoading: isUpdating }] = useUpdatePhysicianMutation();
  const [deletePhysician] = useDeletePhysicianMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [nameAm, setNameAm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialtyAm, setSpecialtyAm] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [rating, setRating] = useState<number>(0);
  const [reviews, setReviews] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setName(''); setNameAm(''); setSpecialty(''); setSpecialtyAm(''); setBio(''); setExperience(''); setImage(undefined); setRating(0); setReviews(0); setFormError(null); setShowForm(false);
  };

  const startEdit = (item: Physician) => {
    setEditId(item.id); setName(item.name); setNameAm(item.nameAm || ''); setSpecialty(item.specialty); setSpecialtyAm(item.specialtyAm || ''); setBio(item.bio || ''); setExperience(item.experience || ''); setImage(item.image); setRating(item.rating ?? 0); setReviews(item.reviews ?? 0); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!name.trim()) { setFormError('Name is required'); return; }
    if (!specialty.trim()) { setFormError('Specialty is required'); return; }
    try {
      const payload = { name: name.trim(), nameAm: nameAm.trim() || undefined, specialty: specialty.trim(), specialtyAm: specialtyAm.trim() || undefined, image: image || undefined, bio: bio.trim() || undefined, experience: experience.trim() || undefined, rating: rating || undefined, reviews: reviews || undefined };
      if (isEditing) {
        await updatePhysician({ id: editId, data: payload as any }).unwrap();
      } else {
        await createPhysician(payload as any).unwrap();
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
    if (confirm('Delete this physician?')) {
      try { await deletePhysician(id).unwrap(); } catch (err: any) {
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
        <Title order={3}>Physicians</Title>
        <Group>
          <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            Add Physician
          </Button>
        </Group>
      </Group>
      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Physician' : 'Add Physician'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
        <Stack gap="sm">
          <Group grow>
            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Dr. Full Name" />
            <TextInput label="Name (Amharic)" value={nameAm} onChange={(e) => setNameAm(e.target.value)} placeholder="ዶ/ር ሙሉ ስም" />
          </Group>
          <Group grow>
            <TextInput label="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required placeholder="e.g. Cardiology" />
            <TextInput label="Specialty (Amharic)" value={specialtyAm} onChange={(e) => setSpecialtyAm(e.target.value)} placeholder="የልብ ህክምና" />
          </Group>
          <Group grow>
            <NumberInput label="Rating" value={rating} onChange={(v) => setRating(Number(v) || 0)} min={0} max={5} step={0.1} />
            <NumberInput label="Reviews" value={reviews} onChange={(v) => setReviews(Number(v) || 0)} min={0} />
          </Group>
          <TextInput label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 15+ years" />
          <FileUpload value={image} onChange={setImage} label="Upload Image" />
          <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short biography..." rows={3} />
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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load physicians.</Alert>}
      {physicians && physicians.length === 0 && <Center py={64}><Text c="gray.4">No physicians yet.</Text></Center>}
      {physicians && physicians.length > 0 && (
        <Table.ScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Specialty</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Available</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {physicians.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>
                    {item.image ? <img src={item.image.startsWith('/images/') ? item.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003'}/${item.image}`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /> : '—'}
                  </Table.Td>
                  <Table.Td><Text lineClamp={1} maw={180}>{item.name}</Text></Table.Td>
                  <Table.Td><Text lineClamp={1} maw={150}>{item.specialty}</Text></Table.Td>
                  <Table.Td>
                    {item.rating > 0 ? <Badge variant="light" color="yellow" size="sm">{item.rating}</Badge> : '—'}
                  </Table.Td>
                  <Table.Td>
                    {item.available ? <Badge variant="light" color="green" size="sm">Available</Badge> : <Badge variant="light" color="gray" size="sm">Unavailable</Badge>}
                  </Table.Td>
                  <Table.Td><Badge color={item.isActive ? 'green' : 'gray'} size="sm">{item.isActive ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon variant="subtle" color="blue" size="sm" component={Link} href={`/about-us/physicians/${item.id}`} target="_blank"><Eye size={14} /></ActionIcon>
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
