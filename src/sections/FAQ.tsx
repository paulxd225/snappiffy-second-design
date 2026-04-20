import { useState } from 'react';
import { useReveal } from '../hooks/use-reveal';
import { Icons } from '../components/Icons';

const data = [
  { q: 'How much time does it take to develop my app?', a: 'It depends on complexity, but we can usually start shipping in around 4 weeks. We scope upfront so you know the exact roadmap before we start.' },
  { q: 'What types of projects are you able to do?', a: 'Every concept, really. Mobile apps, web apps, dashboards, marketplaces, AI integrations, automation pipelines. If it runs on software, we can build it.' },
  { q: 'Do you work with international clients?', a: 'Yes. Most of our work is remote. On-site visits are only available within Ohio, but everything else is handled via video calls and our client portal.' },
  { q: 'What is your pricing model?', a: 'Fixed scope, fixed price for the first version. Starting at $3,999 depending on complexity. Follow-on work is monthly retainer or milestone-based — you choose.' },
  { q: 'Do you help with ongoing maintenance?', a: "Of course. Handoff isn't the end. We offer maintenance plans so you have a team on-call when something breaks, when the app store updates, or when you want new features." },
  { q: 'Who owns the code?', a: 'You do. 100%. Full source handover at the end of every project, documented and ready for any team to take over.' },
];
const cats = ['General', 'Pricing', 'Process', 'Support'];

export function FAQ() {
  const ref = useReveal();
  const [open, setOpen] = useState(0);
  const [cat, setCat] = useState(0);

  return (
    <section id="faq" className="section" style={{ background: 'linear-gradient(180deg, #0e3f15, #15581c)', paddingTop: 140, position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, bottom: -120, right: -120, background: '#c084ff', filter: 'blur(140px)', opacity: 'calc(.3 * var(--accent-i))' as string }}/>
      <div ref={ref} className="container reveal">
        <div className="row" style={{ gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 340px' }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>FAQ</div>
            <h2 style={{ marginBottom: 24 }}>
              Questions? <br/><span className="serif-italic" style={{ color: '#c084ff' }}>We have answers.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Can't find what you're looking for? Book a discovery call and we'll answer directly.
            </p>
            <div className="col gap-8" style={{ marginBottom: 28 }}>
              {cats.map((c, i) => (
                <button type="button" key={c} onClick={() => setCat(i)} style={{
                  textAlign: 'left', padding: '10px 14px', borderRadius: 10,
                  border: '1px solid ' + (i === cat ? 'rgba(124,216,90,.5)' : 'rgba(255,255,255,.08)'),
                  background: i === cat ? 'linear-gradient(90deg, rgba(124,216,90,.15), transparent)' : 'transparent',
                  color: i === cat ? 'white' : 'rgba(255,255,255,.6)',
                  fontSize: 14, fontWeight: 500, transition: 'all .3s',
                }}>
                  {i === cat ? '→ ' : ''}{c}
                </button>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary" style={{ padding: '12px 20px' }}>
              Ask a question <Icons.arrow className="chev" style={{ width: 14, height: 14 }}/>
            </a>
          </div>

          <div style={{ flex: 1, minWidth: 320 }}>
            {data.map((it, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', padding: '28px 0', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
                }}>
                  <div className="row center gap-18" style={{ flex: 1 }}>
                    <span className="mono" style={{ fontSize: 12, color: open === i ? '#c084ff' : 'rgba(255,255,255,.4)', letterSpacing: '0.1em', minWidth: 30 }}>0{i+1}</span>
                    <span style={{ fontSize: 22, fontWeight: 500, color: 'white', letterSpacing: '-0.01em' }}>{it.q}</span>
                  </div>
                  <span style={{
                    width: 36, height: 36, borderRadius: 999, display: 'grid', placeItems: 'center',
                    background: open === i ? '#9b5cff' : 'rgba(255,255,255,.08)', color: 'white',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform .4s cubic-bezier(.2,.7,.2,1), background .3s', flex: '0 0 36px',
                  }}>
                    <Icons.plus style={{ width: 16, height: 16 }}/>
                  </span>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0, transition: 'max-height .5s cubic-bezier(.2,.7,.2,1), opacity .3s' }}>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.6, padding: '0 0 28px 50px', margin: 0, maxWidth: 620 }}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
