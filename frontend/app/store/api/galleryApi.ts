import { baseApi } from './baseApi';

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  order: number;
  createdAt: string;
}

export interface CreateGalleryRequest {
  title: string;
  image: string;
  description?: string;
  order?: number;
}

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query<GalleryItem[], void>({
      query: () => '/gallery',
      providesTags: ['Gallery'],
    }),
    getGalleryById: builder.query<GalleryItem, number>({
      query: (id) => `/gallery/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Gallery', id }],
    }),
    createGallery: builder.mutation<GalleryItem, CreateGalleryRequest>({
      query: (body) => ({ url: '/gallery', method: 'POST', body }),
      invalidatesTags: ['Gallery'],
    }),
    updateGallery: builder.mutation<GalleryItem, { id: number; data: Partial<CreateGalleryRequest> }>({
      query: ({ id, data }) => ({ url: `/gallery/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => ['Gallery', { type: 'Gallery', id }],
    }),
    deleteGallery: builder.mutation<void, number>({
      query: (id) => ({ url: `/gallery/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Gallery'],
    }),
    seedGallery: builder.mutation<GalleryItem[], void>({
      query: () => ({ url: '/gallery/seed', method: 'POST' }),
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const { useGetGalleryQuery, useCreateGalleryMutation, useUpdateGalleryMutation, useDeleteGalleryMutation, useSeedGalleryMutation } = galleryApi;
