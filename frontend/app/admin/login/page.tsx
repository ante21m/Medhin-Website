'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '@/app/store/api/authApi';
import {
  Box, Container, Title, Text, TextInput, PasswordInput, Button, Stack, Alert, Paper, Group, Anchor,
} from '@mantine/core';
import { LogIn, UserPlus, AlertCircle, Info } from 'lucide-react';

function getErrorMessage(err: unknown): string {
  const anyErr = err as Record<string, unknown> | undefined;
  if (anyErr?.data && typeof anyErr.data === 'object') {
    const data = anyErr.data as Record<string, unknown>;
    if (Array.isArray(data.message)) return (data.message as string[]).join('. ');
    if (typeof data.message === 'string') return data.message;
  }
  return 'Something went wrong. Check the backend is running.';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldError, setFieldError] = useState('');

  const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();
  const [register, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();

  const error = isRegister ? registerError : loginError;
  const isLoading = isRegister ? isRegistering : isLoggingIn;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError('');

    if (username.length < 3) {
      setFieldError('Username must be at least 3 characters');
      return;
    }
    if (password.length < 6) {
      setFieldError('Password must be at least 6 characters');
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setFieldError('Passwords do not match');
      return;
    }

    try {
      if (isRegister) {
        await register({ username, password }).unwrap();
      } else {
        await login({ username, password }).unwrap();
      }
      router.push('/admin');
    } catch {
      /* error handled below */
    }
  };

  const errorMessage = fieldError || getErrorMessage(error);

  return (
    <Box mih="100vh" style={{ background: '#f8fafc' }}>
      <Container size="xs" py={120}>
        <Paper withBorder shadow="md" p="xl" radius="lg">
          <Stack align="center" gap="lg">
            <Box style={{ width: 56, height: 56, borderRadius: 16, background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isRegister ? <UserPlus size={24} color="#fff" /> : <LogIn size={24} color="#fff" />}
            </Box>
            <Title order={2} fw={700}>{isRegister ? 'Create Account' : 'Admin Login'}</Title>
          </Stack>

          {errorMessage && (
            <Alert icon={<AlertCircle size={16} />} color="red" variant="light" mt="md">
              {errorMessage}
            </Alert>
          )}

          <Alert icon={<Info size={16} />} color="blue" variant="light" mt="md">
            Username: min 3 chars &middot; Password: min 6 chars
          </Alert>

          <form onSubmit={handleSubmit}>
            <Stack gap="sm" mt="lg">
              <TextInput
                label="Username"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegister && (
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              <Button type="submit" fullWidth size="md" mt="sm" loading={isLoading}>
                {isRegister ? 'Register & Sign In' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Group justify="center" mt="md">
            <Anchor size="sm" component="button" onClick={() => { setIsRegister(!isRegister); setFieldError(''); }}>
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </Anchor>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
