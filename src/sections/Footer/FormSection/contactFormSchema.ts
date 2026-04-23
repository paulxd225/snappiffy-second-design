import { isValidPhoneNumber } from "libphonenumber-js"
import { z } from "zod"

import type { Messages } from "@/i18n/en.messages"

import { PHONE_COUNTRIES } from "./phoneCountries"

export type FooterValidation = Messages["footer"]["validation"]

export type ContactFormValues = {
  fullName: string
  email: string
  phone: string
  phoneCountryIdx: number
  company: string
  msg: string
}

const countryMax = PHONE_COUNTRIES.length - 1

export function createContactFormSchema(v: FooterValidation) {
  return z
    .object({
      fullName: z
        .string()
        .refine((s) => s.trim().length >= 1, { error: v.nameRequired })
        .refine((s) => s.trim().length <= 120, { error: v.nameMax }),
      email: z
        .string()
        .trim()
        .pipe(z.email({ error: v.emailInvalid })),
      phone: z.string().regex(/^\d*$/, { error: v.phoneDigitsOnly }),
      phoneCountryIdx: z
        .number({ error: v.phoneCountryInvalid })
        .int({ error: v.phoneCountryInvalid })
        .min(0, { error: v.phoneCountryInvalid })
        .max(countryMax, { error: v.phoneCountryInvalid }),
      company: z
        .string()
        .max(150, { error: v.companyMax })
        .refine((s) => s.length === 0 || /\S/.test(s), {
          error: v.companyWhitespaceOnly,
        }),
      msg: z
        .string()
        .max(3000, { error: v.messageMax })
        .refine((s) => s.trim().length >= 1, { error: v.messageRequired }),
    })
    .superRefine((data, ctx) => {
      const entry = PHONE_COUNTRIES[data.phoneCountryIdx] ?? PHONE_COUNTRIES[0]
      const digits = data.phone

      if (digits.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: v.phoneRequired,
          path: ["phone"],
        })
        return
      }

      if (!isValidPhoneNumber(digits, entry.region)) {
        ctx.addIssue({
          code: "custom",
          message: v.phoneInvalidForCountry,
          path: ["phone"],
        })
      }
    })
}
