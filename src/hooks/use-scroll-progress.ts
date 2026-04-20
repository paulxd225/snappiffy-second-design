import { type RefObject, useEffect, useState } from "react";

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
	const [p, setP] = useState(0);
	useEffect(() => {
		const update = () => {
			const el = ref.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const vh = window.innerHeight;
			const total = r.height + vh;
			const traveled = vh - r.top;
			setP(Math.max(0, Math.min(1, traveled / total)));
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [ref]);
	return p;
}
