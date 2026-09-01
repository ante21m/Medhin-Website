'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetNewsQuery, useCreateNewsMutation, useUpdateNewsMutation, useDeleteNewsMutation,
} from '@/app/store/api/newsApi';
import type { NewsItem } from '@/app/store/api/newsApi';
import {
  Container, Title, Text, Button, Group, Badge, Loader, Center, Alert, ActionIcon, Table,
  Stack, TextInput, Textarea, Paper, Collapse, Image, Divider, SimpleGrid,
} from '@mantine/core';
import { Plus, Trash2, Edit, AlertCircle, X, Check, Paperclip } from 'lucide-react';
import { FileUpload } from '@/app/components/admin/FileUpload';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

function resolveAsset(path?: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/images/')) return path;
  return `${API_URL}/${path}`;
}

export default function AdminNewsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/admin/login');
  }, [router]);

  const { data: items, isLoading, error } = useGetNewsQuery();
  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation();
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();
  const [deleteNews] = useDeleteNewsMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [content, setContent] = useState('');
  const [contentAm, setContentAm] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryAm, setSummaryAm] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [attachment, setAttachment] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editId !== null;

  const resetForm = () => {
    setEditId(null); setShowForm(false); setTitle(''); setTitleAm(''); setContent(''); setContentAm('');
    setSummary(''); setSummaryAm(''); setAuthor(''); setImage(undefined); setAttachment(undefined); setFormError(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditId(item.id);
    setTitle(item.title || ''); setTitleAm(item.titleAm || '');
    setContent(item.content || ''); setContentAm(item.contentAm || '');
    setSummary(item.summary || ''); setSummaryAm(item.summaryAm || '');
    setAuthor(item.author || ''); setImage(item.image || undefined); setAttachment(item.attachment || undefined);
    setFormError(null); setShowForm(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      const payload = {
        title: title.trim() || undefined, titleAm: titleAm.trim() || undefined,
        content: content.trim() || undefined, contentAm: contentAm.trim() || undefined,
        summary: summary.trim() || undefined, summaryAm: summaryAm.trim() || undefined,
        author: author.trim() || undefined, image: image || undefined, attachment: attachment || undefined,
      };
      if (isEditing) {
        await updateNews({ id: editId, data: payload as any }).unwrap();
      } else {
        await createNews(payload as any).unwrap();
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
    if (confirm('Delete this news article?')) {
      try { await deleteNews(id).unwrap(); } catch (err: any) {
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
        <Title order={3}>News</Title>
        <Button leftSection={<Plus size={14} />} size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          Add News
        </Button>
      </Group>

      <Collapse in={showForm || isEditing}>
        <Paper withBorder p="md" radius="md" mb="lg" style={{ borderColor: isEditing ? '#f59e0b' : '#e5e7eb' }}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">{isEditing ? 'Edit News Article' : 'Add News Article'}</Text>
            <Button variant="subtle" color="gray" size="xs" leftSection={<X size={14} />} onClick={resetForm}>Cancel</Button>
          </Group>
          <Stack gap="sm">
            <Group grow>
              <TextInput label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name (optional)" />
            </Group>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {/* English */}
              <Paper withBorder radius="md" p="sm" style={{ background: '#fbfbfd' }}>
                <Text size="xs" fw={700} mb="xs" tt="uppercase" c="gray.6" style={{ letterSpacing: '0.06em' }}>English</Text>
                <Stack gap="sm">
                  <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title (optional)" />
                  <TextInput label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief summary (optional)" />
                  <Textarea label="Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full article content... (optional)" rows={6} />
                </Stack>
              </Paper>

              {/* Amharic */}
              <Paper withBorder radius="md" p="sm" style={{ background: '#fbfbfd' }}>
                <Text size="xs" fw={700} mb="xs" tt="uppercase" c="gray.6" style={{ letterSpacing: '0.06em' }}>አማርኛ (Amharic)</Text>
                <Stack gap="sm">
                  <TextInput label="አርዕስት (Title)" value={titleAm} onChange={(e) => setTitleAm(e.target.value)} placeholder="የአርዕስት መስክ (አማራጭ)" />
                  <TextInput label="ማጠቃለያ (Summary)" value={summaryAm} onChange={(e) => setSummaryAm(e.target.value)} placeholder="አጭር ማጠቃለያ (አማራጭ)" />
                  <Textarea label="ይዘት (Content)" value={contentAm} onChange={(e) => setContentAm(e.target.value)} placeholder="ሙሉ ዜና ይዘት... (አማራጭ)" rows={6} />
                </Stack>
              </Paper>
            </SimpleGrid>

            <Divider label="Media" labelPosition="left" />
            <div>
              <Text size="xs" fw={600} mb={6}>Cover Image</Text>
              <FileUpload value={image} onChange={setImage} accept="image/*" label="Upload Image" />
            </div>
            <div>
              <Text size="xs" fw={600} mb={6}>Attachment</Text>
              <FileUpload value={attachment} onChange={setAttachment} accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" label="Upload Attachment" />
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
      {error && <Alert icon={<AlertCircle size={16} />} color="red" title="Failed">Could not load news.</Alert>}
      {items && items.length === 0 && <Center py={64}><Text c="gray.4">No news articles yet.</Text></Center>}
      {items && items.length > 0 && (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Attach.</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Status</Table.Th>
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
                      ? <Image src={resolveAsset(item.image)} alt="" width={44} height={30} radius="sm" fit="cover" />
                      : <Text c="gray.4">—</Text>}
                  </Table.Td>
                  <Table.Td><Text lineClamp={1} maw={200}>{item.title}{item.titleAm ? ` · ${item.titleAm}` : ''}</Text></Table.Td>
                  <Table.Td>
                    {item.attachment
                      ? <Group gap={4}><Paperclip size={13} color="var(--primary)" /><Text size="sm" truncate maw={120} component="a" href={resolveAsset(item.attachment)} target="_blank">{item.attachment.split('/').pop()}</Text></Group>
                      : '—'}
                  </Table.Td>
                  <Table.Td>{item.author || '—'}</Table.Td>
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
