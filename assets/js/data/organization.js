/* =========================================================
   PBFA – organisation facts (single source of truth)
   Source: content supplied by PBFA. Marathi text is kept exactly
   as supplied. English text is a translation – please review.
   Items marked  CONFIRM  still need verification by PBFA.
   ========================================================= */
export const organization = {
  shortName: "PBFA",
  name: {
    en: "Progressive Breeder Farmers Association",
    mr: "प्रोग्रेसिव्ह ब्रीडर फार्मर्स असोसिएशन",
  },
  region: { en: "Maharashtra State", mr: "महाराष्ट्र राज्य" },
  motto: { en: "Unity is Strength", mr: "Unity is Strength" }, // from the logo ribbon
  trio: { mr: "ज्ञान • विज्ञान • संघटन", en: "Knowledge • Science • Unity" },
  tagline: {
    // from the Chhatrapati Sambhajinagar district poster
    mr: "ज्ञानातून दिशा, विज्ञानातून प्रगती, संघटनातून समृद्धी",
    en: "Direction through knowledge, progress through science, prosperity through unity",
  },
  closingLine: {
    mr: "PBFA महाराष्ट्र राज्य – शेतकऱ्यांसाठी, शेतकऱ्यांकडून, शेतकऱ्यांच्या प्रगतीसाठी!",
    en: "PBFA Maharashtra State – for farmers, by farmers, for farmers' progress!",
  },

  contact: {
    // CONFIRM: spelling "maharastra" (without the second "h") is exactly as supplied.
    email: "pbfamaharastra@gmail.com",
    instagram: { handle: "@pbfa_maharashtra_official", url: "https://www.instagram.com/pbfa_maharashtra_official/" },
    phone: null,     // CONFIRM: no state-level phone number supplied yet
    whatsapp: null,  // CONFIRM: no WhatsApp number / community link supplied yet
    address: null,   // CONFIRM: no office address supplied yet
  },

  membership: {
    feeInr: 1100,
    feeLabel: "₹1,100",
    onlinePayment: false, // set true only once a real payment gateway is integrated and tested
  },

  site: {
    url: null, // CONFIRM: final domain not known yet – then make og:image / canonical URLs absolute in each page <head>
  },
};
