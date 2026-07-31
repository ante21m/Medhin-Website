import { baseApi } from './baseApi';

export interface Report {
  id: number;
  title: string;
  description?: string;
  file?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateReportRequest {
  title: string;
  description?: string;
  file?: string;
}

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<Report[], void>({
      query: () => '/reports',
      providesTags: ['Report'],
    }),
    getReportById: builder.query<Report, number>({
      query: (id) => `/reports/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Report', id }],
    }),
    createReport: builder.mutation<Report, CreateReportRequest>({
      query: (body) => ({ url: '/reports', method: 'POST', body }),
      invalidatesTags: ['Report'],
    }),
    updateReport: builder.mutation<Report, { id: number; data: Partial<CreateReportRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({ url: `/reports/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => ['Report', { type: 'Report', id }],
    }),
    deleteReport: builder.mutation<void, number>({
      query: (id) => ({ url: `/reports/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const { useGetReportsQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation } = reportApi;
