// Beau Papier — automatic hero carousel. Text never changes; only the
// photograph cycles. No arrows, no visitor interaction required.
window.DearDaria = window.DearDaria || {};

DearDaria.initHeroCarousel = function (images) {
  const wrap = document.getElementById('hero-carousel');
  if (!wrap || !images || images.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build stacked, absolutely-positioned images for a cross-fade.
  wrap.innerHTML = images.map((img, i) =>
    `<img class="hero-carousel-img${i === 0 ? ' active' : ''}" src="${DearDaria.imgUrl(img)}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}">`
  ).join('') + `<div class="hero-carousel-dots">${images.map((_, i) => `<span class="hc-dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>`;

  if (reduceMotion) return; // static first image only, per accessibility requirement

  const imgs = wrap.querySelectorAll('.hero-carousel-img');
  const dots = wrap.querySelectorAll('.hc-dot');
  let idx = 0;
  let timer = null;

  function show(next) {
    imgs[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = next;
    imgs[idx].classList.add('active');
    dots[idx].classList.add('active');
  }

  function tick() {
    show((idx + 1) % imgs.length);
  }

  function start() {
    if (timer) return;
    timer = window.setInterval(tick, 5500);
  }
  function stop() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  start();

  // Pause when the tab is not active.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
  // Pause on hover/focus - visitor is looking closely at the image.
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);
  wrap.addEventListener('focusin', stop);
  wrap.addEventListener('focusout', start);
};
