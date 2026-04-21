import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Icons } from "../components/Icons";
import { Logo } from "../components/Logo";
import { useLanguage } from "../i18n/LanguageContext";

const PHONE_COUNTRIES = [
	{ dial: "+1", flag: "🇺🇸", label: "United States" },
	{ dial: "+1", flag: "🇨🇦", label: "Canada" },
	{ dial: "+44", flag: "🇬🇧", label: "United Kingdom" },
	{ dial: "+34", flag: "🇪🇸", label: "Spain" },
	{ dial: "+52", flag: "🇲🇽", label: "Mexico" },
	{ dial: "+57", flag: "🇨🇴", label: "Colombia" },
	{ dial: "+593", flag: "🇪🇨", label: "Ecuador" },
	{ dial: "+58", flag: "🇻🇪", label: "Venezuela" },
	{ dial: "+54", flag: "🇦🇷", label: "Argentina" },
	{ dial: "+55", flag: "🇧🇷", label: "Brazil" },
	{ dial: "+49", flag: "🇩🇪", label: "Germany" },
	{ dial: "+33", flag: "🇫🇷", label: "France" },
	{ dial: "+39", flag: "🇮🇹", label: "Italy" },
	{ dial: "+351", flag: "🇵🇹", label: "Portugal" },
	{ dial: "+61", flag: "🇦🇺", label: "Australia" },
	{ dial: "+81", flag: "🇯🇵", label: "Japan" },
	{ dial: "+86", flag: "🇨🇳", label: "China" },
	{ dial: "+91", flag: "🇮🇳", label: "India" },
] as const;

function Input({
	v,
	onV,
	label,
	type = "text",
	textarea,
}: {
	v: string;
	onV: (val: string) => void;
	label: string;
	type?: string;
	textarea?: boolean;
}) {
	const [focus, setFocus] = useState(false);
	const controlId = useId();
	const style: React.CSSProperties = {
		width: "100%",
		padding: textarea ? "26px 14px 12px" : "24px 14px 10px",
		background: "rgba(255,255,255,.03)",
		border: `1px solid ${focus ? "rgba(124,216,90,.5)" : "rgba(255,255,255,.1)"}`,
		borderRadius: 12,
		color: "white",
		fontSize: 14,
		fontFamily: "var(--sans)",
		outline: "none",
		transition: "border-color .25s, background .25s",
		resize: "vertical",
	};
	return (
		<label
			htmlFor={controlId}
			style={{ display: "block", position: "relative", flex: 1, minWidth: 120 }}
		>
			<div
				style={{
					position: "absolute",
					top: focus || v ? 8 : 22,
					left: 14,
					fontSize: focus || v ? 10 : 14,
					fontFamily: focus || v ? "var(--mono)" : "var(--sans)",
					color: focus ? "#a8e88a" : "rgba(255,255,255,.5)",
					letterSpacing: focus || v ? "0.14em" : "normal",
					textTransform: focus || v ? "uppercase" : "none",
					transition: "all .25s cubic-bezier(.2,.7,.2,1)",
					pointerEvents: "none",
				}}
			>
				{label}
			</div>
			{textarea ? (
				<textarea
					id={controlId}
					value={v}
					onChange={(e) => onV(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					rows={4}
					style={style}
				/>
			) : (
				<input
					id={controlId}
					value={v}
					onChange={(e) => onV(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type={type}
					style={style}
				/>
			)}
		</label>
	);
}

function PhoneField({
	countryIdx,
	onCountryIdx,
	local,
	onLocal,
}: {
	countryIdx: number;
	onCountryIdx: (idx: number) => void;
	local: string;
	onLocal: (v: string) => void;
}) {
	const { messages } = useLanguage();
	const f = messages.footer;
	const [open, setOpen] = useState(false);
	const [countryQuery, setCountryQuery] = useState("");
	const [focusInput, setFocusInput] = useState(false);
	const [focusTrigger, setFocusTrigger] = useState(false);
	const [focusSearch, setFocusSearch] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const controlId = useId();
	const listId = useId();
	const searchId = useId();
	const triggerId = useId();
	const country = PHONE_COUNTRIES[countryIdx] ?? PHONE_COUNTRIES[0];
	const hasVal = local.length > 0;
	const fieldActive =
		focusInput || focusTrigger || open || focusSearch;

	const filteredCountries = useMemo(() => {
		const q = countryQuery.trim().toLowerCase();
		const entries = PHONE_COUNTRIES.map((c, idx) => ({ c, idx }));
		if (!q) return entries;
		const dialDigits = (d: string) => d.replace(/\D/g, "");
		const matches = entries.filter(
			({ c }) =>
				c.label.toLowerCase().startsWith(q) ||
				c.label.toLowerCase().includes(q) ||
				dialDigits(c.dial).startsWith(q) ||
				c.dial.toLowerCase().includes(q),
		);
		return matches.sort((a, b) => {
			const al = a.c.label.toLowerCase();
			const bl = b.c.label.toLowerCase();
			const aStarts = al.startsWith(q);
			const bStarts = bl.startsWith(q);
			if (aStarts && !bStarts) return -1;
			if (!aStarts && bStarts) return 1;
			return al.localeCompare(bl);
		});
	}, [countryQuery]);

	useEffect(() => {
		if (!open) {
			setCountryQuery("");
			return;
		}
		const t = window.setTimeout(() => searchInputRef.current?.focus(), 0);
		return () => window.clearTimeout(t);
	}, [open]);

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
			if (e.key === "Escape") {
				setOpen(false);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	const labelShrunk = fieldActive || hasVal;
	const labelTop = labelShrunk ? 8 : 10;
	const labelFontSize = labelShrunk ? 10 : 14;

	return (
		<div
			ref={rootRef}
			style={{ display: "block", position: "relative", flex: 1, minWidth: 120 }}
		>
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
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					boxSizing: "border-box",
					padding: "24px 14px 10px",
					background: "rgba(255,255,255,.03)",
					border: `1px solid ${fieldActive ? "rgba(124,216,90,.5)" : "rgba(255,255,255,.1)"}`,
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
					onClick={() => setOpen((o) => !o)}
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
					id={controlId}
					type="tel"
					inputMode="tel"
					autoComplete="tel-national"
					aria-label={f.phoneNumberAria}
					value={local}
					onChange={(e) => {
						const raw = e.target.value;
						const cleaned = raw.replace(/[^\d\s\-().]/g, "");
						onLocal(cleaned);
					}}
					onFocus={() => setFocusInput(true)}
					onBlur={() => setFocusInput(false)}
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
								if (e.key !== "Enter" || filteredCountries.length === 0) return;
								e.preventDefault();
								const first = filteredCountries[0];
								if (first) {
									onCountryIdx(first.idx);
									setOpen(false);
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
										onCountryIdx(i);
										setOpen(false);
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
											i === countryIdx
												? "rgba(124,216,90,.18)"
												: "transparent",
										color: "var(--ink)",
										fontSize: 14,
										fontFamily: "var(--sans)",
										textAlign: "left",
										cursor: "pointer",
										outline: "none",
									}}
								>
									<span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>
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
	);
}

export function Footer() {
	const { messages } = useLanguage();
	const f = messages.footer;
	const [phoneCountryIdx, setPhoneCountryIdx] = useState(0);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		msg: "",
	});
	const [sent, setSent] = useState(false);

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
						<div className="row between center" style={{ marginBottom: 20 }}>
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
						{sent ? (
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
								<div style={{ color: "rgba(255,255,255,.7)" }}>
									{f.thankYouSub}
								</div>
							</div>
						) : (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setSent(true);
								}}
								className="col gap-12"
							>
								<div className="row gap-12">
									<Input
										v={form.name}
										onV={(v) => setForm((fm) => ({ ...fm, name: v }))}
										label={f.labelName}
									/>
									<Input
										v={form.email}
										onV={(v) => setForm((fm) => ({ ...fm, email: v }))}
										label={f.labelEmail}
										type="email"
									/>
								</div>
								<div className="row gap-12">
									<PhoneField
										countryIdx={phoneCountryIdx}
										onCountryIdx={setPhoneCountryIdx}
										local={form.phone}
										onLocal={(v) => setForm((fm) => ({ ...fm, phone: v }))}
									/>
									<Input
										v={form.company}
										onV={(v) => setForm((fm) => ({ ...fm, company: v }))}
										label={f.labelCompany}
									/>
								</div>
								<Input
									v={form.msg}
									onV={(v) => setForm((fm) => ({ ...fm, msg: v }))}
									label={f.labelMessage}
									textarea
								/>
								<button
									type="submit"
									className="btn btn-primary"
									style={{ marginTop: 6, alignSelf: "flex-start" }}
								>
									{f.sendMessage}{" "}
									<Icons.arrow
										className="chev"
										style={{ width: 14, height: 14 }}
									/>
								</button>
							</form>
						)}
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
								label: string;
								href: string;
								external?: boolean;
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
	);
}
