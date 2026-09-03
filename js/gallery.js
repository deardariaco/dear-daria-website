// Beau Papier — shared product/suite image gallery.
// Connects one large hero image with prev/next arrows and a thumbnail strip,
// reusing the same image list for both (no duplicated data).
window.DearDaria = window.DearDaria || {};

// Recommended suite-gallery order and French captions per product type.
// This is the "maintainable gallery data structure": adding a new photo to
// any product type in site-data.json automatically flows into every suite
// gallery in the right position, with the right caption, with no HTML edits.
DearDaria.GALLERY_TYPE_ORDER = [
  'bundle', 'sleeve', 'other', 'save_the_date', 'rsvp',
  'envelope_liner', 'menu', 'place_card', 'details_card', 'glass_tag',
];
DearDaria.GALLERY_CAPTIONS = {
  bundle: 'Vue d\u2019ensemble',
  sleeve: 'Faire-part',
  other: 'Faire-part',
  save_the_date: 'Carte d\u2019annonce',
  rsvp: 'Carte-r\u00e9ponse',
  envelope_liner: 'Doublure d\u2019enveloppe',
  menu: 'Menu',
  place_card: 'Marque-place',
  details_card: 'Carte de d\u00e9roulement',
  glass_tag: '\u00c9tiquette \u00e0 verre',
};

// Builds the complete gallery for a suite: every image from every coordinated
// piece in the collection, in the recommended order, each tagged with its
// French caption. Used on bundle (suite) product pages so a suite is never
// reduced to just its own overview photos.
DearDaria.buildSuiteGallery = function (collection) {
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
  const mediaWrap = mainImgEl.closest('.media');

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
  const prevLabel = lang === 'en' ? 'Previous image' : lang === 'de' ? 'Vorheriges Bild' : 'Image pr\u00e9c\u00e9dente';
  const nextLabel = lang === 'en' ? 'Next image' : lang === 'de' ? 'N\u00e4chstes Bild' : 'Image suivante';
  return `
    <button type="button" class="gallery-arrow gallery-arrow-prev" id="gallery-prev" aria-label="${prevLabel}">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button type="button" class="gallery-arrow gallery-arrow-next" id="gallery-next" aria-label="${nextLabel}">
      <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>`;
};
