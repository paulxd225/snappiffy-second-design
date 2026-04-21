import { useState } from "react";
import { Icons } from "../components/Icons";
import { useReveal } from "../hooks/use-reveal";

type QA = { q: string; a: string };

const general: QA[] = [
	{
		q: "How much time does it take to develop my app?",
		a: "It depends on complexity, but we can usually start shipping in around 4 weeks. We scope upfront so you know the exact roadmap before we start.",
	},
	{
		q: "What types of projects are you able to do?",
		a: "Every concept, really. Mobile apps, web apps, dashboards, marketplaces, AI integrations, automation pipelines. If it runs on software, we can build it.",
	},
	{
		q: "Do you work with international clients?",
		a: "Yes. Most of our work is remote. On-site visits are only available within Ohio, but everything else is handled via video calls and our client portal.",
	},
	{
		q: "What is your pricing model?",
		a: "Fixed scope, fixed price for the first version. Starting at $3,999 depending on complexity. Follow-on work is monthly retainer or milestone-based — you choose.",
	},
	{
		q: "Do you help with ongoing maintenance?",
		a: "Of course. Handoff isn't the end. We offer maintenance plans so you have a team on-call when something breaks, when the app store updates, or when you want new features.",
	},
	{
		q: "Who owns the code?",
		a: "You do. 100%. Full source handover at the end of every project, documented and ready for any team to take over.",
	},
];

const pricing: QA[] = [
	{
		q: "How do you estimate cost before we start?",
		a: "We align on goals, user flows, and integrations, then package a fixed scope with a clear milestone plan. You get a written estimate and timeline before any build work begins.",
	},
	{
		q: "What's included in the starting price vs add-ons?",
		a: "The starting package covers design, development, QA, and a production launch for the agreed feature set. Add-ons are things like extra platforms, advanced AI, or third-party certifications — quoted separately.",
	},
	{
		q: "Do you charge for revisions during the build?",
		a: "Reasonable iterations inside the agreed scope are included. If priorities shift into new features or a major pivot, we document the delta and price it as a change request so there are no surprises.",
	},
	{
		q: "How do deposits and milestones work?",
		a: "We typically split payments across milestones — kickoff, core build, and launch — so cash flow matches delivery. Exact splits are spelled out in the proposal you approve up front.",
	},
	{
		q: "Can we start smaller and expand later?",
		a: "Yes. Many teams ship an MVP first, then fund phases two and three from traction. We architect with that path in mind so growth doesn't mean a rewrite.",
	},
	{
		q: "What happens if we pause or cancel mid-project?",
		a: "Work billed to the current milestone is due; we hand over what's completed along with notes and access. If you return later, we pick up from the last agreed checkpoint.",
	},
];

const process: QA[] = [
	{
		q: "What happens right after we sign?",
		a: "We schedule a kickoff, confirm stakeholders, and set up your client portal with milestones, files, and weekly updates. Engineering starts once access and assets are in place.",
	},
	{
		q: "How will we track progress day to day?",
		a: "You'll see tasks move across stages in the portal, plus a standing summary of what's done, what's next, and any decisions waiting on you.",
	},
	{
		q: "Who is our main point of contact?",
		a: "A dedicated project manager coordinates design, engineering, and QA. Technical questions route to the right specialist without you chasing individuals.",
	},
	{
		q: "How often do we meet or get updates?",
		a: "Most teams prefer a weekly sync plus async updates in the portal. If we're in a crunch week, we can temporarily increase touchpoints.",
	},
	{
		q: "What do you need from us to move fast?",
		a: "Brand assets, access to any APIs or accounts, product decisions, and timely feedback on reviews. A single approver on your side removes bottlenecks.",
	},
	{
		q: "How is QA and launch handled?",
		a: "We run structured QA, a UAT window with you, then deploy to production with monitoring and rollback notes. Post-launch we stay close for stabilization.",
	},
];

const support: QA[] = [
	{
		q: "What's included in a maintenance plan?",
		a: "Security patches, dependency updates, small bug fixes, store compliance updates, and a monthly health check. Larger features are scoped as separate work.",
	},
	{
		q: "How fast can you respond to incidents?",
		a: "Critical production issues are triaged immediately during business hours, with a clear escalation path. Exact targets are defined in your maintenance tier.",
	},
	{
		q: "Do you help with app store rejections or reviews?",
		a: "Yes — we prepare metadata, screenshots, and review notes, then iterate with you if Apple or Google requests changes.",
	},
	{
		q: "Can you train our team on the codebase?",
		a: "We provide walkthrough sessions, READMEs, and environment setup docs. If you onboard engineers later, we can do a focused handoff workshop.",
	},
	{
		q: "How do we request new features after launch?",
		a: "Open a ticket in the portal or email your PM. We'll estimate impact, schedule it against your retainer or quote a milestone if it's larger.",
	},
	{
		q: "Is there an SLA for production outages?",
		a: "Maintenance tiers include defined response windows for production-down events. Non-production or cosmetic issues are handled in the regular queue.",
	},
];

const cats = ["General", "Pricing", "Process", "Support"] as const;
const faqSets: QA[][] = [general, pricing, process, support];

const ANSWER_MAX_PX = 360;

export function FAQ() {
	const ref = useReveal();
	const [open, setOpen] = useState(-1);
	const [cat, setCat] = useState(0);
	const items = faqSets[cat];
	const activeCat = cats[cat];

	return (
		<section
			id="faq"
			className="section"
			style={{
				background: "linear-gradient(180deg, #0e3f15, #15581c)",
				paddingTop: 140,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				className="orb"
				style={{
					width: 500,
					height: 500,
					bottom: -120,
					right: -120,
					background: "#c084ff",
					filter: "blur(140px)",
					opacity: "calc(.3 * var(--accent-i))" as string,
				}}
			/>
			<div ref={ref} className="container reveal">
				<div
					className="row"
					style={{ gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}
				>
					<div style={{ flex: "0 0 340px" }}>
						<div className="eyebrow" style={{ marginBottom: 20 }}>
							FAQ
						</div>
						<h2 style={{ marginBottom: 24 }}>
							Questions? <br />
							<span className="serif-italic" style={{ color: "#c084ff" }}>
								We have answers.
							</span>
						</h2>
						<p
							style={{
								color: "rgba(255,255,255,.7)",
								fontSize: 15,
								lineHeight: 1.6,
								marginBottom: 28,
							}}
						>
							Can't find what you're looking for? Book a discovery call and
							we'll answer directly.
						</p>
						<div className="col gap-8" style={{ marginBottom: 28 }}>
							{cats.map((c, i) => (
								<button
									type="button"
									key={c}
									aria-pressed={i === cat}
									onClick={() => {
										setCat(i);
										setOpen(-1);
									}}
									style={{
										textAlign: "left",
										padding: "10px 14px",
										borderRadius: 10,
										border:
											"1px solid " +
											(i === cat
												? "rgba(124,216,90,.5)"
												: "rgba(255,255,255,.08)"),
										background:
											i === cat
												? "linear-gradient(90deg, rgba(124,216,90,.15), transparent)"
												: "transparent",
										color: i === cat ? "white" : "rgba(255,255,255,.6)",
										fontSize: 14,
										fontWeight: 500,
										transition: "all .3s",
									}}
								>
									{i === cat ? "→ " : ""}
									{c}
								</button>
							))}
						</div>
						<a
							href="#contact"
							className="btn btn-primary"
							style={{ padding: "12px 20px" }}
						>
							Ask a question{" "}
							<Icons.arrow className="chev" style={{ width: 14, height: 14 }} />
						</a>
					</div>

					<section
						aria-label={`${activeCat} questions`}
						style={{ flex: 1, minWidth: 320 }}
					>
						{items.map((it, i) => (
							<div
								key={`${activeCat}:${it.q}`}
								style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
							>
								<button
									type="button"
									onClick={() => setOpen(open === i ? -1 : i)}
									style={{
										width: "100%",
										padding: "28px 0",
										textAlign: "left",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: 20,
									}}
								>
									<div className="row center gap-18" style={{ flex: 1 }}>
										<span
											className="mono"
											style={{
												fontSize: 12,
												color: open === i ? "#c084ff" : "rgba(255,255,255,.4)",
												letterSpacing: "0.1em",
												minWidth: 30,
											}}
										>
											0{i + 1}
										</span>
										<span
											style={{
												fontSize: 22,
												fontWeight: 500,
												color: "white",
												letterSpacing: "-0.01em",
											}}
										>
											{it.q}
										</span>
									</div>
									<span
										style={{
											width: 36,
											height: 36,
											borderRadius: 999,
											display: "grid",
											placeItems: "center",
											background:
												open === i ? "#9b5cff" : "rgba(255,255,255,.08)",
											color: "white",
											transform: open === i ? "rotate(45deg)" : "rotate(0)",
											transition:
												"transform .4s cubic-bezier(.2,.7,.2,1), background .3s",
											flex: "0 0 36px",
										}}
									>
										<Icons.plus style={{ width: 16, height: 16 }} />
									</span>
								</button>
								<div
									style={{
										overflow: "hidden",
										maxHeight: open === i ? ANSWER_MAX_PX : 0,
										opacity: open === i ? 1 : 0,
										transition:
											"max-height .5s cubic-bezier(.2,.7,.2,1), opacity .3s",
									}}
								>
									<p
										style={{
											color: "rgba(255,255,255,.7)",
											fontSize: 16,
											lineHeight: 1.6,
											padding: "0 0 28px 50px",
											margin: 0,
											maxWidth: 620,
										}}
									>
										{it.a}
									</p>
								</div>
							</div>
						))}
					</section>
				</div>
			</div>
		</section>
	);
}
