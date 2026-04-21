export type Locale =
	| "en"
	| "es-ES"
	| "es-419"
	| "zh"
	| "pt"
	| "fr"
	| "ja"
	| "ko";

export const LOCALE_STORAGE_KEY = "snappiffy-locale";

export const LOCALE_HTML_LANG: Record<Locale, string> = {
	en: "en",
	"es-ES": "es-ES",
	"es-419": "es-419",
	zh: "zh-Hans",
	pt: "pt-BR",
	fr: "fr",
	ja: "ja",
	ko: "ko",
};
