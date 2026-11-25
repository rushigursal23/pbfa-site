/* =========================================================
   Events: PBFA International Dairy & Agri Expo + monthly seminars
   ========================================================= */

export const expo = {
  id: "pbfa-expo-2026",
  title: { en: "PBFA International Dairy & Agri Expo 2026", mr: "PBFA International Dairy & Agri Expo 2026" },
  titleMr: "आंतरराष्ट्रीय डेअरी व कृषी प्रदर्शन",
  claim: { en: "India’s Biggest Dairy and Cattle Expo", mr: "भारतातील सर्वात मोठे डेअरी प्रदर्शन" },
  firstLine: {
    mr: "शेतकऱ्यांनी शेतकऱ्यांसाठी भरवलेला भारतातील पहिला PBFA डेअरी व ॲग्री एक्स्पो 2026!",
    en: "India’s first PBFA Dairy & Agri Expo 2026 – organised by farmers, for farmers!",
  },
  // Exact start/end used by the countdown (India Standard Time). Start time of day not supplied → midnight.
  start: "2026-12-25T00:00:00+05:30",
  end: "2026-12-28T23:59:59+05:30",
  dateLabel: { en: "25 – 28 December 2026", mr: "25 ते 28 डिसेंबर 2026" },
  venue: {
    mr: "नेचर डिलाईट डेअरी, कळस, तालुका इंदापूर, जिल्हा पुणे, महाराष्ट्र.",
    // CONFIRM: English spelling of the venue name
    en: "Nature Delight Dairy, Kalas, Taluka Indapur, District Pune, Maharashtra",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Nature+Delight+Dairy+Kalas+Indapur+Pune",
  intro: {
    mr: "PBFA महाराष्ट्र राज्यातर्फे आयोजित आंतरराष्ट्रीय डेअरी व कृषी प्रदर्शन हा संघटनेचा महत्त्वाकांक्षी उपक्रम आहे.",
    en: "The International Dairy & Agri Expo organised by PBFA Maharashtra State is the association’s most ambitious initiative.",
  },
  highlights: [
    { icon: "trophy", mr: "उच्च दूध उत्पादन करणाऱ्या HF व Jersey गायींच्या स्पर्धा.", en: "Competitions for high-yielding HF and Jersey cows." },
    { icon: "star", mr: "गाय व कालवड सौंदर्य स्पर्धा.", en: "Cow and heifer beauty contests." },
    { icon: "heart", mr: "देशी गोवंशाच्या विशेष स्पर्धा.", en: "Special competitions for indigenous (desi) cattle." },
    { icon: "leaf", mr: "उत्कृष्ट मुरघास गुणवत्ता स्पर्धा.", en: "Best silage quality competition." },
    { icon: "flask", mr: "आधुनिक डेअरी उपकरणे, पशुआहार, पशुआरोग्य आणि आनुवंशिक तंत्रज्ञान.", en: "Modern dairy equipment, cattle feed, animal health and genetic technology." },
    { icon: "globe", mr: "देश-विदेशातील तज्ज्ञांचे मार्गदर्शन.", en: "Guidance from experts from India and abroad." },
    { icon: "users", mr: "शेतकरी, संशोधक, पशुवैद्यकीय तज्ज्ञ आणि उद्योग प्रतिनिधी यांच्यात संवाद.", en: "Dialogue between farmers, researchers, veterinary experts and industry representatives." },
  ],
  // CONFIRM: registration / stall booking details have not been supplied.
  registration: null,
};

/* Monthly seminar timetable (from the supplied timetable poster).
   CONFIRM: the poster does not print a year; 2026 is assumed because it
   runs alongside the December 2026 Expo. Dates and topics are decided
   later, as stated on the poster. */
export const seminarTimetable = {
  year: 2026,
  title: { en: "PBFA Monthly Seminar Timetable", mr: "PBFA मासिक चर्चासत्र वेळापत्रक" },
  months: [
    {
      month: 10, en: "October", mr: "ऑक्टोबर",
      places: [
        { en: "Ahilyanagar", mr: "अहिल्यानगर" }, { en: "Nashik", mr: "नाशिक" },
        { en: "Pune", mr: "पुणे" }, { en: "Satara", mr: "सातारा" },
      ],
    },
    {
      month: 11, en: "November", mr: "नोव्हेंबर",
      places: [
        { en: "Solapur", mr: "सोलापूर" }, { en: "Dharashiv", mr: "धाराशिव" },
        { en: "Beed", mr: "बीड" }, { en: "Hingoli", mr: "हिंगोली" },
      ],
    },
    {
      month: 12, en: "December", mr: "डिसेंबर",
      places: [
        { en: "Sangli", mr: "सांगली" }, { en: "Kolhapur", mr: "कोल्हापूर" },
        { en: "Chhatrapati Sambhajinagar", mr: "छत्रपती संभाजीनगर" }, { en: "Jalna", mr: "जालना" },
      ],
    },
  ],
  note: {
    en: "Dates and topics will be decided based on farmers’ needs and priorities. Monthly seminars are essential for farmers’ education.",
    mr: "तारीख आणि विषय शेतकऱ्यांच्या मागणी व प्राधान्यानुसार ठरवले जातील. शेतकऱ्यांच्या शिक्षणासाठी मासिक चर्चासत्र आवश्यक आहे.",
  },
};

/* Seminar reports (date, venue, speakers, photos) go here once supplied.
   Example shape:
   { date: "2026-10-12", place: {en:"Pune", mr:"पुणे"}, title: {...}, speakers: [...], photos: ["assets/images/seminars/pune-1.jpg"] } */
export const pastSeminars = [];
