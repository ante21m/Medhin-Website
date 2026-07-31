import { baseApi } from './baseApi';

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  group: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSiteSettingRequest {
  key: string;
  value: string;
  group?: string;
}

export const siteSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiteSettings: builder.query<SiteSetting[], void>({
      query: () => '/site-settings',
      providesTags: ['SiteSetting'],
    }),
    getSiteSettingsByGroup: builder.query<SiteSetting[], string>({
      query: (group) => `/site-settings/group/${group}`,
      providesTags: ['SiteSetting'],
    }),
    getSiteSettingByKey: builder.query<SiteSetting, string>({
      query: (key) => `/site-settings/key/${key}`,
      providesTags: ['SiteSetting'],
    }),
    getBatchSiteSettings: builder.query<Record<string, string>, string>({
      query: (keys) => `/site-settings/batch?keys=${keys}`,
      providesTags: ['SiteSetting'],
    }),
    createSiteSetting: builder.mutation<SiteSetting, CreateSiteSettingRequest>({
      query: (body) => ({
        url: '/site-settings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SiteSetting'],
    }),
    updateSiteSetting: builder.mutation<SiteSetting, { key: string; data: Partial<CreateSiteSettingRequest> & { isActive?: boolean } }>({
      query: ({ key, data }) => ({
        url: `/site-settings/${key}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SiteSetting'],
    }),
    deleteSiteSetting: builder.mutation<void, string>({
      query: (key) => ({
        url: `/site-settings/${key}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SiteSetting'],
    }),
  }),
});

export const {
  useGetSiteSettingsQuery,
  useGetSiteSettingsByGroupQuery,
  useGetSiteSettingByKeyQuery,
  useGetBatchSiteSettingsQuery,
  useCreateSiteSettingMutation,
  useUpdateSiteSettingMutation,
  useDeleteSiteSettingMutation,
} = siteSettingsApi;
