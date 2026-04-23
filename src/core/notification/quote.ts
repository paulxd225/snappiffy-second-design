import { PHONE_COUNTRIES } from "@/sections/Footer/FormSection/phoneCountries"

export interface ISentQuoteRequestBody {
  name: string
  email: string
  /** Prefijo del país (p. ej. +593) + número del input, p. ej. +59321234567 */
  phone: string
  /** ISO 3166-1 alpha-2, p. ej. EC */
  phoneRegion: string
  company: string
  description: string
}

export interface ISentQuoteRequestResponse {
  message: string
}

type FormQuoteInput = {
  fullName: string
  email: string
  phone: string
  phoneCountryIdx: number
  company: string
  msg: string
}

export function toSentQuoteRequestBody(
  value: FormQuoteInput
): ISentQuoteRequestBody {
  const entry = PHONE_COUNTRIES[value.phoneCountryIdx] ?? PHONE_COUNTRIES[0]
  const localDigits = value.phone.replace(/\D/g, "")
  /** Código de país (prefijo) del desplegable + solo dígitos del input */
  const phone = `${entry.dial}${localDigits}`

  return {
    name: value.fullName.trim(),
    email: value.email.trim(),
    phone,
    phoneRegion: entry.region,
    company: value.company.trim(),
    description: value.msg.trim(),
  }
}
