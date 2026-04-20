import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [v, setV] = useState(0);
  useEffect(() => {
    let last = window.scrollY;
    let raf: number;
    const loop = () => {
      const cur = window.scrollY;
      const delta = cur - last;
      last = cur;
      setV(prev => prev * 0.88 + delta * 0.12);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return v;
}
