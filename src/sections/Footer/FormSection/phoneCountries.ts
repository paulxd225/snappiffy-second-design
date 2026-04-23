import type { CountryCode } from "libphonenumber-js"

export const PHONE_COUNTRIES = [
  { dial: "+1", flag: "🇺🇸", label: "United States", region: "US" as const },
  { dial: "+1", flag: "🇨🇦", label: "Canada", region: "CA" as const },
  { dial: "+44", flag: "🇬🇧", label: "United Kingdom", region: "GB" as const },
  { dial: "+34", flag: "🇪🇸", label: "Spain", region: "ES" as const },
  { dial: "+52", flag: "🇲🇽", label: "Mexico", region: "MX" as const },
  { dial: "+57", flag: "🇨🇴", label: "Colombia", region: "CO" as const },
  { dial: "+593", flag: "🇪🇨", label: "Ecuador", region: "EC" as const },
  { dial: "+58", flag: "🇻🇪", label: "Venezuela", region: "VE" as const },
  { dial: "+54", flag: "🇦🇷", label: "Argentina", region: "AR" as const },
  { dial: "+55", flag: "🇧🇷", label: "Brazil", region: "BR" as const },
  { dial: "+49", flag: "🇩🇪", label: "Germany", region: "DE" as const },
  { dial: "+33", flag: "🇫🇷", label: "France", region: "FR" as const },
  { dial: "+39", flag: "🇮🇹", label: "Italy", region: "IT" as const },
  { dial: "+351", flag: "🇵🇹", label: "Portugal", region: "PT" as const },
  { dial: "+61", flag: "🇦🇺", label: "Australia", region: "AU" as const },
  { dial: "+81", flag: "🇯🇵", label: "Japan", region: "JP" as const },
  { dial: "+86", flag: "🇨🇳", label: "China", region: "CN" as const },
  { dial: "+91", flag: "🇮🇳", label: "India", region: "IN" as const },
] as const satisfies ReadonlyArray<{
  dial: string
  flag: string
  label: string
  region: CountryCode
}>
