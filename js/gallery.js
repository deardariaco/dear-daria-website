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
DearDaria.CAPTION_KEY_FOR_TYPE = {
  bundle: 'caption_bundle',
  sleeve: 'caption_sleeve',
  jacket: 'caption_jacket',
  other: 'caption_other',
  save_the_date: 'caption_save_the_date',
  rsvp: 'caption_rsvp',
  envelope_liner: 'caption_envelope_liner',
  menu: 'caption_menu',
  place_card: 'caption_place_card',
  details_card: 'caption_details_card',
  glass_tag: 'caption_glass_tag',
};
DearDaria.captionForType = function (type) {
  const key = DearDaria.CAPTION_KEY_FOR_TYPE[type];
  return key ? DearDaria.t(key) : '';
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
  // No manual overrides currently needed - the round-robin algorithm below
  // (buildSuiteGallery) handles every suite automatically, including
  // Magnolia et Colibri, once the underlying data is correctly split and
  // deduplicated. Add a collection.id key here only for a genuine exception.
};

DearDaria.buildSuiteGallery = function (collection) {
  // Manual override takes precedence if one exists for this collection.
  if (DearDaria.SUITE_GALLERY_OVERRIDES[collection.id]) {
    return DearDaria.SUITE_GALLERY_OVERRIDES[collection.id].map(e => ({ ...e, type: null }));
  }

  // Round-robin interleaving: take one image from each product type in turn,
  // cycling through, so the visitor sees a varied mix of components within
  // the first few clicks instead of long runs of the same type. This applies
  // automatically to every suite - adding a new photo to any product type in
  // site-data.json flows into the right position with no code changes.
  const byType = {};
  collection.products.forEach(p => { byType[p.type] = (p.images || []).slice(); });

  const entries = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const type of DearDaria.GALLERY_TYPE_ORDER) {
      const queue = byType[type];
      if (queue && queue.length) {
        const img = queue.shift();
        const product = collection.products.find(p => p.type === type);
        entries.push({ image: img, caption: DearDaria.captionForType(type) || (product && DearDaria.productTitle(product)) || '', type });
        remaining = true;
      }
    }
  }
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

  let idx = 0;

  function setCaption(i) {
    if (captionEl && captions && captions[i]) captionEl.textContent = captions[i];
  }

  // Single image: no arrows, no navigation - per spec.
  if (images.length <= 1) {
    if (prevBtnEl) prevBtnEl.style.display = 'none';
    if (nextBtnEl) nextBtnEl.style.display = 'none';
    setCaption(0);
  }
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

  // Full-screen viewer for individual faire-part and suite galleries.
  // Homepage cards never call initProductGallery, so they remain unchanged.
  const lang = DearDaria.getLang();
  const closeLabel = lang === 'en' ? 'Close full-screen image' : lang === 'de' ? 'Vollbild schliessen' : 'Fermer l’image plein écran';
  const prevLabel = lang === 'en' ? 'Previous image' : lang === 'de' ? 'Vorheriges Bild' : 'Image précédente';
  const nextLabel = lang === 'en' ? 'Next image' : lang === 'de' ? 'Nächstes Bild' : 'Image suivante';
  const previousLightbox = document.querySelector('.gallery-lightbox');
  if (previousLightbox) previousLightbox.remove();
  document.body.classList.remove('gallery-lightbox-open');
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('aria-label', altText);
  lightbox.innerHTML = `
    <button type="button" class="gallery-lightbox-close" aria-label="${closeLabel}">&times;</button>
    <button type="button" class="gallery-lightbox-arrow gallery-lightbox-prev" aria-label="${prevLabel}">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <img class="gallery-lightbox-image" alt="">
    <button type="button" class="gallery-lightbox-arrow gallery-lightbox-next" aria-label="${nextLabel}">
      <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <p class="gallery-lightbox-caption"></p>`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.gallery-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.gallery-lightbox-caption');
  const lightboxClose = lightbox.querySelector('.gallery-lightbox-close');
  const lightboxPrev = lightbox.querySelector('.gallery-lightbox-prev');
  const lightboxNext = lightbox.querySelector('.gallery-lightbox-next');
  let lastFocused = null;

  function updateLightbox() {
    const caption = captions && captions[idx] ? captions[idx] : '';
    lightboxImg.src = DearDaria.imgUrl(images[idx]);
    lightboxImg.alt = caption ? `${altText}, ${caption}` : altText;
    lightboxCaption.textContent = caption;
    lightboxPrev.disabled = idx === 0;
    lightboxNext.disabled = idx === images.length - 1;
    lightboxPrev.style.display = images.length > 1 ? '' : 'none';
    lightboxNext.style.display = images.length > 1 ? '' : 'none';
  }

  function openLightbox() {
    lastFocused = document.activeElement;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-lightbox-open');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function moveLightbox(newIdx) {
    if (newIdx < 0 || newIdx >= images.length) return;
    showIndex(newIdx, false);
    idx = newIdx;
    updateLightbox();
  }

  mainImgEl.setAttribute('tabindex', '0');
  mainImgEl.setAttribute('role', 'button');
  mainImgEl.setAttribute('aria-label', `${altText}. ${lang === 'en' ? 'Open full-screen image' : lang === 'de' ? 'Bild im Vollbild öffnen' : 'Ouvrir l’image en plein écran'}`);
  mainImgEl.addEventListener('click', openLightbox);
  mainImgEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox();
    }
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => moveLightbox(idx - 1));
  lightboxNext.addEventListener('click', () => moveLightbox(idx + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { e.preventDefault(); moveLightbox(idx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); moveLightbox(idx + 1); }
  });

  let lightboxTouchStartX = null;
  lightbox.addEventListener('touchstart', (e) => {
    lightboxTouchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (lightboxTouchStartX === null) return;
    const dx = e.changedTouches[0].clientX - lightboxTouchStartX;
    if (Math.abs(dx) > 40) moveLightbox(dx < 0 ? idx + 1 : idx - 1);
    lightboxTouchStartX = null;
  }, { passive: true });

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
