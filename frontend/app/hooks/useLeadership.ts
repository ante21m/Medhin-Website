"use client";

import { useGetLeadershipQuery } from "@/app/store/api/leadershipApi";
import type { Leadership } from "@/app/store/api/leadershipApi";
import { fallbackLeadership, type LeadershipData } from "@/app/data/site-fallbacks";

function mapLeadership(item: Leadership): LeadershipData {
  return {
    id: item.id,
    name: item.name,
    nameAm: item.nameAm,
    role: item.role,
    roleAm: item.roleAm,
    bio: item.bio,
    image: item.image,
    experience: item.experience,
    certificates: item.certificates || [],
    awards: item.awards || [],
  };
}

export function useLeadership() {
  const { data, isLoading, error } = useGetLeadershipQuery();
  const apiLeadership = (data || []).map(mapLeadership);
  const leadership = apiLeadership.length > 0 ? apiLeadership : fallbackLeadership;
  return { leadership, isLoading, error, isFromApi: apiLeadership.length > 0 };
}
