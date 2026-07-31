'use client';

import { useState, useEffect } from 'react';
import { Stack, Group, TextInput, Textarea, NumberInput, Button, Alert } from '@mantine/core';
import { FileUpload } from './FileUpload';

export interface SmartFormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'file';
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  span?: 6 | 12;
  accept?: string;
}

interface SmartFormProps {
  fields: SmartFormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

function renderField(
  field: SmartFormField,
  value: any,
  onChange: (val: any) => void,
) {
  switch (field.type) {
    case 'textarea':
      return (
        <Textarea
          label={field.label}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
        />
      );
    case 'number':
      return (
        <NumberInput
          label={field.label}
          value={value ?? 0}
          onChange={(v) => onChange(v)}
          required={field.required}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      );
    case 'file':
      return (
        <FileUpload
          value={value}
          onChange={(v) => onChange(v ?? '')}
          accept={field.accept}
          label={field.placeholder || field.label}
        />
      );
    default:
      return (
        <TextInput
          label={field.label}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
        />
      );
  }
}

export function SmartForm({ fields, initialValues, onSubmit, loading, submitLabel = 'Save' }: SmartFormProps) {
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialValues) {
      setValues({ ...initialValues });
    } else {
      const defaults: Record<string, any> = {};
      fields.forEach((f) => {
        defaults[f.name] = f.type === 'number' ? 0 : '';
      });
      setValues(defaults);
    }
  }, [initialValues]);

  const setValue = (name: string) => (v: any) => {
    setValues((prev) => ({ ...prev, [name]: v }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload: Record<string, any> = {};
    fields.forEach((f) => {
      const v = values[f.name];
      if (f.type === 'number') {
        payload[f.name] = v || undefined;
      } else if (typeof v === 'string' && !f.required && v === '') {
        payload[f.name] = undefined;
      } else {
        payload[f.name] = v;
      }
    });
    try {
      await onSubmit(payload);
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || err?.toString?.() || 'Request failed';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const rows: SmartFormField[][] = [];
  let currentRow: SmartFormField[] = [];
  fields.forEach((f) => {
    if (f.span === 6) {
      currentRow.push(f);
      if (currentRow.length === 2) {
        rows.push(currentRow);
        currentRow = [];
      }
    } else {
      if (currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
      }
      rows.push([f]);
    }
  });
  if (currentRow.length > 0) rows.push(currentRow);

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="sm">
        {rows.map((row, i) => {
          if (row.length === 2) {
            return (
              <Group key={i} grow>
                {row.map((f) => (
                  <div key={f.name}>
                    {renderField(f, values[f.name], setValue(f.name))}
                  </div>
                ))}
              </Group>
            );
          }
          return (
            <div key={row[0].name}>
              {renderField(row[0], values[row[0].name], setValue(row[0].name))}
            </div>
          );
        })}
        {error && <Alert color="red" variant="light">{error}</Alert>}
        <Button type="submit" fullWidth mt="sm" loading={loading}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}
