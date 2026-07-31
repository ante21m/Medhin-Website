"use client";

import Image from "next/image";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import { physicians } from "@/app/data/about.config";

export default function ExperiencedStaffs() {
  const { t, locale } = useLocale();

  const displayDoctors = physicians.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-2">
          {t("staff.title")}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t("staff.subtitle")}
        </p>

        {/* Doctors */}
        <div className="grid grid-cols-4 gap-8">
          {displayDoctors.map((doc) => {
            const name = locale === "am" ? doc.name_am || doc.name : doc.name;
            const specialty = locale === "am" ? doc.specialty_am || doc.specialty : doc.specialty;
            return (
            <div key={doc.id} className="group text-center">

              {/* Image */}
              <div className="relative h-[320px] rounded-2xl overflow-hidden">
                <Image
                  src={doc.image + imgVer}
                  alt={name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Info */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {name}
              </h3>

              <p className="text-sm text-gray-500">
                {specialty}
              </p>

              <div className="mt-2" style={{ fontSize: 13, color: "#f59e0b", letterSpacing: 2 }}>
                ★★★★★ <span style={{ color: "#111827", letterSpacing: 0 }}>{doc.rating.toFixed(1)}</span>
              </div>

            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
