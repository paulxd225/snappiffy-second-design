import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
	options: IntersectionObserverInit = {},
) {
	const ref = useRef<T>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies(options): observer config is read once at mount; deps would churn on default inline `{}`
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						el.classList.add("in");
						io.unobserve(el);
					}
				});
			},
			{ threshold: 0.15, ...options },
		);
		io.observe(el);
		return () => io.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps -- observer reads options once at mount; `options` in deps would retrigger when callers pass a fresh `{}` each render
	}, []);
	return ref;
}
