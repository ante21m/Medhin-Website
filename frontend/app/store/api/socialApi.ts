import { baseApi } from './baseApi';

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  order: number;
}

export interface CreateSocialRequest {
  platform: string;
  url: string;
  icon?: string;
  order?: number;
}

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialLinks: builder.query<SocialLink[], void>({
      query: () => '/social',
      providesTags: ['Social'],
    }),
    createSocial: builder.mutation<SocialLink, CreateSocialRequest>({
      query: (body) => ({ url: '/social', method: 'POST', body }),
      invalidatesTags: ['Social'],
    }),
    updateSocial: builder.mutation<SocialLink, { id: number; data: Partial<CreateSocialRequest> }>({
      query: ({ id, data }) => ({ url: `/social/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => ['Social', { type: 'Social', id }],
    }),
    deleteSocial: builder.mutation<void, number>({
      query: (id) => ({ url: `/social/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Social'],
    }),
  }),
});

export const { useGetSocialLinksQuery, useCreateSocialMutation, useUpdateSocialMutation, useDeleteSocialMutation } = socialApi;
