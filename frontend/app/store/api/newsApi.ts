import { baseApi } from './baseApi';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  summary?: string;
  image?: string;
  author: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  summary?: string;
  image?: string;
  author?: string;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsItem[], void>({
      query: () => '/news',
      providesTags: ['News'],
    }),
    getNewsById: builder.query<NewsItem, number>({
      query: (id) => `/news/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'News', id }],
    }),
    createNews: builder.mutation<NewsItem, CreateNewsRequest>({
      query: (body) => ({
        url: '/news',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['News'],
    }),
    updateNews: builder.mutation<NewsItem, { id: number; data: Partial<CreateNewsRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['News', { type: 'News', id }],
    }),
    deleteNews: builder.mutation<void, number>({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

export const { useGetNewsQuery, useGetNewsByIdQuery, useCreateNewsMutation, useUpdateNewsMutation, useDeleteNewsMutation } = newsApi;
