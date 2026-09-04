// Beau Papier — automatic hero carousel with manual override.
// Text never changes; only the photograph cycles. No visible prev/next
// arrows, but dots are real clickable buttons and the image responds to
// drag (desktop) and swipe (mobile).
window.DearDaria = window.DearDaria || {};

DearDaria.initHeroCarousel = function (images) {
  const wrap = document.getElementById('hero-carousel');
  if (!wrap || !images || images.length < 2) return;

  const lang = DearDaria.getLang ? DearDaria.getLang() : 'fr';
  const showLabel = (n) => {
    if (lang === 'en') return `Show image ${n}`;
    if (lang === 'de') return `Bild ${n} anzeigen`;
    return `Afficher l\u2019image ${n}`;
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  wrap.innerHTML = images.map((img, i) =>
    `<img class="hero-carousel-img${i === 0 ? ' active' : ''}" src="${DearDaria.imgUrl(img)}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}" draggable="false">`
  ).join('') + `<div class="hero-carousel-dots" role="tablist">${images.map((_, i) =>
    `<button type="button" class="hc-dot${i === 0 ? ' active' : ''}" role="tab" aria-label="${showLabel(i + 1)}" aria-current="${i === 0}"></button>`
  ).join('')}</div>`;

  const imgs = wrap.querySelectorAll('.hero-carousel-img');
  const dots = wrap.querySelectorAll('.hc-dot');
  let idx = 0;
  let timer = null;
  const INTERVAL = 5000;

  function preload(i) {
    if (i < 0 || i >= images.length) return;
    const img = new Image();
    img.src = DearDaria.imgUrl(images[i]);
  }

  function show(next) {
    const target = ((next % imgs.length) + imgs.length) % imgs.length;
    if (target === idx) return;
    imgs[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    dots[idx].setAttribute('aria-current', 'false');
    idx = target;
    imgs[idx].classList.add('active');
    dots[idx].classList.add('active');
    dots[idx].setAttribute('aria-current', 'true');
    preload(idx + 1);
  }

  function tick() { show(idx + 1); }

  function start() {
    if (timer || reduceMotion) return;
    timer = window.setInterval(tick, INTERVAL);
  }
  function stop() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }
  function restart() { stop(); start(); }

  if (!reduceMotion) start();
  preload(1);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { show(i); restart(); });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);
  wrap.addEventListener('focusin', stop);
  wrap.addEventListener('focusout', start);

  // Drag (desktop) and swipe (mobile) via pointer events.
  let startX = null;
  let dragging = false;
  wrap.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    dragging = true;
    stop();
  });
  wrap.addEventListener('pointerup', (e) => {
    if (!dragging || startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) show(idx + 1); else show(idx - 1);
    }
    dragging = false;
    startX = null;
    restart();
  });
  wrap.addEventListener('pointerleave', () => {
    if (dragging) { dragging = false; startX = null; start(); }
  });
};
