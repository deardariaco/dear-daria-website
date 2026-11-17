// Beau Papier — professionals page: scroll-driven scenes and reveals.
// Each [data-scene] gets --p from 0 (scene enters) to 1 (scene done);
// the CSS in css/pro.css turns that into parallax, fades and wipes.
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal blocks once, as they come into view.
  const revealEls = document.querySelectorAll('.reveal, .reveal-line');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    revealEls.forEach((el, i) => {
      // statement lines follow each other
      if (el.classList.contains('reveal-line')) el.style.transitionDelay = (i % 3) * 0.18 + 's';
      io.observe(el);
    });
  }

  if (reduce) return;

  const scenes = Array.from(document.querySelectorAll('[data-scene]'));
  const clamp = (v) => Math.max(0, Math.min(1, v));

  function progress(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (el.classList.contains('pro-hero')) {
      // sticky hero: 0 at top of page, 1 when the stage is about to scroll away
      return clamp(-r.top / (r.height - vh));
    }
    // other scenes: 0 when the top enters the bottom of the screen,
    // 1 when the bottom reaches the top of the screen
    return clamp((vh - r.top) / (vh + r.height));
  }

  let ticking = false;
  function update() {
    ticking = false;
    scenes.forEach((s) => s.style.setProperty('--p', progress(s).toFixed(4)));
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
