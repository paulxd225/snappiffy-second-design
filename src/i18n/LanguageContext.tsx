import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import type { Messages } from "./en.messages";
import { allMessages } from "./allLocales";
import type { Locale } from "./types";
import { LOCALE_HTML_LANG, LOCALE_STORAGE_KEY } from "./types";

type LanguageContextValue = {
	locale: Locale;
	setLocale: (next: Locale) => void;
	messages: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale | null {
	if (typeof window === "undefined") return null;
	const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
	if (!raw) return null;
	if (raw in allMessages) return raw as Locale;
	return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? "en");

	useEffect(() => {
		document.documentElement.lang = LOCALE_HTML_LANG[locale] ?? "en";
	}, [locale]);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		try {
			window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
		} catch {
			/* ignore */
		}
	}, []);

	const messages = useMemo(() => allMessages[locale] ?? allMessages.en, [locale]);

	const value = useMemo(
		() => ({ locale, setLocale, messages }),
		[locale, setLocale, messages],
	);

	return (
		<LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
	);
}

export function useLanguage(): LanguageContextValue {
	const ctx = useContext(LanguageContext);
	if (!ctx) {
		throw new Error("useLanguage must be used within LanguageProvider");
	}
	return ctx;
}
