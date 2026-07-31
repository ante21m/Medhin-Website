'use client';

import { useState, useRef } from 'react';
import { Group, Text, Button, Box, Loader, ActionIcon, Alert } from '@mantine/core';
import { Upload, X, File, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

interface FileUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  accept?: string;
  label?: string;
}

export function FileUpload({ value, onChange, accept = 'image/*,.pdf,.doc,.docx', label = 'Upload File' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrMsg('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setErrMsg(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const isImage = value && /\.(png|jpg|jpeg|gif|svg|webp)/i.test(value);

  return (
    <Box>
      {value ? (
        <Box
          style={{
            border: '1px solid #dee2e6',
            borderRadius: 8,
            padding: 12,
            position: 'relative',
          }}
        >
          <Group gap="sm">
            {isImage ? (
              <img
                src={`${API_URL}/${value}`}
                alt="preview"
                style={{ width: 60, height: 60, borderRadius: 6, objectFit: 'cover' }}
              />
            ) : (
              <Box
                style={{
                  width: 60, height: 60, borderRadius: 6,
                  background: '#f3f4f6', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <File size={24} color="#6b7280" />
              </Box>
            )}
            <Box style={{ flex: 1 }}>
              <Text size="sm">{value.split('/').pop()}</Text>
              <Text size="xs" c="gray.5" truncate>{value}</Text>
            </Box>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => onChange(undefined)}
            >
              <X size={14} />
            </ActionIcon>
          </Group>
        </Box>
      ) : (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <Button
            variant="outline"
            fullWidth
            onClick={() => inputRef.current?.click()}
            leftSection={uploading ? <Loader size={14} /> : <Upload size={14} />}
            disabled={uploading}
            styles={{ root: { borderStyle: 'dashed' } }}
          >
            {uploading ? 'Uploading...' : label}
          </Button>
          {errMsg && (
            <Alert mt="xs" color="red" variant="light" p="xs" icon={<AlertCircle size={14} />}>
              <Text size="xs">{errMsg}</Text>
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}
