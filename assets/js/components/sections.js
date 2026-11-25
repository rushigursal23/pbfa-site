/* =========================================================
   Data-driven page sections. Any element with
   data-render="<name>" is filled by the matching renderer.
   ========================================================= */
import { expo, seminarTimetable, pastSeminars } from "../data/events.js";
import { stateOfficeBearers, advisoryBoard, districtChapters } from "../data/leadership.js";
import { news } from "../data/news.js";
import { gallery } from "../data/gallery.js";
import { bi, esc, icon, formatPhone } from "../lib/dom.js";

const SEAL = "assets/images/logos/pbfa-seal-96.png";

/* ---------- Seminar timetable ---------- */
function timetable(el) {
  const now = new Date();
  const thisMonth = now.getFullYear() === seminarTimetable.year ? now.getMonth() + 1 : null;
  const rows = seminarTimetable.months.map((m) => {
    const current = m.month === thisMonth;
    return `
    <div class="tt-row${current ? " is-current" : ""}">
      <div class="tt-month">
        <span>${current ? bi({ en: "This month", mr: "या महिन्यात" }) : esc(String(seminarTimetable.year))}</span>
        <strong>${bi(m)}</strong>
      </div>
      <ul class="tt-places" aria-label="Districts">
        ${m.places.map((p) => `<li>${icon("map-pin")}${bi(p)}</li>`).join("")}
      </ul>
      <span class="badge">${bi({ en: "Dates to be announced", mr: "तारीख लवकरच" })}</span>
    </div>`;
  }).join("");
  el.innerHTML = `<div class="timetable">${rows}</div>
    <div class="tt-note">${icon("info")}<p>${bi(seminarTimetable.note)}</p></div>`;
}

/* ---------- Expo highlights ---------- */
function expoHighlights(el) {
  const light = el.dataset.variant === "light";
  el.innerHTML = `<ul class="highlights${light ? " highlights--light" : ""}">
    ${expo.highlights.map((h) => `<li>${icon(h.icon)}<span>${bi(h)}</span></li>`).join("")}
  </ul>`;
}

/* ---------- Countdown ---------- */
function countdown(el) {
  const start = new Date(expo.start).getTime();
  const end = new Date(expo.end).getTime();
  const labels = [
    { en: "Days", mr: "दिवस" }, { en: "Hours", mr: "तास" }, { en: "Minutes", mr: "मिनिटे" }, { en: "Seconds", mr: "सेकंद" },
  ];
  el.innerHTML = `
    <p class="countdown__label">${bi({ en: "Expo begins in", mr: "एक्स्पो सुरू होण्यास" })}</p>
    <div class="countdown__units" role="timer" aria-live="off">
      ${labels.map((l, i) => `<div class="cd-unit"><b data-cd="${i}">–</b><span>${bi(l)}</span></div>`).join("")}
    </div>
    <p class="countdown__status" hidden></p>`;
  const nums = el.querySelectorAll("[data-cd]");
  const status = el.querySelector(".countdown__status");
  const tick = () => {
    const now = Date.now();
    if (now >= start) {
      el.querySelector(".countdown__units").hidden = true;
      el.querySelector(".countdown__label").hidden = true;
      status.hidden = false;
      status.innerHTML = now <= end
        ? bi({ en: "The Expo is happening now!", mr: "एक्स्पो सध्या सुरू आहे!" })
        : bi({ en: "The Expo 2026 has concluded. Thank you!", mr: "एक्स्पो 2026 संपन्न झाला. धन्यवाद!" });
      return false;
    }
    let s = Math.floor((start - now) / 1000);
    const parts = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
    nums.forEach((n, i) => (n.textContent = String(parts[i]).padStart(i ? 2 : 1, "0")));
    return true;
  };
  if (tick()) { const t = setInterval(() => tick() || clearInterval(t), 1000); }
}

/* Days-left text used in compact places (hero card) */
function daysLeft(el) {
  const days = Math.ceil((new Date(expo.start).getTime() - Date.now()) / 86400000);
  const end = new Date(expo.end).getTime();
  el.innerHTML = days > 0
    ? bi({ en: `${days} days to go`, mr: `${days} दिवस बाकी` })
    : Date.now() <= end ? bi({ en: "Happening now", mr: "सध्या सुरू" }) : bi({ en: "Concluded", mr: "संपन्न" });
}

/* ---------- Leadership ---------- */
const leaderCard = (p, featured = false) => `
  <article class="leader${featured ? " leader--featured" : ""}">
    ${p.photo
      ? `<img class="leader__avatar" src="${p.photo}" alt="" width="60" height="60" loading="lazy">`
      : `<span class="leader__avatar" aria-hidden="true">${esc(p.initial)}</span>`}
    <div>
      <span class="leader__role">${bi(p.role)}</span>
      <span class="leader__name">${bi(p.name)}</span>
      ${p.phone ? `<a class="leader__phone" href="tel:+91${p.phone}">${icon("phone")}${formatPhone(p.phone)}</a>` : ""}
    </div>
  </article>`;

function leadership(el) {
  el.innerHTML = `
    <h3 class="group-title">${bi({ en: "State office-bearers", mr: "राज्यस्तरीय पदाधिकारी" })}</h3>
    <div class="leaders">${stateOfficeBearers.map((p, i) => leaderCard(p, i < 2)).join("")}</div>
    <h3 class="group-title">${bi({ en: "Advisory board", mr: "मार्गदर्शक मंडळ" })}</h3>
    <div class="leaders">${advisoryBoard.map((p) => leaderCard(p)).join("")}</div>`;
}

function districts(el) {
  el.innerHTML = districtChapters.map((d) => `
    <div class="chapter">
      <button class="chapter__poster gallery__btn" type="button" data-lightbox-src="${d.poster}" data-lightbox-caption="${esc(d.district.en)}" aria-label="View poster: ${esc(d.district.en)}" style="aspect-ratio:853/1280">
        <img src="${d.posterThumb}" width="480" height="720" alt="PBFA ${esc(d.district.en)} poster" loading="lazy">
      </button>
      <div>
        <span class="badge badge--saffron">${bi({ en: "District chapter", mr: "जिल्हा कार्यकारिणी" })}</span>
        <h3 style="font-size:var(--fs-h3);margin:.8rem 0 1.2rem">${bi(d.district)}</h3>
        <div class="leaders">${d.members.map((m) => leaderCard(m)).join("")}</div>
      </div>
    </div>`).join("");
}

/* District contacts as compact list (contact page) */
function districtContacts(el) {
  el.innerHTML = districtChapters.map((d) => `
    <h3 class="group-title">${bi(d.district)}</h3>
    <div class="leaders">${d.members.map((m) => leaderCard(m)).join("")}</div>`).join("");
}

/* ---------- News / updates ---------- */
function updates(el) {
  el.innerHTML = `<div class="updates">${news.map((n) => `
    <a class="update" href="${n.href}">
      ${n.thumb
        ? `<img class="update__thumb" src="${n.thumb}" alt="" width="88" height="88" loading="lazy">`
        : `<span class="update__thumb update__thumb--logo"><img src="${SEAL}" alt="" width="60" height="60" loading="lazy"></span>`}
      <div>
        <span class="badge badge--saffron">${bi(n.tag)}</span>
        <h3>${bi(n.title)}</h3>
        <p>${bi(n.text)}</p>
      </div>
    </a>`).join("")}</div>`;
}

/* ---------- Gallery preview (home) ---------- */
function galleryPreview(el) {
  const items = gallery.slice(0, Number(el.dataset.limit || 3));
  el.innerHTML = `<div class="gallery" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,180px),1fr))">${items.map((g, i) => `
    <figure class="gallery__item">
      <button class="gallery__btn${g.contain ? " gallery__btn--contain" : ""}" type="button" data-lightbox-index="${i}" aria-label="${esc(g.caption.en)}">
        <img src="${g.thumb}" alt="${esc(g.caption.en)}" width="480" height="600" loading="lazy">
      </button>
    </figure>`).join("")}</div>`;
}

/* ---------- Past seminars ---------- */
function seminarReports(el) {
  if (!pastSeminars.length) {
    el.innerHTML = `<div class="notice notice--info">${icon("image")}<p>${bi({
      en: "Seminar reports – with dates, speakers and photographs – will be published here after each seminar.",
      mr: "प्रत्येक चर्चासत्रानंतर त्याचा अहवाल – तारीख, वक्ते व छायाचित्रांसह – येथे प्रसिद्ध केला जाईल.",
    })}</p></div>`;
    return;
  }
  el.innerHTML = `<div class="grid grid--3">${pastSeminars.map((s) => `
    <article class="card">
      <span class="badge">${esc(s.date)}</span>
      <h3>${bi(s.title)}</h3>
      <p>${bi(s.place)}</p>
    </article>`).join("")}</div>`;
}

export const renderers = {
  timetable, expoHighlights, countdown, daysLeft, leadership, districts, districtContacts, updates, galleryPreview, seminarReports,
};

export function renderSections(root = document) {
  root.querySelectorAll("[data-render]").forEach((el) => {
    const fn = renderers[el.dataset.render];
    if (fn) fn(el);
    else console.warn("PBFA: unknown renderer", el.dataset.render);
  });
}
