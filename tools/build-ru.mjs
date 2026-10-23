// Builds the hidden Russian copy of the site in ru/ from the French pages.
//
// Run after changing any page, js/i18n.js or js/i18n-ru.js:
//   node tools/build-ru.mjs
//
// The Russian pages are only reachable at https://beaupapier.ch/ru/ (for
// example from a QR code). They are noindex, carry no canonical or hreflang
// link, are not in sitemap.xml, and Russian is not offered in the language
// switcher. Every link on them stays inside /ru/.
//
// Translations come from js/i18n-ru.js (shared interface text) and from
// PAGES below (page titles, descriptions and the few French sentences that
// are written directly in the HTML). The build stops if a French sentence
// listed below is no longer found, so a changed page cannot silently keep
// French text.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'ru');
const SITE = 'https://beaupapier.ch';

const PAGES = {
  'index.html': {
    title: 'Beau Papier | Свадебная полиграфия с вырубкой, Швейцария',
    description: 'Beau Papier: свадебные приглашения с вырубкой и коллекции в едином стиле, созданные на личной консультации с Дарьей Вэльхли в Швейцарии.',
    replace: [
      ['aria-label="Pr\\u00e9c\\u00e9dent"', 'aria-label="Назад"', 2],
      ['aria-label="Suivant"', 'aria-label="Далее"', 2],
    ],
  },
  'invitation-jackets.html': {
    title: 'Свадебные приглашения | Beau Papier',
    description: 'Свадебные приглашения Beau Papier: конверты-кармашки с вырубкой, персонализированные и сделанные вручную в Швейцарии.',
  },
  'wedding-suites.html': {
    title: 'Свадебные коллекции | Beau Papier',
    description: 'Свадебные коллекции Beau Papier: полиграфия в едином стиле (приглашения, Save the Date, меню, рассадочные карточки и карточки-ответы), созданная в Швейцарии.',
  },
  'collection.html': {
    title: 'Модель | Beau Papier',
    description: 'Коллекция свадебной полиграфии Beau Papier с вырубкой, персонализированная и сделанная вручную в Швейцарии.',
  },
  'product.html': {
    title: 'Модель | Beau Papier',
    description: 'Свадебная полиграфия Beau Papier с вырубкой, персонализированная и сделанная вручную в Швейцарии.',
  },
  'bespoke.html': {
    title: 'Индивидуальный дизайн | Beau Papier',
    description: 'Индивидуальная свадебная полиграфия: Дарья Вэльхли вместе с вами создаёт уникальный проект, от идеи до прототипа, вручную в Швейцарии. Beau Papier.',
  },
  'info.html': {
    title: 'Обо мне | Beau Papier',
    description: 'О Beau Papier и Дарье Вэльхли, дизайнере свадебной полиграфии с вырубкой, сделанной вручную в Швейцарии.',
  },
  'faq.html': {
    title: 'Вопросы и ответы | Beau Papier',
    // The menu says "Вопросы"; the page heading uses the full wording.
    before: [['data-i18n="nav_faq">FAQ</h1>', 'data-i18n="faq_page_title">FAQ</h1>']],
    description: 'Ответы на частые вопросы о свадебных приглашениях и полиграфии Beau Papier, созданных вручную в Швейцарии.',
  },
  'consultation.html': {
    title: 'Записаться на консультацию | Beau Papier',
    description: 'Запишитесь на персональную консультацию в Beau Papier по свадебным приглашениям и полиграфии, созданным вручную в Швейцарии.',
  },
  'inspirations.html': {
    title: 'Моё избранное | Beau Papier',
    description: 'Работы Beau Papier, которые вы сохранили.',
  },
  'confidentialite.html': {
    title: 'Политика конфиденциальности | Beau Papier',
    description: 'Политика конфиденциальности Beau Papier: какие данные собираются, аналитические cookie-файлы и ваши права.',
    replace: [
      ['<h1 style="font-size:clamp(32px,4.4vw,52px); font-style:italic;">Politique de confidentialité</h1>',
        '<h1 style="font-size:clamp(32px,4.4vw,52px); font-style:italic;">Политика конфиденциальности</h1>'],
      ['<h2>Responsable du traitement</h2>', '<h2>Ответственный за обработку данных</h2>'],
      ['1814 La Tour-de-Peilz, Suisse<br>', '1814 La Tour-de-Peilz, Швейцария<br>'],
      ['<p>Cette politique explique quelles données personnelles sont traitées lorsque vous visitez beaupapier.ch ou me contactez, et dans quel but. Elle s’appuie sur la loi fédérale suisse sur la protection des données (LPD) et, pour les visiteurs de l’Union européenne, sur le Règlement général sur la protection des données (RGPD).</p>',
        '<p>Эта политика объясняет, какие персональные данные обрабатываются, когда вы посещаете beaupapier.ch или связываетесь со мной, и с какой целью. Она основана на Федеральном законе Швейцарии о защите данных (FADP/LPD) и, для посетителей из Европейского союза, на Общем регламенте по защите данных (GDPR).</p>'],
      ['<h2>Demandes de consultation</h2>', '<h2>Запросы на консультацию</h2>'],
      ['<p>Le formulaire de consultation n’enregistre aucune donnée sur ce site. Lorsque vous l’envoyez, il ouvre simplement votre application de messagerie électronique ou WhatsApp avec votre message prérempli. Les informations que vous choisissez de m’envoyer (nom, coordonnées, date de l’événement, détails du projet) sont utilisées uniquement pour répondre à votre demande, préparer un devis et réaliser votre commande.</p>',
        '<p>Форма записи на консультацию не сохраняет никаких данных на этом сайте. При отправке она просто открывает ваше почтовое приложение или WhatsApp с уже заполненным сообщением. Сведения, которые вы решите мне отправить (имя, контакты, дата события, детали проекта), используются только для ответа на ваш запрос, подготовки предложения и выполнения заказа.</p>'],
      ['<p>Si vous m’écrivez via WhatsApp, le message transite par le service de WhatsApp (Meta Platforms) et est soumis à ses propres conditions. Je conserve nos échanges aussi longtemps que nécessaire pour votre projet et pour respecter les obligations légales de conservation, puis je les supprime.</p>',
        '<p>Если вы пишете мне в WhatsApp, сообщение проходит через сервис WhatsApp (Meta Platforms) и подчиняется его собственным условиям. Я храню нашу переписку столько, сколько нужно для вашего проекта и для соблюдения установленных законом сроков хранения, а затем удаляю её.</p>'],
      ['<h2>Cookies de mesure d’audience</h2>', '<h2>Аналитические cookie-файлы</h2>'],
      ['<p>Avec votre accord uniquement, ce site utilise <strong>Microsoft Clarity</strong> (Microsoft Corporation) afin de comprendre comment les pages sont consultées — par exemple les pages vues, les clics, le défilement et le type d’appareil — et d’améliorer le site. Clarity peut déposer des cookies (notamment <em>_clck</em> et <em>_clsk</em>) et ses données peuvent être traitées aux États-Unis. Je n’utilise pas ces informations pour vous identifier personnellement ni à des fins publicitaires.</p>',
        '<p>Только с вашего согласия этот сайт использует <strong>Microsoft Clarity</strong> (Microsoft Corporation), чтобы понимать, как просматриваются страницы (например, какие страницы открываются, клики, прокрутка и тип устройства), и улучшать сайт. Clarity может сохранять cookie-файлы (в частности, <em>_clck</em> и <em>_clsk</em>), а его данные могут обрабатываться в США. Я не использую эти сведения, чтобы установить вашу личность, и не использую их в рекламных целях.</p>'],
      ['<p>Tant que vous n’avez pas cliqué sur « Accepter », Clarity fonctionne sans cookies de mesure. Vous pouvez modifier votre choix à tout moment :</p>',
        '<p>Пока вы не нажали «Принять», Clarity работает без аналитических cookie-файлов. Вы можете изменить свой выбор в любой момент:</p>'],
      ['>Modifier mes préférences cookies</button>', '>Изменить настройки cookie-файлов</button>'],
      ['<p>Plus d’informations : <a href="https://privacy.microsoft.com/fr-fr/privacystatement" target="_blank" rel="noopener">déclaration de confidentialité de Microsoft</a>.</p>',
        '<p>Подробнее: <a href="https://privacy.microsoft.com/ru-ru/privacystatement" target="_blank" rel="noopener">заявление о конфиденциальности Microsoft</a>.</p>'],
      ['<h2>Données enregistrées dans votre navigateur</h2>', '<h2>Данные, сохраняемые в вашем браузере</h2>'],
      ['<p>Le site enregistre quelques préférences directement dans votre navigateur (stockage local), sans les transmettre : la langue choisie, votre choix concernant les cookies et les modèles ajoutés à « Mes Inspirations ». Vous pouvez les effacer à tout moment en supprimant les données de navigation de ce site.</p>',
        '<p>Сайт сохраняет несколько настроек прямо в вашем браузере (локальное хранилище) и никуда их не передаёт: выбранный язык, ваш выбор по cookie-файлам и модели, добавленные в «Моё избранное». Вы можете в любой момент удалить их, очистив данные этого сайта в браузере.</p>'],
      ['<h2>Hébergement et polices d’écriture</h2>', '<h2>Хостинг и шрифты</h2>'],
      ['<p>Le site est hébergé par GitHub Pages (GitHub, Inc., États-Unis). Comme pour tout site web, l’hébergeur enregistre des données techniques de connexion (adresse IP, date et heure, page demandée) pour assurer la sécurité et le bon fonctionnement du service.</p>',
        '<p>Сайт размещён на GitHub Pages (GitHub, Inc., США). Как и для любого сайта, хостинг записывает технические данные подключения (IP-адрес, дату и время, запрошенную страницу), чтобы обеспечить безопасность и нормальную работу сервиса.</p>'],
      ['<p>Les polices d’écriture sont chargées depuis Google Fonts (Google LLC). Votre navigateur transmet à cette occasion votre adresse IP aux serveurs de Google.</p>',
        '<p>Шрифты загружаются с Google Fonts (Google LLC). При этом ваш браузер передаёт ваш IP-адрес серверам Google.</p>'],
      ['<h2>Vos droits</h2>', '<h2>Ваши права</h2>'],
      ['<p>Vous pouvez à tout moment demander l’accès à vos données, leur rectification ou leur suppression, ou vous opposer à leur traitement, en m’écrivant à <a href="mailto:daria@beaupapier.ch">daria@beaupapier.ch</a>. Vous pouvez également adresser une réclamation au Préposé fédéral à la protection des données et à la transparence (PFPDT) ou, si vous résidez dans l’Union européenne, à l’autorité de protection des données de votre pays.</p>',
        '<p>Вы можете в любой момент запросить доступ к своим данным, их исправление или удаление, а также возразить против их обработки, написав мне на <a href="mailto:daria@beaupapier.ch">daria@beaupapier.ch</a>. Вы также можете подать жалобу Федеральному уполномоченному по защите данных и информации Швейцарии (FDPIC/PFPDT) или, если вы живёте в Европейском союзе, в орган по защите данных вашей страны.</p>'],
      ['<p class="updated">Dernière mise à jour : 1er octobre 2026</p>', '<p class="updated">Последнее обновление: 1 октября 2026 г.</p>'],
    ],
  },
  // Old addresses that only redirect.
  'shop.html': { title: 'Beau Papier', redirect: true },
  'collections.html': { title: 'Beau Papier', redirect: true },
  'configurator.html': { title: 'Beau Papier', redirect: true },
};

// Load the interface strings exactly as the browser does.
const sandbox = { window: {}, localStorage: { getItem: () => null }, console };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const file of ['js/i18n.js', 'js/i18n-ru.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file });
}
const RU = sandbox.DearDaria.TRANSLATIONS.ru;

const escapeText = (s) => s.replace(/&(?![a-z]+;|#\d+;|#x[0-9a-f]+;)/gi, '&amp;').replace(/</g, '&lt;');
const escapeAttr = (s) => escapeText(s).replace(/"/g, '&quot;');

function replaceOnce(html, from, to, count = 1, label = '') {
  const found = html.split(from).length - 1;
  if (found !== count) {
    throw new Error(`${label}: expected ${count} × ${JSON.stringify(from.slice(0, 80))}, found ${found}. Update PAGES in tools/build-ru.mjs.`);
  }
  return html.split(from).join(to);
}

function ruKey(key, page) {
  if (!(key in RU)) throw new Error(`${page}: no Russian text for "${key}". Add it to js/i18n-ru.js.`);
  return RU[key];
}

function build(page, cfg) {
  let html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const url = `${SITE}/ru/${page === 'index.html' ? '' : page}`;

  html = replaceOnce(html, '<html lang="fr">', '<html lang="ru">', 1, page);
  html = html.replace('<!DOCTYPE html>', `<!DOCTYPE html>\n<!-- Generated by tools/build-ru.mjs from /${page}. Edit the French page, then run: node tools/build-ru.mjs -->`);

  // Lock the language and point site files at the root before any script runs.
  html = replaceOnce(html, '<meta charset="UTF-8">',
    '<meta charset="UTF-8">\n<script>window.DearDaria = { LANG_LOCK: \'ru\', ASSET_ROOT: \'/\' };</script>', 1, page);

  // Hidden from search engines: no canonical, no structured data, noindex.
  html = html.replace(/^<link rel="canonical"[^>]*>\n/m, '');
  html = html.replace(/^<meta name="robots"[^>]*>\n/m, '');
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n/, '');
  html = replaceOnce(html, '</title>', '</title>\n<meta name="robots" content="noindex, nofollow">', 1, page);

  html = html.replace(/(<title[^>]*>)[^<]*(<\/title>)/, `$1${escapeText(cfg.title)}$2`);
  if (cfg.description) {
    html = html.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${escapeAttr(cfg.description)}$2`);
    html = html.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${escapeAttr(cfg.description)}$2`);
  }
  html = html.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${escapeAttr(cfg.title)}$2`);
  html = html.replace(/(<meta property="og:locale" content=")[^"]*(">)/, '$1ru_RU$2');
  html = html.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);

  // Stylesheets and scripts live at the site root. Page links stay relative,
  // so they resolve inside /ru/.
  html = html.replace(/href="css\//g, 'href="/css/').replace(/src="js\//g, 'src="/js/');
  if (!cfg.redirect) {
    const scripts = [...html.matchAll(/<script src="\/js\/[^"]+"><\/script>\n/g)];
    if (!scripts.length) throw new Error(`${page}: no /js/ scripts found`);
    const last = scripts[scripts.length - 1];
    const at = last.index + last[0].length;
    html = html.slice(0, at) + '<script src="/js/i18n-ru.js"></script>\n' + html.slice(at);
  } else {
    html = replaceOnce(html, 'Continuer vers Beau Papier', 'Перейти на Beau Papier', 1, page);
  }

  for (const [from, to, count] of cfg.before || []) html = replaceOnce(html, from, to, count || 1, page);

  // Russian text in the HTML itself, so nothing French flashes before the
  // scripts run (and for visitors without JavaScript).
  html = html.replace(/(<(\w+)\b[^>]*\sdata-i18n="(\w+)"[^>]*>)([^<]*)(<\/\2>)/g,
    (m, open, tag, key, _text, close) => open + escapeText(ruKey(key, page)) + close);
  html = html.replace(/<[^>]*\sdata-i18n-attr="(\w+):(\w+)"[^>]*>/g, (tag, attr, key) =>
    tag.replace(new RegExp(`\\s${attr}="[^"]*"`), ` ${attr}="${escapeAttr(ruKey(key, page))}"`));

  for (const [from, to, count] of cfg.replace || []) html = replaceOnce(html, from, to, count || 1, page);

  fs.writeFileSync(path.join(OUT, page), html);
}

fs.mkdirSync(OUT, { recursive: true });
for (const file of fs.readdirSync(OUT)) if (file.endsWith('.html')) fs.unlinkSync(path.join(OUT, file));
const rootPages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
const missing = rootPages.filter((p) => !PAGES[p]);
if (missing.length) throw new Error(`No Russian settings for: ${missing.join(', ')}. Add them to PAGES in tools/build-ru.mjs.`);
for (const page of rootPages) build(page, PAGES[page]);

// Every French key that the pages can show needs a Russian text.
const used = new Set();
const sources = [
  ...rootPages.map((p) => path.join(ROOT, p)),
  ...fs.readdirSync(path.join(ROOT, 'js')).filter((f) => f.endsWith('.js') && !f.startsWith('i18n')).map((f) => path.join(ROOT, 'js', f)),
].map((f) => fs.readFileSync(f, 'utf8')).join('\n');
for (const key of Object.keys(sandbox.DearDaria.TRANSLATIONS.fr)) {
  const dynamic = /^(label_|caption_|piece_opt_|type_)/.test(key);
  if ((dynamic || new RegExp(`['"\`:]${key}['"\`]`).test(sources)) && !(key in RU)) used.add(key);
}
if (used.size) throw new Error(`Missing Russian text in js/i18n-ru.js for: ${[...used].join(', ')}`);

console.log(`Built ${rootPages.length} pages in ru/`);
