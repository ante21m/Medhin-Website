"use client";

import { useGetPhysiciansQuery } from "@/app/store/api/physicianApi";
import type { Physician as ApiPhysician } from "@/app/store/api/physicianApi";
import type { Physician } from "@/app/data/about.config";
import { physicians as fallbackPhysicians } from "@/app/data/about.config";

function mapPhysician(p: ApiPhysician): Physician {
  return {
    id: String(p.id),
    name: p.name,
    name_am: p.nameAm,
    specialty: p.specialty,
    specialty_am: p.specialtyAm,
    image: p.image || "",
    rating: Number(p.rating) || 0,
    reviews: Number(p.reviews) || 0,
    available: p.available,
    availabilityText: p.availabilityText,
    bio: p.bio,
    experience: p.experience,
    languages: p.languages || [],
    education: p.education || [],
    certifications: p.certifications || [],
    specialties: p.specialtiesList || [],
    procedures: p.procedures || [],
    experience_years: p.experienceYears,
    patients_count: p.patientsCount,
  };
}

export function usePhysicians() {
  const { data, isLoading, error } = useGetPhysiciansQuery();
  const apiPhysicians = (data || []).map(mapPhysician);
  const physicians = apiPhysicians.length > 0 ? apiPhysicians : fallbackPhysicians;
  return { physicians, isLoading, error };
}

export function usePhysicianById(id: string) {
  const { physicians, isLoading, error } = usePhysicians();
  const physician = physicians.find((p) => p.id === id);
  return { physician, isLoading, error };
}
