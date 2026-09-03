// Beau Papier — shared product/suite image gallery.
// Connects one large hero image with prev/next arrows and a thumbnail strip,
// reusing the same image list for both (no duplicated data).
window.DearDaria = window.DearDaria || {};

// Recommended suite-gallery order and French captions per product type.
// This is the "maintainable gallery data structure": adding a new photo to
// any product type in site-data.json automatically flows into every suite
// gallery in the right position, with the right caption, with no HTML edits.
DearDaria.GALLERY_TYPE_ORDER = [
  'bundle', 'sleeve', 'jacket', 'other', 'save_the_date', 'rsvp',
  'envelope_liner', 'menu', 'place_card', 'details_card', 'glass_tag',
];
DearDaria.GALLERY_CAPTIONS = {
  bundle: 'Vue d’ensemble',
  sleeve: 'Faire-part avec pochette',
  jacket: 'Faire-part avec habillage',
  other: 'Faire-part',
  save_the_date: 'Carte d’annonce',
  rsvp: 'Carte-réponse',
  envelope_liner: 'Doublure d’enveloppe',
  menu: 'Menu',
  place_card: 'Marque-place',
  details_card: 'Carte de déroulement',
  glass_tag: '\u00c9tiquette à verre',
};

// Builds the complete gallery for a suite: every image from every coordinated
// piece in the collection, in the recommended order, each tagged with its
// French caption. Used on bundle (suite) product pages so a suite is never
// reduced to just its own overview photos.
// Manually curated colorway-grouped orders for suites where multiple
// colorways exist and the strict type-order would create long repetitive
// runs (all overviews together, all jackets together, etc). Every image was
// individually inspected before being placed here. Collections not listed
// here fall back to the type-ordered algorithm below, which already
// satisfies "group by colorway first" for the (common) single-colorway case.
DearDaria.SUITE_GALLERY_OVERRIDES = {
  hummingbird: [
    // --- Rose colorway ---
    { image: 'hummingbird-bundle-1.jpg', caption: 'Vue d’ensemble' },
    { image: 'hummingbird-sleeve-5.jpg', caption: 'Faire-part avec habillage' },
    { image: 'hummingbird-save_the_date-3.jpg', caption: 'Carte d’annonce' },
    { image: 'hummingbird-rsvp-2.jpg', caption: 'Carte-réponse' },
    { image: 'hummingbird-menu-4.jpg', caption: 'Menu' },
    { image: 'hummingbird-sleeve-1.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-10.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-15.jpg', caption: 'Faire-part avec pochette, détail' },
    { image: 'hummingbird-rsvp-3.jpg', caption: 'Carte-réponse, détail' },
    { image: 'hummingbird-place_card-3.jpg', caption: 'Marque-place, détail' },
    // --- Sauge (sage green) colorway ---
    { image: 'hummingbird-bundle-2.jpg', caption: 'Vue d’ensemble, autre coloris' },
    { image: 'hummingbird-sleeve-9.jpg', caption: 'Faire-part avec habillage' },
    { image: 'hummingbird-save_the_date-4.jpg', caption: 'Carte d’annonce' },
    { image: 'hummingbird-menu-3.jpg', caption: 'Menu' },
    { image: 'hummingbird-place_card-4.jpg', caption: 'Marque-place' },
    { image: 'hummingbird-sleeve-2.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-12.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-14.jpg', caption: 'Faire-part avec pochette, détail' },
    // --- Bleu (blue) colorway ---
    { image: 'hummingbird-bundle-3.jpg', caption: 'Vue d’ensemble, autre coloris' },
    { image: 'hummingbird-sleeve-7.jpg', caption: 'Faire-part avec habillage' },
    { image: 'hummingbird-save_the_date-2.jpg', caption: 'Carte d’annonce' },
    { image: 'hummingbird-rsvp-1.jpg', caption: 'Carte-réponse' },
    { image: 'hummingbird-menu-2.jpg', caption: 'Menu' },
    { image: 'hummingbird-sleeve-3.jpg', caption: 'Faire-part avec pochette, détail' },
    { image: 'hummingbird-sleeve-13.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-16.jpg', caption: 'Faire-part avec pochette, détail' },
    // --- Ivoire (cream, no suite overview available for this colorway) ---
    { image: 'hummingbird-sleeve-11.jpg', caption: 'Faire-part avec habillage, autre coloris' },
    { image: 'hummingbird-menu-1.jpg', caption: 'Menu' },
    { image: 'hummingbird-rsvp-4.jpg', caption: 'Carte-réponse' },
    { image: 'hummingbird-save_the_date-1.jpg', caption: 'Carte d’annonce' },
    // --- Remaining detail and multi-colorway group shots ---
    { image: 'hummingbird-sleeve-4.jpg', caption: 'Faire-part avec pochette, détail' },
    { image: 'hummingbird-sleeve-6.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-sleeve-8.jpg', caption: 'Faire-part avec habillage, détail' },
    { image: 'hummingbird-place_card-1.jpg', caption: 'Marque-place, plusieurs coloris' },
    { image: 'hummingbird-place_card-2.jpg', caption: 'Marque-place, plusieurs coloris' },
    { image: 'hummingbird-rsvp-5.jpg', caption: 'Carte d’annonce, détail' },
  ],
};

DearDaria.buildSuiteGallery = function (collection) {
  if (DearDaria.SUITE_GALLERY_OVERRIDES[collection.id]) {
    return DearDaria.SUITE_GALLERY_OVERRIDES[collection.id].map(e => ({ ...e, type: null }));
  }
  const entries = [];
  const byType = {};
  collection.products.forEach(p => { byType[p.type] = p; });

  DearDaria.GALLERY_TYPE_ORDER.forEach(type => {
    const p = byType[type];
    if (!p || !p.images) return;
    p.images.forEach(img => {
      entries.push({ image: img, caption: DearDaria.GALLERY_CAPTIONS[type] || p.title, type });
    });
  });
  // include any product type not in the known order list, appended at the end
  collection.products.forEach(p => {
    if (!DearDaria.GALLERY_TYPE_ORDER.includes(p.type) && p.images) {
      p.images.forEach(img => entries.push({ image: img, caption: p.title, type: p.type }));
    }
  });
  return entries;
};

DearDaria.initProductGallery = function (opts) {
  const { images, captions, mainImgEl, prevBtnEl, nextBtnEl, thumbContainer, altText, captionEl } = opts;
  if (!images || !mainImgEl) return;

  function setCaption(i) {
    if (captionEl && captions && captions[i]) captionEl.textContent = captions[i];
  }

  // Single image: no arrows, no navigation - per spec.
  if (images.length <= 1) {
    if (prevBtnEl) prevBtnEl.style.display = 'none';
    if (nextBtnEl) nextBtnEl.style.display = 'none';
    setCaption(0);
    return;
  }

  let idx = 0;
  const mediaWrap = mainImgEl.closest('.media-frame') || mainImgEl.closest('.media');

  function preload(i) {
    if (i < 0 || i >= images.length) return;
    const img = new Image();
    img.src = DearDaria.imgUrl(images[i]);
  }

  function updateArrowStates() {
    prevBtnEl.classList.toggle('gallery-arrow-hidden', idx === 0);
    prevBtnEl.disabled = idx === 0;
    nextBtnEl.classList.toggle('gallery-arrow-hidden', idx === images.length - 1);
    nextBtnEl.disabled = idx === images.length - 1;
  }

  function updateThumbActive() {
    if (!thumbContainer) return;
    const thumbs = thumbContainer.querySelectorAll('img');
    thumbs.forEach((t, i) => t.classList.toggle('active-thumb', i === idx));
  }

  function showIndex(newIdx, scrollBack) {
    if (newIdx < 0 || newIdx >= images.length || newIdx === idx) return;
    idx = newIdx;
    mainImgEl.classList.add('gallery-fading');
    window.setTimeout(() => {
      mainImgEl.src = DearDaria.imgUrl(images[idx]);
      mainImgEl.alt = (captions && captions[idx]) ? `${altText}, ${captions[idx]}` : altText;
      mainImgEl.classList.remove('gallery-fading');
      setCaption(idx);
    }, 120);
    updateArrowStates();
    updateThumbActive();
    preload(idx + 1);
    preload(idx - 1);
    if (scrollBack && mediaWrap) {
      mediaWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  prevBtnEl.addEventListener('click', () => showIndex(idx - 1, false));
  nextBtnEl.addEventListener('click', () => showIndex(idx + 1, false));

  // Keyboard navigation while the gallery area has focus.
  if (mediaWrap) {
    mediaWrap.setAttribute('tabindex', '0');
    mediaWrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); showIndex(idx - 1, false); }
      if (e.key === 'ArrowRight') { e.preventDefault(); showIndex(idx + 1, false); }
    });

    // Touch swipe.
    let touchStartX = null;
    mediaWrap.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    mediaWrap.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) showIndex(idx + 1, false); else showIndex(idx - 1, false);
      }
      touchStartX = null;
    }, { passive: true });
  }

  // Thumbnail clicks - same image list, no duplication.
  if (thumbContainer) {
    const thumbs = thumbContainer.querySelectorAll('img');
    thumbs.forEach((t, i) => {
      t.classList.add('gallery-thumb');
      t.setAttribute('tabindex', '0');
      t.setAttribute('role', 'button');
      t.addEventListener('click', () => showIndex(i, true));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showIndex(i, true); }
      });
    });
  }

  updateArrowStates();
  updateThumbActive();
  setCaption(0);
  preload(1);
};

// Standard arrow button markup - identical on every page that uses the gallery.
DearDaria.galleryArrowsHTML = function (lang) {
  const prevLabel = lang === 'en' ? 'Previous image' : lang === 'de' ? 'Vorheriges Bild' : 'Image précédente';
  const nextLabel = lang === 'en' ? 'Next image' : lang === 'de' ? 'N\u00e4chstes Bild' : 'Image suivante';
  return `
    <button type="button" class="gallery-arrow gallery-arrow-prev" id="gallery-prev" aria-label="${prevLabel}">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button type="button" class="gallery-arrow gallery-arrow-next" id="gallery-next" aria-label="${nextLabel}">
      <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>`;
};
