// Beau Papier — physical goods pricing. Every product has a minimum order
// quantity and a per-unit price that drops at volume breakpoints. No Etsy,
// no digital templates — printed pieces, ordered in bulk.
window.Pricing = {};

Pricing.MIN_QTY = 10;

Pricing.TIERS = {
  small: [
    { min: 10, max: 39, price: 5.99 },
    { min: 40, max: 99, price: 4.99 },
    { min: 100, max: Infinity, price: 3.99 },
  ],
  sleeve: [
    { min: 10, max: 39, price: 14.99 },
    { min: 40, max: 99, price: 12.99 },
    { min: 100, max: Infinity, price: 9.99 },
  ],
  bundle: [
    { min: 10, max: 39, price: 14.99 },
    { min: 40, max: 99, price: 12.99 },
    { min: 100, max: Infinity, price: 9.99 },
  ],
};

Pricing.CATEGORY_FOR_TYPE = {
  sleeve: "sleeve",
  bundle: "bundle",
  place_card: "small",
  rsvp: "small",
  save_the_date: "small",
  menu: "small",
  glass_tag: "small",
  other: "small",
};

Pricing.tiersFor = function (productType) {
  const category = Pricing.CATEGORY_FOR_TYPE[productType] || "small";
  return Pricing.TIERS[category];
};

Pricing.priceForQty = function (productType, qty) {
  const tiers = Pricing.tiersFor(productType);
  const tier = tiers.find((t) => qty >= t.min && qty <= t.max) || tiers[tiers.length - 1];
  return tier.price;
};

Pricing.lowestPrice = function (productType) {
  const tiers = Pricing.tiersFor(productType);
  return Math.min(...tiers.map((t) => t.price));
};

Pricing.formatCHF = function (amount) {
  return `CHF ${amount.toFixed(2)}`;
};
