"use client";

import { useGetSiteSettingsByGroupQuery } from "@/app/store/api/siteSettingsApi";
import { fallbackSiteSettings } from "@/app/data/site-fallbacks";

interface SiteSettingsMap {
  [key: string]: string;
}

export function useSiteSettings(group: string) {
  const { data, isLoading, error } = useGetSiteSettingsByGroupQuery(group);

  const apiSettings: SiteSettingsMap = {};
  if (data) {
    for (const item of data) {
      apiSettings[item.key] = item.value;
    }
  }

  const hasApiData = Object.keys(apiSettings).length > 0;

  const settings: SiteSettingsMap = hasApiData ? apiSettings : fallbackSiteSettings;

  return { settings, isLoading, error, isFromApi: hasApiData };
}

export function parseJsonSetting<T>(value: string | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
