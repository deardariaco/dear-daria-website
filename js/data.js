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

DearDaria.PRODUCT_TYPE_LABELS = {
  bundle: 'Wedding Suite',
  sleeve: 'Invitation Sleeve',
  place_card: 'Place Card',
  rsvp: 'RSVP Card',
  save_the_date: 'Save the Date',
  menu: 'Menu',
  glass_tag: 'Glass Tag',
  other: 'Invitation',
};

// Renders a collection card: clean image by default, hover reveal on desktop,
// static caption below image on touch/mobile — per brief.
DearDaria.collectionCardHTML = function (collection) {
  return `
    <a class="card" href="collection.html?slug=${collection.slug}">
      <div class="card-media">
        <img class="lazy-img" loading="lazy" src="${DearDaria.imgUrl(collection.hero)}" alt="${collection.name} wedding stationery">
        <div class="card-hover-caption">
          <div class="unfold-rule"></div>
          <div class="name">${collection.name}</div>
          <div class="view">View Collection</div>
        </div>
      </div>
      <div class="card-caption-static">
        <div class="name">${collection.name}</div>
        <div class="meta">${collection.products.length} piece${collection.products.length === 1 ? '' : 's'} available</div>
      </div>
    </a>`;
};

DearDaria.productCardHTML = function (collection, product, image) {
  const label = DearDaria.PRODUCT_TYPE_LABELS[product.type] || 'Stationery';
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
