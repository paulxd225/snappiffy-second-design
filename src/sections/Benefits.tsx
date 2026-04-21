import { useMemo, useState } from "react";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";

type BenefitIcon = "spark" | "clock" | "trend" | "brain";

type BenefitItem = {
	k: string;
	t: string;
	d: string;
	ic: BenefitIcon;
};

function BenefitCard({ it, delay }: { it: BenefitItem; delay: number }) {
	const ref = useReveal<HTMLButtonElement>();
	const IconEl = Icons[it.ic];
	const [hovered, setHovered] = useState(false);

	return (
		<button
			ref={ref}
			type="button"
			className="reveal"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={
				{
					"--d": `${delay}ms`,
					position: "relative",
					padding: 28,
					borderRadius: 20,
					background:
						"linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
					border: "1px solid rgba(255,255,255,0.07)",
					overflow: "hidden",
					transition:
						"transform .6s cubic-bezier(.2,.8,.2,1), border-color .3s",
					minHeight: 280,
					transform: hovered ? "translateY(-6px)" : "translateY(0)",
					borderColor: hovered
						? "rgba(155,92,255,0.35)"
						: "rgba(255,255,255,0.07)",
				} as React.CSSProperties
			}
		>
			<div
				style={{
					position: "absolute",
					top: -40,
					right: -40,
					width: 160,
					height: 160,
					borderRadius: 999,
					background:
						"radial-gradient(circle, rgba(124,216,90,.2), transparent 70%)",
					pointerEvents: "none",
				}}
			/>
			<div className="row between" style={{ marginBottom: 40 }}>
				<div
					className="mono"
					style={{
						fontSize: 12,
						color: "rgba(255,255,255,.4)",
						letterSpacing: "0.14em",
					}}
				>
					{it.k}
				</div>
				<div
					style={{
						width: 44,
						height: 44,
						borderRadius: 12,
						display: "grid",
						placeItems: "center",
						background:
							"linear-gradient(135deg, rgba(124,216,90,.2), rgba(155,92,255,.15))",
						border: "1px solid rgba(124,216,90,.25)",
						color: "#a8e88a",
					}}
				>
					<IconEl style={{ width: 22, height: 22 }} />
				</div>
			</div>
			<h3 style={{ marginBottom: 14, color: "white", fontWeight: 500 }}>
				{it.t}
			</h3>
			<p
				style={{
					color: "rgba(255,255,255,.62)",
					fontSize: 14.5,
					lineHeight: 1.55,
					margin: 0,
				}}
			>
				{it.d}
			</p>
		</button>
	);
}

const BENEFIT_ICONS: readonly BenefitIcon[] = ["spark", "clock", "trend", "brain"];

export function Benefits() {
	const { messages } = useLanguage();
	const items = useMemo<BenefitItem[]>(
		() =>
			messages.benefits.items.map((it, i) => ({
				k: String(i + 1).padStart(2, "0"),
				t: it.t,
				d: it.d,
				ic: BENEFIT_ICONS[i] ?? "spark",
			})),
		[messages],
	);
	const ref = useReveal();
	return (
		<section
			className="section"
			id="services"
			style={{
				background: "linear-gradient(180deg, #0e3f15, #15581c)",
				paddingTop: 160,
				overflowX: "hidden",
			}}
		>
			<div className="grid-bg" style={{ opacity: 0.35 }} />
			<div
				className="orb benefits-orb"
				style={{
					width: 420,
					height: 420,
					top: 20,
					right: -80,
					background: "#9b5cff",
					filter: "blur(120px)",
					opacity: "calc(.4 * var(--accent-i))" as string,
				}}
			/>
			<div ref={ref} className="container reveal">
				<div
					className="row between"
					style={{
						alignItems: "flex-end",
						marginBottom: 64,
						flexWrap: "wrap",
						gap: 40,
					}}
				>
					<div style={{ maxWidth: 680 }}>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							{messages.benefits.eyebrow}
						</div>
						<h2>
							{messages.benefits.titleBefore}{" "}
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								{messages.benefits.titleHighlight}
							</span>
						</h2>
					</div>
					<p
						style={{
							maxWidth: 360,
							fontSize: 15,
							color: "rgba(255,255,255,.65)",
							lineHeight: 1.6,
						}}
					>
						{messages.benefits.blurb}
					</p>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: 20,
					}}
				>
					{items.map((it, i) => (
						<BenefitCard key={it.k} it={it} delay={i * 120} />
					))}
				</div>
			</div>
		</section>
	);
}
