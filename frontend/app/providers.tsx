'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  defaultRadius: 'md',
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </Provider>
  );
}