// Beau Papier — configurator page controller
(function () {
  const C = Configurator;
  let activeDesign = C.DESIGNS[0];

  function buildStageDOM(design) {
    const stage = document.getElementById('stage-inner');
    stage.innerHTML = '';
    const [w, h] = design.aspect.split('/').map((n) => parseFloat(n));
    document.getElementById('invitation-stage').style.setProperty('--stage-aspect-w', w);
    document.getElementById('invitation-stage').style.setProperty('--stage-aspect-h', h);

    design.layers.forEach((layer) => {
      const url = `layers/${design.id}/${layer.key}.webp`;
      const div = document.createElement('div');

      if (layer.kind === 'static') {
        div.className = 'layer';
        div.innerHTML = `<img src="${url}" alt="">`;
      } else if (layer.kind === 'topper-multiply') {
        div.className = 'layer layer-topper-multiply';
        div.innerHTML = `<img src="${url}" alt="">`;
      } else if (layer.kind === 'topper-screen') {
        div.className = 'layer layer-topper-screen';
        div.innerHTML = `<img src="${url}" alt="">`;
      } else if (layer.kind === 'paper' || layer.kind === 'insert' || layer.kind === 'artwork-group') {
        div.className = 'layer';
        div.innerHTML = `
          <div class="layer-color" data-layer="${layer.key}-color" style="-webkit-mask-image:url('${url}'); mask-image:url('${url}');"></div>
          <div class="layer-detail" data-layer="${layer.key}-detail"><img src="${url}" alt=""></div>`;
      } else {
        div.className = 'layer';
        div.innerHTML = `<div class="layer-color" data-layer="${layer.key}-color" style="-webkit-mask-image:url('${url}'); mask-image:url('${url}');"></div>`;
      }
      stage.appendChild(div);
    });
  }

  function applyColors(design) {
    const stage = document.getElementById('invitation-stage');
    const s = design.state;

    stage.style.setProperty('--paper-color', s.paper);
    stage.style.setProperty('--insert-color', s.insert);
    stage.style.setProperty('--artwork-color', s.artwork);
    stage.style.setProperty('--text-color', s.text);

    design.layers.forEach((layer) => {
      const colorEl = stage.querySelector(`[data-layer="${layer.key}-color"]`);
      const detailEl = stage.querySelector(`[data-layer="${layer.key}-detail"]`);
      if (!colorEl) return;

      let color;
      if (layer.kind === 'paper' || layer.kind === 'artwork-group') color = s.paper;
      else if (layer.kind === 'insert') color = s.insert;
      else if (layer.kind === 'artwork') color = s.artwork;
      else if (layer.kind === 'text') color = s.text;
      else if (layer.kind === 'auto-tint') color = C.lightenColor(s.paper, 0.82);

      colorEl.style.setProperty('--layer-color', color);
      if (detailEl) detailEl.style.opacity = C.detailOpacityFor(color);
    });
  }

  function renderSwatchRow(mountId, palette, currentColor, refColor, onPick) {
    const mount = document.getElementById(mountId);
    mount.innerHTML = palette.map((swatch) => {
      const isRef = refColor !== null;
      const valid = !isRef || C.isValid(swatch.color, refColor);
      const active = swatch.color.toLowerCase() === currentColor.toLowerCase();
      return `<div class="swatch ${active ? 'active' : ''} ${valid ? '' : 'invalid'}"
                   style="background:${swatch.color}" title="${swatch.name}"
                   data-color="${swatch.color}" data-valid="${valid}"></div>`;
    }).join('');
    mount.querySelectorAll('.swatch').forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.valid === 'false') return;
        onPick(el.dataset.color);
      });
    });
  }

  function updateValidationNote(id, isValid) {
    const note = document.getElementById(id);
    note.classList.toggle('show', !isValid);
  }

  function refreshPanel() {
    const design = activeDesign;
    const s = design.state;

    renderSwatchRow('swatch-paper', C.SHARED_PALETTES.cardstock, s.paper, null, (color) => {
      s.paper = color;
      if (!C.isValid(s.artwork, s.paper)) s.artwork = C.darkestValidPreset(s.paper);
      afterChange();
    });

    renderSwatchRow('swatch-insert', C.SHARED_PALETTES.insert, s.insert, null, (color) => {
      s.insert = color;
      if (!C.isValid(s.text, s.insert)) s.text = C.darkestValidPreset(s.insert);
      afterChange();
    });

    renderSwatchRow('swatch-artwork', C.SHARED_PALETTES.ink, s.artwork, s.paper, (color) => {
      s.artwork = color;
      afterChange();
    });

    renderSwatchRow('swatch-text', C.SHARED_PALETTES.ink, s.text, s.insert, (color) => {
      s.text = color;
      afterChange();
    });

    document.getElementById('hex-paper').value = s.paper;
    document.getElementById('hex-insert').value = s.insert;
    document.getElementById('hex-artwork').value = s.artwork;
    document.getElementById('hex-text').value = s.text;

    updateValidationNote('note-artwork', C.isValid(s.artwork, s.paper));
    updateValidationNote('note-text', C.isValid(s.text, s.insert));

    const shopInfo = C.SHOP_LINKS[design.id];
    const shopBtn = document.getElementById('shop-this-design');
    if (shopInfo) {
      shopBtn.style.display = '';
      shopBtn.href = `product.html?slug=${shopInfo.slug}&type=${shopInfo.type}`;
    } else {
      shopBtn.style.display = 'none';
    }
  }

  function afterChange() {
    applyColors(activeDesign);
    refreshPanel();
  }

  function switchDesign(id) {
    activeDesign = C.DESIGNS.find((d) => d.id === id) || C.DESIGNS[0];
    document.querySelectorAll('.design-pill').forEach((p) => p.classList.toggle('active', p.dataset.id === activeDesign.id));
    buildStageDOM(activeDesign);
    applyColors(activeDesign);
    refreshPanel();
  }

  function renderDesignSwitcher() {
    const mount = document.getElementById('design-switcher');
    mount.innerHTML = C.DESIGNS.map(
      (d) => `<button class="design-pill ${d.id === activeDesign.id ? 'active' : ''}" data-id="${d.id}">${d.name}</button>`
    ).join('');
    mount.querySelectorAll('.design-pill').forEach((btn) => {
      btn.addEventListener('click', () => switchDesign(btn.dataset.id));
    });
  }

  function wireCustomHex() {
    const map = [
      ['paper', 'hex-paper', 'color-paper'],
      ['insert', 'hex-insert', 'color-insert'],
      ['artwork', 'hex-artwork', 'color-artwork'],
      ['text', 'hex-text', 'color-text'],
    ];
    map.forEach(([key, textId, colorId]) => {
      const textInput = document.getElementById(textId);
      const colorInput = document.getElementById(colorId);
      const commit = (val) => {
        if (!/^#[0-9a-fA-F]{6}$/.test(val)) return;
        activeDesign.state[key] = val;
        afterChange();
      };
      textInput.addEventListener('change', () => commit(textInput.value));
      colorInput.addEventListener('input', () => commit(colorInput.value));
    });
  }

  function wireReset() {
    document.getElementById('reset-design').addEventListener('click', () => {
      activeDesign.state = Object.assign({}, C.DEFAULTS, activeDesign.defaults || {});
      afterChange();
    });
  }

  function init() {
    const requested = DearDaria.getQueryParam ? DearDaria.getQueryParam('design') : null;
    if (requested && C.DESIGNS.some((d) => d.id === requested)) {
      activeDesign = C.DESIGNS.find((d) => d.id === requested);
    }
    renderDesignSwitcher();
    buildStageDOM(activeDesign);
    applyColors(activeDesign);
    refreshPanel();
    wireCustomHex();
    wireReset();
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 0);
  });
})();
