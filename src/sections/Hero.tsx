import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import manuelFerrerPhoto from "../assets/manuelferrer.webp";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";

const HERO_IMAGES = {
	bg: "https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776970840/hero-bg_iqsqni.jpg",
}
const MS_PER_CHAR = 85;
const PAUSE_AFTER_PHRASE_MS = 1000;

const techStack = [
	{ n: "Supabase", c: "#3ecf8e" },
	{ n: "React", c: "#61dafb" },
	{ n: "Flutter", c: "#54c5f8" },
	{ n: "FlutterFlow", c: "#9b5cff" },
	{ n: "Firebase", c: "#ffa000" },
	{ n: "HTML/CSS/JS", c: "#e34f26" },
	{ n: "Nest", c: "#e0234e" },
	{ n: "Node", c: "#68a063" },
	{ n: "TypeScript", c: "#3178c6" },
	{ n: "Claude", c: "#10a37f" },
	{ n: "Anthropic", c: "#c084ff" },
];

function TechMarquee({
	stackEyebrow,
	productionGrade,
}: {
	stackEyebrow: string;
	productionGrade: string;
}) {
	return (
		<div
			style={{
				position: "relative",
				marginTop: 120,
				paddingTop: 28,
				borderTop: "1px solid rgba(255,255,255,0.08)",
			}}
		>
			<div
				className="row between center"
				style={{ maxWidth: 1400, margin: "0 auto 20px", padding: "0 4px" }}
			>
				<div className="eyebrow" style={{ color: "#a8e88a" }}>
					{stackEyebrow}
				</div>
				<div
					className="mono"
					style={{
						fontSize: 11,
						color: "rgba(255,255,255,.5)",
						letterSpacing: "0.12em",
					}}
				>
					{productionGrade}
				</div>
			</div>
			<div
				style={{
					overflow: "hidden",
					maskImage:
						"linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
				}}
			>
				<div
					className="row"
					style={{
						gap: 56,
						animation: "marquee-l 40s linear infinite",
						width: "fit-content",
					}}
				>
					{[
						...techStack.map((it) => ({ it, key: it.n })),
						...techStack.map((it) => ({ it, key: `${it.n}-marquee` as const })),
					].map(({ it, key }) => (
						<div
							key={key}
							className="row center gap-12"
							style={{ padding: "14px 0", whiteSpace: "nowrap" }}
						>
							<span
								style={{
									width: 8,
									height: 8,
									borderRadius: 2,
									background: it.c,
									boxShadow: `0 0 10px ${it.c}`,
								}}
							/>
							<span
								style={{
									fontWeight: 500,
									fontSize: 20,
									letterSpacing: "-0.01em",
								}}
							>
								{it.n}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

type CyclePhase = "hold" | "deleting" | "typing";

export function Hero() {
	const { messages } = useLanguage();
	const prefix = messages.hero.prefix;
	const phrases = messages.hero.phrases;
	const introTarget = useMemo(
		() => `${prefix}${phrases[0]}`,
		[prefix, phrases],
	);

	const ref = useReveal();
	const mouseRef = useRef<HTMLElement>(null);
	const [mp, setMp] = useState({ x: 0.5, y: 0.5 });

	const [introProgress, setIntroProgress] = useState(0);
	const [lineSplit, setLineSplit] = useState(false);
	const postIntroReady = useRef(false);
	const [tail, setTail] = useState("");
	const [cyclePhase, setCyclePhase] = useState<CyclePhase | null>(null);
	const [activeIdx, setActiveIdx] = useState(0);
	const [typingTargetIndex, setTypingTargetIndex] = useState(0);

	useEffect(() => {
		// Re-run when hero copy changes (e.g. language switch via new `messages`).
		void prefix;
		void phrases;
		postIntroReady.current = false;
		setIntroProgress(0);
		setLineSplit(false);
		setTail("");
		setCyclePhase(null);
		setActiveIdx(0);
		setTypingTargetIndex(0);
	}, [prefix, phrases]);

	useEffect(() => {
		const el = mouseRef.current;
		if (!el) return;
		const onMove = (e: MouseEvent) => {
			const r = el.getBoundingClientRect();
			setMp({
				x: (e.clientX - r.left) / r.width,
				y: (e.clientY - r.top) / r.height,
			});
		};
		el.addEventListener("mousemove", onMove);
		return () => el.removeEventListener("mousemove", onMove);
	}, []);

	useEffect(() => {
		if (introProgress >= introTarget.length) return;
		const t = setTimeout(
			() => setIntroProgress((p) => p + 1),
			MS_PER_CHAR,
		);
		return () => clearTimeout(t);
	}, [introProgress, introTarget.length]);

	useLayoutEffect(() => {
		if (introProgress < introTarget.length) return;
		if (postIntroReady.current) return;
		postIntroReady.current = true;
		setLineSplit(true);
		setTail(phrases[0]);
		setActiveIdx(0);
		setCyclePhase("hold");
	}, [introProgress, introTarget.length, phrases]);

	useEffect(() => {
		if (introProgress < introTarget.length) return;
		if (cyclePhase !== "hold") return;
		const t = setTimeout(() => setCyclePhase("deleting"), PAUSE_AFTER_PHRASE_MS);
		return () => clearTimeout(t);
	}, [introProgress, introTarget.length, cyclePhase]);

	useEffect(() => {
		if (introProgress < introTarget.length) return;
		if (cyclePhase !== "deleting") return;
		if (tail.length === 0) {
			const next = (activeIdx + 1) % phrases.length;
			queueMicrotask(() => {
				setTypingTargetIndex(next);
				setCyclePhase("typing");
			});
			return;
		}
		const t = setTimeout(() => setTail((s) => s.slice(0, -1)), MS_PER_CHAR);
		return () => clearTimeout(t);
	}, [introProgress, introTarget.length, cyclePhase, tail, activeIdx, phrases.length]);

	useEffect(() => {
		if (introProgress < introTarget.length) return;
		if (cyclePhase !== "typing") return;
		const target = phrases[typingTargetIndex];
		if (tail.length >= target.length) {
			const finishedIdx = typingTargetIndex;
			queueMicrotask(() => {
				setActiveIdx(finishedIdx);
				setCyclePhase("hold");
			});
			return;
		}
		const t = setTimeout(() => {
			setTail((prev) => {
				if (prev.length >= target.length) return prev;
				return target.slice(0, prev.length + 1);
			});
		}, MS_PER_CHAR);
		return () => clearTimeout(t);
	}, [introProgress, introTarget.length, cyclePhase, tail, typingTargetIndex, phrases]);

	return (
		<section
			id="home"
			ref={mouseRef as React.RefObject<HTMLElement>}
			style={{
				position: "relative",
				minHeight: "100vh",
				padding: "140px 40px 80px",
				overflow: "hidden",
				background: "#0e3f15",
			}}
		>
			{/* Meeting photo background */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `url(${HERO_IMAGES.bg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					opacity: 0.42,
					filter: "saturate(0.85)",
				}}
			/>
			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					background:
						"linear-gradient(110deg, rgba(168,232,138,0.55) 0%, rgba(76,194,58,0.55) 25%, rgba(30,122,36,0.65) 55%, rgba(14,63,21,0.8) 85%, rgba(14,63,21,0.9) 100%)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: `radial-gradient(ellipse 60% 80% at ${mp.x * 100}% ${mp.y * 100}%, rgba(155,92,255,.18), transparent 60%)`,
					pointerEvents: "none",
				}}
			/>
			<div className="grid-bg" style={{ opacity: 0.5 }} />

			{/* Orbs */}
			<div
				className="orb"
				style={{
					width: 600,
					height: 600,
					top: -100,
					left: -120,
					background: "#d6f5c4",
					filter: "blur(100px)",
					opacity: 0.5,
					animation: "pulseGlow 7s ease-in-out infinite",
				}}
			/>
			<div
				className="orb"
				style={{
					width: 500,
					height: 500,
					bottom: -120,
					right: -80,
					background: "#9b5cff",
					filter: "blur(120px)",
					opacity: "calc(.55 * var(--accent-i))" as string,
					animation: "pulseGlow 9s ease-in-out infinite",
				}}
			/>
			<div
				className="orb"
				style={{
					width: 260,
					height: 260,
					top: "30%",
					right: "18%",
					background: "#ff3df0",
					filter: "blur(100px)",
					opacity: "calc(.35 * var(--accent-i))" as string,
				}}
			/>

			<div
				ref={ref}
				className="reveal"
				style={{
					position: "relative",
					maxWidth: 1400,
					margin: "0 auto",
					paddingTop: 60,
				}}
			>
				<div className="row gap-24" style={{ marginBottom: 32 }}>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 10,
							padding: "8px 14px 8px 10px",
							borderRadius: 999,
							background: "rgba(7,18,9,0.4)",
							border: "1px solid rgba(255,255,255,0.14)",
							backdropFilter: "blur(10px)",
							fontSize: 12,
							fontFamily: "var(--mono)",
							letterSpacing: "0.14em",
							textTransform: "uppercase",
						}}
					>
						<span
							style={{
								width: 8,
								height: 8,
								borderRadius: 999,
								background: "#7cd85a",
								boxShadow: "0 0 12px #7cd85a",
							}}
						/>
						{messages.hero.trusted}
					</div>
				</div>

				<h1
					style={{ maxWidth: 1100, marginBottom: 24, color: "#ffffff" }}
					aria-label={messages.hero.heroAria}
				>
					<span aria-hidden="true" style={{ display: "inline" }}>
						{introProgress < introTarget.length
							? introTarget.slice(0, introProgress)
							: !lineSplit
								? introTarget
								: (
										<>
											{prefix}
											{tail}
										</>
									)}
					</span>
					<br aria-hidden="true" />
					<span
						aria-hidden="true"
						style={{
							background:
								"linear-gradient(100deg, #c084ff 0%, #9b5cff 55%, #a47bff 100%)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
						}}
					>
						{messages.hero.poweredBy}
					</span>
					<br aria-hidden="true" />
					<span
						className="serif-italic"
						aria-hidden="true"
						style={{ fontSize: "0.62em", color: "#eefbe9", opacity: 0.9 }}
					>
						{messages.hero.tailored}
					</span>
				</h1>

				<p
					style={{
						maxWidth: 560,
						fontSize: 19,
						lineHeight: 1.55,
						color: "rgba(255,255,255,0.85)",
						marginBottom: 40,
					}}
				>
					{messages.hero.subtitle}
				</p>

				<div
					className="row gap-16 center"
					style={{ marginBottom: 60, flexWrap: "wrap" }}
				>
					<a href="#contact" className="btn btn-primary">
						{messages.hero.bookFree}{" "}
						<Icons.arrow className="chev" style={{ width: 16, height: 16 }} />
					</a>
					<a href="#case-study" className="btn btn-ghost">
						<Icons.play style={{ width: 12, height: 12 }} /> {messages.hero.seeWork}
					</a>
					<div className="row gap-16 center" style={{ marginLeft: 8 }}>
						{[
							messages.hero.pillCheaper,
							messages.hero.pillFaster,
							messages.hero.pillSmarter,
							messages.hero.pillScalable,
						].map((w) => (
							<div
								key={w}
								className="row center gap-8"
								style={{
									fontSize: 13,
									fontFamily: "var(--mono)",
									color: "rgba(255,255,255,0.85)",
								}}
							>
								<span
									style={{
										width: 18,
										height: 18,
										borderRadius: 999,
										background: "rgba(124,216,90,.2)",
										display: "grid",
										placeItems: "center",
										border: "1px solid rgba(124,216,90,.5)",
									}}
								>
									<Icons.check
										style={{ width: 10, height: 10, color: "#a8e88a" }}
									/>
								</span>
								{w}
							</div>
						))}
					</div>
				</div>

				{/* Quote strip */}
				<div
					style={{
						maxWidth: 820,
						padding: "20px 24px",
						borderRadius: 16,
						border: "1px solid rgba(255,255,255,0.1)",
						background: "rgba(7,18,9,0.35)",
						backdropFilter: "blur(16px)",
					}}
				>
					<p
						className="serif-italic"
						style={{
							fontSize: 18,
							margin: 0,
							marginBottom: 10,
							color: "#eefbe9",
						}}
					>
						{messages.hero.quote}
					</p>
					<div className="row center gap-12">
						<div
							style={{
								width: 48,
								height: 48,
								boxSizing: "border-box",
								padding: 2,
								borderRadius: 999,
								background:
									"linear-gradient(135deg, #9b5cff 0%, #c084ff 45%, #ff3df0 100%)",
								flexShrink: 0,
							}}
						>
							<div
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 999,
									overflow: "hidden",
									background: "rgba(7,18,9,0.25)",
								}}
							>
								<img
									src={manuelFerrerPhoto}
									alt="Manuel Ferrer"
									draggable={false}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block",
									}}
								/>
							</div>
						</div>
						<div style={{ fontSize: 13 }}>
							<b>Manuel Ferrer</b>{" "}
							<span
								className="mono"
								style={{
									color: "#a8e88a",
									marginLeft: 8,
									fontSize: 11,
									letterSpacing: "0.1em",
								}}
							>
								{messages.hero.ceoLine}
							</span>
						</div>
						<div className="row gap-8" style={{ marginLeft: "auto" }}>
							{[0, 1, 2, 3, 4].map((i) => (
								<span key={i} style={{ color: "#ffd166", fontSize: 14 }}>
									★
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			<TechMarquee
				stackEyebrow={messages.hero.stackEyebrow}
				productionGrade={messages.hero.productionGrade}
			/>
		</section>
	);
}
