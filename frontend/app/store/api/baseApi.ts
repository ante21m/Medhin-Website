import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['News', 'Department', 'Vacancy', 'Gallery', 'Report', 'Social', 'Auth', 'Physician', 'Service', 'Dashboard', 'SiteSetting', 'Leadership', 'Faq', 'Appointment'],
  endpoints: () => ({}),
});
