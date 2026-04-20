import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import { Icons } from '../components/Icons';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Services', 'Case Study', 'Catalogue', 'Process', 'Industries', 'FAQ'];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '10px 40px' : '16px 40px',
      transition: 'padding .4s, backdrop-filter .4s, background .4s',
      background: scrolled ? 'rgba(7,18,9,0.72)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <div className="row between center" style={{ maxWidth: 1400, margin: '0 auto', gap: 16, flexWrap: 'wrap' }}>
        <Logo size={40} />
        <nav className="desktop-nav row gap-8 hide-mobile" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 999,
          padding: 6,
          backdropFilter: 'blur(12px)',
        }}>
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 999,
              color: i === 0 ? 'var(--green-900)' : 'var(--paper)',
              background: i === 0 ? 'linear-gradient(120deg, var(--green-200), var(--green-300))' : 'transparent',
              transition: 'background .3s, color .3s',
            }}
            onMouseEnter={e => { if (i !== 0) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,216,90,.08)'; }}
            onMouseLeave={e => { if (i !== 0) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
            >{l}</a>
          ))}
        </nav>
        <div className="row center gap-12">
          <button type="button" className="row center gap-8" style={{ color: 'var(--paper)', fontSize: 13, fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
            <Icons.globe style={{ width: 16, height: 16 }}/> EN
          </button>
          <a href="#contact" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
            Book a visit <Icons.arrow className="chev" style={{ width: 14, height: 14 }}/>
          </a>
        </div>
      </div>
    </header>
  );
}
