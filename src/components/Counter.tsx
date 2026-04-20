import { useEffect, useRef, useState } from "react";

interface CounterProps {
	to: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	duration?: number;
}

export function Counter({
	to,
	prefix = "",
	suffix = "",
	decimals = 0,
	duration = 1800,
}: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const [val, setVal] = useState(0);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (!e.isIntersecting) return;
					io.disconnect();
					const start = performance.now();
					const tick = (t: number) => {
						const p = Math.min(1, (t - start) / duration);
						const eased = 1 - (1 - p) ** 3;
						setVal(to * eased);
						if (p < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				});
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [to, duration]);
	return (
		<span ref={ref}>
			{prefix}
			{val.toFixed(decimals)}
			{suffix}
		</span>
	);
}
