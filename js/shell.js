// Dear Daria — shared shell: nav, footer, mobile toggle, lazy images
window.DearDaria = window.DearDaria || {};

(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'collections.html', label: 'Collections' },
    { href: 'invitation-jackets.html', label: 'Invitation Jackets' },
    { href: 'wedding-suites.html', label: 'Wedding Suites' },
    { href: 'shop.html', label: 'Shop' },
    { href: 'bespoke.html', label: 'Bespoke' },
    { href: 'info.html', label: 'Info' },
  ];

  function currentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function renderNav() {
    const mount = document.getElementById('site-nav');
    if (!mount) return;
    const current = currentPage();
    const items = NAV_LINKS.map(
      (l) => `<li><a href="${l.href}" class="${l.href === current ? 'active' : ''}">${l.label}</a></li>`
    ).join('');

    mount.innerHTML = `
      <div class="container">
        <a href="index.html" class="nav-logo">Dear Daria</a>
        <ul class="nav-links" id="nav-links">${items}</ul>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>`;

    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="nav-logo">Dear Daria</span>
            <p>Handmade wedding &amp; event stationery, designed and crafted in Switzerland.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="collections.html">Collections</a></li>
              <li><a href="invitation-jackets.html">Invitation Jackets</a></li>
              <li><a href="wedding-suites.html">Wedding Suites</a></li>
              <li><a href="shop.html">Shop</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="bespoke.html">Bespoke</a></li>
              <li><a href="info.html#about">About</a></li>
              <li><a href="info.html#professionals">For Professionals</a></li>
              <li><a href="info.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="info.html#contact">Contact</a></li>
              <li><a href="mailto:hello@deardaria.com">hello@deardaria.com</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Dear Daria. Handmade in Switzerland.</span>
          <span>Designed with care, one suite at a time.</span>
        </div>
      </div>`;
  }

  function initLazyImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"]:not(.loaded)');
    if (!('IntersectionObserver' in window)) {
      imgs.forEach((img) => img.classList.add('loaded'));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '80px' }
    );
    imgs.forEach((img) => io.observe(img));
  }

  // Expose immediately so page scripts can call it regardless of timing,
  // not only after DOMContentLoaded fires.
  DearDaria.initLazyImages = initLazyImages;

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    initLazyImages();
  });
})();
