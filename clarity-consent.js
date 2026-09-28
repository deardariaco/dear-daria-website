(function () {
  "use strict";

  const key = "bp_clarity_analytics_consent";
  const messages = {
    fr: {
      title: "Cookies de mesure d’audience",
      body: "Avec votre accord, Microsoft Clarity utilise des cookies pour relier vos visites entre les pages et nous aider à améliorer ce site. Vous pouvez refuser ou changer d’avis à tout moment.",
      accept: "Accepter",
      reject: "Refuser",
      reopen: "Cookies"
    },
    en: {
      title: "Analytics cookies",
      body: "With your permission, Microsoft Clarity uses cookies to connect your visits across pages and help us improve this site. You can decline or change your choice at any time.",
      accept: "Accept",
      reject: "Decline",
      reopen: "Cookies"
    },
    de: {
      title: "Analyse-Cookies",
      body: "Mit Ihrer Zustimmung verwendet Microsoft Clarity Cookies, um Ihre Besuche über mehrere Seiten hinweg zu verbinden und diese Website zu verbessern. Sie können ablehnen oder Ihre Entscheidung jederzeit ändern.",
      accept: "Akzeptieren",
      reject: "Ablehnen",
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
      .bp-consent-banner{position:fixed;z-index:10000;left:16px;right:16px;bottom:16px;max-width:760px;margin:auto;padding:18px 20px;background:#fffaf2;color:#352b23;border:1px solid #d8cbb8;box-shadow:0 8px 32px rgba(32,25,16,.18);font:14px/1.5 Arial,sans-serif}
      .bp-consent-banner[hidden],.bp-consent-reopen[hidden]{display:none!important}
      .bp-consent-title{font:600 17px/1.3 Georgia,serif;margin:0 0 6px}
      .bp-consent-body{margin:0 0 14px}
      .bp-consent-actions{display:flex;gap:10px;flex-wrap:wrap}
      .bp-consent-actions button,.bp-consent-reopen{cursor:pointer;border-radius:2px;padding:9px 16px;font:600 13px/1.2 Arial,sans-serif}
      .bp-consent-accept{background:#9b7845;color:#fff;border:1px solid #9b7845}
      .bp-consent-reject{background:#fffaf2;color:#352b23;border:1px solid #9b7845}
      .bp-consent-reopen{position:fixed;z-index:9999;left:12px;bottom:12px;background:#fffaf2;color:#5a4832;border:1px solid #d8cbb8;box-shadow:0 2px 8px rgba(32,25,16,.12);padding:6px 10px;font-size:11px}
      @media(max-width:520px){.bp-consent-banner{left:8px;right:8px;bottom:8px;padding:15px}.bp-consent-actions button{flex:1}}
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
      body.textContent = copy.body;
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
