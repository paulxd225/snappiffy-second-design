import { useMemo, useRef, useSyncExternalStore } from "react";
import { useScrollProgress } from "../hooks/use-scroll-progress";
import { useLanguage } from "../i18n/LanguageContext";

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

import timeline1 from "../assets/timeline1.png";
import timeline2 from "../assets/timeline2.png";
import timeline3 from "../assets/timeline3.png";

const STEP_LAYOUT = [
	{ k: "01", side: "right" as const, image: timeline1 },
	{ k: "02", side: "left" as const, image: timeline2 },
	{ k: "03", side: "right" as const, image: timeline3 },
] as const;

type TimelineStepData = {
	k: string;
	t: string;
	d: string;
	side: "left" | "right";
	image: string;
};

function TimelineStep({
	s,
	active,
	isMobile,
	stepWord,
	visualWord,
}: {
	s: TimelineStepData;
	active: boolean;
	isMobile: boolean;
	stepWord: string;
	visualWord: string;
}) {
	const circle = (
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
				fontSize: isMobile ? 18 : 20,
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
	);

	const textBlock = (
		<div
			style={{
				flex: isMobile ? undefined : 0.4,
				minWidth: isMobile ? 0 : undefined,
				textAlign: isMobile ? "left" : s.side === "right" ? "left" : "right",
				width: isMobile ? "100%" : undefined,
			}}
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
				{stepWord} {s.k}
			</div>
			<h3
				style={{
					color: "white",
					fontWeight: 500,
					marginBottom: 14,
					fontSize: isMobile ? "clamp(22px, 5.5vw, 28px)" : 30,
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
					fontSize: isMobile ? 15 : 15.5,
					lineHeight: 1.6,
					color: "rgba(255,255,255,.7)",
					maxWidth: isMobile ? "none" : 440,
					marginLeft: isMobile ? 0 : s.side === "right" ? 0 : "auto",
					opacity: active ? 1 : 0.3,
					transition: "opacity .6s .2s, transform .6s .2s",
					transform: active ? "translateY(0)" : "translateY(10px)",
				}}
			>
				{s.d}
			</p>
		</div>
	);

	const imageCard = (
		<div
			style={{
				width: isMobile ? "100%" : 280,
				maxWidth: "100%",
				height: isMobile ? 0 : 180,
				paddingBottom: isMobile ? `${(180 / 280) * 100}%` : 0,
				borderRadius: 18,
				background: "#0e0e12",
				border: "1px solid rgba(255,255,255,.08)",
				position: "relative",
				overflow: "hidden",
				opacity: active ? 1 : 0.3,
				transform: active ? "scale(1)" : "scale(0.96)",
				transition: "all .7s cubic-bezier(.2,.7,.2,1)",
				boxSizing: "border-box",
			}}
		>
			<img
				src={s.image}
				alt=""
				draggable={false}
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: "center",
					zIndex: 0,
				}}
			/>
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 1,
					background:
						"linear-gradient(135deg, rgba(124,216,90,.15), rgba(155,92,255,.15))",
					pointerEvents: "none",
				}}
			/>
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 2,
					backgroundImage:
						"repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0 2px, transparent 2px 14px)",
					pointerEvents: "none",
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
					zIndex: 3,
				}}
			>
				{stepWord} {s.k} {visualWord}
			</div>
		</div>
	);

	if (isMobile) {
		return (
			<div
				className="row"
				style={{
					padding: "36px 0",
					position: "relative",
					minHeight: 200,
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "stretch",
					gap: 16,
					width: "100%",
					maxWidth: "100%",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						position: "relative",
						width: 62,
						flex: "0 0 62px",
						alignSelf: "stretch",
					}}
				>
					{circle}
				</div>
				<div
					style={{
						flex: "1 1 0",
						minWidth: 0,
						display: "flex",
						flexDirection: "column",
						gap: 20,
						alignItems: "stretch",
					}}
				>
					{textBlock}
					{imageCard}
				</div>
			</div>
		);
	}

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
			{textBlock}
			<div style={{ position: "relative", width: 62 }}>{circle}</div>
			<div style={{ flex: 0.4, display: "grid", placeItems: "center" }}>
				{imageCard}
			</div>
		</div>
	);
}

export function Timeline() {
	const { messages } = useLanguage();
	const steps = useMemo<TimelineStepData[]>(
		() =>
			STEP_LAYOUT.map((layout, i) => ({
				...layout,
				...messages.timeline.steps[i],
			})),
		[messages],
	);
	const sectionRef = useRef<HTMLElement>(null);
	const p = useScrollProgress(sectionRef);
	const isMobile = useSyncExternalStore(
		subscribeMobile,
		getMobileSnapshot,
		getMobileServerSnapshot,
	);

	const lineLeft = isMobile ? 31 : "50%";

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
						{messages.timeline.eyebrow}
					</div>
					<h2 style={{ maxWidth: 800, margin: "0 auto" }}>
						{messages.timeline.titleBefore}{" "}
						<span className="serif-italic" style={{ color: "#c084ff" }}>
							{messages.timeline.titleHighlight}
						</span>{" "}
						{messages.timeline.titleAfter}
					</h2>
				</div>
				<div
					style={{
						position: "relative",
						maxWidth: isMobile ? "100%" : 1000,
						margin: "0 auto",
						width: "100%",
						boxSizing: "border-box",
					}}
				>
					{/* Background line */}
					<div
						style={{
							position: "absolute",
							left: lineLeft,
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
							left: lineLeft,
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
							isMobile={isMobile}
							stepWord={messages.timeline.stepWord}
							visualWord={messages.timeline.visual}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
