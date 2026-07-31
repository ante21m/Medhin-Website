"use client";

import { useLocale } from "@/app/locale-provider";

interface RatingProps {
  value: number;        // 4.9
  reviews: number;      // 34
}

export default function Rating({ value, reviews }: RatingProps) {
  const { t } = useLocale();

  return (
    <div
      className="flex items-center gap-2 text-sm text-gray-600"
      role="img"
      aria-label={`${t("ratings.label")} ${value} ${t("ratings.outOf")}, ${reviews} ${t("ratings.reviews")}`}
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      {/* ⭐ Visual stars */}
      <span aria-hidden="true" className="text-yellow-500">
        ★★★★★
      </span>

      {/* Text (SEO + Screen Readers) */}
      <span>
        <strong itemProp="ratingValue">{value}</strong>{" "}
        {t("ratings.outOf")} ·{" "}
        <span itemProp="reviewCount">
          {reviews}
        </span>{" "}
        {t("ratings.reviews")}
      </span>

      {/* Schema meta */}
      <meta itemProp="bestRating" content="5" />
    </div>
  );
}
