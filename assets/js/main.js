/* =========================================================
   PBFA – entry point (loaded as an ES module on every page)
   ========================================================= */
import { renderLayout } from "./components/layout.js";
import { renderSections } from "./components/sections.js";
import { initGalleryPage, initLightboxTriggers } from "./components/gallery.js";
import { initForms } from "./components/forms.js";
import { initLang } from "./lib/i18n.js";

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}

renderLayout();
renderSections();
initGalleryPage();
initLightboxTriggers();
initForms();
initLang();      // last: rewrites links in all injected content
initReveal();
