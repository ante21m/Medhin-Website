import { baseApi } from './baseApi';

export interface EntityCount {
  total: number;
  active: number;
  inactive: number;
}

export interface DashboardStats {
  counts: Record<string, EntityCount>;
  totals: {
    total: number;
    active: number;
    inactive: number;
  };
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
