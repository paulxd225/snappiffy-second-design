import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";

type IconKey = keyof typeof Icons;

const row1: Array<{ t: string; c: string; ic: IconKey }> = [
	{ t: "Food Ordering", c: "#ff3df0", ic: "utensil" },
	{ t: "Fitness Coach", c: "#7cd85a", ic: "users" },
	{ t: "Healthcare", c: "#54c5f8", ic: "plus" },
	{ t: "Barbershop", c: "#c084ff", ic: "spark" },
	{ t: "Marketplace", c: "#ffa000", ic: "cart" },
	{ t: "E-Learning", c: "#2ea02c", ic: "chip" },
	{ t: "Travel & Bookings", c: "#ff7ae3", ic: "pin" },
	{ t: "Events", c: "#9b5cff", ic: "spark" },
];
const row2: Array<{ t: string; c: string; ic: IconKey }> = [
	{ t: "Real Estate", c: "#68a063", ic: "pin" },
	{ t: "Logistics", c: "#e0234e", ic: "trend" },
	{ t: "Legal Ops", c: "#3178c6", ic: "chip" },
	{ t: "Loyalty", c: "#c084ff", ic: "spark" },
	{ t: "HR / Payroll", c: "#4cc23a", ic: "users" },
	{ t: "POS Systems", c: "#ff3df0", ic: "cart" },
	{ t: "AI Assistants", c: "#9b5cff", ic: "brain" },
	{ t: "Dashboards", c: "#10a37f", ic: "trend" },
];

function ProjectTile({ it }: { it: (typeof row1)[0] }) {
	const IconEl = Icons[it.ic];
	return (
		<div
			style={{
				flex: "0 0 auto",
				width: 240,
				height: 320,
				borderRadius: 22,
				padding: 18,
				background:
					"linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
				border: "1px solid rgba(255,255,255,0.07)",
				position: "relative",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					position: "absolute",
					bottom: -40,
					right: -40,
					width: 180,
					height: 180,
					borderRadius: 999,
					background: `radial-gradient(circle, ${it.c}66, transparent 70%)`,
				}}
			/>
			<div
				style={{
					flex: 1,
					marginBottom: 14,
					borderRadius: 14,
					background: "#0e0e12",
					padding: 6,
					position: "relative",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						borderRadius: 10,
						background: `linear-gradient(165deg, ${it.c}, ${it.c}66 60%, #071209)`,
						padding: 12,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div
						style={{
							width: 28,
							height: 4,
							background: "rgba(255,255,255,.3)",
							borderRadius: 2,
							margin: "0 auto 10px",
						}}
					/>
					<div style={{ color: "white" }}>
						<IconEl style={{ width: 22, height: 22, opacity: 0.9 }} />
					</div>
					<div style={{ marginTop: "auto" }}>
						<div
							style={{
								width: "70%",
								height: 6,
								background: "rgba(255,255,255,.5)",
								borderRadius: 3,
								marginBottom: 4,
							}}
						/>
						<div
							style={{
								width: "45%",
								height: 4,
								background: "rgba(255,255,255,.3)",
								borderRadius: 2,
							}}
						/>
					</div>
				</div>
			</div>
			<div className="row between center">
				<div>
					<div
						className="mono"
						style={{ fontSize: 10, color: it.c, letterSpacing: "0.12em" }}
					>
						APP TYPE
					</div>
					<div
						style={{
							fontSize: 15,
							fontWeight: 500,
							color: "white",
							marginTop: 2,
						}}
					>
						{it.t}
					</div>
				</div>
				<span
					style={{
						width: 26,
						height: 26,
						borderRadius: 999,
						background: "rgba(255,255,255,.06)",
						display: "grid",
						placeItems: "center",
						color: "white",
					}}
				>
					<Icons.arrow style={{ width: 12, height: 12 }} />
				</span>
			</div>
		</div>
	);
}

function MarqueeRow({
	items,
	dir,
	dur,
}: {
	items: typeof row1;
	dir: "l" | "r";
	dur: number;
}) {
	return (
		<div
			style={{
				overflow: "hidden",
				maskImage:
					"linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: 20,
					width: "fit-content",
					animation: `marquee-${dir} ${dur}s linear infinite`,
				}}
			>
				{[0, 1].flatMap((copy) =>
					items.map((it) => <ProjectTile key={`${it.t}:${copy}`} it={it} />),
				)}
			</div>
		</div>
	);
}

export function Projects() {
	const ref = useReveal();
	return (
		<section
			id="catalogue"
			className="section"
			style={{
				background: "linear-gradient(180deg, #0e3f15, #15581c)",
				paddingTop: 160,
				overflow: "hidden",
			}}
		>
			<div className="grid-bg" style={{ opacity: 0.2 }} />
			<div ref={ref} className="container reveal" style={{ marginBottom: 56 }}>
				<div
					className="row between"
					style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
				>
					<div>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							Project catalogue
						</div>
						<h2>
							What kind of projects{" "}
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								are we capable of?
							</span>
						</h2>
					</div>
					<p
						style={{
							maxWidth: 320,
							fontSize: 15,
							color: "rgba(255,255,255,.65)",
							lineHeight: 1.6,
						}}
					>
						Over 40 apps shipped across industries. Here's a sample of what
						we've built.
					</p>
				</div>
			</div>
			<MarqueeRow items={row1} dir="l" dur={60} />
			<div style={{ height: 24 }} />
			<MarqueeRow items={row2} dir="r" dur={72} />
		</section>
	);
}
