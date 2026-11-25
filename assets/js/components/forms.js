/* =========================================================
   Forms (contact + membership enquiry).
   Submissions use Netlify Forms (the site is deployed on Netlify –
   see netlify.toml). They only work on the deployed site; when the
   POST fails (e.g. local preview) the user is told honestly and
   offered the e-mail address instead.
   ========================================================= */
import { organization as org } from "../data/organization.js";
import { $$ } from "../lib/dom.js";
import { currentLang } from "../lib/i18n.js";

const MSG = {
  success: { en: "Thank you! Your details have been received. PBFA will contact you soon.", mr: "धन्यवाद! आपली माहिती मिळाली आहे. PBFA लवकरच आपल्याशी संपर्क साधेल." },
  error: {
    en: `Sorry, the form could not be sent right now. Please e-mail us at ${org.contact.email}.`,
    mr: `क्षमस्व, सध्या फॉर्म पाठवता आला नाही. कृपया ${org.contact.email} वर ई-मेल करा.`,
  },
  sending: { en: "Sending…", mr: "पाठवत आहे…" },
};

export function initForms() {
  $$("form[data-netlify]").forEach((form) => {
    const status = form.querySelector(".form-status");
    const btn = form.querySelector('[type="submit"]');
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const lang = currentLang();
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = MSG.sending[lang];
      status.className = "form-status";
      try {
        const body = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
        if (!res.ok) throw new Error(String(res.status));
        status.textContent = MSG.success[lang];
        status.classList.add("is-success");
        form.reset();
      } catch (err) {
        status.textContent = MSG.error[lang];
        status.classList.add("is-error");
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
        status.setAttribute("tabindex", "-1");
        status.focus();
      }
    });
  });
}
