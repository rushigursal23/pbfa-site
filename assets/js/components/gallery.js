/* =========================================================
   Gallery page (filters) + a shared, accessible lightbox.
   ========================================================= */
import { gallery, galleryCategories } from "../data/gallery.js";
import { bi, esc, icon, $, $$ } from "../lib/dom.js";
import { currentLang } from "../lib/i18n.js";

/* ---------- Lightbox ---------- */
let lb, lbImg, lbCap, items = [], index = 0, lastFocus = null;

function ensureLightbox() {
  if (lb) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="lightbox__btn lightbox__close" type="button" aria-label="Close">${icon("close")}</button>
      <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">${icon("chevron-left")}</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">${icon("chevron-right")}</button>
    </div>`);
  lb = $(".lightbox"); lbImg = $("img", lb); lbCap = $("figcaption", lb);
  $(".lightbox__close", lb).addEventListener("click", close);
  $(".lightbox__prev", lb).addEventListener("click", () => show(index - 1));
  $(".lightbox__next", lb).addEventListener("click", () => show(index + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "Tab") {
      const f = $$("button", lb).filter((b) => !b.hidden);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
}

function show(i) {
  index = (i + items.length) % items.length;
  const it = items[index];
  lbImg.src = it.src;
  lbImg.alt = it.alt;
  lbCap.textContent = it.caption;
  const multi = items.length > 1;
  $(".lightbox__prev", lb).hidden = !multi;
  $(".lightbox__next", lb).hidden = !multi;
}

export function openLightbox(list, i = 0) {
  ensureLightbox();
  items = list;
  lastFocus = document.activeElement;
  show(i);
  lb.classList.add("is-open");
  document.body.classList.add("no-scroll");
  $(".lightbox__close", lb).focus();
}

function close() {
  lb.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  lbImg.removeAttribute("src");
  lastFocus && lastFocus.focus();
}

const toItem = (g) => {
  const cap = g.caption[currentLang()] || g.caption.en;
  return { src: g.src, alt: g.caption.en, caption: cap };
};

/* Delegated triggers usable on any page:
   data-lightbox-index="n"  → item n of the gallery data (optionally filtered list)
   data-lightbox-src="url"  → a single image */
export function initLightboxTriggers() {
  document.addEventListener("click", (e) => {
    const single = e.target.closest("[data-lightbox-src]");
    if (single) {
      openLightbox([{ src: single.dataset.lightboxSrc, alt: single.dataset.lightboxCaption || "", caption: single.dataset.lightboxCaption || "" }]);
      return;
    }
    const idx = e.target.closest("[data-lightbox-index]");
    if (idx) {
      const container = idx.closest("[data-gallery-list]");
      const list = container ? JSON.parse(container.dataset.galleryList) : gallery.map((_, i) => i);
      const i = Number(idx.dataset.lightboxIndex);
      openLightbox(list.map((n) => toItem(gallery[n])), Math.max(0, list.indexOf(i)));
    }
  });
}

/* ---------- Gallery page ---------- */
export function initGalleryPage() {
  const grid = $("[data-gallery]");
  const filters = $("[data-gallery-filters]");
  if (!grid || !filters) return;

  const counts = Object.fromEntries(galleryCategories.map((c) => [c.key, c.key === "all" ? gallery.length : gallery.filter((g) => g.category === c.key).length]));
  // Only show categories that have photos (new categories appear automatically once photos are added)
  filters.innerHTML = galleryCategories.filter((c) => counts[c.key] > 0).map((c, i) =>
    `<button class="filter" type="button" data-filter="${c.key}" aria-pressed="${i === 0}">${bi(c)} <small>${counts[c.key]}</small></button>`).join("");

  const render = (key) => {
    const list = gallery.map((g, i) => ({ g, i })).filter(({ g }) => key === "all" || g.category === key);
    grid.dataset.galleryList = JSON.stringify(list.map((x) => x.i));
    const cat = galleryCategories.find((c) => c.key === key);
    grid.innerHTML = list.map(({ g, i }) => `
      <figure class="gallery__item">
        <button class="gallery__btn${g.contain ? " gallery__btn--contain" : ""}" type="button" data-lightbox-index="${i}" aria-label="Open image: ${esc(g.caption.en)}">
          <img src="${g.thumb}" alt="${esc(g.caption.en)}" width="480" height="600" loading="lazy">
          <figcaption class="gallery__caption"><small>${bi(galleryCategories.find((c) => c.key === g.category))}</small>${bi(g.caption)}</figcaption>
        </button>
      </figure>`).join("") + (list.length < 4 ? `
      <div class="empty-slot">${icon("image")}<span>${bi({
        en: key === "all" || key === "posters" ? "More photographs of seminars, cattle and events will be added soon." : `Photographs for “${cat.en}” will be added soon.`,
        mr: key === "all" || key === "posters" ? "चर्चासत्रे, जनावरे व कार्यक्रमांची आणखी छायाचित्रे लवकरच जोडली जातील." : `“${cat.mr}” ची छायाचित्रे लवकरच जोडली जातील.`,
      })}</span></div>` : "");
  };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    $$("[data-filter]", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render(b.dataset.filter);
  });
  render("all");
}
