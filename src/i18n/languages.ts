import type { Locale } from "./types";

export type LanguageOption = {
	locale: Locale;
	flag: string;
	code: string;
	label: string;
};

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
	{ locale: "en", flag: "🇬🇧", code: "EN", label: "English" },
	{ locale: "es-ES", flag: "🇪🇸", code: "ES", label: "Español (España)" },
	{ locale: "es-419", flag: "🇲🇽", code: "LAT", label: "Español (Latinoamérica)" },
	{ locale: "zh", flag: "🇨🇳", code: "ZH", label: "中文" },
	{ locale: "pt", flag: "🇧🇷", code: "PT", label: "Português" },
	{ locale: "fr", flag: "🇫🇷", code: "FR", label: "Français" },
	{ locale: "ja", flag: "🇯🇵", code: "JA", label: "日本語" },
	{ locale: "ko", flag: "🇰🇷", code: "KO", label: "한국어" },
] as const;

export function optionForLocale(locale: Locale): LanguageOption {
	return (
		LANGUAGE_OPTIONS.find((o) => o.locale === locale) ?? LANGUAGE_OPTIONS[0]
	);
}
