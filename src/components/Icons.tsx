import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const Icons = {
	arrow: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
			{...p}
		>
			<path
				d="M5 12h14M13 6l6 6-6 6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	check: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
			{...p}
		>
			<path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	plus: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
			{...p}
		>
			<path d="M12 5v14M5 12h14" strokeLinecap="round" />
		</svg>
	),
	globe: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
		</svg>
	),
	spark: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
		</svg>
	),
	chip: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<rect x="6" y="6" width="12" height="12" rx="2" />
			<rect x="9" y="9" width="6" height="6" rx="1" />
			<path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
		</svg>
	),
	cart: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path
				d="M4 5h2l2 12h11l2-8H7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="10" cy="20" r="1.2" />
			<circle cx="18" cy="20" r="1.2" />
		</svg>
	),
	clock: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 7v5l3 2" strokeLinecap="round" />
		</svg>
	),
	trend: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path
				d="M4 17l6-6 4 4 6-8M14 7h6v6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	brain: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path d="M9 6a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 4 3 3 0 0 0 3 3 3 3 0 0 0 3-2 3 3 0 0 0 3 2 3 3 0 0 0 3-3 3 3 0 0 0 2-4 3 3 0 0 0-2-5 3 3 0 0 0-3-3 3 3 0 0 0-3 2 3 3 0 0 0-3-2z" />
			<path d="M12 8v8" />
		</svg>
	),
	utensil: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 3c-2 2-2 7 0 9v9" />
		</svg>
	),
	users: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<circle cx="9" cy="8" r="3" />
			<path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
			<circle cx="17" cy="7" r="2.5" />
			<path d="M15 14c3 0 6 2 6 5" />
		</svg>
	),
	play: (p: IconProps) => (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
			<path d="M8 5v14l11-7z" />
		</svg>
	),
	mail: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="M3 7l9 6 9-6" />
		</svg>
	),
	pin: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			aria-hidden="true"
			{...p}
		>
			<path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
			<circle cx="12" cy="9" r="2.5" />
		</svg>
	),
	menu: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
			{...p}
		>
			<path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
		</svg>
	),
	close: (p: IconProps) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
			{...p}
		>
			<path d="M7 7l10 10M17 7L7 17" strokeLinecap="round" />
		</svg>
	),
};
