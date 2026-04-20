import { useEffect, useRef, useState } from "react";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";

type IconKey = keyof typeof Icons;

const items: Array<{ t: string; d: string; ic: IconKey; c: string }> = [
	{
		t: "Restaurant / Entertainment",
		d: "Restaurant related, event organization, online ticket sales, beverages, groceries and more.",
		ic: "utensil",
		c: "#ff3df0",
	},
	{
		t: "Self-employed / Services",
		d: "Lawyer, accountant, tax preparer, barber, fitness coach — or any service area.",
		ic: "users",
		c: "#9b5cff",
	},
	{
		t: "Marketplaces / Retail",
		d: "Online store, one-time & recurring payments, customer dashboard and inventory ops.",
		ic: "cart",
		c: "#7cd85a",
	},
	{
		t: "AI-integrated processes",
		d: "Analyze your ops to find automation opportunities and implement AI into your business.",
		ic: "brain",
		c: "#c084ff",
	},
];

function IndustryCard({ it }: { it: (typeof items)[0] }) {
	const ref = useRef<HTMLDivElement>(null);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const IconEl = Icons[it.ic];

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onMove = (e: MouseEvent) => {
			const r = el.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width - 0.5;
			const y = (e.clientY - r.top) / r.height - 0.5;
			setTilt({ x: x * 8, y: -y * 8 });
		};
		const onLeave = () => setTilt({ x: 0, y: 0 });
		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	return (
		<div
			ref={ref}
			style={{
				borderRadius: 20,
				padding: 28,
				background: "white",
				border: "1px solid rgba(7,18,9,.06)",
				boxShadow: "0 10px 30px -18px rgba(7,18,9,.1)",
				transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
				transformStyle: "preserve-3d",
				transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
				minHeight: 280,
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: -30,
					right: -30,
					width: 120,
					height: 120,
					borderRadius: 999,
					background: `radial-gradient(circle, ${it.c}33, transparent 70%)`,
				}}
			/>
			<div
				style={{
					width: 52,
					height: 52,
					borderRadius: 14,
					background: it.c,
					color: "white",
					display: "grid",
					placeItems: "center",
					boxShadow: `0 10px 24px -10px ${it.c}`,
					marginBottom: 24,
				}}
			>
				<IconEl style={{ width: 24, height: 24 }} />
			</div>
			<h3
				style={{
					color: "var(--ink)",
					marginBottom: 10,
					fontWeight: 500,
					fontSize: 20,
				}}
			>
				{it.t}
			</h3>
			<p
				style={{
					color: "rgba(7,18,9,.6)",
					fontSize: 14,
					lineHeight: 1.55,
					margin: 0,
				}}
			>
				{it.d}
			</p>
		</div>
	);
}

export function Industries() {
	const ref = useReveal();
	return (
		<section
			id="industries"
			className="section light"
			style={{ background: "var(--paper)", paddingTop: 140 }}
		>
			<div ref={ref} className="container reveal">
				<div style={{ textAlign: "center", marginBottom: 56 }}>
					<div
						className="eyebrow"
						style={{
							justifyContent: "center",
							display: "inline-flex",
							marginBottom: 20,
						}}
					>
						Shoulder to shoulder to succeed
					</div>
					<h2 style={{ color: "var(--ink)", maxWidth: 900, margin: "0 auto" }}>
						What kind of industries{" "}
						<span className="serif-italic" style={{ color: "#9b5cff" }}>
							do we specialize in?
						</span>
					</h2>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: 16,
					}}
				>
					{items.map((it) => (
						<IndustryCard key={it.t} it={it} />
					))}
				</div>
			</div>
		</section>
	);
}
