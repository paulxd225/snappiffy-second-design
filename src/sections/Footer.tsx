import { useId, useState } from "react";
import { Icons } from "../components/Icons";
import { Logo } from "../components/Logo";

function Input({
	v,
	onV,
	label,
	type = "text",
	textarea,
}: {
	v: string;
	onV: (val: string) => void;
	label: string;
	type?: string;
	textarea?: boolean;
}) {
	const [focus, setFocus] = useState(false);
	const controlId = useId();
	const style: React.CSSProperties = {
		width: "100%",
		padding: textarea ? "26px 14px 12px" : "24px 14px 10px",
		background: "rgba(255,255,255,.03)",
		border: `1px solid ${focus ? "rgba(124,216,90,.5)" : "rgba(255,255,255,.1)"}`,
		borderRadius: 12,
		color: "white",
		fontSize: 14,
		fontFamily: "var(--sans)",
		outline: "none",
		transition: "border-color .25s, background .25s",
		resize: "vertical",
	};
	return (
		<label
			htmlFor={controlId}
			style={{ display: "block", position: "relative", flex: 1, minWidth: 120 }}
		>
			<div
				style={{
					position: "absolute",
					top: focus || v ? 8 : 22,
					left: 14,
					fontSize: focus || v ? 10 : 14,
					fontFamily: focus || v ? "var(--mono)" : "var(--sans)",
					color: focus ? "#a8e88a" : "rgba(255,255,255,.5)",
					letterSpacing: focus || v ? "0.14em" : "normal",
					textTransform: focus || v ? "uppercase" : "none",
					transition: "all .25s cubic-bezier(.2,.7,.2,1)",
					pointerEvents: "none",
				}}
			>
				{label}
			</div>
			{textarea ? (
				<textarea
					id={controlId}
					value={v}
					onChange={(e) => onV(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					rows={4}
					style={style}
				/>
			) : (
				<input
					id={controlId}
					value={v}
					onChange={(e) => onV(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type={type}
					style={style}
				/>
			)}
		</label>
	);
}

export function Footer() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		msg: "",
	});
	const [sent, setSent] = useState(false);

	return (
		<footer
			id="contact"
			style={{
				background:
					"linear-gradient(180deg, #15581c 0%, #0e3f15 50%, #0e3f15 100%)",
				position: "relative",
				overflow: "hidden",
				paddingTop: 120,
			}}
		>
			{/* Giant wordmark — semi-transparent background, centered */}
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: "50%",
					transform: "translateY(-50%)",
					textAlign: "center",
					fontFamily: "var(--sans)",
					fontWeight: 800,
					fontSize: "clamp(120px, 22vw, 320px)",
					lineHeight: 0.8,
					color: "#a8e88a",
					opacity: 0.06,
					letterSpacing: "-0.06em",
					pointerEvents: "none",
					userSelect: "none",
					zIndex: 0,
				}}
			>
				SNAPPIFFY
			</div>

			<div
				className="orb"
				style={{
					width: 600,
					height: 600,
					top: -200,
					left: "50%",
					transform: "translateX(-50%)",
					background: "#9b5cff",
					filter: "blur(160px)",
					opacity: "calc(.3 * var(--accent-i))" as string,
				}}
			/>
			<div className="grid-bg" style={{ opacity: 0.2 }} />

			<div className="container" style={{ position: "relative" }}>
				<div style={{ textAlign: "center", marginBottom: 80 }}>
					<div
						className="eyebrow"
						style={{
							justifyContent: "center",
							display: "inline-flex",
							marginBottom: 20,
						}}
					>
						Let's build it together
					</div>
					<h2 style={{ maxWidth: 900, margin: "0 auto 24px" }}>
						Wondering how your{" "}
						<span className="serif-italic" style={{ color: "#c084ff" }}>
							mobile app
						</span>{" "}
						could look?
					</h2>
					<p
						style={{
							color: "rgba(255,255,255,.7)",
							fontSize: 17,
							maxWidth: 640,
							margin: "0 auto 32px",
							lineHeight: 1.55,
						}}
					>
						Book a no-commitment consultation or schedule an in-person visit to
						your business (Ohio only) and discover your project's potential.
					</p>
					<div
						className="row center gap-16"
						style={{ justifyContent: "center", flexWrap: "wrap" }}
					>
						<a href="#contact-form" className="btn btn-primary">
							Book a free visit{" "}
							<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
						</a>
						<a
							href="mailto:snappiffy.business@gmail.com"
							className="btn btn-ghost"
						>
							Email us
						</a>
					</div>
				</div>

				<div
					id="contact-form"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
						gap: 40,
						padding: 10,
						borderRadius: 24,
						background:
							"linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
						border: "1px solid rgba(255,255,255,0.08)",
						backdropFilter: "blur(16px)",
						marginBottom: 80,
						position: "relative",
						zIndex: 1,
					}}
				>
					<div>
						<Logo size={40} />
						<p
							style={{
								marginTop: 24,
								color: "rgba(255,255,255,.7)",
								fontSize: 15,
								lineHeight: 1.6,
								maxWidth: 340,
							}}
						>
							Custom mobile apps, AI-integrated, shipped in weeks. Based in
							Dublin, Ohio — serving teams worldwide.
						</p>
						<div className="col gap-12" style={{ marginTop: 32 }}>
							<div
								className="row center gap-10"
								style={{ color: "rgba(255,255,255,.8)", fontSize: 14 }}
							>
								<Icons.mail
									style={{ width: 16, height: 16, color: "#a8e88a" }}
								/>
								snappiffy.business@gmail.com
							</div>
							<div
								className="row center gap-10"
								style={{ color: "rgba(255,255,255,.8)", fontSize: 14 }}
							>
								<Icons.pin
									style={{ width: 16, height: 16, color: "#c084ff" }}
								/>
								5636 Shannon Lane Place, Dublin OH 43016
							</div>
						</div>
						<div
							style={{
								marginTop: 40,
								padding: "16px 20px",
								borderRadius: 14,
								background: "rgba(124,216,90,0.08)",
								border: "1px solid rgba(124,216,90,.2)",
							}}
						>
							<div
								className="mono"
								style={{
									fontSize: 11,
									color: "#a8e88a",
									letterSpacing: "0.14em",
									marginBottom: 4,
								}}
							>
								RESPONSE TIME
							</div>
							<div style={{ fontSize: 18, color: "white", fontWeight: 500 }}>
								Usually within 24h
							</div>
						</div>
					</div>

					<div>
						<div className="row between center" style={{ marginBottom: 20 }}>
							<h3 style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
								Tell us about your project
							</h3>
							<div
								className="mono"
								style={{
									fontSize: 11,
									color: "rgba(255,255,255,.5)",
									letterSpacing: "0.14em",
								}}
							>
								05 FIELDS
							</div>
						</div>
						{sent ? (
							<div
								style={{
									padding: 40,
									textAlign: "center",
									borderRadius: 16,
									background: "rgba(124,216,90,.08)",
									border: "1px solid rgba(124,216,90,.3)",
								}}
							>
								<div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
								<div style={{ fontSize: 20, color: "white", marginBottom: 6 }}>
									Thank you!
								</div>
								<div style={{ color: "rgba(255,255,255,.7)" }}>
									We'll reach out within 24 hours.
								</div>
							</div>
						) : (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setSent(true);
								}}
								className="col gap-12"
							>
								<div className="row gap-12">
									<Input
										v={form.name}
										onV={(v) => setForm((f) => ({ ...f, name: v }))}
										label="Name"
									/>
									<Input
										v={form.email}
										onV={(v) => setForm((f) => ({ ...f, email: v }))}
										label="Email"
										type="email"
									/>
								</div>
								<div className="row gap-12">
									<Input
										v={form.phone}
										onV={(v) => setForm((f) => ({ ...f, phone: v }))}
										label="Phone"
									/>
									<Input
										v={form.company}
										onV={(v) => setForm((f) => ({ ...f, company: v }))}
										label="Company (optional)"
									/>
								</div>
								<Input
									v={form.msg}
									onV={(v) => setForm((f) => ({ ...f, msg: v }))}
									label="Tell us about your project"
									textarea
								/>
								<button
									type="submit"
									className="btn btn-primary"
									style={{ marginTop: 6, alignSelf: "flex-start" }}
								>
									Send message{" "}
									<Icons.arrow
										className="chev"
										style={{ width: 14, height: 14 }}
									/>
								</button>
							</form>
						)}
					</div>
				</div>

				<div
					className="row between center"
					style={{
						paddingTop: 24,
						borderTop: "1px solid rgba(255,255,255,.08)",
						paddingBottom: 40,
						flexWrap: "wrap",
						gap: 20,
					}}
				>
					<div
						className="mono"
						style={{
							fontSize: 12,
							color: "rgba(255,255,255,.5)",
							letterSpacing: "0.1em",
						}}
					>
						© 2023 — 2026 Snappiffy Agency. All rights reserved.
					</div>
					<div className="row gap-24">
						{(
							[
								{ label: "Privacy", href: "/privacy" },
								{ label: "Terms", href: "/terms" },
								{
									label: "Instagram",
									href: "https://www.instagram.com/",
									external: true,
								},
								{
									label: "LinkedIn",
									href: "https://www.linkedin.com/",
									external: true,
								},
							] satisfies ReadonlyArray<{
								label: string;
								href: string;
								external?: boolean;
							}>
						).map(({ label, href, external }) => (
							<a
								key={label}
								href={href}
								{...(external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}
							>
								{label}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
