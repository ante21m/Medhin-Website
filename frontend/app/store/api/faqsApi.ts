import { baseApi } from './baseApi';

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateFaqRequest {
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<Faq[], void>({
      query: () => '/faqs',
      providesTags: ['Faq'],
    }),
    getFaqById: builder.query<Faq, number>({
      query: (id) => `/faqs/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Faq', id }],
    }),
    createFaq: builder.mutation<Faq, CreateFaqRequest>({
      query: (body) => ({
        url: '/faqs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Faq'],
    }),
    updateFaq: builder.mutation<Faq, { id: number; data: Partial<CreateFaqRequest> & { isActive?: boolean } }>({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Faq', { type: 'Faq', id }],
    }),
    deleteFaq: builder.mutation<void, number>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Faq'],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
