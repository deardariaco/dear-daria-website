// Beau Papier — professionals page: scroll-driven scenes and reveals.
// Each [data-scene] gets --p from 0 (scene enters) to 1 (scene done).
// The value glides toward the scroll position instead of jumping, so the
// mountains, lake and boat move with a slow, weighted feel.
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal blocks once, as they come into view. Masked lines are watched
  // through their wrapper, because the line itself starts hidden below it.
  const revealEls = document.querySelectorAll('.reveal, .reveal-line, .reveal-img');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = e.target.__revealTarget || e.target;
        target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    let line = 0;
    revealEls.forEach((el) => {
      if (el.classList.contains('reveal-line')) {
        el.style.transitionDelay = (line++ % 3) * 0.14 + 's';
        const wrap = el.parentElement;
        wrap.__revealTarget = el;
        io.observe(wrap);
      } else {
        io.observe(el);
      }
    });
  }

  if (reduce) return;

  const scenes = Array.from(document.querySelectorAll('[data-scene]')).map((el) => ({ el, cur: null }));
  const clamp = (v) => Math.max(0, Math.min(1, v));

  function target(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (el.classList.contains('pro-hero')) {
      return clamp(-r.top / (r.height - vh));
    }
    return clamp((vh - r.top) / (vh + r.height));
  }

  let running = false;
  function frame() {
    let moving = false;
    scenes.forEach((s) => {
      const t = target(s.el);
      if (s.cur === null) s.cur = t;
      const next = s.cur + (t - s.cur) * 0.14;
      s.cur = Math.abs(t - next) < 0.0004 ? t : next;
      if (s.cur !== t) moving = true;
      s.el.style.setProperty('--p', s.cur.toFixed(4));
    });
    if (moving) requestAnimationFrame(frame); else running = false;
  }
  function kick() {
    if (!running) { running = true; requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  kick();
})();
