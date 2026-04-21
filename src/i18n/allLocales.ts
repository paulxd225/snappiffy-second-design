import type { Locale } from "./types";
import type { Messages } from "./en.messages";
import { enMessages } from "./en.messages";
import { esESMessages } from "./esES.messages";
import { es419Messages } from "./es419.messages";
import { zhMessages } from "./zh.messages";
import { ptMessages } from "./pt.messages";
import { frMessages } from "./fr.messages";
import { jaMessages } from "./ja.messages";
import { koMessages } from "./ko.messages";

export const allMessages: Record<Locale, Messages> = {
	en: enMessages,
	"es-ES": esESMessages,
	"es-419": es419Messages,
	zh: zhMessages,
	pt: ptMessages,
	fr: frMessages,
	ja: jaMessages,
	ko: koMessages,
};
