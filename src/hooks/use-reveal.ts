import { useEffect, useRef } from 'react';

export function useReveal(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); }
      });
    }, { threshold: 0.15, ...options });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref as React.RefObject<HTMLDivElement>;
}
