// Beau Papier — data loading + reusable render helpers
window.DearDaria = window.DearDaria || {};

DearDaria.loadData = async function () {
  if (DearDaria._data) return DearDaria._data;
  const res = await fetch('site-data.json');
  const data = await res.json();
  DearDaria._data = data;
  return data;
};

DearDaria.imgUrl = function (filename) {
  return `clean_images/${filename}`;
};

DearDaria.formatPrice = function (price) {
  if (price === null || price === undefined) return null;
  return `CHF ${Number(price).toFixed(2)}`;
};

DearDaria.PRODUCT_TYPE_KEY = {
  bundle: 'label_bundle',
  sleeve: 'label_sleeve',
  place_card: 'label_place_card',
  rsvp: 'label_rsvp',
  save_the_date: 'label_save_the_date',
  menu: 'label_menu',
  glass_tag: 'label_glass_tag',
  other: 'label_other',
};

DearDaria.productTypeLabel = function (type) {
  const key = DearDaria.PRODUCT_TYPE_KEY[type] || 'label_other';
  return DearDaria.t(key);
};

DearDaria.PERSONALISABLE_TYPES = ['sleeve', 'bundle', 'other'];

DearDaria.collectionDescription = function (collection) {
  const lang = DearDaria.getLang();
  if (collection.description && typeof collection.description === 'object') {
    return collection.description[lang] || collection.description.fr || collection.description.en || '';
  }
  return collection.description || '';
};

// Renders a collection card: clean image, no prices, "Découvrir ce modèle" CTA language.
DearDaria.collectionCardHTML = function (collection) {
  const anyPersonalisable = collection.products.some(p => DearDaria.PERSONALISABLE_TYPES.includes(p.type));
  const badge = anyPersonalisable ? `<span class="badge-personalisable">${DearDaria.t('personalisable_badge')}</span>` : '';
  return `
    <a class="card" href="collection.html?slug=${collection.slug}">
      <div class="card-media">
        <img class="lazy-img" loading="lazy" src="${DearDaria.imgUrl(collection.hero)}" alt="${collection.name} wedding stationery">
        <div class="card-hover-caption">
          <div class="unfold-rule"></div>
          <div class="name">${collection.name}</div>
          <div class="view">${DearDaria.t('discover_model')}</div>
        </div>
      </div>
      <div class="card-caption-static design-card-meta">
        <div class="name">${collection.name}</div>
        <div class="type-row">${badge}</div>
      </div>
    </a>`;
};

DearDaria.productCardHTML = function (collection, product, image) {
  const label = DearDaria.productTypeLabel(product.type);
  const badge = DearDaria.PERSONALISABLE_TYPES.includes(product.type) ? `<span class="badge-personalisable">${DearDaria.t('personalisable_badge')}</span>` : '';
  return `
    <a class="card" href="product.html?slug=${collection.slug}&type=${product.type}">
      <div class="card-media">
        <img class="lazy-img" loading="lazy" src="${DearDaria.imgUrl(image)}" alt="${product.title}">
        <div class="card-hover-caption">
          <div class="unfold-rule"></div>
          <div class="name">${collection.name}</div>
          <div class="view">${DearDaria.t('discover_model')}</div>
        </div>
      </div>
      <div class="card-caption-static design-card-meta">
        <div class="name">${collection.name}</div>
        <div class="type-row"><span class="type">${label}</span>${badge}</div>
      </div>
    </a>`;
};

DearDaria.renderGrid = function (mountId, html, cols) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.className = `grid cols-${cols || 3}`;
  mount.innerHTML = html;
  if (DearDaria.initLazyImages) DearDaria.initLazyImages();
};

DearDaria.getQueryParam = function (key) {
  return new URLSearchParams(window.location.search).get(key);
};
