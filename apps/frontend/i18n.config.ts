import type { Locale } from "@escapavelo/shared-types";

export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en"] as Locale[],
} as const;