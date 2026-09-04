// Beau Papier — automatic hero carousel with manual override.
// Text never changes; only the photograph cycles. No visible prev/next
// arrows. Clicking the image (desktop) or swiping (mobile) advances it;
// dots select a specific image directly.
window.DearDaria = window.DearDaria || {};

// images: array of { src, bg } - bg is a restrained pale background tint
// sampled from the photograph, shown around it since every hero photo is
// a ~3:4 portrait and none are cropped into a landscape fill.
DearDaria.initHeroCarousel = function (images) {
  const wrap = document.getElementById('hero-carousel');
  if (!wrap || !images || images.length < 2) return;

  const lang = DearDaria.getLang ? DearDaria.getLang() : 'fr';
  const showLabel = (n) => {
    if (lang === 'en') return `Show image ${n}`;
    if (lang === 'de') return `Bild ${n} anzeigen`;
    return `Afficher l\u2019image ${n}`;
  };
  const nextLabel = lang === 'en' ? 'Show the next image' : lang === 'de' ? 'N\u00e4chstes Bild anzeigen' : 'Afficher l\u2019image suivante';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Every slide uses the same fitting rule: the complete photograph is
  // always shown, centered, never cropped - only the background tint
  // differs per image, sampled from that photo's own palette.
  wrap.innerHTML = images.map((item, i) =>
    `<img class="hero-carousel-img${i === 0 ? ' active' : ''}" src="${DearDaria.imgUrl(item.src)}" alt="${item.altKey ? DearDaria.t(item.altKey) : ''}" loading="${i === 0 ? 'eager' : 'lazy'}" draggable="false" style="background:${item.bg || 'var(--ivory-deep)'};${item.pos ? ` object-position: ${item.pos};` : ''}${item.scale ? ` transform: scale(${item.scale});` : ''}">`
  ).join('')
    + `<button type="button" class="hero-carousel-hit" aria-label="${nextLabel}"></button>`
    + `<div class="hero-carousel-dots" role="tablist">${images.map((_, i) =>
      `<button type="button" class="hc-dot${i === 0 ? ' active' : ''}" role="tab" aria-label="${showLabel(i + 1)}" aria-current="${i === 0}"></button>`
    ).join('')}</div>`;

  const imgs = wrap.querySelectorAll('.hero-carousel-img');
  const dots = wrap.querySelectorAll('.hc-dot');
  const hitArea = wrap.querySelector('.hero-carousel-hit');
  let idx = 0;
  let timer = null;
  const INTERVAL = 5000;

  function preload(i) {
    if (i < 0 || i >= images.length) return;
    const img = new Image();
    img.src = DearDaria.imgUrl(images[i].src);
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
  function start() { if (timer || reduceMotion) return; timer = window.setInterval(tick, INTERVAL); }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  if (!reduceMotion) start();
  preload(1);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { show(i); restart(); });
  });

  // Desktop: click anywhere on the image advances by one. On mobile this
  // same button exists but swipe (pointer drag) is the primary gesture; a
  // plain tap that isn't part of a vertical scroll also advances, which is
  // fine since it mirrors the swipe direction the visitor already used.
  hitArea.addEventListener('click', () => { show(idx + 1); restart(); });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);
  wrap.addEventListener('focusin', stop);
  wrap.addEventListener('focusout', start);

  // Drag (desktop) and swipe (mobile). A short pointerup without meaningful
  // horizontal movement is treated as a click by the browser already (the
  // click listener above handles that); this only intercepts real drags.
  let startX = null;
  let startY = null;
  let dragging = false;
  hitArea.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    dragging = true;
  });
  hitArea.addEventListener('pointermove', (e) => {
    if (!dragging || startX === null) return;
    // Once horizontal movement clearly dominates, treat as a drag/swipe and
    // stop the timer; otherwise let vertical page scroll proceed untouched.
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    if (dx > 10 && dx > dy) stop();
  });
  hitArea.addEventListener('pointerup', (e) => {
    if (!dragging || startX === null) return;
    const dx = e.clientX - startX;
    const dy = Math.abs(e.clientY - startY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      if (dx < 0) show(idx + 1); else show(idx - 1);
    }
    dragging = false;
    startX = null;
    startY = null;
    restart();
  });
  hitArea.addEventListener('pointerleave', () => {
    if (dragging) { dragging = false; startX = null; startY = null; start(); }
  });
};
