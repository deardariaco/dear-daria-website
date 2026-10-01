(function () {
  "use strict";

  const key = "bp_clarity_analytics_consent";
  const messages = {
    fr: {
      title: "Cookies de mesure d’audience",
      body: "Avec votre accord, nous utilisons des cookies de mesure d’audience pour comprendre comment le site est consulté et l’améliorer. Vous pouvez refuser ou changer d’avis à tout moment.",
      accept: "Accepter",
      reject: "Refuser",
      more: "En savoir plus",
      reopen: "Cookies"
    },
    en: {
      title: "Analytics cookies",
      body: "With your permission, we use analytics cookies to understand how the site is used and to improve it. You can decline or change your choice at any time.",
      accept: "Accept",
      reject: "Decline",
      more: "Learn more",
      reopen: "Cookies"
    },
    de: {
      title: "Analyse-Cookies",
      body: "Mit Ihrer Zustimmung verwenden wir Analyse-Cookies, um zu verstehen, wie die Website genutzt wird, und sie zu verbessern. Sie können ablehnen oder Ihre Entscheidung jederzeit ändern.",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      more: "Mehr erfahren",
      reopen: "Cookies"
    }
  };

  function readChoice() {
    try {
      const value = localStorage.getItem(key);
      return value === "granted" || value === "denied" ? value : null;
    } catch (_) {
      return null;
    }
  }

  function saveChoice(value) {
    try { localStorage.setItem(key, value); } catch (_) { /* Session-only choice. */ }
  }

  function sendToClarity(value) {
    if (typeof window.clarity === "function") {
      window.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: value === "granted" ? "granted" : "denied"
      });
    }
  }

  // Send the stored decision on every page, before Clarity's asynchronous tag loads.
  // Until a visitor chooses, keep Clarity in no-consent mode.
  sendToClarity(readChoice());

  function currentLanguage() {
    let stored = null;
    try { stored = localStorage.getItem("dd_lang"); } catch (_) { /* Use HTML language. */ }
    const language = stored || document.documentElement.lang || "fr";
    return messages[language] ? language : "fr";
  }

  function makeButton(label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    return button;
  }

  function initialize() {
    const style = document.createElement("style");
    style.textContent = `
      .bp-consent-banner{position:fixed;z-index:10000;left:16px;right:16px;bottom:16px;max-width:760px;margin:auto;padding:20px 22px;background:var(--ivory-warm,#F8F4EC);color:var(--text-warm-dark,#30291F);border:1px solid var(--mist,#DBD6C9);box-shadow:0 8px 32px rgba(32,25,16,.14);font-family:var(--font-body,'Mulish',-apple-system,'Helvetica Neue',sans-serif);font-size:14px;line-height:1.65}
      .bp-consent-banner[hidden],.bp-consent-reopen[hidden]{display:none!important}
      .bp-consent-title{font-family:var(--font-display,'Philosopher',Georgia,serif);font-weight:400;font-size:20px;line-height:1.3;letter-spacing:normal;text-transform:none;margin:0 0 6px;color:var(--text-warm-dark,#30291F)}
      .bp-consent-body{margin:0 0 16px;color:var(--ink-soft,#57534A)}
      .bp-consent-more{color:var(--text-warm-dark,#30291F);text-decoration:underline;text-underline-offset:3px;margin-left:4px;white-space:nowrap}
      .bp-consent-actions{display:flex;gap:10px;flex-wrap:wrap}
      .bp-consent-actions button,.bp-consent-reopen{cursor:pointer;border-radius:var(--radius,2px);font-family:var(--font-body,'Mulish',-apple-system,'Helvetica Neue',sans-serif)}
      .bp-consent-actions button{padding:11px 20px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;line-height:1.2}
      .bp-consent-accept{background:var(--gold,#B79B72);color:var(--button-text-light,#fffdf8);border:1px solid var(--gold,#B79B72)}
      .bp-consent-accept:hover{border-color:var(--text-warm-dark,#30291F)}
      .bp-consent-reject{background:var(--ivory-warm,#F8F4EC);color:var(--text-warm-dark,#30291F);border:1px solid var(--gold,#B79B72)}
      .bp-consent-reject:hover{background:var(--ivory-deep,#EFE9DC)}
      .bp-consent-actions button:focus-visible,.bp-consent-reopen:focus-visible{outline:2px solid var(--text-warm-dark,#30291F);outline-offset:3px}
      .bp-consent-reopen{position:fixed;z-index:9999;left:12px;bottom:12px;background:var(--ivory-warm,#F8F4EC);color:var(--ink-soft,#57534A);border:1px solid var(--mist,#DBD6C9);box-shadow:0 2px 8px rgba(32,25,16,.10);padding:6px 11px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
      @media(max-width:520px){.bp-consent-banner{left:8px;right:8px;bottom:8px;padding:16px}.bp-consent-actions button{flex:1}}
    `;
    document.head.appendChild(style);

    const banner = document.createElement("section");
    banner.className = "bp-consent-banner";
    banner.setAttribute("aria-label", "Cookies");
    const title = document.createElement("h2");
    title.className = "bp-consent-title";
    const body = document.createElement("p");
    body.className = "bp-consent-body";
    const actions = document.createElement("div");
    actions.className = "bp-consent-actions";
    const accept = makeButton("", "bp-consent-accept");
    const reject = makeButton("", "bp-consent-reject");
    actions.append(accept, reject);
    banner.append(title, body, actions);

    const reopen = makeButton("", "bp-consent-reopen");
    reopen.setAttribute("aria-label", "Cookie preferences");
    document.body.append(banner, reopen);

    function translate() {
      const copy = messages[currentLanguage()];
      title.textContent = copy.title;
      body.textContent = copy.body + " ";
      const more = document.createElement("a");
      more.className = "bp-consent-more";
      more.href = "/confidentialite.html";
      more.textContent = copy.more;
      body.appendChild(more);
      accept.textContent = copy.accept;
      reject.textContent = copy.reject;
      reopen.textContent = copy.reopen;
    }

    function showBanner() {
      banner.hidden = false;
      reopen.hidden = true;
    }

    function choose(value) {
      saveChoice(value);
      sendToClarity(value);
      banner.hidden = true;
      reopen.hidden = false;
    }

    accept.addEventListener("click", function () { choose("granted"); });
    reject.addEventListener("click", function () { choose("denied"); });
    reopen.addEventListener("click", showBanner);
    new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    translate();
    if (readChoice()) {
      banner.hidden = true;
      reopen.hidden = false;
    } else {
      showBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
