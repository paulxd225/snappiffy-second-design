import { useState } from "react";
import { Icons } from "../components/Icons";
import { Skeleton } from "../components/ui/skeleton";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";
import type { Messages } from "../i18n/en.messages";

type IconKey = keyof typeof Icons;

type TileId = keyof Messages["projects"]["tiles"];

type Tile = {
	id: TileId;
	c: string;
	ic: IconKey;
	bg?: string;
};

const PROJECTS_IMAGES = {
	foodordering: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966578/foodordering_vrcdqe.png",
	},
	fitnesscoach: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966579/fitnesscoach_ijbfpu.png",
	},
	healthcare: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966541/healthcare_q3ntuh.png",
	},
	barbershop: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966580/barbershop_k8mijx.jpg",
	},
	marketplace: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966539/marketplace_s5xj4e.webp",
	},
	elearning: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966579/Elearning_j7yyzf.png",
	},
	travel: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966539/travel_g6xysx.png",
	},
	events: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966579/events_upaj1l.png",
	},
	navigation: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966539/navigation_q679ls.webp",
	},
	logistics: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966540/logistics_vgd4td.jpg",
	},
	legalops: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966540/legalops_ckwfiu.jpg",
	},
	api: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966580/API_berafe.jpg",
	},
	payrolls: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966538/payrolls_ls7xnw.jpg",
	},
	pos: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966538/POSsystems_swdj8n.jpg",
	},
	assistants: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776966581/AIassistants_ndcu9l.jpg",
	},
	dashboards: {
		image:"https://res.cloudinary.com/dufos4tti/image/upload/q_auto/f_auto/v1776970104/dashboard1_yaujyh_8fe85c.png",
	},
}
const row1: Tile[] = [
	{ id: "food", c: "#ff3df0", ic: "utensil", bg: PROJECTS_IMAGES.foodordering.image},
	{
		id: "fitness",
		c: "#7cd85a",
		ic: "users",
		bg: PROJECTS_IMAGES.fitnesscoach.image,
	},
	{ id: "health", c: "#54c5f8", ic: "plus", bg: PROJECTS_IMAGES.healthcare.image },
	{ id: "barber", c: "#c084ff", ic: "spark", bg: PROJECTS_IMAGES.barbershop.image },
	{
		id: "marketplace",
		c: "#ffa000",
		ic: "cart",
		bg: PROJECTS_IMAGES.marketplace.image,
	},
	{
		id: "elearning",
		c: "#2ea02c",
		ic: "chip",
		bg: PROJECTS_IMAGES.elearning.image,
	},
	{
		id: "travel",
		c: "#ff7ae3",
		ic: "pin",
		bg: PROJECTS_IMAGES.travel.image,
	},
	{ id: "events", c: "#9b5cff", ic: "spark", bg: PROJECTS_IMAGES.events.image },
];
const row2: Tile[] = [
	{ id: "navigation", c: "#68a063", ic: "pin", bg: PROJECTS_IMAGES.navigation.image },
	{ id: "logistics", c: "#e0234e", ic: "trend", bg: PROJECTS_IMAGES.logistics.image },
	{ id: "legalops", c: "#3178c6", ic: "chip", bg: PROJECTS_IMAGES.legalops.image },
	{ id: "api", c: "#c084ff", ic: "spark", bg: PROJECTS_IMAGES.api.image },
	{ id: "payrolls", c: "#4cc23a", ic: "users", bg: PROJECTS_IMAGES.payrolls.image },
	{ id: "pos", c: "#ff3df0", ic: "cart", bg: PROJECTS_IMAGES.pos.image },
	{
		id: "assistants",
		c: "#9b5cff",
		ic: "brain",
		bg: PROJECTS_IMAGES.assistants.image,
	},
	{
		id: "dashboards",
		c: "#10a37f",
		ic: "trend",
		bg: PROJECTS_IMAGES.dashboards.image,
	},
];

/** Portrait 9 : 19.5 (same class of ratio as modern iPhone displays). */
const PHONE_TILE_WIDTH = 200;

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
	const [imgFailed, setImgFailed] = useState(false);

	const rOuter = 28;
	const rDevice = 25;
	return (
		<div
			style={{
				flex: "0 0 auto",
				width: PHONE_TILE_WIDTH,
				aspectRatio: "9 / 19.5",
				alignSelf: "flex-start",
				borderRadius: rOuter,
				padding: 3,
				background:
					"linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
				border: "1px solid rgba(255,255,255,0.08)",
				position: "relative",
				overflow: "hidden",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					bottom: "-18%",
					right: "-18%",
					width: "75%",
					aspectRatio: "1",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${it.c}55, transparent 68%)`,
					zIndex: 0,
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					position: "relative",
					zIndex: 1,
					width: "100%",
					flex: 1,
					minHeight: 0,
					borderRadius: rDevice,
					border: "3px solid #0a0a0a",
					boxShadow:
						"inset 0 0 0 0.5px rgba(255,255,255,0.18), 0 6px 24px -8px rgba(0,0,0,0.55)",
					overflow: "hidden",
					background: "#000",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						minHeight: 0,
						position: "relative",
						overflow: "hidden",
					}}
				>
					{it.bg && !imgFailed ? (
						<img
							src={it.bg}
							alt=""
							aria-hidden="true"
							loading="lazy"
							onError={() => setImgFailed(true)}
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: 0.82,
								transform: "scale(1.04)",
								filter: "saturate(1.05) contrast(1.04)",
								zIndex: 0,
							}}
						/>
					) : null}
					{it.bg && imgFailed ? (
						<div
							aria-hidden="true"
							style={{
								position: "absolute",
								inset: 0,
								zIndex: 1,
								overflow: "hidden",
							}}
						>
							<Skeleton className="absolute inset-0 size-full rounded-none" />
						</div>
					) : null}
					{it.bg && !imgFailed ? (
						<div
							aria-hidden="true"
							style={{
								position: "absolute",
								inset: 0,
								background: `linear-gradient(165deg, ${it.c}30, ${it.c}0c 55%, rgba(0,0,0,0.35) 100%)`,
								zIndex: 1,
							}}
						/>
					) : null}
					<div
						aria-hidden="true"
						style={{
							position: "absolute",
							top: 3,
							left: "50%",
							transform: "translateX(-50%)",
							width: "30%",
							minWidth: 56,
							maxWidth: 88,
							height: 9,
							borderRadius: 999,
							background: "#0a0a0a",
							boxShadow: "0 0.5px 1.5px rgba(0,0,0,0.35)",
							zIndex: 2,
						}}
					/>
					<div
						className="row between center"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 3,
							padding: "14px 12px 16px",
							background:
								"linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 28%, rgba(0,0,0,0.78) 100%)",
						}}
					>
						<div style={{ minWidth: 0, paddingRight: 8 }}>
							<div
								className="mono"
								style={{
									fontSize: 10,
									color: it.c,
									letterSpacing: "0.12em",
									textShadow: "0 1px 3px rgba(0,0,0,0.8)",
								}}
							>
								{appType}
							</div>
							<div
								style={{
									fontSize: 15,
									fontWeight: 500,
									color: "white",
									marginTop: 3,
									display: "flex",
									alignItems: "center",
									gap: 6,
									textShadow: "0 1px 4px rgba(0,0,0,0.85)",
								}}
							>
								<span
									style={{
										width: 20,
										height: 20,
										borderRadius: 6,
										background: "rgba(255,255,255,0.12)",
										backdropFilter: "blur(8px)",
										display: "grid",
										placeItems: "center",
										flex: "0 0 auto",
									}}
								>
									<IconEl style={{ width: 12, height: 12, opacity: 0.95 }} />
								</span>
								<span
									style={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{title}
								</span>
							</div>
						</div>
						<span
							style={{
								width: 24,
								height: 24,
								borderRadius: 999,
								background: "rgba(255,255,255,0.1)",
								backdropFilter: "blur(6px)",
								display: "grid",
								placeItems: "center",
								color: "white",
								flex: "0 0 auto",
							}}
						>
							<Icons.arrow style={{ width: 12, height: 12 }} />
						</span>
					</div>
				</div>
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
							key={`${it.id}:${copy}:${it.bg ?? ""}`}
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
