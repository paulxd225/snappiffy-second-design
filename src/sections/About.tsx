import { useEffect, useState } from 'react';
import { Icons } from '../components/Icons';
import { useReveal } from '../hooks/use-reveal';
import { useScrollDirection } from '../hooks/use-scroll-direction';


const logos = [
  { n: 'Supabase', c: '#3ecf8e', x: 0.08, y: 0.2 },
  { n: 'React',    c: '#61dafb', x: 0.22, y: 0.55 },
  { n: 'Flutter',  c: '#54c5f8', x: 0.38, y: 0.15 },
  { n: 'FlutterFlow', c: '#9b5cff', x: 0.55, y: 0.6 },
  { n: 'Firebase', c: '#ffa000', x: 0.72, y: 0.22 },
  { n: 'Nest',     c: '#e0234e', x: 0.86, y: 0.55 },
  { n: 'Node',     c: '#68a063', x: 0.1,  y: 0.85 },
  { n: 'TypeScript', c: '#3178c6', x: 0.45, y: 0.9 },
  { n: 'OpenAI',   c: '#10a37f', x: 0.78, y: 0.88 },
];

function ConstellationBand({ v }: { v: number }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => { setOffset(o => o + v * 0.6); }, [v]);
  return (
    <div style={{ position: 'relative', height: 160, width: '100%', overflow: 'hidden', borderBottom: '1px solid rgba(14,63,21,.08)', marginBottom: 20 }}>
      <svg width="100%" height="160" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
      <title>Tech Stack Constellation</title>
        <defs>
          <linearGradient id="constLine" x1="0" x2="1">
            <stop offset="0" stopColor="#1e7a24"/>
            <stop offset="1" stopColor="#9b5cff"/>
          </linearGradient>
        </defs>
        {logos.map((it, i) => i < logos.length - 1 && (
          <line key={it.n}
          x1={`${(it.x * 120 + offset * 0.05) % 100}%`} y1={it.y * 160}
          x2={`${(logos[logos.indexOf(it)+1].x * 120 + offset * 0.05) % 100}%`} y2={logos[logos.indexOf(it)+1].y * 160}
          stroke="url(#constLine)" strokeWidth="1"/>
        ))}
      </svg>
      {logos.map((it)  => (
        <div key={it.n} style={{
          position: 'absolute',
          left: `${((it.x * 120 + offset * 0.05) % 100 + 100) % 100}%`,
          top: it.y * 160 - 16,
          transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
          transform: `translateX(${v * 0.4}px)`,
        }}>
          <div className="row center gap-8" style={{
            padding: '8px 14px', background: 'white', borderRadius: 999,
            boxShadow: '0 8px 24px -12px rgba(0,0,0,.12), 0 2px 6px -2px rgba(0,0,0,.06)',
            border: '1px solid rgba(14,63,21,.08)',
            fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: it.c, boxShadow: `0 0 8px ${it.c}` }}/>
            {it.n}
          </div>
        </div>
      ))}
    </div>
  );
}

function VideoCard() {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{
      position: 'relative', aspectRatio: '16 / 10', borderRadius: 24, overflow: 'hidden',
      background: '#0e3f15',
      boxShadow: '0 40px 80px -40px rgba(14,63,21,.4), 0 0 0 1px rgba(14,63,21,.1)',
    }}>
      {playing ? (
        <iframe
          src="https://www.youtube.com/embed/iTCx-iAFJ9A?autoplay=1&rel=0"
          title="Introduction to Snappiffy"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <>
          <img src="https://img.youtube.com/vi/iTCx-iAFJ9A/maxresdefault.jpg" alt="Introduction to Snappiffy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,63,21,.2), rgba(14,63,21,.55))' }}/>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 24, boxShadow: 'inset 0 0 0 1px rgba(124,216,90,.3), inset 0 0 60px rgba(155,92,255,.15)', pointerEvents: 'none' }}/>
          <button type="button" onClick={() => setPlaying(true)} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 84, height: 84, borderRadius: 999,
            background: 'rgba(255,255,255,.95)',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,.3), 0 0 0 8px rgba(255,255,255,.1)',
            transition: 'transform .3s',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = 'translate(-50%, -50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = 'translate(-50%, -50%) scale(1)';
          }}>
            <Icons.play style={{ width: 26, height: 26, color: '#0e3f15', marginLeft: 4 }}/>
          </button>
        </>
      )}
    </div>
  );
}

export function About() {
  const ref = useReveal();
  const v = useScrollDirection();

  return (
    <section id="about" className="section light" style={{ paddingTop: 120, paddingBottom: 140, overflow: 'hidden' }}>
      <ConstellationBand v={v} />
      <div ref={ref} className="container reveal" style={{ paddingTop: 80 }}>
        <div className="row between" style={{ gap: 80, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 440px', maxWidth: 540 }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>About Snappiffy</div>
            <h2 style={{ marginBottom: 28, color: 'var(--ink)' }}>
              We empower business with <span className="serif-italic" style={{ color: '#9b5cff' }}>custom mobile apps</span>, powered by AI.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(7,18,9,0.7)', marginBottom: 32 }}>
              Significantly improve your business processes and save a ton of money at the same time. We combine custom mobile development with the real power of AI — no hype, just leverage.
            </p>
            <div className="row center gap-12" style={{ marginBottom: 40 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'linear-gradient(135deg, #9b5cff, #ff3df0)', border: '3px solid white', boxShadow: '0 6px 16px -6px rgba(0,0,0,.2)' }}/>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Manuel Ferrer <span className="mono" style={{ fontWeight: 400, color: 'var(--green-700)', fontSize: 12, marginLeft: 6 }}>CEO</span></div>
                <div style={{ fontSize: 13, color: 'rgba(7,18,9,0.6)' }} className="serif-italic">Combining custom apps with AI power pays off.</div>
              </div>
            </div>
            <div className="row" style={{ gap: 0, borderTop: '1px solid rgba(14,63,21,.12)' }}>
              {[
                { k: '10x', l: 'more efficiency in processes' },
                { k: '$170K', s: '/yr', l: 'average savings' },
                { k: '80%+', l: 'process optimization' },
              ].map((s) => (
                <div key={s.k} style={{ flex: 1, padding: '28px 16px 0 0', borderRight: s.k !== '80%+' ? '1px solid rgba(14,63,21,.12)' : 'none', paddingLeft: s.k !== '10x' ?  24 : 0 }}>
                  <div style={{ fontSize: 36, fontWeight: 600, color: 'var(--green-700)', letterSpacing: '-0.03em' }}>{s.k}<span style={{ fontSize: 16, color: 'var(--green-600)', fontFamily: 'var(--mono)' }}>{s.s || ''}</span></div>
                  <div style={{ fontSize: 12, color: 'rgba(7,18,9,0.55)', marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 480px', maxWidth: 620, position: 'relative' }}>
            <VideoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
