// Beau Papier — "Mes inspirations" favorites. Pure localStorage, no accounts,
// no cart/checkout language. A visitor can save pieces they like and revisit
// them later in the same browser.
window.DearDaria = window.DearDaria || {};

DearDaria.INSPIRATIONS_KEY = 'beaupapier_inspirations';

DearDaria.getInspirations = function () {
  try {
    const raw = window.localStorage.getItem(DearDaria.INSPIRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

DearDaria.saveInspirations = function (list) {
  try {
    window.localStorage.setItem(DearDaria.INSPIRATIONS_KEY, JSON.stringify(list));
  } catch (e) { /* storage unavailable - fail silently, feature just won't persist */ }
};

DearDaria.isInspirationSaved = function (id) {
  return DearDaria.getInspirations().some(i => i.id === id);
};

DearDaria.toggleInspiration = function (item) {
  const list = DearDaria.getInspirations();
  const idx = list.findIndex(i => i.id === item.id);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(Object.assign({ savedAt: Date.now() }, item));
  }
  DearDaria.saveInspirations(list);
  DearDaria.updateInspirationsCount();
  return idx === -1; // true if it was just added
};

DearDaria.updateInspirationsCount = function () {
  const count = DearDaria.getInspirations().length;
  document.querySelectorAll('.inspirations-count').forEach(el => {
    el.textContent = count > 0 ? String(count) : '';
    el.classList.toggle('has-items', count > 0);
  });
  document.querySelectorAll('.heart-btn').forEach(btn => {
    const id = btn.getAttribute('data-inspiration-id');
    btn.classList.toggle('active', DearDaria.isInspirationSaved(id));
  });
};

// Builds a heart-button HTML fragment for a product card or product page.
// item: { id, title, image, url, type }
DearDaria.heartButtonHTML = function (item) {
  const saved = DearDaria.isInspirationSaved(item.id);
  const label = DearDaria.t('save_inspiration');
  return `<button type="button" class="heart-btn${saved ? ' active' : ''}" data-inspiration-id="${item.id}"
      data-inspiration-title="${item.title.replace(/"/g, '&quot;')}"
      data-inspiration-image="${item.image}"
      data-inspiration-url="${item.url}"
      data-inspiration-type="${item.type}"
      aria-label="${label}" aria-pressed="${saved}">
    <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.1C0.3 8.5 1.8 5 5.3 4.2c2-.5 4 .3 5.2 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.5 5.2-2C20.2 5 21.7 8.5 20 11.9 18.5 16.4 12 21 12 21z"/></svg>
  </button>`;
};

// Delegated click handler - works for hearts injected at any time, on any page.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.heart-btn');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const item = {
    id: btn.getAttribute('data-inspiration-id'),
    title: btn.getAttribute('data-inspiration-title'),
    image: btn.getAttribute('data-inspiration-image'),
    url: btn.getAttribute('data-inspiration-url'),
    type: btn.getAttribute('data-inspiration-type'),
  };
  const nowSaved = DearDaria.toggleInspiration(item);
  btn.classList.toggle('active', nowSaved);
  btn.setAttribute('aria-pressed', String(nowSaved));
});

document.addEventListener('DOMContentLoaded', () => {
  DearDaria.updateInspirationsCount();
});
