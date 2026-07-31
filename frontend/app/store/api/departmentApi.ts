import { baseApi } from './baseApi';

export interface Department {
  id: number;
  name: string;
  description?: string;
  image?: string;
  headOfDepartment?: string;
  email?: string;
  phone?: string;
  order: number;
  isActive: boolean;
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
  image?: string;
  headOfDepartment?: string;
  email?: string;
  phone?: string;
  order?: number;
}

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
      providesTags: ['Department'],
    }),
    getDepartmentById: builder.query<Department, number>({
      query: (id) => `/departments/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Department', id }],
    }),
    createDepartment: builder.mutation<Department, CreateDepartmentRequest>({
      query: (body) => ({ url: '/departments', method: 'POST', body }),
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation<Department, { id: number; data: Partial<CreateDepartmentRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({ url: `/departments/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => ['Department', { type: 'Department', id }],
    }),
    deleteDepartment: builder.mutation<void, number>({
      query: (id) => ({ url: `/departments/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Department'],
    }),
    seedDepartments: builder.mutation<Department[], void>({
      query: () => ({ url: '/departments/seed', method: 'POST' }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const { useGetDepartmentsQuery, useCreateDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation, useSeedDepartmentsMutation } = departmentApi;
