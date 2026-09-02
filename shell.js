// Beau Papier — shared shell: nav, footer, mobile toggle, lazy images
window.DearDaria = window.DearDaria || {};

(function () {
  const NAV_LINKS = [
    { href: 'collections.html', key: 'nav_collections' },
    { href: 'bespoke.html', key: 'nav_bespoke' },
    { href: 'info.html#how-it-works', key: 'nav_how_it_works' },
    { href: 'info.html#about', key: 'nav_about' },
    { href: 'shop.html', key: 'nav_shop' },
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
      (l) => `<li><a href="${l.href}" data-i18n="${l.key}" class="${l.href === current ? 'active' : ''}"></a></li>`
    ).join('');

    mount.innerHTML = `
      <div class="container">
        <a href="index.html" class="nav-logo">Beau Papier</a>
        <ul class="nav-links" id="nav-links">${items}</ul>
        <div class="nav-lang" id="nav-lang-desktop"></div>
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

    DearDaria.renderLangSwitcher('nav-lang-desktop');
  }

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="nav-logo">Beau Papier</span>
            <p data-i18n-html="footer_tagline"></p>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer_explore"></h4>
            <ul>
              <li><a href="collections.html" data-i18n="nav_collections"></a></li>
              <li><a href="invitation-jackets.html" data-i18n="nav_jackets"></a></li>
              <li><a href="wedding-suites.html" data-i18n="nav_suites"></a></li>
              <li><a href="shop.html" data-i18n="nav_shop"></a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer_studio"></h4>
            <ul>
              <li><a href="bespoke.html" data-i18n="nav_bespoke"></a></li>
              <li><a href="info.html#about" data-i18n="footer_about"></a></li>
              <li><a href="info.html#professionals" data-i18n="footer_professionals"></a></li>
              <li><a href="info.html#faq" data-i18n="footer_faq"></a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer_contact"></h4>
            <ul>
              <li><a href="info.html#contact" data-i18n="contact_eyebrow"></a></li>
              <li><a href="mailto:hello@beaupapier.ch">hello@beaupapier.ch</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Beau Papier. <span data-i18n="footer_rights"></span></span>
          <span data-i18n="footer_note"></span>
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

  DearDaria.initLazyImages = initLazyImages;

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    DearDaria.applyTranslations();
    initLazyImages();
  });
})();
