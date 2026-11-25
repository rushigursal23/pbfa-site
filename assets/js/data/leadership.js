/* =========================================================
   Leadership. Marathi names exactly as supplied.
   CONFIRM: English spellings of names are transliterations.
   `initial` is shown in the avatar until real photos are supplied
   (add  photo: "assets/images/leadership/<file>.jpg"  to show a photo).
   ========================================================= */
export const stateOfficeBearers = [
  { initial: "सं", role: { mr: "अध्यक्ष", en: "President" }, name: { mr: "श्री. संजय शिवाजी सालगुडे पाटील", en: "Shri. Sanjay Shivaji Salgude Patil" } },
  { initial: "नि", role: { mr: "चेअरमन", en: "Chairman" }, name: { mr: "श्री. निलेश काशिनाथ दहे", en: "Shri. Nilesh Kashinath Dahe" } },
  { initial: "ह", role: { mr: "व्हाईस चेअरमन", en: "Vice Chairman" }, name: { mr: "श्री. हरीश येडे", en: "Shri. Harish Yede" } },
  { initial: "ह", role: { mr: "उपाध्यक्ष", en: "Vice President" }, name: { mr: "श्री. हनुमान पेचे", en: "Shri. Hanuman Peche" } },
  { initial: "रा", role: { mr: "सचिव", en: "Secretary" }, name: { mr: "श्री. रामनाथ विष्णू वदक", en: "Shri. Ramnath Vishnu Vadak" } },
  { initial: "वा", role: { mr: "खजिनदार", en: "Treasurer" }, name: { mr: "श्री. वामन इंद्रजित गायकवाड", en: "Shri. Waman Indrajit Gaikwad" } },
];

export const advisoryBoard = [
  { initial: "ग", role: { mr: "ज्येष्ठ मार्गदर्शक", en: "Senior Mentor" }, name: { mr: "श्री. गजानन शेवाळे", en: "Shri. Gajanan Shewale" } },
  { initial: "बा", role: { mr: "ज्येष्ठ सल्लागार", en: "Senior Advisor" }, name: { mr: "श्री. बाबासाहेब पवार", en: "Shri. Babasaheb Pawar" } },
];

/* District chapters – from the Chhatrapati Sambhajinagar district poster. */
export const districtChapters = [
  {
    id: "chhatrapati-sambhajinagar",
    district: { mr: "छत्रपती संभाजीनगर जिल्हा", en: "Chhatrapati Sambhajinagar District" },
    poster: "assets/images/posters/sambhajinagar-district-poster.jpg",
    posterThumb: "assets/images/posters/sambhajinagar-district-poster-480.jpg",
    members: [
      { initial: "यो", role: { mr: "अध्यक्ष", en: "President" }, name: { mr: "श्री योगेश चव्हाण", en: "Shri Yogesh Chavan" }, phone: "9049241321" },
      { initial: "र", role: { mr: "उपाध्यक्ष", en: "Vice President" }, name: { mr: "श्री रघुनाथ चव्हाण", en: "Shri Raghunath Chavan" }, phone: "9890000629" },
      // CONFIRM: surname read from the poster as "बाघ"
      { initial: "शु", role: { mr: "उपाध्यक्ष", en: "Vice President" }, name: { mr: "श्री शुभम बाघ", en: "Shri Shubham Bagh" }, phone: "8698927769" },
    ],
  },
];
