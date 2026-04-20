import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/use-reveal';
import { Icons } from '../components/Icons';
import heroBg from '../assets/hero-bg.jpg';

const techStack = [
  { n: 'Supabase', c: '#3ecf8e' },
  { n: 'React', c: '#61dafb' },
  { n: 'Flutter', c: '#54c5f8' },
  { n: 'FlutterFlow', c: '#9b5cff' },
  { n: 'Firebase', c: '#ffa000' },
  { n: 'HTML/CSS/JS', c: '#e34f26' },
  { n: 'Nest', c: '#e0234e' },
  { n: 'Node', c: '#68a063' },
  { n: 'TypeScript', c: '#3178c6' },
  { n: 'OpenAI', c: '#10a37f' },
  { n: 'Anthropic', c: '#c084ff' },
];

function TechMarquee() {
  return (
    <div style={{ position: 'relative', marginTop: 120, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="row between center" style={{ maxWidth: 1400, margin: '0 auto 20px', padding: '0 4px' }}>
        <div className="eyebrow" style={{ color: '#a8e88a' }}>The stack we use</div>
        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '0.12em' }}>PRODUCTION-GRADE</div>
      </div>
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <div className="row" style={{ gap: 56, animation: 'marquee-l 40s linear infinite', width: 'fit-content' }}>
          {[...techStack, ...techStack].map((it, i) => (
            <div key={i} className="row center gap-12" style={{ padding: '14px 0', whiteSpace: 'nowrap' }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: it.c, boxShadow: `0 0 10px ${it.c}` }}/>
              <span style={{ fontWeight: 500, fontSize: 20, letterSpacing: '-0.01em' }}>{it.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useReveal();
  const mouseRef = useRef<HTMLElement>(null);
  const [mp, setMp] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = mouseRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMp({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" ref={mouseRef as React.RefObject<HTMLElement>} style={{
      position: 'relative',
      minHeight: '100vh',
      padding: '140px 40px 80px',
      overflow: 'hidden',
      background: '#0e3f15',
    }}>
      {/* Meeting photo background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.42,
        filter: 'saturate(0.85)',
      }}/>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(110deg, rgba(168,232,138,0.55) 0%, rgba(76,194,58,0.55) 25%, rgba(30,122,36,0.65) 55%, rgba(14,63,21,0.8) 85%, rgba(14,63,21,0.9) 100%)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 80% at ${mp.x * 100}% ${mp.y * 100}%, rgba(155,92,255,.18), transparent 60%)`,
        pointerEvents: 'none',
      }}/>
      <div className="grid-bg" style={{ opacity: 0.5 }}/>

      {/* Orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: -100, left: -120, background: '#d6f5c4', filter: 'blur(100px)', opacity: 0.5, animation: 'pulseGlow 7s ease-in-out infinite' }}/>
      <div className="orb" style={{ width: 500, height: 500, bottom: -120, right: -80, background: '#9b5cff', filter: 'blur(120px)', opacity: 'calc(.55 * var(--accent-i))' as string, animation: 'pulseGlow 9s ease-in-out infinite' }}/>
      <div className="orb" style={{ width: 260, height: 260, top: '30%', right: '18%', background: '#ff3df0', filter: 'blur(100px)', opacity: 'calc(.35 * var(--accent-i))' as string }}/>

      <div ref={ref} className="reveal" style={{ position: 'relative', maxWidth: 1400, margin: '0 auto', paddingTop: 60 }}>
        <div className="row gap-24" style={{ marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 14px 8px 10px',
            borderRadius: 999,
            background: 'rgba(7,18,9,0.4)',
            border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(10px)',
            fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#7cd85a', boxShadow: '0 0 12px #7cd85a' }}/>
            Trusted since 2022 · 40+ apps shipped
          </div>
        </div>

        <h1 style={{ maxWidth: 1100, marginBottom: 24, color: '#ffffff' }}>
          Custom mobile apps,<br/>
          <span style={{ background: 'linear-gradient(100deg, #c084ff 0%, #9b5cff 55%, #a47bff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>powered by AI</span><br/>
          <span className="serif-italic" style={{ fontSize: '0.62em', color: '#eefbe9', opacity: 0.9 }}>— tailored to your business.</span>
        </h1>

        <p style={{ maxWidth: 560, fontSize: 19, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', marginBottom: 40 }}>
          Bring your business idea to life in just a few weeks. Starting from <b>$3,999</b>. Cheaper, faster, smarter — and built to scale with you.
        </p>

        <div className="row gap-16 center" style={{ marginBottom: 60, flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">
            Book a free visit <Icons.arrow className="chev" style={{ width: 16, height: 16 }}/>
          </a>
          <a href="#case-study" className="btn btn-ghost">
            <Icons.play style={{ width: 12, height: 12 }}/> See our work
          </a>
          <div className="row gap-16 center" style={{ marginLeft: 8 }}>
            {['Cheaper', 'Faster', 'Smarter', 'Scalable'].map(w => (
              <div key={w} className="row center gap-8" style={{ fontSize: 13, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: 'rgba(124,216,90,.2)', display: 'grid', placeItems: 'center', border: '1px solid rgba(124,216,90,.5)' }}>
                  <Icons.check style={{ width: 10, height: 10, color: '#a8e88a' }}/>
                </span>
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Quote strip */}
        <div style={{
          maxWidth: 820,
          padding: '20px 24px',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(7,18,9,0.35)',
          backdropFilter: 'blur(16px)',
        }}>
          <p className="serif-italic" style={{ fontSize: 18, margin: 0, marginBottom: 10, color: '#eefbe9' }}>
            "AI is changing the rules of the game in every industry. If you don't incorporate it into your company, your competition will."
          </p>
          <div className="row center gap-12">
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'linear-gradient(135deg, #9b5cff, #ff3df0)' }}/>
            <div style={{ fontSize: 13 }}>
              <b>Manuel Ferrer</b> <span className="mono" style={{ color: '#a8e88a', marginLeft: 8, fontSize: 11, letterSpacing: '0.1em' }}>CEO · SNAPPIFFY</span>
            </div>
            <div className="row gap-8" style={{ marginLeft: 'auto' }}>
              {[0,1,2,3,4].map(i => <span key={i} style={{ color: '#ffd166', fontSize: 14 }}>★</span>)}
            </div>
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
