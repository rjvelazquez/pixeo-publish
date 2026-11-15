'use client';

import { FC, useEffect, useRef } from 'react';

// Panel decorativo del login de Pixeo Publish: capas (resplandores, tarjetas de
// posts, calendario y el tucán) que se desplazan a distinta profundidad según
// el puntero. Solo reacciona al usuario (no hay animación continua), y con
// «reducir movimiento» queda estático. Es decorativo: aria-hidden.

const posts = [
  {
    red: 'instagram',
    nombre: 'Instagram · Reel',
    hora: 'Hoy · 7:00 p. m.',
    texto: 'Tu camioneta pasa más horas a la sombra que haciendo fletes…',
    estado: 'Programado',
    clase: 'pp-card pp-c1',
    profundidad: 34,
  },
  {
    red: 'tiktok',
    nombre: 'TikTok',
    hora: 'Hoy · 2:00 p. m.',
    texto: 'Doña Rosa compró la nevera… y el flete lo hizo Vámonos ✅',
    estado: 'Publicado',
    clase: 'pp-card pp-c2',
    profundidad: 58,
  },
  {
    red: 'facebook',
    nombre: 'Facebook · Página',
    hora: 'Mañana · 9:00 a. m.',
    texto: 'Pide. Muévete. Resuelve.',
    estado: 'Borrador',
    clase: 'pp-card pp-c3',
    profundidad: 22,
  },
];

const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const marcados = new Set([2, 5, 9, 12, 13, 17, 20, 24, 26]);

const css = `
.pp-scene { position: relative; flex: 1; width: 100%; min-height: 460px; overflow: hidden;
  --px: 0; --py: 0; }
.pp-layer { position: absolute; will-change: translate;
  translate: calc(var(--px) * var(--d) * 1px) calc(var(--py) * var(--d) * 1px);
  transition: translate 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.pp-glow { border-radius: 9999px; filter: blur(70px); opacity: 0.55; }
.pp-g1 { width: 380px; height: 380px; left: 12%; top: 8%; background: #772e7f; --d: -14; }
.pp-g2 { width: 300px; height: 300px; right: 10%; bottom: 6%; background: #245fa8; --d: -22; }
.pp-g3 { width: 180px; height: 180px; left: 46%; top: 44%; background: #FC69FF; opacity: 0.25; --d: 10; }
.pp-card { width: 280px; padding: 16px; border-radius: 16px; font-size: 14px; line-height: 1.4;
  background: rgba(26, 25, 25, 0.82); border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45); backdrop-filter: blur(8px); }
.pp-c1 { left: 6%; top: 18%; rotate: -4deg; }
.pp-c2 { right: 6%; top: 12%; rotate: 3deg; }
.pp-c3 { left: 20%; bottom: 8%; rotate: -1deg; }
.pp-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.pp-head img { width: 32px; height: 32px; border-radius: 9999px; }
.pp-name { font-weight: 600; font-size: 14px; }
.pp-time { font-size: 12px; opacity: 0.6; }
.pp-text { opacity: 0.85; }
.pp-media { height: 86px; margin: 12px 0; border-radius: 10px;
  background: linear-gradient(135deg, #772e7f, #245fa8 70%, #FC69FF); opacity: 0.85; }
.pp-pill { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px;
  background: rgba(252, 105, 255, 0.14); color: #FC69FF; }
.pp-cal { right: 8%; bottom: 4%; width: 220px; padding: 14px; border-radius: 16px;
  background: rgba(26, 25, 25, 0.9); border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45); font-size: 12px; --d: 42; }
.pp-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; }
.pp-cal-grid span { padding: 4px 0; border-radius: 6px; opacity: 0.7; }
.pp-cal-grid .pp-on { background: #772e7f; opacity: 1; }
.pp-cal-grid .pp-dow { opacity: 0.4; }
.pp-bird { left: 50%; top: 50%; width: 120px; height: 120px; margin: -60px 0 0 -60px;
  filter: drop-shadow(0 18px 40px rgba(119, 46, 127, 0.55)); --d: 70; }
.pp-enter { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .pp-enter { animation: pp-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .pp-enter:nth-child(5) { animation-delay: 0.1s; }
  .pp-enter:nth-child(6) { animation-delay: 0.2s; }
  .pp-enter:nth-child(7) { animation-delay: 0.3s; }
  .pp-enter:nth-child(8) { animation-delay: 0.4s; }
  .pp-enter:nth-child(9) { animation-delay: 0.5s; }
}
@media (prefers-reduced-motion: reduce) {
  .pp-layer { translate: none; transition: none; }
}
@keyframes pp-in { from { opacity: 0; scale: 0.94; } to { opacity: 1; scale: 1; } }
`;

export const ParallaxShowcase: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (reduce.matches || e.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        el.style.setProperty('--px', Math.max(-1, Math.min(1, x)).toFixed(3));
        el.style.setProperty('--py', Math.max(-1, Math.min(1, y)).toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };

    // Se escucha en la ventana para que el panel reaccione también cuando el
    // puntero está sobre el formulario de la izquierda.
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="pp-scene" aria-hidden="true">
      <style>{css}</style>
      <div className="pp-layer pp-glow pp-g1" />
      <div className="pp-layer pp-glow pp-g2" />
      <div className="pp-layer pp-glow pp-g3" />
      {posts.map((p) => (
        <div
          key={p.red}
          className={`pp-layer pp-enter ${p.clase}`}
          style={{ ['--d' as string]: p.profundidad }}
        >
          <div className="pp-head">
            <img src={`/icons/platforms/${p.red}.png`} alt="" />
            <div>
              <div className="pp-name">{p.nombre}</div>
              <div className="pp-time">{p.hora}</div>
            </div>
          </div>
          <div className="pp-text">{p.texto}</div>
          <div className="pp-media" />
          <span className="pp-pill">{p.estado}</span>
        </div>
      ))}
      <div className="pp-layer pp-enter pp-cal">
        <div className="pp-name" style={{ marginBottom: 8 }}>
          Noviembre
        </div>
        <div className="pp-cal-grid">
          {dias.map((d, i) => (
            <span key={`d${i}`} className="pp-dow">
              {d}
            </span>
          ))}
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} className={marcados.has(i + 1) ? 'pp-on' : ''}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <img className="pp-layer pp-enter pp-bird" src="/postiz.svg" alt="" />
    </div>
  );
};
