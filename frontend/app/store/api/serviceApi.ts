import { baseApi } from './baseApi';

export interface ServiceItem {
  id: number;
  name: string;
  icon?: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateServiceRequest {
  name: string;
  icon?: string;
  description?: string;
  image?: string;
  order?: number;
}

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<ServiceItem[], void>({
      query: () => '/services',
      providesTags: ['Service'],
    }),
    getServiceById: builder.query<ServiceItem, number>({
      query: (id) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Service', id }],
    }),
    createService: builder.mutation<ServiceItem, CreateServiceRequest>({
      query: (body) => ({ url: '/services', method: 'POST', body }),
      invalidatesTags: ['Service'],
    }),
    updateService: builder.mutation<ServiceItem, { id: number; data: Partial<CreateServiceRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({ url: `/services/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => ['Service', { type: 'Service', id }],
    }),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({ url: `/services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Service'],
    }),
    seedServices: builder.mutation<ServiceItem[], void>({
      query: () => ({ url: '/services/seed', method: 'POST' }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useSeedServicesMutation } = serviceApi;
