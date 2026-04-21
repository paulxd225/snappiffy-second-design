import { useEffect, useMemo, useRef, useState } from "react";

import cilantro1 from "../assets/apps-examples/cilantro1.png";
import cilantro2 from "../assets/apps-examples/cilantro2.png";
import cilantro3 from "../assets/apps-examples/cilantro3.png";
import cilantro4 from "../assets/apps-examples/cilantro4.png";
import cilantro5 from "../assets/apps-examples/cilantro5.png";
import cilantrologo from "../assets/apps-examples/cilantrologo.webp";
import enterprises1 from "../assets/apps-examples/enterprises1.png";
import enterprises2 from "../assets/apps-examples/enterprises2.png";
import enterprises3 from "../assets/apps-examples/enterprises3.png";
import enterprises4 from "../assets/apps-examples/enterprises4.png";
import enterprises5 from "../assets/apps-examples/enterprises5.png";
import enterpriseslogo from "../assets/apps-examples/enterpriseslogo.png";
import ochurros1 from "../assets/apps-examples/ochurros1.webp";
import ochurros2 from "../assets/apps-examples/ochurros2.webp";
import ochurros3 from "../assets/apps-examples/ochurros3.webp";
import ochurros4 from "../assets/apps-examples/ochurros4.webp";
import ochurros5 from "../assets/apps-examples/ochurros5.webp";
import ochurroslogo from "../assets/apps-examples/ochurroslogo.png";
import shapewear1 from "../assets/apps-examples/shapewear1.png";
import shapewear2 from "../assets/apps-examples/shapewear2.png";
import shapewear3 from "../assets/apps-examples/shapewear3.png";
import shapewear4 from "../assets/apps-examples/shapewear4.png";
import shapewear5 from "../assets/apps-examples/shapewear5.png";
import shapewearlogo from "../assets/apps-examples/shapewearlogo.png";
import { useLanguage } from "../i18n/LanguageContext";

const navBtnStyle: React.CSSProperties = {
	width: 44,
	height: 44,
	borderRadius: 999,
	border: "1px solid rgba(255,255,255,.14)",
	background: "rgba(255,255,255,.03)",
	color: "white",
	fontSize: 18,
	transition: "all .3s",
};

const CASE_APP_LAYOUT = [
	{
		color: "#7cd85a",
		accent: "#2ea02c",
		screens: [
			{ theme: "dark", palette: "#7cd85a" },
			{ theme: "dark", palette: "#2ea02c" },
			{ theme: "light", palette: "#7cd85a" },
			{ theme: "dark", palette: "#2ea02c" },
			{ theme: "dark", palette: "#4cc23a" },
		],
	},
	{
		color: "#FFBFFB",
		accent: "#c084ff",
		logo: ochurroslogo,
		screens: [
			{ theme: "light", palette: "#ff3df0", image: ochurros1 },
			{ theme: "light", palette: "#ff7ae3", image: ochurros2 },
			{ theme: "pink", palette: "#ff3df0", image: ochurros3 },
			{ theme: "dark", palette: "#c084ff", image: ochurros4 },
			{ theme: "light", palette: "#ff3df0", image: ochurros5 },
		],
	},
	{
		color: "#052E85",
		accent: "#0044cc",
		logo: enterpriseslogo,
		screens: [
			{ theme: "light", palette: "#1e6bff", image: enterprises1 },
			{ theme: "dark", palette: "#4d8fff", image: enterprises2 },
			{ theme: "light", palette: "#0066ff", image: enterprises3 },
			{ theme: "dark", palette: "#1e6bff", image: enterprises4 },
			{ theme: "light", palette: "#4d8fff", image: enterprises5 },
		],
	},
	{
		color: "#7A651D",
		accent: "#8b6914",
		logo: shapewearlogo,
		screens: [
			{ theme: "light", palette: "#c9a227", image: shapewear1 },
			{ theme: "dark", palette: "#d4b84a", image: shapewear2 },
			{ theme: "light", palette: "#e6c84a", image: shapewear3 },
			{ theme: "dark", palette: "#c9a227", image: shapewear4 },
			{ theme: "light", palette: "#8b6914", image: shapewear5 },
		],
	},
	{
		color: "#0f0f0f",
		accent: "#000",
		logo: cilantrologo,
		screens: [
			{ theme: "dark", palette: "#2d6a4f", image: cilantro1 },
			{ theme: "light", palette: "#40916c", image: cilantro2 },
			{ theme: "dark", palette: "#1b4332", image: cilantro3 },
			{ theme: "light", palette: "#2d6a4f", image: cilantro4 },
			{ theme: "dark", palette: "#40916c", image: cilantro5 },
		],
	},
] as const;

type Screen = { label: string; theme: string; palette: string; image?: string };
type App = {
	name: string;
	client: string;
	who: string;
	desc: string;
	color: string;
	accent: string;
	logo?: string;
	screens: Screen[];
};

function PhoneFrame({ screen, app }: { screen: Screen; app: App }) {
	const { theme, palette, label, image } = screen;
	const bg =
		theme === "light" ? "#f6faf4" : theme === "pink" ? "#ffe1f3" : "#0e0e12";
	const fg = theme === "dark" ? "white" : "#0e0e12";
	return (
		<div
			style={{
				width: 230,
				height: 470,
				borderRadius: 36,
				background: "#0e0e12",
				padding: 8,
				boxShadow:
					"0 30px 60px -20px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06), inset 0 0 0 2px rgba(255,255,255,.04)",
				position: "relative",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 28,
					background: bg,
					overflow: "hidden",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 8,
						left: "50%",
						transform: "translateX(-50%)",
						width: 80,
						height: 22,
						background: "#0e0e12",
						borderRadius: 14,
						zIndex: 2,
					}}
				/>
				{image ? (
					<img
						src={image}
						alt=""
						draggable={false}
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "top center",
							zIndex: 0,
						}}
					/>
				) : (
					<div
						style={{
							padding: "36px 14px 14px",
							color: fg,
							height: "100%",
							display: "flex",
							flexDirection: "column",
							position: "relative",
							zIndex: 1,
						}}
					>
						<div
							className="mono"
							style={{
								fontSize: 9,
								letterSpacing: "0.2em",
								opacity: 0.5,
								textTransform: "uppercase",
							}}
						>
							{app.name}
						</div>
						<div
							style={{
								fontSize: 20,
								fontWeight: 600,
								marginTop: 4,
								letterSpacing: "-0.02em",
							}}
						>
							{label}
						</div>
						<div
							style={{
								marginTop: 14,
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 8,
							}}
						>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									style={{
										aspectRatio: "1",
										borderRadius: 12,
										background:
											i % 2 === 0
												? `linear-gradient(135deg, ${palette}, ${palette}77)`
												: `linear-gradient(135deg, ${theme === "dark" ? "rgba(255,255,255,.08)" : "rgba(14,63,21,.06)"}, ${theme === "dark" ? "rgba(255,255,255,.02)" : "rgba(14,63,21,.02)"})`,
										boxShadow:
											i % 2 === 0 ? `0 4px 12px -4px ${palette}88` : "none",
									}}
								/>
							))}
						</div>
						<div style={{ marginTop: 14, flex: 1 }}>
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									className="row center gap-10"
									style={{
										padding: "8px 0",
										borderBottom:
											theme === "dark"
												? "1px solid rgba(255,255,255,.06)"
												: "1px solid rgba(14,63,21,.06)",
									}}
								>
									<div
										style={{
											width: 32,
											height: 32,
											borderRadius: 8,
											background: `${palette}55`,
										}}
									/>
									<div style={{ flex: 1 }}>
										<div
											style={{
												height: 6,
												borderRadius: 3,
												background:
													theme === "dark"
														? "rgba(255,255,255,.15)"
														: "rgba(14,63,21,.1)",
												width: "80%",
											}}
										/>
										<div
											style={{
												height: 4,
												borderRadius: 2,
												background:
													theme === "dark"
														? "rgba(255,255,255,.08)"
														: "rgba(14,63,21,.06)",
												width: "50%",
												marginTop: 4,
											}}
										/>
									</div>
									<div
										className="mono"
										style={{ fontSize: 10, color: palette, fontWeight: 500 }}
									>
										${(4 + i * 3).toFixed(2)}
									</div>
								</div>
							))}
						</div>
						<div
							style={{
								marginTop: 10,
								padding: "10px 8px",
								borderRadius: 16,
								background:
									theme === "dark"
										? "rgba(255,255,255,.05)"
										: "rgba(14,63,21,.05)",
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									style={{
										width: 8,
										height: 8,
										borderRadius: 999,
										background:
											i === 0
												? palette
												: theme === "dark"
													? "rgba(255,255,255,.25)"
													: "rgba(14,63,21,.2)",
									}}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function PhonesStrip({ app }: { app: App }) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef({ active: false, start: 0, left: 0 });
	const [dragging, setDragging] = useState(false);

	useEffect(() => {
		const el = scrollerRef.current;
		if (!el || !app.name) return;

		const onDown = (e: MouseEvent) => {
			dragRef.current = {
				active: true,
				start: e.pageX,
				left: el.scrollLeft,
			};
			setDragging(true);
		};
		const onMove = (e: MouseEvent) => {
			const d = dragRef.current;
			if (!d.active) return;
			el.scrollLeft = d.left - (e.pageX - d.start);
		};
		const endDrag = () => {
			dragRef.current.active = false;
			setDragging(false);
		};

		el.addEventListener("mousedown", onDown);
		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", endDrag);
		window.addEventListener("mouseup", endDrag);

		return () => {
			el.removeEventListener("mousedown", onDown);
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", endDrag);
			window.removeEventListener("mouseup", endDrag);
		};
	}, [app]);

	return (
		<div
			key={app.name}
			ref={scrollerRef}
			className="no-scrollbar"
			style={{
				display: "flex",
				gap: 24,
				overflowX: "auto",
				scrollSnapType: "x mandatory",
				padding: "20px 4px 40px",
				cursor: dragging ? "grabbing" : "grab",
				userSelect: "none",
			}}
		>
			{app.screens.map((s, k) => (
				<div
					key={`${app.name}-${s.label}`}
					style={{
						flex: "0 0 auto",
						scrollSnapAlign: "center",
						animation: "fadeInUp .7s cubic-bezier(.2,.7,.2,1) both",
						animationDelay: `${k * 90}ms`,
					}}
				>
					<PhoneFrame screen={s} app={app} />
				</div>
			))}
		</div>
	);
}

export function CaseStudy() {
	const { messages } = useLanguage();
	const apps = useMemo(
		() =>
			CASE_APP_LAYOUT.map((layout, i) => {
				const copy = messages.caseStudy.apps[i];
				const logo = "logo" in layout ? layout.logo : undefined;
				return {
					color: layout.color,
					accent: layout.accent,
					logo,
					name: copy.name,
					client: copy.client,
					who: copy.who,
					desc: copy.desc,
					screens: layout.screens.map((scr, j) => ({
						...scr,
						label: copy.screens[j] ?? "",
					})),
				} satisfies App;
			}),
		[messages],
	);
	const [idx, setIdx] = useState(0);
	const [auto, setAuto] = useState(true);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!auto) return;
		if (!apps[idx]) return;
		timer.current = setTimeout(
			() => setIdx((v) => (v + 1) % apps.length),
			4500,
		);
		return () => {
			const id = timer.current;
			if (id !== null) clearTimeout(id);
		};
	}, [idx, auto, apps, apps.length]);

	const go = (d: number) => {
		setAuto(false);
		setIdx((idx + d + apps.length) % apps.length);
	};
	const app = apps[idx];

	return (
		<section
			id="case-study"
			className="section"
			style={{
				background: "linear-gradient(180deg, #15581c, #0e3f15)",
				paddingTop: 140,
				overflow: "hidden",
			}}
		>
			<div className="grid-bg" style={{ opacity: 0.25 }} />
			<div
				className="orb"
				style={{
					width: 500,
					height: 500,
					top: 80,
					left: -100,
					background: app.color,
					filter: "blur(140px)",
					opacity: "calc(.35 * var(--accent-i))" as string,
					transition: "background 1s",
				}}
			/>
			<div className="container">
				<div
					className="row between"
					style={{
						alignItems: "flex-end",
						marginBottom: 48,
						flexWrap: "wrap",
						gap: 24,
					}}
				>
					<div>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							{messages.caseStudy.eyebrow}
						</div>
						<h2>
							{messages.caseStudy.titleBefore}{" "}
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								{messages.caseStudy.titleHighlight}
							</span>
						</h2>
					</div>
					<div className="row center gap-12">
						<button
							type="button"
							onClick={() => setAuto((a) => !a)}
							className="btn btn-ghost"
							style={{ padding: "10px 16px", fontSize: 13 }}
						>
							{auto
								? messages.caseStudy.autoplayOn
								: messages.caseStudy.autoplayOff}
						</button>
						<div className="row gap-8">
							<button type="button" onClick={() => go(-1)} style={navBtnStyle}>
								←
							</button>
							<button type="button" onClick={() => go(+1)} style={navBtnStyle}>
								→
							</button>
						</div>
					</div>
				</div>

				<div
					style={
						{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 40,
							marginBottom: 40,
							alignItems: "flex-start",
							flexWrap: "wrap",
						} as React.CSSProperties
					}
				>
					<div>
						<div className="row center gap-14" style={{ marginBottom: 18 }}>
							<div
								style={{
									width: 56,
									height: 56,
									borderRadius: 14,
									background: app.color,
									display: "grid",
									placeItems: "center",
									color: "white",
									fontWeight: 700,
									fontSize: 22,
									boxShadow: `0 10px 30px -10px ${app.color}`,
									overflow: "hidden",
								}}
							>
								{app.logo ? (
									<img
										src={app.logo}
										alt=""
										draggable={false}
										style={{
											width: "78%",
											height: "78%",
											objectFit: "contain",
										}}
									/>
								) : (
									app.name[0]
								)}
							</div>
							<div>
								<div style={{ fontSize: 24, fontWeight: 500, color: "white" }}>
									{app.name}
								</div>
								<div
									className="mono"
									style={{
										fontSize: 12,
										color: "rgba(255,255,255,.55)",
										letterSpacing: "0.1em",
										textTransform: "uppercase",
									}}
								>
									{app.client}
								</div>
							</div>
						</div>
						<p
							style={{
								fontSize: 16,
								lineHeight: 1.6,
								color: "rgba(255,255,255,.75)",
								maxWidth: 520,
								margin: 0,
							}}
						>
							{app.desc}
						</p>
						<div
							className="mono"
							style={{
								marginTop: 18,
								fontSize: 12,
								color: "rgba(255,255,255,.5)",
							}}
						>
							— {app.who}
						</div>
					</div>

					<div
						style={{
							display: "flex",
							gap: 10,
							flexWrap: "wrap",
							alignItems: "flex-end",
							justifyContent: "flex-end",
						}}
					>
						{apps.map((a, k) => (
							<button
								type="button"
								key={a.name}
								onClick={() => {
									setAuto(false);
									setIdx(k);
								}}
								style={{
									padding: "10px 14px",
									borderRadius: 12,
									border:
										"1px solid " +
										(k === idx ? a.color : "rgba(255,255,255,.1)"),
									background:
										k === idx
											? `linear-gradient(135deg, ${a.color}22, ${a.accent}22)`
											: "rgba(255,255,255,.02)",
									color: k === idx ? "white" : "rgba(255,255,255,.5)",
									fontFamily: "var(--mono)",
									fontSize: 11,
									letterSpacing: "0.1em",
									transition: "all .3s",
									textAlign: "left",
									minWidth: 0,
								}}
							>
								<div className="mono" style={{ fontSize: 9, opacity: 0.6 }}>
									0{k + 1}
								</div>
								<div
									style={{
										marginTop: 2,
										fontSize: 13,
										fontWeight: 500,
										fontFamily: "var(--sans)",
										letterSpacing: "normal",
									}}
								>
									{a.name}
								</div>
								{k === idx && auto && (
									<div
										style={{
											marginTop: 8,
											height: 2,
											background: "rgba(255,255,255,.1)",
											borderRadius: 2,
											overflow: "hidden",
										}}
									>
										<div
											key={idx}
											style={{
												width: "100%",
												height: "100%",
												background: a.color,
												animation: "progFill 4.5s linear",
												transformOrigin: "left",
											}}
										/>
									</div>
								)}
							</button>
						))}
					</div>
				</div>

				<PhonesStrip app={app} />
			</div>
		</section>
	);
}
