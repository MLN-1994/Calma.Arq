/* ── WhatsApp: ÚNICO lugar donde se cambia el número ───────────────
   Formato internacional sin signos. Si queda 'COMPLETAR', todos los
   botones llevan a la sección Contacto. (A confirmar con el estudio) */
const WHATSAPP = '5492213082538';

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* WhatsApp */
  if (/^\d{10,15}$/.test(WHATSAPP)) {
    $$('[data-wa]').forEach(a => {
      a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(a.dataset.wa)}`;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* Menú mobile */
  const top = $('.top'), btn = $('.menu-btn');
  const menu = abierto => {
    top.classList.toggle('abierto', abierto);
    btn.setAttribute('aria-expanded', abierto);
    btn.textContent = abierto ? 'Cerrar' : 'Menú';
  };
  btn.addEventListener('click', () => menu(!top.classList.contains('abierto')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => menu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') menu(false); });

  /* Regla de avance */
  const regla = $('.regla');
  let pedido = false;
  const medir = () => {
    pedido = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    regla.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
  };
  const pedir = () => { if (!pedido) { pedido = true; requestAnimationFrame(medir); } };
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
  medir();

  /* Aparición al hacer scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('ok'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* El botón flotante se esconde en el pie y donde ya hay un botón de WhatsApp a la vista */
  const flota = $('.wa-flota'), tapan = new Set();
  const io2 = new IntersectionObserver(es => {
    es.forEach(e => e.isIntersecting ? tapan.add(e.target) : tapan.delete(e.target));
    flota.classList.toggle('oculto', tapan.size > 0);
  });
  $$('.hero .acciones, .contacto .acciones, .pie').forEach(el => io2.observe(el));
})();
