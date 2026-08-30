// Beau Papier — photographic layer recoloring configurator
// Ported from the prototype handoff spec. Same technique: CSS mask-image
// clips a flat background-color to each layer's alpha silhouette, and a
// mix-blend-mode:multiply pass re-composites the original photographic
// grain/shadow on top so it still reads as a photo, not a flat vector.

window.Configurator = {};

Configurator.SHARED_PALETTES = {
  cardstock: [
    { name: "Soft White", color: "#faf8f4" },
    { name: "Warm Ivory", color: "#f1e6d3" },
    { name: "Blush", color: "#f0d9d2" },
    { name: "Dusty Rose", color: "#d7a8a1" },
    { name: "Terracotta", color: "#c1694a" },
    { name: "Light Sage", color: "#bcc7ac" },
    { name: "Deep Olive", color: "#4f5b3e" },
    { name: "Dusty Blue", color: "#8fa5b2" },
    { name: "Navy", color: "#294654" },
    { name: "Burgundy", color: "#6b2334" },
    { name: "Taupe", color: "#ded5c2" },
    { name: "Charcoal", color: "#48423c" },
  ],
  insert: [
    { name: "Soft White", color: "#f4efe7" },
    { name: "Warm Ivory", color: "#f1e8d8" },
    { name: "Pale Blush", color: "#f6e4de" },
    { name: "Light Sage", color: "#dfe8d5" },
    { name: "Light Dusty Blue", color: "#d9e2e7" },
    { name: "Pale Taupe", color: "#e8ddce" },
  ],
  ink: [
    { name: "Black", color: "#0d0d0d" },
    { name: "Charcoal", color: "#2b2723" },
    { name: "Navy", color: "#16232c" },
    { name: "Deep Olive", color: "#333c22" },
    { name: "Burgundy", color: "#3d1420" },
    { name: "Dark Terracotta", color: "#7a3822" },
    { name: "Deep Taupe", color: "#4a4038" },
    { name: "Dark Dusty Blue", color: "#34495a" },
  ],
};

Configurator.DEFAULTS = { paper: "#ded5c2", insert: "#f4efe7", artwork: "#171717", text: "#171717" };
Configurator.MIN_LUMINANCE_GAP = 0.04;

Configurator.relativeLuminance = function (hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

Configurator.isValid = function (hex, refHex) {
  return Configurator.relativeLuminance(hex) <= Configurator.relativeLuminance(refHex) - Configurator.MIN_LUMINANCE_GAP;
};

Configurator.darkestValidPreset = function (refHex) {
  const sorted = [...Configurator.SHARED_PALETTES.ink].sort(
    (a, b) => Configurator.relativeLuminance(a.color) - Configurator.relativeLuminance(b.color)
  );
  for (const swatch of sorted) {
    if (Configurator.isValid(swatch.color, refHex)) return swatch.color;
  }
  return sorted[0].color;
};

Configurator.detailOpacityFor = function (hex) {
  const lum = Configurator.relativeLuminance(hex);
  if (lum > 0.72) return 0.55;
  if (lum > 0.3) return 0.88;
  return 0.72;
};

Configurator.lightenColor = function (hex, amount) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return "#" + [mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("");
};

Configurator.DESIGNS = [
  { id: "tulip", name: "Tulip Sleeve", aspect: "1792 / 2390", hasInsertBackground: true,
    defaults: { paper: "#eee5d3", artwork: "#999085" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "insert-background", kind: "auto-tint" },
      { key: "insert-text", kind: "text" },
      { key: "cutouts", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
      { key: "top-shadows", kind: "topper-multiply" },
    ] },
  { id: "calla", name: "Calla Lily Sleeve", aspect: "1792 / 2390", hasInsertBackground: false,
    defaults: { paper: "#7c856f", artwork: "#0d0d0d" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "insert-text", kind: "text" },
      { key: "cutouts", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
      { key: "light", kind: "topper-screen" },
    ] },
  { id: "hbjacket", name: "Hummingbird Jacket", aspect: "1792 / 2400", hasInsertBackground: false,
    defaults: { paper: "#b4b8ad", artwork: "#333c22" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "insert-text", kind: "text" },
      { key: "cutouts", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "hbsleeve", name: "Hummingbird Sleeve", aspect: "1792 / 2400", hasInsertBackground: false,
    defaults: { paper: "#f0d9d2", artwork: "#6c5a60" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "insert-text", kind: "text" },
      { key: "cutouts", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "sakura", name: "Sakura Jacket", aspect: "1792 / 2390", hasInsertBackground: false,
    defaults: { paper: "#f0d9d2", artwork: "#917369" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "insert-text", kind: "text" },
      { key: "cutouts", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "seashell", name: "Seashell Sleeve", aspect: "1792 / 2390", hasInsertBackground: false,
    defaults: { paper: "#c4d1d9", artwork: "#34495a" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-layer", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "text", kind: "text" },
      { key: "cutout", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "coastal", name: "Coastal Sleeve", aspect: "1792 / 2390", hasInsertBackground: false,
    defaults: { paper: "#c4d1d9", artwork: "#34495a" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "text", kind: "text" },
      { key: "cutout", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "orchid", name: "Orchid Winter Sleeve", aspect: "1792 / 2400", hasInsertBackground: false,
    defaults: { paper: "#c9dae4", artwork: "#34495a" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "text", kind: "text" },
      { key: "cutout", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
      { key: "topper", kind: "static" },
    ] },
  { id: "autumn", name: "Autumn Bouquet Sleeve", aspect: "1856 / 2304", hasInsertBackground: false,
    defaults: { paper: "#a48460", artwork: "#4f2d21" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "text", kind: "text" },
      { key: "cutout", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
  { id: "peony", name: "Peony Jacket", aspect: "1792 / 2390", hasInsertBackground: false,
    defaults: { paper: "#f0d9d2", artwork: "#917369" },
    layers: [
      { key: "background", kind: "static" },
      { key: "back-panel", kind: "paper" },
      { key: "insert", kind: "insert" },
      { key: "text", kind: "text" },
      { key: "cutout", kind: "artwork-group" },
      { key: "artwork", kind: "artwork" },
    ] },
];

Configurator.DESIGNS.forEach((d) => {
  d.state = Object.assign({}, Configurator.DEFAULTS, d.defaults || {});
});

// maps a configurator design id to the site's shop collection, so a
// "shop this design" link can be shown where one exists
Configurator.SHOP_LINKS = {
  tulip: { slug: "tulip", type: "sleeve" },
  calla: { slug: "calla-lily", type: "sleeve" },
  hbjacket: { slug: "hummingbird-magnolia", type: "bundle" },
  hbsleeve: { slug: "hummingbird-magnolia", type: "sleeve" },
  sakura: { slug: "cherry-blossom", type: "sleeve" },
  seashell: { slug: "seashell", type: "sleeve" },
  coastal: { slug: "coastal-villa", type: "sleeve" },
  peony: { slug: "peony", type: "sleeve" },
};
