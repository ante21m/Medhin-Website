import { baseApi } from './baseApi';

export interface Leadership {
  id: number;
  name: string;
  nameAm?: string;
  role: string;
  roleAm?: string;
  bio?: string;
  image?: string;
  experience?: string;
  certificates?: string[];
  awards?: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateLeadershipRequest {
  name: string;
  nameAm?: string;
  role: string;
  roleAm?: string;
  bio?: string;
  image?: string;
  experience?: string;
  certificates?: string[];
  awards?: string[];
  order?: number;
}

export const leadershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeadership: builder.query<Leadership[], void>({
      query: () => '/leadership',
      providesTags: ['Leadership'],
    }),
    getLeadershipById: builder.query<Leadership, number>({
      query: (id) => `/leadership/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Leadership', id }],
    }),
    createLeadership: builder.mutation<Leadership, CreateLeadershipRequest>({
      query: (body) => ({
        url: '/leadership',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Leadership'],
    }),
    updateLeadership: builder.mutation<Leadership, { id: number; data: Partial<CreateLeadershipRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({
        url: `/leadership/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Leadership', { type: 'Leadership', id }],
    }),
    deleteLeadership: builder.mutation<void, number>({
      query: (id) => ({
        url: `/leadership/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leadership'],
    }),
    seedLeadership: builder.mutation<Leadership[], void>({
      query: () => ({
        url: '/leadership/seed',
        method: 'POST',
      }),
      invalidatesTags: ['Leadership'],
    }),
  }),
});

export const {
  useGetLeadershipQuery,
  useGetLeadershipByIdQuery,
  useCreateLeadershipMutation,
  useUpdateLeadershipMutation,
  useDeleteLeadershipMutation,
  useSeedLeadershipMutation,
} = leadershipApi;
