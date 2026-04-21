import { useMemo } from "react";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";
import { useLanguage } from "../i18n/LanguageContext";

type VisualKind = "phones" | "browser" | "dash" | "ai" | "commerce";

type ServiceItem = {
	t: string;
	d: string;
	cols: number;
	rows: number;
	visual: VisualKind;
};

const SERVICE_LAYOUT: Array<{
	cols: number;
	rows: number;
	visual: VisualKind;
}> = [
	{ cols: 2, rows: 2, visual: "phones" },
	{ cols: 2, rows: 1, visual: "browser" },
	{ cols: 1, rows: 2, visual: "dash" },
	{ cols: 1, rows: 1, visual: "ai" },
	{ cols: 2, rows: 1, visual: "commerce" },
];

function Visual({ kind }: { kind: VisualKind }) {
	if (kind === "phones") {
		return (
			<div
				style={{
					position: "absolute",
					inset: 0,
					overflow: "hidden",
					borderRadius: 14,
				}}
			>
				<div
					style={{
						position: "absolute",
						bottom: -40,
						left: 20,
						right: 20,
						display: "flex",
						gap: 16,
						justifyContent: "center",
					}}
				>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							style={{
								width: 130,
								height: 260,
								borderRadius: 22,
								background: `linear-gradient(160deg, ${["#0e3f15", "#1e7a24", "#2ea02c"][i]}, #071209)`,
								border: "2px solid #0e3f15",
								transform: `translateY(${i === 1 ? -20 : 0}px) rotate(${[-5, 0, 5][i]}deg)`,
								boxShadow:
									"0 30px 40px -20px rgba(14,63,21,.4), inset 0 1px 0 rgba(255,255,255,.08)",
								padding: 10,
								animation: `floatY ${6 + i}s ease-in-out infinite`,
								animationDelay: `${i * 0.4}s`,
							}}
						>
							<div
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 14,
									background:
										"linear-gradient(180deg, rgba(124,216,90,.18), rgba(155,92,255,.2))",
									border: "1px solid rgba(255,255,255,.06)",
								}}
							>
								<div style={{ padding: 10 }}>
									<div
										style={{
											width: "60%",
											height: 6,
											background: "rgba(255,255,255,.2)",
											borderRadius: 3,
											marginBottom: 4,
										}}
									/>
									<div
										style={{
											width: "40%",
											height: 4,
											background: "rgba(255,255,255,.12)",
											borderRadius: 2,
										}}
									/>
									<div
										style={{
											marginTop: 12,
											display: "grid",
											gridTemplateColumns: "1fr 1fr",
											gap: 6,
										}}
									>
										{[0, 1, 2, 3].map((k) => (
											<div
												key={k}
												style={{
													height: 32,
													borderRadius: 6,
													background:
														k % 2
															? "rgba(124,216,90,.22)"
															: "rgba(155,92,255,.18)",
												}}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
	if (kind === "browser") {
		return (
			<div
				style={{
					position: "absolute",
					bottom: -20,
					left: 0,
					right: 0,
					height: "110%",
					borderRadius: 14,
					overflow: "hidden",
					background: "#0e3f15",
					boxShadow: "0 20px 40px -20px rgba(14,63,21,.3)",
				}}
			>
				<div
					className="row center gap-8"
					style={{
						padding: "10px 14px",
						background: "#081f0c",
						borderBottom: "1px solid rgba(255,255,255,.06)",
					}}
				>
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							style={{
								width: 10,
								height: 10,
								borderRadius: 999,
								background: ["#ff5f57", "#ffbd2e", "#28c840"][i],
							}}
						/>
					))}
					<div
						style={{
							marginLeft: 12,
							flex: 1,
							background: "rgba(255,255,255,.05)",
							borderRadius: 6,
							height: 20,
						}}
					/>
				</div>
				<div
					style={{
						padding: 16,
						display: "grid",
						gridTemplateColumns: "2fr 1fr",
						gap: 12,
					}}
				>
					<div
						style={{
							height: 80,
							borderRadius: 8,
							background:
								"linear-gradient(135deg, rgba(155,92,255,.3), rgba(124,216,90,.25))",
						}}
					/>
					<div
						style={{
							height: 80,
							borderRadius: 8,
							background: "rgba(255,255,255,.05)",
						}}
					/>
					<div
						style={{
							height: 16,
							borderRadius: 4,
							background: "rgba(255,255,255,.1)",
							gridColumn: "1/-1",
						}}
					/>
					<div
						style={{
							height: 12,
							borderRadius: 3,
							background: "rgba(255,255,255,.06)",
							gridColumn: "1/-1",
							width: "70%",
						}}
					/>
				</div>
			</div>
		);
	}
	if (kind === "dash") {
		return (
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: 14,
					background: "linear-gradient(180deg, #071209, #0e3f15)",
					padding: 14,
					overflow: "hidden",
				}}
			>
				<div className="row between center" style={{ marginBottom: 12 }}>
					<div
						style={{
							width: 40,
							height: 6,
							background: "rgba(255,255,255,.2)",
							borderRadius: 3,
						}}
					/>
					<div
						style={{
							width: 20,
							height: 20,
							borderRadius: 999,
							background: "rgba(155,92,255,.4)",
						}}
					/>
				</div>
				<svg
					viewBox="0 0 200 100"
					style={{ width: "100%", height: 100 }}
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#7cd85a" stopOpacity=".6" />
							<stop offset="1" stopColor="#7cd85a" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M0,80 L20,60 L40,65 L60,40 L80,50 L100,30 L120,35 L140,20 L160,25 L180,10 L200,15 L200,100 L0,100 Z"
						fill="url(#gArea)"
					/>
					<path
						d="M0,80 L20,60 L40,65 L60,40 L80,50 L100,30 L120,35 L140,20 L160,25 L180,10 L200,15"
						fill="none"
						stroke="#a8e88a"
						strokeWidth="1.5"
					/>
				</svg>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 8,
						marginTop: 12,
					}}
				>
					{[0, 1].map((i) => (
						<div
							key={i}
							style={{
								padding: 8,
								borderRadius: 6,
								background: "rgba(255,255,255,.04)",
							}}
						>
							<div
								style={{
									width: 30,
									height: 5,
									background: "rgba(255,255,255,.18)",
									borderRadius: 2,
								}}
							/>
							<div
								style={{
									marginTop: 4,
									fontSize: 14,
									color: i ? "#c084ff" : "#a8e88a",
									fontFamily: "var(--mono)",
								}}
							>
								{i ? "$42k" : "1.2k"}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
	if (kind === "ai") {
		return (
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: 14,
					background:
						"linear-gradient(135deg, rgba(155,92,255,.1), rgba(255,61,240,.08))",
					display: "grid",
					placeItems: "center",
					border: "1px dashed rgba(155,92,255,.3)",
				}}
			>
				<div style={{ position: "relative", width: 120, height: 120 }}>
					<div
						style={{
							position: "absolute",
							inset: 0,
							borderRadius: 999,
							border: "1px solid rgba(155,92,255,.4)",
							animation: "spinSlow 20s linear infinite",
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 14,
							borderRadius: 999,
							border: "1px dashed rgba(255,61,240,.4)",
							animation: "spinSlow 15s linear infinite reverse",
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 30,
							borderRadius: 999,
							background: "radial-gradient(circle, #c084ff, #9b5cff)",
							boxShadow: "0 0 40px #9b5cff",
							display: "grid",
							placeItems: "center",
							color: "white",
							fontSize: 10,
							fontFamily: "var(--mono)",
							letterSpacing: "0.14em",
						}}
					>
						AI
					</div>
				</div>
			</div>
		);
	}
	if (kind === "commerce") {
		return (
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: 14,
					background: "linear-gradient(180deg, #eefbe9, #d6f5c4)",
					padding: 16,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3,1fr)",
						gap: 8,
					}}
				>
					{[0, 1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							style={{
								aspectRatio: "1",
								borderRadius: 10,
								background: `linear-gradient(135deg, ${["#2ea02c", "#9b5cff", "#ff3df0", "#4cc23a", "#c084ff", "#7cd85a"][i]}, rgba(255,255,255,.4))`,
								boxShadow: "0 4px 10px -4px rgba(0,0,0,.2)",
								display: "grid",
								placeItems: "end start",
								padding: 8,
							}}
						>
							<div
								className="mono"
								style={{ fontSize: 10, color: "rgba(255,255,255,.9)" }}
							>
								${(19.99 + i * 5).toFixed(2)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
	return null;
}

function ServiceCell({ it, i }: { it: ServiceItem; i: number }) {
	const ref = useReveal();
	return (
		<div
			ref={ref}
			className="reveal service-bento-cell"
			style={
				{
					"--d": `${i * 80}ms`,
					gridColumn: `span ${it.cols}`,
					gridRow: `span ${it.rows}`,
					position: "relative",
					borderRadius: 20,
					overflow: "hidden",
					background: "white",
					border: "1px solid rgba(7,18,9,.06)",
					padding: 24,
					display: "flex",
					flexDirection: "column",
				} as React.CSSProperties
			}
		>
			<div style={{ flex: "0 0 auto", maxWidth: 420 }}>
				<h3 style={{ color: "var(--ink)", marginBottom: 8, fontWeight: 500 }}>
					{it.t}
				</h3>
				<p
					style={{
						color: "rgba(7,18,9,.6)",
						fontSize: 14.5,
						lineHeight: 1.55,
						margin: 0,
					}}
				>
					{it.d}
				</p>
			</div>
			<div style={{ flex: 1, position: "relative", marginTop: 16 }}>
				<Visual kind={it.visual} />
			</div>
			<div
				className="row center gap-8"
				style={{
					position: "absolute",
					top: 24,
					right: 24,
					color: "var(--green-700)",
					fontSize: 12,
					fontFamily: "var(--mono)",
					letterSpacing: "0.1em",
				}}
			>
				0{i + 1} <Icons.arrow style={{ width: 14, height: 14 }} />
			</div>
		</div>
	);
}

export function Services() {
	const { messages } = useLanguage();
	const items = useMemo<ServiceItem[]>(
		() =>
			SERVICE_LAYOUT.map((layout, i) => ({
				...layout,
				...messages.services.items[i],
			})),
		[messages],
	);
	const ref = useReveal();
	return (
		<section
			className="section light"
			style={{ background: "var(--paper)", paddingTop: 140 }}
		>
			<div className="container" ref={ref}>
				<div
					className="row between"
					style={{
						alignItems: "flex-end",
						marginBottom: 56,
						flexWrap: "wrap",
						gap: 24,
					}}
				>
					<div>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							{messages.services.eyebrow}
						</div>
						<h2 style={{ color: "var(--ink)", maxWidth: 900 }}>
							{messages.services.titleBefore}{" "}
							<span className="serif-italic" style={{ color: "#9b5cff" }}>
								{messages.services.titleHighlight}
							</span>
						</h2>
					</div>
					<a
						href="#catalogue"
						className="btn btn-ghost"
						style={{
							color: "var(--ink)",
							border: "1px solid rgba(7,18,9,.12)",
							background: "white",
						}}
					>
						{messages.services.catalogue}{" "}
						<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
					</a>
				</div>
				<div
					className="bento"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gridAutoRows: "220px",
						gap: 16,
					}}
				>
					{items.map((it, i) => (
						<ServiceCell key={`${it.visual}-${i}`} it={it} i={i} />
					))}
				</div>
			</div>
		</section>
	);
}
