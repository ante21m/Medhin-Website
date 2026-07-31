"use client";

import { useLocale } from "@/app/locale-provider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
      className="lang-switcher"
    >
      <option value="en">EN</option>
      <option value="am">AM</option>
    </select>
  );
}
