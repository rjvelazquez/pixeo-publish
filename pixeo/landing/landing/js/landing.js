// Parallax suave de la maqueta del hero con el puntero. Es solo adorno: sin puntero fino o con
// movimiento reducido (sistema o botón del pie) no se mueve nada y la maqueta queda estática.
const hero = document.querySelector('.pb-hero');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (hero && finePointer.matches) {
  let frame = 0;
  const still = () => systemReduced.matches || document.documentElement.classList.contains('reduce-motion');
  const tilt = (x, y) => {
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
  };
  hero.addEventListener('pointermove', (event) => {
    if (frame || still()) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const box = hero.getBoundingClientRect();
      tilt(((event.clientX - box.left) / box.width) * 2 - 1, ((event.clientY - box.top) / box.height) * 2 - 1);
    });
  });
  hero.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    frame = 0;
    tilt(0, 0);
  });
}
