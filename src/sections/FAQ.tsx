import { useEffect, useMemo, useState } from "react";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";

type QA = { q: string; a: string };

const ANSWER_MAX_PX = 360;

export function FAQ() {
	const { messages, locale } = useLanguage();
	const faqSets = useMemo<QA[][]>(
		() => [
			messages.faq.general,
			messages.faq.pricing,
			messages.faq.process,
			messages.faq.support,
		],
		[messages],
	);
	const cats = messages.faq.categories;
	const ref = useReveal();
	const [open, setOpen] = useState(-1);
	const [cat, setCat] = useState(0);
	const items = faqSets[cat] ?? faqSets[0];
	const activeCat = cats[cat] ?? cats[0];

	useEffect(() => {
		setOpen(-1);
		setCat(0);
	}, [locale]);

	return (
		<section
			id="faq"
			className="section"
			style={{
				background: "linear-gradient(180deg, #0e3f15, #15581c)",
				paddingTop: 140,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				className="orb"
				style={{
					width: 500,
					height: 500,
					bottom: -120,
					right: -120,
					background: "#c084ff",
					filter: "blur(140px)",
					opacity: "calc(.3 * var(--accent-i))" as string,
				}}
			/>
			<div ref={ref} className="container reveal">
				<div
					className="row"
					style={{ gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}
				>
					<div style={{ flex: "0 0 340px" }}>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							{messages.faq.eyebrow}
						</div>
						<h2 style={{ marginBottom: 24 }}>
							{messages.faq.titleBefore} <br />
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								{messages.faq.titleHighlight}
							</span>
						</h2>
						<p
							style={{
								color: "rgba(255,255,255,.7)",
								fontSize: 15,
								lineHeight: 1.6,
								marginBottom: 28,
							}}
						>
							{messages.faq.intro}
						</p>
						<div className="col gap-8" style={{ marginBottom: 28 }}>
							{cats.map((c, i) => (
								<button
									type="button"
									key={c}
									aria-pressed={i === cat}
									onClick={() => {
										setCat(i);
										setOpen(-1);
									}}
									style={{
										textAlign: "left",
										padding: "10px 14px",
										borderRadius: 10,
										border:
											"1px solid " +
											(i === cat
												? "rgba(124,216,90,.5)"
												: "rgba(255,255,255,.08)"),
										background:
											i === cat
												? "linear-gradient(90deg, rgba(124,216,90,.15), transparent)"
												: "transparent",
										color: i === cat ? "white" : "rgba(255,255,255,.6)",
										fontSize: 14,
										fontWeight: 500,
										transition: "all .3s",
									}}
								>
									{i === cat ? "→ " : ""}
									{c}
								</button>
							))}
						</div>
						<a
							href="#contact"
							className="btn btn-primary"
							style={{ padding: "12px 20px" }}
						>
							{messages.faq.askQuestion}{" "}
							<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
						</a>
					</div>

					<section
						aria-label={`${activeCat} questions`}
						style={{ flex: 1, minWidth: 320 }}
					>
						{items.map((it, i) => (
							<div
								key={`${activeCat}:${it.q}`}
								style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
							>
								<button
									type="button"
									onClick={() => setOpen(open === i ? -1 : i)}
									style={{
										width: "100%",
										padding: "28px 0",
										textAlign: "left",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: 20,
									}}
								>
									<div className="row center gap-18" style={{ flex: 1 }}>
										<span
											className="mono"
											style={{
												fontSize: 12,
												color: open === i ? "#c084ff" : "rgba(255,255,255,.4)",
												letterSpacing: "0.1em",
												minWidth: 30,
											}}
										>
											0{i + 1}
										</span>
										<span
											style={{
												fontSize: 22,
												fontWeight: 500,
												color: "white",
												letterSpacing: "-0.01em",
											}}
										>
											{it.q}
										</span>
									</div>
									<span
										style={{
											width: 36,
											height: 36,
											borderRadius: 999,
											display: "grid",
											placeItems: "center",
											background:
												open === i ? "#9b5cff" : "rgba(255,255,255,.08)",
											color: "white",
											transform: open === i ? "rotate(45deg)" : "rotate(0)",
											transition:
												"transform .4s cubic-bezier(.2,.7,.2,1), background .3s",
											flex: "0 0 36px",
										}}
									>
										<Icons.plus style={{ width: 16, height: 16 }} />
									</span>
								</button>
								<div
									style={{
										overflow: "hidden",
										maxHeight: open === i ? ANSWER_MAX_PX : 0,
										opacity: open === i ? 1 : 0,
										transition:
											"max-height .5s cubic-bezier(.2,.7,.2,1), opacity .3s",
									}}
								>
									<p
										style={{
											color: "rgba(255,255,255,.7)",
											fontSize: 16,
											lineHeight: 1.6,
											padding: "0 0 28px 50px",
											margin: 0,
											maxWidth: 620,
										}}
									>
										{it.a}
									</p>
								</div>
							</div>
						))}
					</section>
				</div>
			</div>
		</section>
	);
}
