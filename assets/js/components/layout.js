/* =========================================================
   Site chrome: announcement bar, header, mobile drawer, footer.
   Rendered from data files so every page stays in sync.
   ========================================================= */
import { organization as org } from "../data/organization.js";
import { navigation, footerLinks } from "../data/navigation.js";
import { expo } from "../data/events.js";
import { bi, esc, icon, $, $$ } from "../lib/dom.js";

const SEAL = "assets/images/logos/pbfa-seal-96.png";

function navLinks(current, cls) {
  return navigation
    .map((n) => `<li><a class="${cls}" href="${n.href}"${n.key === current ? ' aria-current="page"' : ""}>${bi(n)}${cls === "drawer__link" ? icon("chevron-right") : ""}</a></li>`)
    .join("");
}

const langSwitch = () => `
  <div class="lang-switch" role="group" aria-label="Language / भाषा">
    <button type="button" data-lang-btn="en" aria-pressed="true" lang="en" class="always">EN</button>
    <button type="button" data-lang-btn="mr" aria-pressed="false" lang="mr" class="always">मराठी</button>
  </div>`;

function header(current) {
  const c = org.contact;
  return `
  <div class="topbar">
    <div class="container topbar__inner">
      <a class="topbar__news" href="events.html#expo">
        <span class="topbar__tag">${bi({ en: "Expo", mr: "एक्स्पो" })}</span>
        <span class="topbar__text"><strong>${bi(expo.title)}</strong> · ${bi(expo.dateLabel)} · ${bi({ en: "Kalas, Indapur (Pune)", mr: "कळस, इंदापूर (पुणे)" })}</span>
      </a>
      <div class="topbar__links">
        <a href="mailto:${c.email}">${icon("mail")}${esc(c.email)}</a>
        <a href="${c.instagram.url}" target="_blank" rel="noopener">${icon("instagram")}${esc(c.instagram.handle)}</a>
      </div>
    </div>
  </div>
  <header class="site-header" id="top">
    <div class="container site-header__inner">
      <a class="brand" href="index.html" aria-label="PBFA – ${esc(org.name.en)}, home">
        <img src="${SEAL}" width="52" height="52" alt="">
        <span class="brand__text">
          <span class="brand__name">PBFA</span>
          <span class="brand__full"><span class="brand__org">${bi(org.name)}, </span>${bi(org.region)}</span>
        </span>
      </a>
      <nav class="nav" aria-label="Main">
        <ul class="nav__list">${navLinks(current, "nav__link")}</ul>
      </nav>
      <div class="header-actions">
        ${langSwitch()}
        <a class="btn btn--primary btn--sm header-cta" href="membership.html">${bi({ en: "Become a Member", mr: "सभासद व्हा" })}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">${icon("menu")}</button>
      </div>
    </div>
  </header>
  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__backdrop" data-close-drawer></div>
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawer__head">
        <strong>PBFA</strong>
        <button class="menu-toggle" type="button" data-close-drawer aria-label="Close menu">${icon("close")}</button>
      </div>
      <ul class="drawer__nav">${navLinks(current, "drawer__link")}</ul>
      <div class="drawer__foot">
        ${langSwitch()}
        <a class="btn btn--primary" href="membership.html">${bi({ en: "Become a Member", mr: "सभासद व्हा" })}</a>
        <div class="drawer__contact">
          <a href="mailto:${c.email}">${esc(c.email)}</a>
          <a href="${c.instagram.url}" target="_blank" rel="noopener">${esc(c.instagram.handle)}</a>
        </div>
      </div>
    </div>
  </div>`;
}

function footer() {
  const c = org.contact;
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-motto">
        <p>${bi(org.tagline)}</p>
        <a class="btn btn--gold" href="membership.html">${bi({ en: "Join PBFA", mr: "PBFA चे सभासद व्हा" })}${icon("arrow-right", "icon--arrow")}</a>
      </div>
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/images/logos/pbfa-logo-160.png" width="72" height="88" alt="PBFA logo" loading="lazy">
          <div>
            <strong>${bi(org.name)}<br>${bi(org.region)}</strong>
            <p>${bi(org.trio)}</p>
          </div>
        </div>
        <div>
          <h3>${bi({ en: "Explore", mr: "माहिती" })}</h3>
          <ul class="footer-links">${navigation.slice(1, 5).map((n) => `<li><a href="${n.href}">${bi(n)}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3>${bi({ en: "Get involved", mr: "सहभागी व्हा" })}</h3>
          <ul class="footer-links">
            <li><a href="membership.html">${bi({ en: "Membership", mr: "सभासदत्व" })}</a></li>
            <li><a href="events.html#expo">${bi({ en: "Expo 2026", mr: "एक्स्पो 2026" })}</a></li>
            <li><a href="events.html#seminars">${bi({ en: "Monthly seminars", mr: "मासिक चर्चासत्रे" })}</a></li>
            <li><a href="contact.html">${bi({ en: "Contact us", mr: "संपर्क" })}</a></li>
          </ul>
        </div>
        <div>
          <h3>${bi({ en: "Contact", mr: "संपर्क" })}</h3>
          <ul class="footer-contact">
            <li><a href="mailto:${c.email}">${icon("mail")}${esc(c.email)}</a></li>
            <li><a href="${c.instagram.url}" target="_blank" rel="noopener">${icon("instagram")}${esc(c.instagram.handle)}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} PBFA – ${bi(org.name)}. ${bi({ en: "All rights reserved.", mr: "सर्व हक्क राखीव." })}</span>
        <span>${footerLinks.map((l) => `<a href="${l.href}">${bi(l)}</a>`).join(" · ")}</span>
      </div>
    </div>
  </footer>`;
}

function initDrawer() {
  const drawer = $("#drawer");
  const openBtn = $(".site-header .menu-toggle");
  if (!drawer || !openBtn) return;
  const open = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    $(".drawer__panel [data-close-drawer]", drawer).focus();
  };
  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    openBtn.focus();
  };
  openBtn.addEventListener("click", open);
  $$("[data-close-drawer]", drawer).forEach((el) => el.addEventListener("click", close));
  $$(".drawer__nav a", drawer).forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (!drawer.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") { // keep focus inside the drawer
      const f = $$("a[href], button:not([disabled])", drawer).filter((el) => el.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia("(min-width: 1140px)").addEventListener("change", (m) => m.matches && drawer.classList.contains("is-open") && close());
}

export function renderLayout() {
  const page = document.body.dataset.page;
  const headSlot = $("#site-header-slot");
  const footSlot = $("#site-footer-slot");
  if (headSlot) headSlot.outerHTML = header(page);
  if (footSlot) footSlot.outerHTML = footer();
  initDrawer();
  const hdr = $(".site-header");
  const onScroll = () => hdr && hdr.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
