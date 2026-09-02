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
  envelope_liner: 'label_envelope_liner',
  details_card: 'label_details_card',
  other: 'label_other',
};

DearDaria.productTypeLabel = function (type) {
  const key = DearDaria.PRODUCT_TYPE_KEY[type] || 'label_other';
  return DearDaria.t(key);
};

DearDaria.PERSONALISABLE_TYPES = ['sleeve', 'bundle', 'other'];

// collection.name is still the internal working label (e.g. "Calla Lily",
// "Boho Peony") - never touched by the French naming pass. Derive a clean
// French family name from whichever real product title we have, by
// stripping the known type-prefix ("Suite ", "Faire-part ", etc.).
const TYPE_PREFIXES = [
  'Suite de Mariage ', 'Suite ', 'Faire-part ', 'Menu ', 'Marque-place ',
  'Carte-r\u00e9ponse ', 'Carte d\u2019annonce ', 'Doublure d\u2019enveloppe ',
  'Pi\u00e8ce coordonn\u00e9e ', '\u00c9tiquette \u00e0 Verre ',
];
DearDaria.collectionDisplayName = function (collection) {
  const preferred = collection.products.find(p => p.type === 'bundle')
    || collection.products.find(p => p.type === 'sleeve' || p.type === 'other')
    || collection.products[0];
  if (!preferred || !preferred.title) return collection.name;
  let name = preferred.title;
  for (const prefix of TYPE_PREFIXES) {
    if (name.startsWith(prefix)) {
      name = name.slice(prefix.length);
      break;
    }
  }
  return name || collection.name;
};

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
          <div class="name">${product.title}</div>
          <div class="view">${DearDaria.t('discover_model')}</div>
        </div>
      </div>
      <div class="card-caption-static design-card-meta">
        <div class="name">${product.title}</div>
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
