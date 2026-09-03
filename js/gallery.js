// Beau Papier — shared product/suite image gallery.
// Connects one large hero image with prev/next arrows and a thumbnail strip,
// reusing the same image list for both (no duplicated data).
window.DearDaria = window.DearDaria || {};

DearDaria.initProductGallery = function (opts) {
  const { images, mainImgEl, prevBtnEl, nextBtnEl, thumbContainer, altText } = opts;
  if (!images || !mainImgEl) return;

  // Single image: no arrows, no navigation - per spec.
  if (images.length <= 1) {
    if (prevBtnEl) prevBtnEl.style.display = 'none';
    if (nextBtnEl) nextBtnEl.style.display = 'none';
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
      mainImgEl.alt = altText;
      mainImgEl.classList.remove('gallery-fading');
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
