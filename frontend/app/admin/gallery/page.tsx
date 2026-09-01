'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetGalleryQuery, useCreateGalleryMutation, useUpdateGalleryMutation, useDeleteGalleryMutation,
  useSeedGalleryMutation,
} from '@/app/store/api/galleryApi';
import type { GalleryItem } from '@/app/store/api/galleryApi';
import {
  Container, Title, Text, Button, Group, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, Collapse, Image, SimpleGrid,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check, Database } from 'lucide-react';
import { FileUpload } from '@/app/components/admin/FileUpload';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

function resolveAsset(path: string) {
  if (path.startsWith('http') || path.startsWith('/images/')) return path;
  return `${API_URL}/${path}`;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetGalleryQuery();
  const [createItem, { isLoading: isCreating }] = useCreateGalleryMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateGalleryMutation();
  const [deleteItem] = useDeleteGalleryMutation();
  const [seedItems, { isLoading: isSeeding }] = useSeedGalleryMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setTitle(''); setTitleAm(''); setDescription(''); setDescriptionAm(''); setImage(undefined); setFormError(null);
  };

  const startEdit = (item: GalleryItem) => {
    setEditId(item.id); setTitle(item.title); setTitleAm(item.titleAm || ''); setDescription(item.description || ''); setDescriptionAm(item.descriptionAm || ''); setImage(item.image || undefined); setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!image) { setFormError('Image is required'); return; }
    try {
      const payload = { title: title.trim() || undefined, titleAm: titleAm.trim() || undefined, description: description.trim() || undefined, descriptionAm: descriptionAm.trim() || undefined, image };
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
    if (confirm('Delete this gallery item?')) {
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
    if (!confirm('Seed 17 gallery items from config into the database?')) return;
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
        <Title order={3}>Gallery</Title>
        <Group>
          <Button leftSection={<Database size={14} />} size="sm" variant="outline" onClick={handleSeed} loading={isSeeding}>
            Seed
          </Button>
          <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            Add Image
          </Button>
        </Group>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit Gallery Image' : 'Add Gallery Image'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {/* English */}
              <Paper withBorder radius="md" p="sm" style={{ background: '#fbfbfd' }}>
                <Text size="xs" fw={700} mb="xs" tt="uppercase" c="gray.6" style={{ letterSpacing: '0.06em' }}>English</Text>
                <Stack gap="sm">
                  <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title (optional)" />
                  <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={5} />
                </Stack>
              </Paper>

              {/* Amharic */}
              <Paper withBorder radius="md" p="sm" style={{ background: '#fbfbfd' }}>
                <Text size="xs" fw={700} mb="xs" tt="uppercase" c="gray.6" style={{ letterSpacing: '0.06em' }}>አማርኛ (Amharic)</Text>
                <Stack gap="sm">
                  <TextInput label="ርዕስ (Title)" value={titleAm} onChange={(e) => setTitleAm(e.target.value)} placeholder="የምስል ርዕስ (አማራጭ)" />
                  <Textarea label="መግለጫ (Description)" value={descriptionAm} onChange={(e) => setDescriptionAm(e.target.value)} placeholder="መግለጫ (አማራጭ)" rows={5} />
                </Stack>
              </Paper>
            </SimpleGrid>

            {/* Image upload */}
            <div>
              <Text size="xs" fw={600} mb={6}>Image</Text>
              <FileUpload value={image} onChange={setImage} accept="image/*" label="Upload Image" />
            </div>

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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load gallery.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No gallery items yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>
                    {item.image
                      ? <Image src={resolveAsset(item.image)} alt={item.title} width={60} height={44} radius="sm" fit="cover" />
                      : '—'}
                  </Table.Td>
                  <Table.Td><Text lineClamp={1} maw={200}>{item.title}{item.titleAm ? ` · ${item.titleAm}` : ''}</Text></Table.Td>
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
