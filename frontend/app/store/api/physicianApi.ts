import { baseApi } from './baseApi';

export interface Physician {
  id: number;
  name: string;
  nameAm?: string;
  specialty: string;
  specialtyAm?: string;
  image?: string;
  rating: number;
  reviews: number;
  available: boolean;
  availabilityText?: string;
  bio?: string;
  bioAm?: string;
  experience?: string;
  languages?: string[];
  education?: string[];
  certifications?: string[];
  specialtiesList?: string[];
  procedures?: string[];
  experienceYears?: number;
  patientsCount?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreatePhysicianRequest {
  name: string;
  nameAm?: string;
  specialty: string;
  specialtyAm?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  available?: boolean;
  availabilityText?: string;
  bio?: string;
  bioAm?: string;
  experience?: string;
  languages?: string[];
  education?: string[];
  certifications?: string[];
  specialtiesList?: string[];
  procedures?: string[];
  experienceYears?: number;
  patientsCount?: string;
}

export const physicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhysicians: builder.query<Physician[], void>({
      query: () => '/physicians',
      providesTags: ['Physician'],
    }),
    getPhysicianById: builder.query<Physician, number>({
      query: (id) => `/physicians/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Physician', id }],
    }),
    createPhysician: builder.mutation<Physician, CreatePhysicianRequest>({
      query: (body) => ({
        url: '/physicians',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Physician'],
    }),
    updatePhysician: builder.mutation<Physician, { id: number; data: Partial<CreatePhysicianRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({
        url: `/physicians/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Physician', { type: 'Physician', id }],
    }),
    deletePhysician: builder.mutation<void, number>({
      query: (id) => ({
        url: `/physicians/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Physician'],
    }),
    seedPhysicians: builder.mutation<Physician[], void>({
      query: () => ({
        url: '/physicians/seed',
        method: 'POST',
      }),
      invalidatesTags: ['Physician'],
    }),
  }),
});

export const { useGetPhysiciansQuery, useGetPhysicianByIdQuery, useCreatePhysicianMutation, useUpdatePhysicianMutation, useDeletePhysicianMutation, useSeedPhysiciansMutation } = physicianApi;
