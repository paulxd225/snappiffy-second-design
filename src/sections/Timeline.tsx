import { useRef } from "react";
import { useScrollProgress } from "../hooks/use-scroll-progress";

const steps = [
	{
		k: "01",
		t: "Schedule a call or visit",
		d: "Book a discovery call or in-person visit (Only in Ohio) to deeply understand your needs and business process. We'll create an action plan letting you know scope, timeline, budget and deliverables.",
		side: "right" as const,
	},
	{
		k: "02",
		t: "Let's do it",
		d: "Once the agreement is approved, we begin the process. Follow up at any stage through our client portal or your designated project manager.",
		side: "left" as const,
	},
	{
		k: "03",
		t: "Delivery & handoff",
		d: "We'll have a handoff call where we walk through how the software works and how your project was built. Our support doesn't end there — we stay on.",
		side: "right" as const,
	},
];

function TimelineStep({
	s,
	active,
}: {
	s: (typeof steps)[0];
	active: boolean;
}) {
	return (
		<div
			className="row"
			style={{
				padding: "48px 0",
				position: "relative",
				minHeight: 220,
				flexDirection: s.side === "left" ? "row-reverse" : "row",
				justifyContent: "center",
				gap: 50,
			}}
		>
			<div
				style={{ flex: 0.4, textAlign: s.side === "right" ? "left" : "right" }}
			>
				<div
					className="mono"
					style={{
						fontSize: 12,
						color: "#a8e88a",
						letterSpacing: "0.18em",
						marginBottom: 10,
						opacity: active ? 1 : 0.4,
						transition: "opacity .6s",
					}}
				>
					STEP {s.k}
				</div>
				<h3
					style={{
						color: "white",
						fontWeight: 500,
						marginBottom: 14,
						fontSize: 30,
						letterSpacing: "-0.02em",
						opacity: active ? 1 : 0.4,
						transition: "opacity .6s .1s, transform .6s .1s",
						transform: active ? "translateY(0)" : "translateY(10px)",
					}}
				>
					{s.t}
				</h3>
				<p
					style={{
						fontSize: 15.5,
						lineHeight: 1.6,
						color: "rgba(255,255,255,.7)",
						maxWidth: 440,
						marginLeft: s.side === "right" ? 0 : "auto",
						opacity: active ? 1 : 0.3,
						transition: "opacity .6s .2s, transform .6s .2s",
						transform: active ? "translateY(0)" : "translateY(10px)",
					}}
				>
					{s.d}
				</p>
			</div>

			<div style={{ position: "relative", width: 62 }}>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						width: 62,
						height: 62,
						borderRadius: 999,
						background: active ? "#9b5cff" : "#2ea02c",
						display: "grid",
						placeItems: "center",
						color: "white",
						fontWeight: 700,
						fontSize: 20,
						fontFamily: "var(--sans)",
						letterSpacing: "-0.02em",
						border: "4px solid #0e3f15",
						boxShadow: active
							? "0 0 0 5px rgba(155,92,255,.25), 0 0 30px rgba(155,92,255,.6)"
							: "0 0 0 4px rgba(46,160,44,.2), 0 0 20px rgba(46,160,44,.4)",
						transition: "all .5s",
					}}
				>
					{s.k}
				</div>
			</div>

			<div style={{ flex: 0.4, display: "grid", placeItems: "center" }}>
				<div
					style={{
						width: 280,
						height: 180,
						borderRadius: 18,
						background:
							"linear-gradient(135deg, rgba(124,216,90,.15), rgba(155,92,255,.15))",
						border: "1px solid rgba(255,255,255,.08)",
						position: "relative",
						overflow: "hidden",
						opacity: active ? 1 : 0.3,
						transform: active ? "scale(1)" : "scale(0.96)",
						transition: "all .7s cubic-bezier(.2,.7,.2,1)",
					}}
				>
					<div
						style={{
							position: "absolute",
							inset: 0,
							backgroundImage:
								"repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0 2px, transparent 2px 14px)",
						}}
					/>
					<div
						className="mono"
						style={{
							position: "absolute",
							bottom: 12,
							left: 12,
							fontSize: 10,
							color: "rgba(255,255,255,.5)",
							letterSpacing: "0.2em",
						}}
					>
						STEP {s.k} VISUAL
					</div>
				</div>
			</div>
		</div>
	);
}

export function Timeline() {
	const sectionRef = useRef<HTMLElement>(null);
	const p = useScrollProgress(sectionRef);

	return (
		<section
			id="process"
			ref={sectionRef}
			className="section"
			style={{
				background: "linear-gradient(180deg, #15581c, #0e3f15)",
				paddingTop: 160,
				paddingBottom: 200,
				overflow: "hidden",
			}}
		>
			<div className="grid-bg" style={{ opacity: 0.2 }} />
			<div
				className="orb"
				style={{
					width: 480,
					height: 480,
					top: 200,
					left: "50%",
					transform: "translateX(-50%)",
					background: "#9b5cff",
					filter: "blur(140px)",
					opacity: "calc(.3 * var(--accent-i))" as string,
				}}
			/>
			<div className="container">
				<div style={{ textAlign: "center", marginBottom: 80 }}>
					<div
						className="eyebrow"
						style={{
							justifyContent: "center",
							display: "inline-flex",
							marginBottom: 20,
						}}
					>
						Our process
					</div>
					<h2 style={{ maxWidth: 800, margin: "0 auto" }}>
						A simple,{" "}
						<span className="serif-italic" style={{ color: "#c084ff" }}>
							three-step
						</span>{" "}
						process.
					</h2>
				</div>
				<div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
					{/* Background line */}
					<div
						style={{
							position: "absolute",
							left: "50%",
							top: 0,
							bottom: 0,
							width: 6,
							background: "rgba(168,232,138,0.18)",
							transform: "translateX(-3px)",
							borderRadius: 6,
							maskImage:
								"linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
							WebkitMaskImage:
								"linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
						}}
					/>
					{/* Animated fill */}
					<div
						style={{
							position: "absolute",
							left: "50%",
							top: 0,
							width: 6,
							transform: "translateX(-3px)",
							height: `${Math.min(100, p * 140)}%`,
							background: "#9b5cff",
							boxShadow: "0 0 24px #9b5cff, 0 0 12px #c084ff",
							borderRadius: 6,
							maskImage:
								"linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
							WebkitMaskImage:
								"linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
							transition: "height .3s linear",
						}}
					/>
					{steps.map((s, i) => (
						<TimelineStep
							key={s.k}
							s={s}
							active={p > i / steps.length + 0.05}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
