import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";
import type { Messages } from "../i18n/en.messages";

import apiBg from "../assets/projects_types/API.jpg";
import assistantsBg from "../assets/projects_types/AIassistants.jpg";
import barbershopBg from "../assets/projects_types/barbershop.jpeg";
import dashboardBg from "../assets/projects_types/dashboard.png";
import elearningBg from "../assets/projects_types/Elearning.png";
import eventsBg from "../assets/projects_types/events.png";
import fitnesscoachBg from "../assets/projects_types/fitnesscoach.png";
import foodorderingBg from "../assets/projects_types/foodordering.png";
import healthcareBg from "../assets/projects_types/healthcare.png";
import legalopsBg from "../assets/projects_types/legalops.jpg";
import logisticsBg from "../assets/projects_types/logistics.jpg";
import marketplaceBg from "../assets/projects_types/marketplace.webp";
import navigationBg from "../assets/projects_types/navigation.webp";
import payrollsBg from "../assets/projects_types/payrolls.jpg";
import posBg from "../assets/projects_types/POSsystems.jpg";
import travelBg from "../assets/projects_types/travel.png";

type IconKey = keyof typeof Icons;

type TileId = keyof Messages["projects"]["tiles"];

type Tile = {
	id: TileId;
	c: string;
	ic: IconKey;
	bg?: string;
};

const row1: Tile[] = [
	{ id: "food", c: "#ff3df0", ic: "utensil", bg: foodorderingBg },
	{
		id: "fitness",
		c: "#7cd85a",
		ic: "users",
		bg: fitnesscoachBg,
	},
	{ id: "health", c: "#54c5f8", ic: "plus", bg: healthcareBg },
	{ id: "barber", c: "#c084ff", ic: "spark", bg: barbershopBg },
	{
		id: "marketplace",
		c: "#ffa000",
		ic: "cart",
		bg: marketplaceBg,
	},
	{
		id: "elearning",
		c: "#2ea02c",
		ic: "chip",
		bg: elearningBg,
	},
	{
		id: "travel",
		c: "#ff7ae3",
		ic: "pin",
		bg: travelBg,
	},
	{ id: "events", c: "#9b5cff", ic: "spark", bg: eventsBg },
];
const row2: Tile[] = [
	{ id: "navigation", c: "#68a063", ic: "pin", bg: navigationBg },
	{ id: "logistics", c: "#e0234e", ic: "trend", bg: logisticsBg },
	{ id: "legalops", c: "#3178c6", ic: "chip", bg: legalopsBg },
	{ id: "api", c: "#c084ff", ic: "spark", bg: apiBg },
	{ id: "payrolls", c: "#4cc23a", ic: "users", bg: payrollsBg },
	{ id: "pos", c: "#ff3df0", ic: "cart", bg: posBg },
	{
		id: "assistants",
		c: "#9b5cff",
		ic: "brain",
		bg: assistantsBg,
	},
	{
		id: "dashboards",
		c: "#10a37f",
		ic: "trend",
		bg: dashboardBg,
	},
];

function ProjectTile({
	it,
	title,
	appType,
}: {
	it: Tile;
	title: string;
	appType: string;
}) {
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
					zIndex: 2,
				}}
			/>
			<div
				style={{
					flex: 1,
					marginBottom: 14,
					borderRadius: 14,
					background: "rgba(14,14,18,0.35)",
					padding: 6,
					position: "relative",
					zIndex: 3,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						borderRadius: 10,
						position: "relative",
						overflow: "hidden",
						padding: 12,
						display: "flex",
						flexDirection: "column",
					}}
				>
					{it.bg ? (
						<img
							src={it.bg}
							alt=""
							aria-hidden="true"
							loading="lazy"
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: 0.75,
								transform: "scale(1.05)",
								filter: "saturate(1.05) contrast(1.05)",
								zIndex: 0,
							}}
						/>
					) : null}
					<div
						aria-hidden="true"
						style={{
							position: "absolute",
							inset: 0,
							background: `linear-gradient(165deg, ${it.c}38, ${it.c}12 60%, rgba(7,18,9,0.22))`,
							zIndex: 1,
						}}
					/>
					<div style={{ position: "relative", zIndex: 2, display: "flex", flex: 1, flexDirection: "column" }}>
					<div
						style={{
							width: 28,
							height: 4,
							background: "rgba(255,255,255,.3)",
							borderRadius: 2,
							margin: "0 auto 10px",
						}}
					/>
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
			</div>
			<div className="row between center" style={{ position: "relative", zIndex: 3 }}>
				<div>
					<div
						className="mono"
						style={{ fontSize: 10, color: it.c, letterSpacing: "0.12em" }}
					>
						{appType}
					</div>
					<div
						style={{
							fontSize: 15,
							fontWeight: 500,
							color: "white",
							marginTop: 2,
							display: "flex",
							alignItems: "center",
							gap: 8,
						}}
					>
						<span
							style={{
								width: 22,
								height: 22,
								borderRadius: 8,
								background: "rgba(255,255,255,.08)",
								display: "grid",
								placeItems: "center",
								flex: "0 0 auto",
							}}
						>
							<IconEl style={{ width: 14, height: 14, opacity: 0.95 }} />
						</span>
						<span>{title}</span>
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
	tiles,
	appType,
}: {
	items: Tile[];
	dir: "l" | "r";
	dur: number;
	tiles: Messages["projects"]["tiles"];
	appType: string;
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
					items.map((it) => (
						<ProjectTile
							key={`${it.id}:${copy}`}
							it={it}
							title={tiles[it.id]}
							appType={appType}
						/>
					)),
				)}
			</div>
		</div>
	);
}

export function Projects() {
	const { messages } = useLanguage();
	const tiles = messages.projects.tiles;
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
							{messages.projects.eyebrow}
						</div>
						<h2>
							{messages.projects.titleBefore}{" "}
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								{messages.projects.titleHighlight}
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
						{messages.projects.blurb}
					</p>
				</div>
			</div>
			<MarqueeRow
				items={row1}
				dir="l"
				dur={60}
				tiles={tiles}
				appType={messages.projects.appType}
			/>
			<div style={{ height: 24 }} />
			<MarqueeRow
				items={row2}
				dir="r"
				dur={72}
				tiles={tiles}
				appType={messages.projects.appType}
			/>
		</section>
	);
}
