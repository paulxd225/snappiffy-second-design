import { useReveal } from '../hooks/use-reveal';
import { Icons } from '../components/Icons';

const items = [
  { k: '01', t: 'Significant savings', d: '70% cheaper development using low-code technologies where it makes sense.', ic: 'spark' as const },
  { k: '02', t: 'Faster development', d: 'Get your application implemented in as little as 8 weeks, not months.', ic: 'clock' as const },
  { k: '03', t: 'Easy to scale', d: 'Reach thousands of customers simultaneously on infrastructure that grows with you.', ic: 'trend' as const },
  { k: '04', t: 'AI integrated', d: 'Keep clients satisfied with AI tools — leave expensive, old-fashioned tech behind.', ic: 'brain' as const },
];

function BenefitCard({ it, delay }: { it: typeof items[0]; delay: number }) {
  const ref = useReveal();
  const IconEl = Icons[it.ic];
  return (
    <div ref={ref} className="reveal"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = 'rgba(155,92,255,0.35)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
      }}
      style={{
        '--d': `${delay}ms`,
        position: 'relative', padding: 28, borderRadius: 20,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        transition: 'transform .6s cubic-bezier(.2,.8,.2,1), border-color .3s',
        minHeight: 280,
      } as React.CSSProperties}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 999, background: 'radial-gradient(circle, rgba(124,216,90,.2), transparent 70%)', pointerEvents: 'none' }}/>
      <div className="row between" style={{ marginBottom: 40 }}>
        <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', letterSpacing: '0.14em' }}>{it.k}</div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center',
          background: 'linear-gradient(135deg, rgba(124,216,90,.2), rgba(155,92,255,.15))',
          border: '1px solid rgba(124,216,90,.25)', color: '#a8e88a',
        }}>
          <IconEl style={{ width: 22, height: 22 }}/>
        </div>
      </div>
      <h3 style={{ marginBottom: 14, color: 'white', fontWeight: 500 }}>{it.t}</h3>
      <p style={{ color: 'rgba(255,255,255,.62)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{it.d}</p>
    </div>
  );
}

export function Benefits() {
  const ref = useReveal();
  return (
    <section className="section" id="services" style={{ background: 'linear-gradient(180deg, #0e3f15, #15581c)', paddingTop: 160 }}>
      <div className="grid-bg" style={{ opacity: 0.35 }}/>
      <div className="orb" style={{ width: 420, height: 420, top: 20, right: -80, background: '#9b5cff', filter: 'blur(120px)', opacity: 'calc(.4 * var(--accent-i))' as string }}/>
      <div ref={ref} className="container reveal">
        <div className="row between" style={{ alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 680 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>What you get</div>
            <h2>Integrates all the power of <span className="serif-italic" style={{ color: '#c084ff' }}>Artificial Intelligence</span></h2>
          </div>
          <p style={{ maxWidth: 360, fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>
            Four reasons teams pick Snappiffy over an agency or a bloated in-house build.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {items.map((it, i) => <BenefitCard key={i} it={it} delay={i * 120}/>)}
        </div>
      </div>
    </section>
  );
}
