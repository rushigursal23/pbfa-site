/* =========================================================
   Language switching (English / मराठी).
   - The active language lives in the URL (?lang=mr) – no cookies/localStorage.
   - An inline script in each page's <head> sets html[data-lang] before
     first paint, so there is no flash of the wrong language.
   - All content is rendered in both languages; CSS hides the inactive one.
   ========================================================= */
import { $$ } from "./dom.js";

export const DEFAULT_LANG = "en"; // change to "mr" to open the site in Marathi by default
const LANGS = ["en", "mr"];

export const currentLang = () => document.documentElement.dataset.lang || DEFAULT_LANG;

function rewriteLinks(lang) {
  $$('a[href]').forEach((a) => {
    const raw = a.getAttribute("href");
    if (!/^[\w-]+\.html(\?[^#]*)?(#.*)?$/.test(raw)) return; // internal page links only
    const url = new URL(raw, location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    a.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
  });
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) lang = DEFAULT_LANG;
  const html = document.documentElement;
  html.dataset.lang = lang;
  html.lang = lang;
  $$("[data-lang-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)));
  const url = new URL(location.href);
  if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
  else url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  rewriteLinks(lang);
  document.dispatchEvent(new CustomEvent("pbfa:lang", { detail: lang }));
}

export function initLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  setLang(LANGS.includes(fromUrl) ? fromUrl : DEFAULT_LANG);
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang-btn]");
    if (b) setLang(b.dataset.langBtn);
  });
}

/** Re-apply language link rewriting after new content is injected. */
export const refreshLinks = () => rewriteLinks(currentLang());
