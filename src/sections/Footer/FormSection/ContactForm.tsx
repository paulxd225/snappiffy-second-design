import { useForm } from "@tanstack/react-form"
import { useMemo, useState } from "react"

import { Icons } from "@/components/Icons"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { toSentQuoteRequestBody } from "@/core/notification/quote"
import { useNotificationsMutations } from "@/data/mutations/notifications/notification.mutation"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

import { createContactFormSchema } from "./contactFormSchema"
import { PhoneField } from "./PhoneField"

/** Mínimo visible para overlay + estado "Thinking" del botón */
const SUBMIT_MIN_MS = 1000

const footerControlClass =
  "rounded-xl border-white/10 bg-white/[0.03] text-sm text-white shadow-none transition-[border-color,box-shadow] outline-none placeholder:text-white/35 focus-visible:border-[rgba(124,216,90,0.5)] focus-visible:ring-0 md:text-sm dark:bg-white/[0.03]"

const footerLabelClass =
  "text-[10px] font-mono uppercase tracking-[0.14em] text-white/50 group-data-[invalid=true]/field:text-red-300"

function showFieldInvalid(
  meta: { isTouched: boolean; isValid: boolean },
  submissionAttempts: number
) {
  return (meta.isTouched || submissionAttempts > 0) && !meta.isValid
}

export function ContactForm() {
  const { messages } = useLanguage()
  const f = messages.footer
  const [sent, setSent] = useState(false)
  const [submitBusy, setSubmitBusy] = useState(false)

  const { sentQuoteRequestMutation } = useNotificationsMutations()

  const globalLoader = submitBusy

  const formSchema = useMemo(
    () => createContactFormSchema(f.validation),
    [f.validation]
  )

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      phoneCountryIdx: 0,
      company: "",
      msg: "",
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitBusy(true)
      console.log('value', toSentQuoteRequestBody(value))
      const started = Date.now()
      try {
        await sentQuoteRequestMutation.mutateAsync(
          toSentQuoteRequestBody(value)
        )
        setSent(true)
      } catch {
        /* toast en la mutación */
      } finally {
        const remaining = SUBMIT_MIN_MS - (Date.now() - started)
        if (remaining > 0) {
          await new Promise((r) => setTimeout(r, remaining))
        }
        setSubmitBusy(false)
      }
    },
  })

  if (sent) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          borderRadius: 16,
          background: "rgba(124,216,90,.08)",
          border: "1px solid rgba(124,216,90,.3)",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
        <div style={{ fontSize: 20, color: "white", marginBottom: 6 }}>
          {f.thankYou}
        </div>
        <div style={{ color: "rgba(255,255,255,.7)" }}>{f.thankYouSub}</div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-5 flex flex-row flex-wrap items-center justify-between gap-3">
        <h3 style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
          {f.formTitle}
        </h3>
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,.5)",
            letterSpacing: "0.14em",
          }}
        >
          {f.fieldsCount}
        </div>
      </div>
      <form
        className="relative flex flex-col gap-3"
        aria-busy={globalLoader}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <form.Subscribe selector={(state) => state.submissionAttempts}>
          {(submissionAttempts) => (
            <div className="relative">
              <FieldGroup
                className={cn(
                  "gap-3",
                  globalLoader && "pointer-events-none opacity-50"
                )}
              >
                <div className="flex flex-row flex-wrap gap-3">
                  <form.Field name="fullName">
                    {(field) => {
                      const isInvalid = showFieldInvalid(
                        field.state.meta,
                        submissionAttempts
                      )
                      return (
                        <Field
                          className="min-w-[120px] flex-1 gap-1.5"
                          data-invalid={isInvalid || undefined}
                        >
                          <FieldLabel
                            className={cn(footerLabelClass)}
                            htmlFor={field.name}
                          >
                            {f.labelName}
                          </FieldLabel>
                          <Input
                            autoComplete="name"
                            className={cn(footerControlClass, "h-11 px-3.5")}
                            id={field.name}
                            name="fullName"
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {isInvalid ? (
                            <FieldError errors={field.state.meta.errors} />
                          ) : null}
                        </Field>
                      )
                    }}
                  </form.Field>
                  <form.Field name="email">
                    {(field) => {
                      const isInvalid = showFieldInvalid(
                        field.state.meta,
                        submissionAttempts
                      )
                      return (
                        <Field
                          className="min-w-[120px] flex-1 gap-1.5"
                          data-invalid={isInvalid || undefined}
                        >
                          <FieldLabel
                            className={cn(footerLabelClass)}
                            htmlFor={field.name}
                          >
                            {f.labelEmail}
                          </FieldLabel>
                          <Input
                            autoComplete="email"
                            className={cn(footerControlClass, "h-11 px-3.5")}
                            id={field.name}
                            name={field.name}
                            type="email"
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {isInvalid ? (
                            <FieldError errors={field.state.meta.errors} />
                          ) : null}
                        </Field>
                      )
                    }}
                  </form.Field>
                </div>

                <div className="flex flex-row flex-wrap gap-3">
                  <form.Field name="phoneCountryIdx">
                    {(idxField) => (
                      <form.Field name="phone">
                        {(phoneField) => {
                          const isInvalid = showFieldInvalid(
                            phoneField.state.meta,
                            submissionAttempts
                          )
                          return (
                            <Field
                              className="min-w-[120px] flex-1 gap-1.5"
                              data-invalid={isInvalid || undefined}
                            >
                              <FieldLabel
                                className={cn(footerLabelClass)}
                                htmlFor={phoneField.name}
                              >
                                {f.labelPhone}
                              </FieldLabel>
                              <PhoneField
                                countryIdx={idxField.state.value}
                                externalLabel
                                inputId={phoneField.name}
                                onCountryIdx={(i) => idxField.handleChange(i)}
                                local={phoneField.state.value}
                                onLocal={(v) => phoneField.handleChange(v)}
                                onPhoneBlur={() => {
                                  void phoneField.handleBlur()
                                  void idxField.handleBlur()
                                }}
                                invalid={isInvalid}
                              />
                              {isInvalid ? (
                                <FieldError
                                  errors={phoneField.state.meta.errors}
                                />
                              ) : null}
                            </Field>
                          )
                        }}
                      </form.Field>
                    )}
                  </form.Field>

                  <form.Field name="company">
                    {(field) => {
                      const isInvalid = showFieldInvalid(
                        field.state.meta,
                        submissionAttempts
                      )
                      return (
                        <Field
                          className="min-w-[120px] flex-1 gap-1.5"
                          data-invalid={isInvalid || undefined}
                        >
                          <FieldLabel
                            className={cn(footerLabelClass)}
                            htmlFor={field.name}
                          >
                            {f.labelCompany}
                          </FieldLabel>
                          <Input
                            autoComplete="organization"
                            className={cn(footerControlClass, "h-11 px-3.5")}
                            id={field.name}
                            name={field.name}
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {isInvalid ? (
                            <FieldError errors={field.state.meta.errors} />
                          ) : null}
                        </Field>
                      )
                    }}
                  </form.Field>
                </div>

                <form.Field name="msg">
                  {(field) => {
                    const isInvalid = showFieldInvalid(
                      field.state.meta,
                      submissionAttempts
                    )
                    return (
                      <Field
                        className="min-w-0 gap-1.5"
                        data-invalid={isInvalid || undefined}
                      >
                        <FieldLabel
                          className={cn(footerLabelClass)}
                          htmlFor={field.name}
                        >
                          {f.labelMessage}
                        </FieldLabel>
                        <Textarea
                          className={cn(
                            footerControlClass,
                            "min-h-[104px] resize-y px-3.5 py-3"
                          )}
                          id={field.name}
                          name={field.name}
                          rows={4}
                          aria-invalid={isInvalid}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid ? (
                          <FieldError errors={field.state.meta.errors} />
                        ) : null}
                      </Field>
                    )
                  }}
                </form.Field>
              </FieldGroup>
              {globalLoader ? (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-[#0e3f15]/55 backdrop-blur-[2px]"
                  aria-live="polite"
                >
                  <Spinner className="size-9 text-[#a8e88a]" />
                </div>
              ) : null}
            </div>
          )}
        </form.Subscribe>

        <button
          type="submit"
          className="btn btn-primary inline-flex items-center gap-2"
          disabled={globalLoader}
          style={{ marginTop: 6, alignSelf: "flex-start" }}
        >
          {globalLoader ? (
            <>
              <Spinner className="size-3.5 shrink-0" />
              Thinking
            </>
          ) : (
            <>
              {f.sendMessage}{" "}
              <Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
            </>
          )}
        </button>
      </form>
    </>
  )
}
