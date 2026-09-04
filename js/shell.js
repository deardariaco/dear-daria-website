// Beau Papier — shared shell: nav, footer, mobile toggle, lazy images
window.DearDaria = window.DearDaria || {};

(function () {
  const NAV_LINKS = [
    { href: 'index.html', key: 'nav_home' },
    { href: 'invitation-jackets.html', key: 'nav_pochettes' },
    { href: 'wedding-suites.html', key: 'nav_suites_mariage' },
    { href: 'bespoke.html', key: 'nav_sur_mesure_top' },
    { href: 'info.html#about', key: 'nav_a_propos' },
    { href: 'faq.html', key: 'nav_faq' },
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
        <a href="index.html" class="nav-logo nav-logo-img"><img src="clean_images/beau-papier-logo-new.png" alt="Beau Papier"><span class="nav-logo-text">Beau Papier</span></a>
        <ul class="nav-links" id="nav-links">${items}<li class="nav-mobile-cta"><a href="consultation.html" class="btn primary" data-i18n="nav_request_consultation"></a></li></ul>
        <a href="inspirations.html" class="nav-inspirations" aria-label="Mes Inspirations">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.1C0.3 8.5 1.8 5 5.3 4.2c2-.5 4 .3 5.2 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.5 5.2-2C20.2 5 21.7 8.5 20 11.9 18.5 16.4 12 21 12 21z"/></svg>
          <span class="inspirations-count"></span>
        </a>
        <a href="consultation.html" class="btn primary nav-consult-cta" data-i18n="nav_request_consultation"></a>
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
              <li><a href="invitation-jackets.html" data-i18n="nav_pochettes"></a></li>
              <li><a href="wedding-suites.html" data-i18n="nav_suites_mariage"></a></li>
              <li><a href="bespoke.html" data-i18n="nav_sur_mesure_top"></a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer_studio"></h4>
            <ul>
              <li><a href="info.html#about" data-i18n="nav_a_propos"></a></li>
              <li><a href="info.html#professionals" data-i18n="footer_professionals"></a></li>
              <li><a href="faq.html" data-i18n="nav_faq"></a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer_contact"></h4>
            <ul>
              <li><a href="consultation.html" data-i18n="nav_request_consultation"></a></li>
              <li><a href="mailto:daria@beaupapier.ch">daria@beaupapier.ch</a></li>
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

  function renderStickyMobileBar() {
    // Hidden on the consultation page itself - the form is already the destination.
    if (currentPage() === 'consultation.html') return;
    if (document.getElementById('sticky-mobile-cta')) return;
    const bar = document.createElement('div');
    bar.id = 'sticky-mobile-cta';
    bar.className = 'sticky-mobile-cta';
    bar.innerHTML = `<a href="consultation.html" class="btn primary" data-i18n="nav_request_consultation"></a>`;
    document.body.appendChild(bar);

    // Discreetly hide the sticky bar while another consultation CTA is
    // already visible on screen, so visitors never see two side by side.
    if ('IntersectionObserver' in window) {
      const watchTargets = Array.from(document.querySelectorAll('a[href="consultation.html"].btn.primary'))
        .filter(el => !bar.contains(el) && !el.closest('.site-nav'));
      if (watchTargets.length) {
        const visible = new Set();
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
          });
          bar.classList.toggle('sticky-cta-discreet', visible.size > 0);
        }, { threshold: 0.2 });
        watchTargets.forEach(el => io.observe(el));
      }
    }
  }
  DearDaria.renderStickyMobileBar = renderStickyMobileBar;

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    renderStickyMobileBar();
    DearDaria.applyTranslations();
    initLazyImages();
  });
})();
