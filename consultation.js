// Beau Papier — consultation request system. No online checkout, no configurator.
// This module builds the consultation form, carries the design context from
// wherever the visitor clicked "Demander une consultation", and constructs
// a WhatsApp (primary) and email (alternative) message from the filled fields.
// Neither is a third-party dependency - both are plain wa.me / mailto: links.
window.Consultation = {};

// TODO: replace with Daria's real WhatsApp number (country code, digits only,
// e.g. "41791234567" for a Swiss +41 79 number). Left blank until confirmed -
// the WhatsApp button is hidden if this is empty, never shown broken.
Consultation.WHATSAPP_NUMBER = '41786276426';
Consultation.EMAIL = 'hello@beaupapier.ch';

Consultation.PIECE_OPTIONS = [
  { key: 'sleeve', labelKey: 'piece_opt_sleeve' },
  { key: 'invitation', labelKey: 'piece_opt_invitation' },
  { key: 'save_the_date', labelKey: 'piece_opt_save_the_date' },
  { key: 'rsvp', labelKey: 'piece_opt_rsvp' },
  { key: 'menu', labelKey: 'piece_opt_menu' },
  { key: 'place_card', labelKey: 'piece_opt_place_card' },
  { key: 'envelope_liner', labelKey: 'piece_opt_envelope_liner' },
  { key: 'other', labelKey: 'piece_opt_other' },
];

Consultation.PROJECT_TYPES = ['type_existing', 'type_suite', 'type_bespoke', 'type_other'];

Consultation.formHTML = function (opts) {
  opts = opts || {};
  const pieceCheckboxes = Consultation.PIECE_OPTIONS.map(p =>
    `<label class="piece-check"><input type="checkbox" name="pieces" value="${p.key}"> <span data-i18n="${p.labelKey}"></span></label>`
  ).join('');

  const projectTypeOptions = Consultation.PROJECT_TYPES.map(t =>
    `<option value="${t}" data-i18n="${t}" data-i18n-attr="value:${t}"></option>`
  ).map(o => o.replace(/data-i18n-attr="[^"]*"/, '')).join(''); // keep option text translated via JS pass below

  return `
    <form class="consult-form" id="consult-form">
      <input type="hidden" id="cf-design-name" name="design_name" value="${opts.designName || ''}">
      <input type="hidden" id="cf-design-slug" name="design_slug" value="${opts.designSlug || ''}">

      <div id="cf-design-banner" class="cf-design-banner" style="${opts.designName ? '' : 'display:none;'}">
        <span data-i18n="cf_regarding"></span> <strong id="cf-design-banner-name">${opts.designName || ''}</strong>
      </div>

      <div class="form-grid">
        <div class="field"><label data-i18n="cf_name"></label><input type="text" name="full_name" required></div>
        <div class="field"><label data-i18n="cf_email"></label><input type="email" name="email" required></div>

        <div class="field"><label data-i18n="cf_project_type"></label>
          <select name="project_type" id="cf-project-type" required></select>
        </div>
        <div class="field"><label data-i18n="cf_quantity"></label><input type="text" name="quantity" placeholder="ex. 80" required></div>

        <div class="field"><label data-i18n="cf_event_date"></label><input type="date" name="event_date"></div>
        <div class="field"><label data-i18n="cf_delivery_date"></label><input type="date" name="delivery_date"></div>

        <div class="field"><label data-i18n="cf_country"></label><input type="text" name="country"></div>
        <div class="field"><label data-i18n="cf_postal_code"></label><input type="text" name="postal_code"></div>

        <div class="field"><label data-i18n="cf_phone"></label><input type="tel" name="phone"></div>
        <div class="field"><label data-i18n="cf_found_via"></label><input type="text" name="found_via"></div>

        <div class="field full">
          <label data-i18n="cf_pieces_wanted"></label>
          <div class="piece-check-grid">${pieceCheckboxes}</div>
        </div>

        <div class="field"><label data-i18n="cf_colors"></label><input type="text" name="colors" placeholder="ex. sauge, blush"></div>
        <div class="field"><label data-i18n="cf_paper_pref"></label><input type="text" name="paper_pref"></div>

        <div class="field full"><label data-i18n="cf_message"></label><textarea name="message" rows="4"></textarea></div>

        <div class="field full">
          <label class="consent-row"><input type="checkbox" name="consent" required> <span data-i18n="cf_consent"></span></label>
        </div>

        <div class="field full cf-actions">
          <button type="button" id="cf-send-whatsapp" class="btn primary" style="display:none;">
            <span data-i18n="cf_send_whatsapp"></span>
          </button>
          <button type="button" id="cf-send-email" class="btn ghost">
            <span data-i18n="cf_send_email"></span>
          </button>
        </div>
        <p id="cf-validation-note" class="cf-validation-note" style="display:none;" data-i18n="cf_validation_note"></p>
        <p id="cf-success-note" class="cf-success-note" style="display:none;" data-i18n="cf_success_note"></p>
      </div>
    </form>`;
};

Consultation.populateProjectTypeOptions = function () {
  const sel = document.getElementById('cf-project-type');
  if (!sel) return;
  sel.innerHTML = Consultation.PROJECT_TYPES.map(t => `<option value="${t}">${DearDaria.t(t)}</option>`).join('');
};

Consultation.buildMessageText = function (form) {
  const fd = new FormData(form);
  const get = (k) => (fd.get(k) || '').toString().trim();
  const pieces = fd.getAll('pieces').map(p => DearDaria.t('piece_opt_' + p)).join(', ');

  const lines = [
    `${DearDaria.t('cf_name')}: ${get('full_name')}`,
    `${DearDaria.t('cf_email')}: ${get('email')}`,
    `${DearDaria.t('cf_project_type')}: ${DearDaria.t(get('project_type'))}`,
    `${DearDaria.t('cf_quantity')}: ${get('quantity')}`,
  ];
  if (get('design_name')) lines.splice(1, 0, `${DearDaria.t('cf_regarding')}: ${get('design_name')}`);
  if (get('event_date')) lines.push(`${DearDaria.t('cf_event_date')}: ${get('event_date')}`);
  if (get('delivery_date')) lines.push(`${DearDaria.t('cf_delivery_date')}: ${get('delivery_date')}`);
  if (get('country') || get('postal_code')) lines.push(`${DearDaria.t('cf_country')}/${DearDaria.t('cf_postal_code')}: ${get('country')} ${get('postal_code')}`);
  if (get('phone')) lines.push(`${DearDaria.t('cf_phone')}: ${get('phone')}`);
  if (pieces) lines.push(`${DearDaria.t('cf_pieces_wanted')}: ${pieces}`);
  if (get('colors')) lines.push(`${DearDaria.t('cf_colors')}: ${get('colors')}`);
  if (get('paper_pref')) lines.push(`${DearDaria.t('cf_paper_pref')}: ${get('paper_pref')}`);
  if (get('found_via')) lines.push(`${DearDaria.t('cf_found_via')}: ${get('found_via')}`);
  if (get('message')) lines.push(`\n${DearDaria.t('cf_message')}:\n${get('message')}`);

  return lines.join('\n');
};

Consultation.wireForm = function () {
  const form = document.getElementById('consult-form');
  if (!form) return;

  Consultation.populateProjectTypeOptions();

  const waBtn = document.getElementById('cf-send-whatsapp');
  if (Consultation.WHATSAPP_NUMBER) {
    waBtn.style.display = '';
  }

  function validateAndBuild() {
    if (!form.reportValidity()) return null;
    return Consultation.buildMessageText(form);
  }

  waBtn.addEventListener('click', () => {
    const text = validateAndBuild();
    if (!text) return;
    const url = `https://wa.me/${Consultation.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    document.getElementById('cf-success-note').style.display = 'block';
  });

  document.getElementById('cf-send-email').addEventListener('click', () => {
    const text = validateAndBuild();
    if (!text) return;
    const designName = document.getElementById('cf-design-name').value;
    const subject = encodeURIComponent(designName ? `Demande de consultation \u2014 ${designName}` : 'Demande de consultation');
    const url = `mailto:${Consultation.EMAIL}?subject=${subject}&body=${encodeURIComponent(text)}`;
    window.location.href = url;
    document.getElementById('cf-success-note').style.display = 'block';
  });
};

// Reads ?design=NAME&slug=SLUG from the URL and pre-fills the hidden fields + banner
Consultation.applyDesignContext = function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('design');
  const slug = params.get('slug');
  if (!name) return;
  const nameField = document.getElementById('cf-design-name');
  const slugField = document.getElementById('cf-design-slug');
  const banner = document.getElementById('cf-design-banner');
  const bannerName = document.getElementById('cf-design-banner-name');
  if (nameField) nameField.value = name;
  if (slugField) slugField.value = slug || '';
  if (banner) banner.style.display = '';
  if (bannerName) bannerName.textContent = name;
};
