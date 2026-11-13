/* ===== AYA NASSAR — script.js ===== */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Year in footer
  $('#yr').textContent = new Date().getFullYear();

  // Nav: solid background after scrolling
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Scroll reveal
  const items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add('in'));

  // Lightbox
  const lb = $('#lb'), lbImg = $('img', lb), lbCap = $('figcaption', lb);
  const btns = $$('[data-lb]');
  let idx = 0, opener = null;
  const show = i => {
    idx = (i + btns.length) % btns.length;
    const b = btns[idx], im = $('img', b);
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lbCap.textContent = b.dataset.cap;
  };
  const open = i => { opener = btns[i]; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-x', lb).focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; opener && opener.focus(); };
  btns.forEach((b, i) => b.addEventListener('click', () => open(i)));
  $('.lb-x', lb).addEventListener('click', close);
  $$('[data-d]', lb).forEach(b => b.addEventListener('click', () => show(idx + +b.dataset.d)));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) { if (e.key === 'Escape') setMenu(false); return; }
    if (e.key === 'Escape') close();
    // RTL: right arrow = previous, left arrow = next
    if (e.key === 'ArrowLeft') show(idx + 1);
    if (e.key === 'ArrowRight') show(idx - 1);
  });
})();
