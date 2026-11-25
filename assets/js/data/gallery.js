/* =========================================================
   Gallery. Add real photographs here – the gallery page,
   filters, lightbox and home preview update automatically.
   Recommended: JPEG, 1600px long edge for `src`, 600px for `thumb`.
   ========================================================= */
export const galleryCategories = [
  { key: "all", en: "All", mr: "सर्व" },
  { key: "posters", en: "Posters & Notices", mr: "पोस्टर्स व सूचना" },
  { key: "seminars", en: "Seminars", mr: "चर्चासत्रे" },
  { key: "cattle", en: "Cattle", mr: "जनावरे" },
  { key: "events", en: "Events & Expo", mr: "कार्यक्रम व एक्स्पो" },
];

export const gallery = [
  {
    category: "posters",
    src: "assets/images/posters/sambhajinagar-district-poster.jpg",
    thumb: "assets/images/posters/sambhajinagar-district-poster-480.jpg",
    width: 853, height: 1280,
    caption: { mr: "PBFA छत्रपती संभाजीनगर जिल्हा – प्रमुख उद्दिष्टे व संपर्क", en: "PBFA Chhatrapati Sambhajinagar District – key objectives & contacts" },
  },
  {
    category: "posters",
    src: "assets/images/posters/seminar-timetable-mr.jpg",
    thumb: "assets/images/posters/seminar-timetable-mr-480.jpg",
    width: 793, height: 992,
    caption: { mr: "PBFA मासिक चर्चासत्र वेळापत्रक", en: "Monthly seminar timetable (Marathi)" },
  },
  {
    category: "posters",
    src: "assets/images/posters/seminar-timetable-en.jpg",
    thumb: "assets/images/posters/seminar-timetable-en-480.jpg",
    width: 793, height: 992,
    caption: { mr: "PBFA Monthly Seminar Timetable (इंग्रजी)", en: "PBFA Monthly Seminar Timetable" },
  },
  {
    category: "posters",
    src: "assets/images/logos/pbfa-logo-640.png",
    thumb: "assets/images/logos/pbfa-logo-320.png",
    width: 640, height: 785, contain: true,
    caption: { mr: "PBFA अधिकृत बोधचिन्ह", en: "Official PBFA emblem" },
  },
];
