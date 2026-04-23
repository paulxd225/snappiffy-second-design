import { Icons } from "../../components/Icons"
import { Logo } from "../../components/Logo"
import { useLanguage } from "../../i18n/LanguageContext"

import { ContactForm } from "./FormSection"

export function Footer() {
  const { messages } = useLanguage()
  const f = messages.footer

  return (
    <footer
      id="contact"
      style={{
        background:
          "linear-gradient(180deg, #15581c 0%, #0e3f15 50%, #0e3f15 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: 120,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          fontFamily: "var(--sans)",
          fontWeight: 800,
          fontSize: "clamp(120px, 22vw, 320px)",
          lineHeight: 0.8,
          color: "#a8e88a",
          opacity: 0.06,
          letterSpacing: "-0.06em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        SNAPPIFFY
      </div>

      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#9b5cff",
          filter: "blur(160px)",
          opacity: "calc(.3 * var(--accent-i))" as string,
        }}
      />
      <div className="grid-bg" style={{ opacity: 0.2 }} />

      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            className="eyebrow"
            style={{
              justifyContent: "center",
              display: "inline-flex",
              marginBottom: 20,
            }}
          >
            {f.eyebrow}
          </div>
          <h2 style={{ maxWidth: 900, margin: "0 auto 24px" }}>
            {f.titleBefore}{" "}
            <span className="serif-italic" style={{ color: "#c084ff" }}>
              {f.titleHighlight}
            </span>{" "}
            {f.titleAfter}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.7)",
              fontSize: 17,
              maxWidth: 640,
              margin: "0 auto 32px",
              lineHeight: 1.55,
            }}
          >
            {f.body}
          </p>
          <div
            className="row center gap-16"
            style={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="#contact-form" className="btn btn-primary">
              {f.bookFree}{" "}
              <Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
            </a>
            <a
              href="mailto:snappiffy.business@gmail.com"
              className="btn btn-ghost"
            >
              {f.emailUs}
            </a>
          </div>
        </div>

        <div
          id="contact-form"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            padding: 10,
            borderRadius: 24,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            marginBottom: 80,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <Logo size={40} />
            <p
              style={{
                marginTop: 24,
                color: "rgba(255,255,255,.7)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 340,
              }}
            >
              {f.tagline}
            </p>
            <div className="col gap-12" style={{ marginTop: 32 }}>
              <div
                className="row center gap-10"
                style={{ color: "rgba(255,255,255,.8)", fontSize: 14 }}
              >
                <Icons.mail
                  style={{ width: 16, height: 16, color: "#a8e88a" }}
                />
                snappiffy.business@gmail.com
              </div>
              <div
                className="row center gap-10"
                style={{ color: "rgba(255,255,255,.8)", fontSize: 14 }}
              >
                <Icons.pin
                  style={{ width: 16, height: 16, color: "#c084ff" }}
                />
                5636 Shannon Lane Place, Dublin OH 43016
              </div>
            </div>
            <div
              style={{
                marginTop: 40,
                padding: "16px 20px",
                borderRadius: 14,
                background: "rgba(124,216,90,0.08)",
                border: "1px solid rgba(124,216,90,.2)",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "#a8e88a",
                  letterSpacing: "0.14em",
                  marginBottom: 4,
                }}
              >
                {f.responseLabel}
              </div>
              <div style={{ fontSize: 18, color: "white", fontWeight: 500 }}>
                {f.responseValue}
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>

        <div
          className="row between center"
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingBottom: 40,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.5)",
              letterSpacing: "0.1em",
            }}
          >
            {f.copyright}
          </div>
          <div className="row gap-24">
            {(
              [
                { label: f.privacy, href: "/privacy" },
                { label: f.terms, href: "/terms" },
                {
                  label: f.instagram,
                  href: "https://www.instagram.com/",
                  external: true,
                },
                {
                  label: f.linkedin,
                  href: "https://www.linkedin.com/",
                  external: true,
                },
              ] satisfies ReadonlyArray<{
                label: string
                href: string
                external?: boolean
              }>
            ).map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
