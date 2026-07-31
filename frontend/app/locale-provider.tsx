"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

type Locale = "en" | "am";
type Translations = Record<string, any>;

interface LocaleContextProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextProps | null>(null);

const fallbackT = (key: string) => key;

const translationCache: Record<Locale, Translations> = {
  en: {} as Translations,
  am: {} as Translations,
};
const loadedLocales: Record<Locale, boolean> = { en: false, am: false };

async function loadTranslations(locale: Locale): Promise<Translations> {
  if (loadedLocales[locale]) return translationCache[locale];
  try {
    const mod = await import(
      /* webpackChunkName: "i18n-[request]" */ `./translations/${locale}.json`
    );
    translationCache[locale] = mod.default || mod;
    loadedLocales[locale] = true;
  } catch {
    console.warn(`Failed to load translations for "${locale}"`);
  }
  return translationCache[locale];
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [translations, setTranslations] = useState<Translations>(
    translationCache.en
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    const initial = saved === "am" || saved === "en" ? saved : "en";
    setLocaleState(initial);
    loadTranslations(initial).then((t) => {
      setTranslations(t);
      setReady(true);
    });
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
    loadTranslations(l).then(setTranslations);
  }, []);

  const t = useMemo(() => {
    return (key: string): string => {
      const value = key
        .split(".")
        .reduce<any>((obj, k) => obj?.[k], translations);
      return value ?? key;
    };
  }, [translations]);

  const ctx = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  if (!ready) {
    return (
      <LocaleContext.Provider value={{ locale, setLocale, t: fallbackT }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={ctx}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return ctx;
}
