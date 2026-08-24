// Dear Daria — data loading + reusable render helpers
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

DearDaria.collectionDescription = function (collection) {
  const lang = DearDaria.getLang();
  if (collection.description && typeof collection.description === 'object') {
    return collection.description[lang] || collection.description.fr || collection.description.en || '';
  }
  return collection.description || '';
};

// Renders a collection card: clean image by default, hover reveal on desktop,
// static caption below image on touch/mobile — per brief.
DearDaria.collectionCardHTML = function (collection) {
  const count = collection.products.length;
  const pieceWord = DearDaria.t(count === 1 ? 'piece_available' : 'pieces_available');
  return `
    <a class="card" href="collection.html?slug=${collection.slug}">
      <div class="card-media">
        <img class="lazy-img" loading="lazy" src="${DearDaria.imgUrl(collection.hero)}" alt="${collection.name} wedding stationery">
        <div class="card-hover-caption">
          <div class="unfold-rule"></div>
          <div class="name">${collection.name}</div>
          <div class="view">${DearDaria.t('view_collection')}</div>
        </div>
      </div>
      <div class="card-caption-static">
        <div class="name">${collection.name}</div>
        <div class="meta">${count} ${pieceWord}</div>
      </div>
    </a>`;
};

DearDaria.productCardHTML = function (collection, product, image) {
  const label = DearDaria.productTypeLabel(product.type);
  const price = DearDaria.formatPrice(product.price);
  return `
    <a class="card" href="product.html?slug=${collection.slug}&type=${product.type}">
      <div class="card-media">
        <img class="lazy-img" loading="lazy" src="${DearDaria.imgUrl(image)}" alt="${product.title}">
        <div class="card-hover-caption">
          <div class="unfold-rule"></div>
          <div class="name">${collection.name}</div>
          <div class="view">${label}${price ? ' — ' + price : ''}</div>
        </div>
      </div>
      <div class="card-caption-static">
        <div class="name">${collection.name}</div>
        <div class="meta">${label}${price ? ' · ' + price : ''}</div>
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
