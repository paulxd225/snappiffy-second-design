import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icons } from "../components/Icons";
import { Logo } from "../components/Logo";
import { LANGUAGE_OPTIONS, optionForLocale } from "../i18n/languages";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/types";

const MOBILE_MQ = "(max-width: 900px)";

function subscribeMobile(cb: () => void) {
	const mq = window.matchMedia(MOBILE_MQ);
	mq.addEventListener("change", cb);
	return () => mq.removeEventListener("change", cb);
}

function getMobileSnapshot() {
	return window.matchMedia(MOBILE_MQ).matches;
}

function getMobileServerSnapshot() {
	return false;
}

function LanguagePicker({
	onPick,
	align = "end",
}: {
	onPick?: () => void;
	align?: "start" | "end";
}) {
	const { locale, setLocale, messages } = useLanguage();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const cur = optionForLocale(locale);

	useEffect(() => {
		if (!open) return;
		const onPointer = (e: PointerEvent) => {
			const el = rootRef.current;
			if (el && !el.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("pointerdown", onPointer, true);
		return () => document.removeEventListener("pointerdown", onPointer, true);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<div ref={rootRef} style={{ position: "relative" }}>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={messages.header.languageMenu}
				onClick={() => setOpen((v) => !v)}
				className="row center gap-8"
				style={{
					color: "var(--paper)",
					fontSize: 13,
					fontFamily: "var(--mono)",
					letterSpacing: "0.1em",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					padding: "6px 4px",
				}}
			>
				<Icons.globe style={{ width: 16, height: 16 }} />
				{cur.flag} {cur.code}
			</button>
			{open ? (
				<div
					role="listbox"
					aria-label={messages.header.languageMenu}
					style={{
						position: "absolute",
						top: "calc(100% + 8px)",
						...(align === "end" ? { right: 0 } : { left: 0 }),
						minWidth: 220,
						zIndex: 80,
						borderRadius: 12,
						border: "1px solid rgba(255,255,255,.12)",
						background: "var(--paper)",
						boxShadow: "0 16px 48px rgba(0,0,0,.35)",
						padding: 6,
					}}
				>
					{LANGUAGE_OPTIONS.map((opt) => (
						<button
							key={opt.locale}
							type="button"
							role="option"
							aria-selected={opt.locale === locale}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								setLocale(opt.locale as Locale);
								setOpen(false);
								onPick?.();
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
									opt.locale === locale
										? "rgba(124,216,90,.2)"
										: "transparent",
								color: "var(--ink)",
								fontSize: 14,
								textAlign: "left",
								cursor: "pointer",
							}}
						>
							<span style={{ fontSize: 16 }}>{opt.flag}</span>
							<span className="mono" style={{ opacity: 0.75, minWidth: 40 }}>
								{opt.code}
							</span>
							<span style={{ flex: 1 }}>{opt.label}</span>
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}

export function Header() {
	const { messages } = useLanguage();
	const isMobile = useSyncExternalStore(
		subscribeMobile,
		getMobileSnapshot,
		getMobileServerSnapshot,
	);

	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!isMobile) setMenuOpen(false);
	}, [isMobile]);

	useEffect(() => {
		if (!isMobile || !menuOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isMobile, menuOpen]);

	useEffect(() => {
		if (!isMobile || !menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isMobile, menuOpen]);

	const nav = [
		{ slug: "home", label: messages.nav.home },
		{ slug: "about", label: messages.nav.about },
		{ slug: "services", label: messages.nav.services },
		{ slug: "case-study", label: messages.nav.caseStudy },
		{ slug: "catalogue", label: messages.nav.catalogue },
		{ slug: "process", label: messages.nav.process },
		{ slug: "industries", label: messages.nav.industries },
		{ slug: "faq", label: messages.nav.faq },
	];

	const headerPadding = isMobile
		? scrolled
			? "8px 16px"
			: "14px 16px"
		: scrolled
			? "2px 40px"
			: "16px 40px";

	const headerBackground = scrolled
		? "rgba(7,18,9,0.78)"
		: "linear-gradient(180deg, rgba(7,18,9,0.42), rgba(7,18,9,0.14))";

	const headerBackdrop = scrolled ? "blur(20px) saturate(140%)" : "blur(10px) saturate(120%)";

	return (
		<>
			<header
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					width: "100%",
					maxWidth: "100%",
					boxSizing: "border-box",
					overflowX: "clip",
					zIndex: 50,
					padding: headerPadding,
					transition: "padding .4s, backdrop-filter .4s, background .4s",
					background: headerBackground,
					backdropFilter: headerBackdrop,
					borderBottom: scrolled
						? "1px solid rgba(255,255,255,0.06)"
						: "1px solid rgba(255,255,255,0.04)",
				}}
			>
				<div
					className="row between center"
					style={{
						width: "100%",
						maxWidth: "min(1400px, 100%)",
						maxHeight: isMobile ? "none" : 100,
						margin: "0 auto",
						gap: isMobile ? 12 : 16,
						flexWrap: isMobile ? "nowrap" : "wrap",
						minHeight: isMobile ? 44 : undefined,
						minWidth: 0,
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							minWidth: 0,
							flex: "1 1 auto",
							height: 44,
							maxWidth: isMobile ? "calc(100% - 56px)" : "none",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								transform: "scale(1.2)",
								transformOrigin: "left center",
								willChange: "transform",
							}}
						>
							<Logo size={30} />
						</div>
					</div>

					<nav
						className="desktop-nav row gap-8 hide-mobile"
						style={{
							background: "rgba(255,255,255,0.03)",
							border: "1px solid rgba(255,255,255,0.06)",
							borderRadius: 999,
							padding: 6,
							backdropFilter: "blur(12px)",
						}}
					>
						{nav.map((item, i) => (
							<a
								key={item.slug}
								href={`#${item.slug}`}
								style={{
									padding: "8px 14px",
									fontSize: 13,
									fontWeight: 500,
									borderRadius: 999,
									color: i === 0 ? "var(--green-900)" : "var(--paper)",
									background:
										i === 0
											? "linear-gradient(120deg, var(--green-200), var(--green-300))"
											: "transparent",
									transition: "background .3s, color .3s",
								}}
								onMouseEnter={(e) => {
									if (i !== 0)
										(e.currentTarget as HTMLAnchorElement).style.background =
											"rgba(124,216,90,.08)";
								}}
								onMouseLeave={(e) => {
									if (i !== 0)
										(e.currentTarget as HTMLAnchorElement).style.background =
											"transparent";
								}}
							>
								{item.label}
							</a>
						))}
					</nav>

					{isMobile ? (
						<button
							type="button"
							aria-label={menuOpen ? messages.header.closeMenu : messages.header.openMenu}
							aria-expanded={menuOpen}
							onClick={() => setMenuOpen((v) => !v)}
							style={{
								width: 44,
								height: 44,
								borderRadius: 12,
								border: "1px solid rgba(255,255,255,0.10)",
								background: "rgba(255,255,255,0.06)",
								color: "var(--paper)",
								display: "grid",
								placeItems: "center",
								flex: "0 0 auto",
							}}
						>
							{menuOpen ? (
								<Icons.close style={{ width: 20, height: 20 }} />
							) : (
								<Icons.menu style={{ width: 20, height: 20 }} />
							)}
						</button>
					) : (
						<div className="row center gap-12">
							<LanguagePicker align="end" />
							<a
								href="#contact"
								className="btn btn-primary"
								style={{ padding: "10px 18px", fontSize: 13 }}
							>
								{messages.header.bookVisit}{" "}
								<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
							</a>
						</div>
					)}
				</div>
			</header>

			{isMobile && menuOpen ? (
				<div
					role="presentation"
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 60,
						display: "flex",
						justifyContent: "flex-end",
						height: "100%",
					}}
				>
					<button
						type="button"
						aria-label={messages.header.closeMenu}
						onClick={() => setMenuOpen(false)}
						style={{
							flex: "1 1 auto",
							alignSelf: "stretch",
							minWidth: 0,
							border: 0,
							background: "rgba(7,18,9,0.55)",
							backdropFilter: "blur(6px)",
						}}
					/>
					<div
						role="dialog"
						aria-modal="true"
						style={{
							flex: "0 0 auto",
							width: "50vw",
							maxWidth: "50vw",
							minWidth: 0,
							height: "100%",
							background: "rgba(7,18,9,0.92)",
							borderLeft: "1px solid rgba(255,255,255,0.08)",
							backdropFilter: "blur(18px) saturate(140%)",
							padding: "18px 16px 24px",
							display: "flex",
							flexDirection: "column",
							gap: 14,
						}}
					>
						<div className="row between center" style={{ gap: 12 }}>
							<div style={{ color: "var(--paper)", fontWeight: 600, fontSize: 14 }}>
								{messages.header.menu}
							</div>
							<button
								type="button"
								aria-label={messages.header.closeMenu}
								onClick={() => setMenuOpen(false)}
								style={{
									width: 40,
									height: 40,
									borderRadius: 12,
									border: "1px solid rgba(255,255,255,0.10)",
									background: "rgba(255,255,255,0.06)",
									color: "var(--paper)",
									display: "grid",
									placeItems: "center",
								}}
							>
								<Icons.close style={{ width: 18, height: 18 }} />
							</button>
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
							{nav.map((item, i) => (
								<a
									key={item.slug}
									href={`#${item.slug}`}
									onClick={() => setMenuOpen(false)}
									style={{
										padding: "12px 12px",
										borderRadius: 14,
										border: "1px solid rgba(255,255,255,0.08)",
										background:
											i === 0
												? "linear-gradient(120deg, var(--green-200), var(--green-300))"
												: "rgba(255,255,255,0.04)",
										color: i === 0 ? "var(--green-900)" : "var(--paper)",
										fontSize: 14,
										fontWeight: 600,
										textDecoration: "none",
									}}
								>
									{item.label}
								</a>
							))}
						</div>

						<div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<LanguagePicker
									align="start"
									onPick={() => setMenuOpen(false)}
								/>
							</div>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									setMenuOpen(false);
									window.location.hash = "contact";
								}}
								style={{
									width: "100%",
									justifyContent: "center",
									padding: "12px 14px",
									fontSize: 13,
									display: "inline-flex",
									alignItems: "center",
									gap: 8,
								}}
							>
								{messages.header.bookVisit}{" "}
								<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
