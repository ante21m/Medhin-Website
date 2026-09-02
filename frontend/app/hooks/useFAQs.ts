"use client";

import { useGetFaqsQuery } from "@/app/store/api/faqsApi";
import type { Faq } from "@/app/store/api/faqsApi";
import { fallbackFaqs, type FaqData } from "@/app/data/site-fallbacks";

function mapFaq(item: Faq): FaqData {
  return {
    id: item.id,
    question: item.question,
    questionAm: item.questionAm,
    answer: item.answer,
    answerAm: item.answerAm,
    category: item.category,
  };
}

export function useFAQs() {
  const { data, isLoading, error } = useGetFaqsQuery();
  const apiFaqs = (data || []).map(mapFaq);
  const faqs = apiFaqs.length > 0 ? apiFaqs : fallbackFaqs;
  return { faqs, isLoading, error, isFromApi: apiFaqs.length > 0 };
}
