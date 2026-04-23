import { useEffect, useId, useMemo, useRef, useState } from "react"

import { useLanguage } from "@/i18n/LanguageContext"

import { PHONE_COUNTRIES } from "./phoneCountries"

export function PhoneField({
  countryIdx,
  onCountryIdx,
  local,
  onLocal,
  onPhoneBlur,
  invalid,
  externalLabel = false,
  inputId: inputIdProp,
}: {
  countryIdx: number
  onCountryIdx: (idx: number) => void
  local: string
  onLocal: (v: string) => void
  onPhoneBlur?: () => void
  invalid?: boolean
  /** Etiqueta fuera del control (p. ej. FieldLabel en el formulario) */
  externalLabel?: boolean
  /** Debe coincidir con el htmlFor del FieldLabel asociado */
  inputId?: string
}) {
  const { messages } = useLanguage()
  const f = messages.footer
  const [open, setOpen] = useState(false)
  const [countryQuery, setCountryQuery] = useState("")
  const [focusInput, setFocusInput] = useState(false)
  const [focusTrigger, setFocusTrigger] = useState(false)
  const [focusSearch, setFocusSearch] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const controlId = useId()
  const telInputId = inputIdProp ?? controlId
  const listId = useId()
  const searchId = useId()
  const triggerId = useId()
  const country = PHONE_COUNTRIES[countryIdx] ?? PHONE_COUNTRIES[0]
  const hasVal = local.length > 0
  const fieldActive = focusInput || focusTrigger || open || focusSearch

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase()
    const entries = PHONE_COUNTRIES.map((c, idx) => ({ c, idx }))
    if (!q) return entries
    const dialDigits = (d: string) => d.replace(/\D/g, "")
    const matches = entries.filter(
      ({ c }) =>
        c.label.toLowerCase().startsWith(q) ||
        c.label.toLowerCase().includes(q) ||
        dialDigits(c.dial).startsWith(q) ||
        c.dial.toLowerCase().includes(q)
    )
    return matches.sort((a, b) => {
      const al = a.c.label.toLowerCase()
      const bl = b.c.label.toLowerCase()
      const aStarts = al.startsWith(q)
      const bStarts = bl.startsWith(q)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
      return al.localeCompare(bl)
    })
  }, [countryQuery])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      const el = rootRef.current
      if (el && !el.contains(e.target as Node)) {
        setCountryQuery("")
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointer, true)
    return () => document.removeEventListener("pointerdown", onPointer, true)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCountryQuery("")
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const labelShrunk = !externalLabel && (fieldActive || hasVal)
  const labelTop = labelShrunk ? 8 : 10
  const labelFontSize = labelShrunk ? 10 : 14

  const borderColor = invalid
    ? "rgba(248,113,113,.55)"
    : fieldActive
      ? "rgba(124,216,90,.5)"
      : "rgba(255,255,255,.1)"

  return (
    <div
      ref={rootRef}
      style={{ display: "block", position: "relative", flex: 1, minWidth: 120 }}
    >
      {!externalLabel ? (
        <div
          style={{
            position: "absolute",
            top: labelTop,
            left: 14,
            fontSize: labelFontSize,
            fontFamily: labelShrunk ? "var(--mono)" : "var(--sans)",
            color: fieldActive ? "#a8e88a" : "rgba(255,255,255,.5)",
            letterSpacing: labelShrunk ? "0.14em" : "normal",
            textTransform: labelShrunk ? "uppercase" : "none",
            transition: "all .25s cubic-bezier(.2,.7,.2,1)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {f.labelPhone}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          padding: externalLabel ? "10px 14px 10px" : "24px 14px 10px",
          background: "rgba(255,255,255,.03)",
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
          transition: "border-color .25s, background .25s",
          overflow: "visible",
          position: "relative",
        }}
      >
        <button
          type="button"
          id={triggerId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={f.phoneCountryAria}
          onClick={() => {
            setCountryQuery("")
            setOpen((o) => !o)
          }}
          onFocus={() => setFocusTrigger(true)}
          onBlur={() => setFocusTrigger(false)}
          style={{
            flex: "0 0 auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px 4px 0",
            background: "transparent",
            border: "none",
            fontSize: 16,
            lineHeight: 1,
            outline: "none",
            cursor: "pointer",
            color: "white",
          }}
        >
          <span aria-hidden="true">{country.flag}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{
              opacity: 0.65,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform .2s",
            }}
          >
            <path
              d="M2.5 4.25L6 7.75l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          aria-hidden="true"
          style={{
            alignSelf: "center",
            width: 1,
            height: 22,
            background: "rgba(255,255,255,.12)",
            flexShrink: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0 8px 0 10px",
            flex: "0 0 auto",
            color: "rgba(255,255,255,.85)",
            fontSize: 14,
            lineHeight: 1.25,
            fontFamily: "var(--mono)",
            letterSpacing: "0.02em",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {country.dial}
        </span>
        <input
          id={telInputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          aria-label={f.phoneNumberAria}
          aria-invalid={invalid}
          value={local}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, "")
            onLocal(cleaned)
          }}
          onFocus={() => setFocusInput(true)}
          onBlur={() => {
            setFocusInput(false)
            onPhoneBlur?.()
          }}
          placeholder=" "
          style={{
            flex: 1,
            minWidth: 0,
            padding: "2px 0",
            lineHeight: 1.25,
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 14,
            fontFamily: "var(--sans)",
            outline: "none",
          }}
        />
      </div>
      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label={f.phoneSelectCountry}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 6px)",
            zIndex: 50,
            maxHeight: 300,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,.12)",
            background: "var(--paper)",
            boxShadow: "0 12px 40px rgba(0,0,0,.35)",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "8px 8px 6px",
              borderBottom: "1px solid rgba(7,18,9,.12)",
              flexShrink: 0,
            }}
          >
            <label
              htmlFor={searchId}
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              {f.phoneSearchLabel}
            </label>
            <input
              ref={searchInputRef}
              id={searchId}
              type="search"
              autoComplete="off"
              placeholder={f.phoneSearchPlaceholder}
              value={countryQuery}
              onChange={(e) => setCountryQuery(e.target.value)}
              onFocus={() => setFocusSearch(true)}
              onBlur={() => setFocusSearch(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || filteredCountries.length === 0) return
                e.preventDefault()
                const first = filteredCountries[0]
                if (first) {
                  onCountryIdx(first.idx)
                  setCountryQuery("")
                  setOpen(false)
                }
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(7,18,9,.15)",
                background: "rgba(255,255,255,.9)",
                color: "var(--ink)",
                fontSize: 14,
                fontFamily: "var(--sans)",
                outline: "none",
              }}
            />
          </div>
          <div
            style={{
              overflowY: "auto",
              padding: 6,
              flex: 1,
              minHeight: 0,
            }}
          >
            {filteredCountries.length === 0 ? (
              <div
                style={{
                  padding: "14px 12px",
                  color: "var(--ink)",
                  opacity: 0.65,
                  fontSize: 14,
                }}
              >
                {f.phoneNoMatches}
              </div>
            ) : (
              filteredCountries.map(({ c, idx: i }) => (
                <button
                  key={`${c.dial}-${c.label}`}
                  type="button"
                  role="option"
                  aria-selected={i === countryIdx}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onCountryIdx(i)
                    setCountryQuery("")
                    setOpen(false)
                  }}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: 8,
                    background:
                      i === countryIdx ? "rgba(124,216,90,.18)" : "transparent",
                    color: "var(--ink)",
                    fontSize: 14,
                    fontFamily: "var(--sans)",
                    textAlign: "left",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ fontSize: 16, lineHeight: 1 }}
                  >
                    {c.flag}
                  </span>
                  <span
                    className="mono"
                    style={{
                      color: "var(--ink)",
                      opacity: 0.85,
                      minWidth: 44,
                    }}
                  >
                    {c.dial}
                  </span>
                  <span style={{ flex: 1 }}>{c.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
