/* Small DOM/string helpers shared by all components. */

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

/** Bilingual text → sibling spans; CSS shows the active language. */
export function bi(text, tag = "span") {
  if (text == null) return "";
  if (typeof text === "string") return esc(text);
  if (text.mr === text.en) return esc(text.en);
  return `<${tag} lang="mr">${esc(text.mr)}</${tag}><${tag} lang="en">${esc(text.en)}</${tag}>`;
}

export const ICONS = "assets/icons/icons.svg";
export const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="${ICONS}#${name}"></use></svg>`;

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Format a 10-digit Indian mobile number as "90492 41321". */
export const formatPhone = (p) => (p && p.length === 10 ? `${p.slice(0, 5)} ${p.slice(5)}` : p);
