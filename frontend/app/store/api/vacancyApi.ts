import { baseApi } from './baseApi';

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  deadline?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateVacancyRequest {
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  deadline?: string;
}

export const vacancyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<Vacancy[], void>({
      query: () => '/vacancies',
      providesTags: ['Vacancy'],
    }),
    getVacancyById: builder.query<Vacancy, number>({
      query: (id) => `/vacancies/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Vacancy', id }],
    }),
    createVacancy: builder.mutation<Vacancy, CreateVacancyRequest>({
      query: (body) => ({
        url: '/vacancies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vacancy'],
    }),
    updateVacancy: builder.mutation<Vacancy, { id: number; data: Partial<CreateVacancyRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({
        url: `/vacancies/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Vacancy', { type: 'Vacancy', id }],
    }),
    deleteVacancy: builder.mutation<void, number>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacancy'],
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyByIdQuery, useCreateVacancyMutation, useUpdateVacancyMutation, useDeleteVacancyMutation } = vacancyApi;
