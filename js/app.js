/**
 * NAMAN HOSPITAL - MAIN APPLICATION SCRIPT
 * ISO 9001: 2015 Certified Hospital | Kankarbagh, Patna
 * Interactive Doctor Search, Digital OPD Slip Generator, Bilingual & Theme System
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initHeader();
  renderFacilities();
  renderDoctors();
  initDoctorFilters();
  initBookingForm();
  initMobileMenu();
});

/* ==========================================================================
   DATA STORE: EXTRACTED DIRECTLY FROM NAMAN HOSPITAL PAMPHLET
   ========================================================================== */

const DOCTORS_DATA = [
  {
    id: 1,
    name: "Dr. Sushil Kumar Singh",
    qualification: "MCh",
    specialtyEn: "Ortho & Spine Surgeon",
    specialtyHi: "हड्डी एवं रीढ़ की हड्डी के सर्जन",
    department: "ortho",
    category: "Ortho & Spine",
    timing: "Mon - Sat (10 AM - 4 PM)",
    gender: "male",
    image: null
  },
  {
    id: 2,
    name: "Dr. Himanshu Kumar",
    qualification: "MCh",
    specialtyEn: "Neuro & Spine Surgeon",
    specialtyHi: "न्यूरो एवं स्पाइन सर्जन",
    department: "neuro",
    category: "Neuro & Spine",
    timing: "Mon - Sat (11 AM - 5 PM)",
    gender: "male",
    image: null
  },
  {
    id: 3,
    name: "Dr. Abhay Ranjan",
    qualification: "DM",
    specialtyEn: "Neuro Physician",
    specialtyHi: "न्यूरो फिजिशियन (मस्तिष्क रोग विशेषज्ञ)",
    department: "neuro",
    category: "Neuro & Spine",
    timing: "Tue, Thu, Sat (12 PM - 4 PM)",
    gender: "male",
    image: null
  },
  {
    id: 4,
    name: "Dr. Vaibhav Raj",
    qualification: "DM",
    specialtyEn: "Gastro & Hepato Physician",
    specialtyHi: "पेट, आंत एवं लीवर रोग विशेषज्ञ",
    department: "gastro",
    category: "Gastro & Liver",
    timing: "Mon - Sat (11 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 5,
    name: "Dr. Rakesh Kumar",
    qualification: "MCh",
    specialtyEn: "Gastro Surgeon",
    specialtyHi: "गैस्ट्रो एवं लेप्रोस्कोपिक सर्जन",
    department: "gastro",
    category: "Gastro & Liver",
    timing: "Mon - Fri (10 AM - 2 PM)",
    gender: "male",
    image: null
  },
  {
    id: 6,
    name: "Dr. Naveen Kumar",
    qualification: "MCh",
    specialtyEn: "Onco Surgeon (Cancer Specialist)",
    specialtyHi: "कैंसर सर्जन (ऑन्को सर्जन)",
    department: "onco",
    category: "Oncology",
    timing: "Mon, Wed, Fri (2 PM - 6 PM)",
    gender: "male",
    image: null
  },
  {
    id: 7,
    name: "Dr. M K Bharti",
    qualification: "DM",
    specialtyEn: "Onco Physician",
    specialtyHi: "मेडिकल ऑन्कोलॉजिस्ट (कैंसर रोग विशेषज्ञ)",
    department: "onco",
    category: "Oncology",
    timing: "Tue, Thu, Sat (10 AM - 2 PM)",
    gender: "male",
    image: null
  },
  {
    id: 8,
    name: "Dr. Faizul Haque",
    qualification: "MCh",
    specialtyEn: "Uro Surgeon",
    specialtyHi: "यूरोलॉजी एवं पथरी सर्जन",
    department: "uro",
    category: "Urology & Kidney",
    timing: "Mon - Sat (12 PM - 4 PM)",
    gender: "male",
    image: null
  },
  {
    id: 9,
    name: "Dr. Tariq Anwar",
    qualification: "MS",
    specialtyEn: "Gen. & Lap Surgeon",
    specialtyHi: "जेनरल एवं लेप्रोस्कोपिक सर्जन",
    department: "surgery",
    category: "General & Laparoscopy",
    timing: "Mon - Sat (10 AM - 5 PM)",
    gender: "male",
    image: null
  },
  {
    id: 10,
    name: "Dr. Niraj Kumar",
    qualification: "MS",
    specialtyEn: "Gen. & Lap Surgeon",
    specialtyHi: "जेनरल एवं मिनिमल इनवेसिव सर्जन",
    department: "surgery",
    category: "General & Laparoscopy",
    timing: "Daily (9 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 11,
    name: "Dr. A. K. Sinha",
    qualification: "DM",
    specialtyEn: "Cardiologist (Heart Specialist)",
    specialtyHi: "हृदय रोग विशेषज्ञ (कार्डियोलॉजिस्ट)",
    department: "cardio",
    category: "Cardiology",
    timing: "Mon - Sat (11 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 12,
    name: "Dr. Priyaranjan Kumar",
    qualification: "MD",
    specialtyEn: "Anaesthetic & Critical Care",
    specialtyHi: "एनेस्थेटिस्ट एवं क्रिटिकल केयर विशेषज्ञ",
    department: "icu",
    category: "Critical Care",
    timing: "24x7 Emergency On Call",
    gender: "male",
    image: null
  },
  {
    id: 13,
    name: "Dr. Anantu Kumar",
    qualification: "MD",
    specialtyEn: "Anaesthetic & Pain Specialist",
    specialtyHi: "एनेस्थेटिस्ट एवं पेन मैनेजमेंट",
    department: "icu",
    category: "Critical Care",
    timing: "24x7 Emergency On Call",
    gender: "male",
    image: null
  },
  {
    id: 14,
    name: "Dr. Sangita Kumari",
    qualification: "MD",
    specialtyEn: "Gynecologist & Obstetrician",
    specialtyHi: "स्त्री एवं प्रसूति रोग विशेषज्ञ",
    department: "gynae",
    category: "Mother & Child",
    timing: "Daily (10 AM - 2 PM, 5 PM - 7 PM)",
    gender: "female",
    image: null
  },
  {
    id: 15,
    name: "Dr. Shashi Bhushan",
    qualification: "MD",
    specialtyEn: "Pediatrician (Child Specialist)",
    specialtyHi: "नवजात एवं शिशु रोग विशेषज्ञ",
    department: "pedia",
    category: "Mother & Child",
    timing: "Mon - Sat (10 AM - 4 PM)",
    gender: "male",
    image: null
  },
  {
    id: 16,
    name: "Dr. Saurav Kumar",
    qualification: "MCh",
    specialtyEn: "Paediatric Surgeon",
    specialtyHi: "बाल रोग सर्जन (पीडियाट्रिक सर्जन)",
    department: "pedia",
    category: "Mother & Child",
    timing: "Tue, Thu, Sat (11 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 17,
    name: "Dr. R. A. Khan",
    qualification: "MD",
    specialtyEn: "Nephrologist (Kidney & Dialysis)",
    specialtyHi: "किडनी रोग एवं डायलिसिस विशेषज्ञ",
    department: "uro",
    category: "Urology & Kidney",
    timing: "Mon, Wed, Fri (12 PM - 4 PM)",
    gender: "male",
    image: null
  },
  {
    id: 18,
    name: "Dr. Sanjay Kumar",
    qualification: "MCh",
    specialtyEn: "Plastic & Burn Care Surgeon",
    specialtyHi: "प्लास्टिक एवं बर्न केयर सर्जन",
    department: "burn",
    category: "Plastic & Burn Care",
    timing: "Mon - Sat (10 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 19,
    name: "Dr. P K Shahi",
    qualification: "DM",
    specialtyEn: "Pulmonary (Chest) Physician",
    specialtyHi: "छाती एवं फेफड़ा रोग विशेषज्ञ",
    department: "chest",
    category: "Chest & Pulmonary",
    timing: "Mon - Sat (11 AM - 3 PM)",
    gender: "male",
    image: null
  },
  {
    id: 20,
    name: "Dr. Uma Shankar",
    qualification: "MDS",
    specialtyEn: "Maxillofacial & Dental Surgeon",
    specialtyHi: "मैक्सिलोफेशियल एवं दंत रोग सर्जन",
    department: "dental",
    category: "Dental & ENT",
    timing: "Daily (10 AM - 6 PM)",
    gender: "male",
    image: null
  },
  {
    id: 21,
    name: "Dr. Manoj Kumar Verma",
    qualification: "MS",
    specialtyEn: "ENT Surgeon",
    specialtyHi: "कान, नाक एवं गला रोग सर्जन",
    department: "ent",
    category: "Dental & ENT",
    timing: "Mon - Sat (10 AM - 2 PM)",
    gender: "male",
    image: null
  },
  {
    id: 22,
    name: "Dr. Sanjiv Kumar",
    qualification: "MS",
    specialtyEn: "ENT Surgeon",
    specialtyHi: "कान, नाक एवं गला विशेषज्ञ",
    department: "ent",
    category: "Dental & ENT",
    timing: "Mon - Sat (3 PM - 7 PM)",
    gender: "male",
    image: null
  }
];

const FACILITIES_DATA = [
  {
    id: "f1",
    titleEn: "24-Hour Emergency & Trauma",
    titleHi: "24 घंटे इमरजेंसी एवं ट्रामा",
    descEn: "Round-the-clock resuscitation, accident trauma stabilization, and critical care units.",
    descHi: "दुर्घटना, आघात एवं आपातकालीन चिकित्सा के लिए 24 घंटे तत्पर टीम।",
    icon: "🚨",
    category: "critical"
  },
  {
    id: "f2",
    titleEn: "Advanced ICU & NICU",
    titleHi: "आईसीयू एवं एनआईसीयू",
    descEn: "State-of-the-art ventilators, multi-para monitors, and sterile neonatal intensive care.",
    descHi: "गंभीर मरीजों एवं नवजात शिशुओं के लिए अत्याधुनिक वेंटिलेटर युक्त आईसीयू।",
    icon: "🏥",
    category: "critical"
  },
  {
    id: "f3",
    titleEn: "Specialized Burn Care Center",
    titleHi: "बर्न मरीज का स्पेशल देखभाल (24x7)",
    descEn: "Sterile burn recovery unit, infection control protocols & expert plastic reconstructive care.",
    descHi: "जलने से पीड़ित मरीजों के लिए विशेष आइसोलेशन वार्ड और प्लास्टिक सर्जरी सुविधा।",
    icon: "🔥",
    category: "critical"
  },
  {
    id: "f4",
    titleEn: "General & Advanced Laser Surgery",
    titleHi: "जेनरल सर्जरी एवं लेजर सर्जरी",
    descEn: "Painless laser treatment for piles, fissures, fistula, varicose veins, and hernia repair.",
    descHi: "पाइल्स, फिस्टुला और हर्निया के लिए दर्द रहित अत्याधुनिक लेजर ऑपरेशन।",
    icon: "⚡",
    category: "surgery"
  },
  {
    id: "f5",
    titleEn: "Advanced Laparoscopy (Keyhole Surgery)",
    titleHi: "एडवान्स लेप्रोस्कोपी एवं मिनिमल इन्वेसिव सर्जरी",
    descEn: "Gallbladder, appendix, and gastro surgeries with minimal incision and rapid recovery.",
    descHi: "दूरबीन विधि द्वारा न्यूनतम चीरे के साथ त्वरित स्वस्थ होने वाले ऑपरेशन।",
    icon: "🔬",
    category: "surgery"
  },
  {
    id: "f6",
    titleEn: "Gastroenterology & GI Surgery",
    titleHi: "गैस्ट्रोइन्ट्रोलॉजी एवं जी.आई. सर्जरी",
    descEn: "Endoscopy, liver diseases, gastrointestinal bleed, jaundice & complex GI interventions.",
    descHi: "लीवर, पेट और आंतों की बीमारियों का अनुभवी चिकित्सकों द्वारा सटीक उपचार।",
    icon: "🩺",
    category: "medicine"
  },
  {
    id: "f7",
    titleEn: "Urology, Nephrology & Dialysis",
    titleHi: "यूरोलॉजी एवं नेफ्रोलॉजी, डायलेसिस की सुविधा",
    descEn: "Kidney stone removal, prostate treatment, and round-the-clock hygienic hemodialysis.",
    descHi: "किडनी रोग, प्रोस्टेट, पथरी का इलाज तथा 24 घंटे सुरक्षित डायलिसिस की सुविधा।",
    icon: "💧",
    category: "surgery"
  },
  {
    id: "f8",
    titleEn: "Orthopedics, Arthroscopy & Joint Replacement",
    titleHi: "ऑर्थोपेडिक्स, आर्थोस्कोपी एवं ज्वाइन्ट रिप्लेसमेंट",
    descEn: "Knee and hip joint replacement, sports injury arthroscopy, and complex fracture fixation.",
    descHi: "घुटना व कूल्हा प्रत्यारोपण, फ्रैक्चर सर्जरी एवं रीढ़ की हड्डी का उपचार।",
    icon: "🦴",
    category: "surgery"
  },
  {
    id: "f9",
    titleEn: "Neurology & Neurosurgery",
    titleHi: "न्यूरोलॉजी एवं न्यूरोसर्जरी",
    descEn: "Brain stroke management, head injury, spine surgery, and neurological care.",
    descHi: "ब्रेन स्ट्रोक, सिर की चोट और रीढ़ की हड्डी के रोगों का सुपर-स्पेशलिस्ट इलाज।",
    icon: "🧠",
    category: "surgery"
  },
  {
    id: "f10",
    titleEn: "Plastic Surgery, Cosmetology & Dermatology",
    titleHi: "प्लास्टिक सर्जरी, कॉस्मेटालॉजी एवं डर्मोटोलॉजी",
    descEn: "Reconstructive burn surgeries, trauma scar correction, skin and cosmetic procedures.",
    descHi: "घाव व जले के निशान की प्लास्टिक सर्जरी एवं त्वचा संबंधित आधुनिक उपचार।",
    icon: "✨",
    category: "surgery"
  },
  {
    id: "f11",
    titleEn: "Internal Medicine & Pulmonary (Chest) Care",
    titleHi: "इंटरनल मेडिसिन एवं पलमोनरी मेडिसिन",
    descEn: "Diabetes, hypertension, asthma, chest infections, COPD, and general wellness.",
    descHi: "मधुमेह, बीपी, दमा, फेफड़े एवं छाती के गंभीर रोगों का संपूर्ण इलाज।",
    icon: "🫁",
    category: "medicine"
  },
  {
    id: "f12",
    titleEn: "Gynecology & Obstetrics",
    titleHi: "स्त्री रोग एवं प्रसूति विभाग",
    descEn: "Safe normal and cesarean delivery, high-risk pregnancy management, and infertility care.",
    descHi: "सुरक्षित प्रसव, उच्च जोखिम गर्भावस्था, सिजेरियन और बांझपन का सफल इलाज।",
    icon: "🤰",
    category: "mother-child"
  },
  {
    id: "f13",
    titleEn: "Pediatrics & Neonatology",
    titleHi: "नवजात एवं शिशु रोग विभाग",
    descEn: "Comprehensive childcare, pediatric surgery, routine vaccinations, and newborn care.",
    descHi: "शिशु रोग, टीकाकरण एवं बच्चों की विशेष सर्जरी की 24 घंटे उपलब्धता।",
    icon: "👶",
    category: "mother-child"
  },
  {
    id: "f14",
    titleEn: "ENT & Ophthalmology",
    titleHi: "ई.एन.टी. एवं नेत्र रोग विभाग",
    descEn: "Microscopic ear surgery, sinus surgery, throat procedures, and eye health diagnostics.",
    descHi: "कान, नाक, गला के सूक्ष्म ऑपरेशन और आंखों की संपूर्ण जांच व उपचार।",
    icon: "👂",
    category: "surgery"
  },
  {
    id: "f15",
    titleEn: "Cardiology Center",
    titleHi: "कार्डियोलॉजी विभाग",
    descEn: "Cardiac emergency management, heart disease diagnostics, and expert physician consults.",
    descHi: "हृदय रोग के मरीजों के लिए त्वरित निदान एवं विशेषज्ञ डॉक्टरों द्वारा देखभाल।",
    icon: "❤️",
    category: "critical"
  },
  {
    id: "f16",
    titleEn: "Oncology (Cancer Care)",
    titleHi: "कैंसर रोग विभाग",
    descEn: "Comprehensive cancer screening, surgical oncology, and chemotherapy consultations.",
    descHi: "कैंसर के मरीजों के लिए आधुनिक सर्जरी और मेडिकल ऑन्कोलॉजी का परामर्श।",
    icon: "🎗️",
    category: "medicine"
  },
  {
    id: "f17",
    titleEn: "Dental & Maxillofacial Surgery",
    titleHi: "डेंटल एंड मैक्सिलोफेशियल सर्जरी",
    descEn: "Facial fracture reconstruction, jaw surgeries, dental implants, and smile correction.",
    descHi: "चेहरे की हड्डी की सर्जरी, जबड़े का ऑपरेशन और आधुनिक दंत चिकित्सा।",
    icon: "🦷",
    category: "surgery"
  },
  {
    id: "f18",
    titleEn: "Digital Radiology & X-Ray",
    titleHi: "रेडियोलॉजी एवं एक्सरे",
    descEn: "High-resolution digital X-rays, ultrasound diagnostics, and imaging reports.",
    descHi: "सटीक और तुरंत रिपोर्ट देने वाला आधुनिक डिजिटल एक्स-रे व अल्ट्रासाउंड।",
    icon: "🩻",
    category: "diagnostics"
  },
  {
    id: "f19",
    titleEn: "ECG, ECHO & TMT",
    titleHi: "ईसीजी, ईको एवं टीएमटी",
    descEn: "Complete non-invasive cardiac checkup unit with precision computerized equipment.",
    descHi: "हृदय की कार्यप्रणाली की सटीक जांच हेतु 12-लीड ईसीजी, 2डी ईको एवं टीएमटी।",
    icon: "📈",
    category: "diagnostics"
  },
  {
    id: "f20",
    titleEn: "24/7 Computerized Pathology Lab",
    titleHi: "कम्प्यूटराईज्ड पैथ लैब",
    descEn: "Automated hematology, biochemistry, hormone assays, and rapid blood diagnostics.",
    descHi: "सभी प्रकार के खून व पेशाब की जांच के लिए स्वचालित एवं विश्वसनीय पैथोलॉजी।",
    icon: "🧪",
    category: "diagnostics"
  }
];

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('naman_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);

  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('naman_theme', theme);
  
  const iconSpans = document.querySelectorAll('.theme-icon');
  iconSpans.forEach(icon => {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
  
  const textSpans = document.querySelectorAll('.theme-text');
  textSpans.forEach(txt => {
    txt.textContent = theme === 'dark' ? 'Light' : 'Dark';
  });
}

/* ==========================================================================
   BILINGUAL (ENGLISH / HINDI) SYSTEM
   ========================================================================== */
let currentLang = 'en';

function initLanguage() {
  const savedLang = localStorage.getItem('naman_lang') || 'en';
  applyLanguage(savedLang);

  const langButtons = document.querySelectorAll('.lang-switch');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'hi' : 'en';
      applyLanguage(newLang);
      showToast(newLang === 'hi' ? 'भाषा: हिन्दी चुनी गई है' : 'Language set to English');
    });
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('naman_lang', lang);

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'hi' ? el.getAttribute('data-hi') : el.getAttribute('data-en');
    if (text) {
      el.textContent = text;
    }
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const placeholder = lang === 'hi' ? el.getAttribute('data-hi-placeholder') : el.getAttribute('data-en-placeholder');
    if (placeholder) {
      el.placeholder = placeholder;
    }
  });

  document.querySelectorAll('.lang-btn-label').forEach(el => {
    el.textContent = lang === 'en' ? 'हिन्दी' : 'English';
  });

  // Re-render facilities and doctors with chosen language
  renderFacilities();
  renderDoctors();
}

/* ==========================================================================
   STICKY HEADER & NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggleBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggleBtn.textContent = '☰';
      });
    });
  }
}

/* ==========================================================================
   RENDER FACILITIES & CATEGORY TABS
   ========================================================================== */
let activeFacilityCategory = 'all';

function renderFacilities() {
  const grid = document.getElementById('facilitiesGrid');
  if (!grid) return;

  const filtered = activeFacilityCategory === 'all' 
    ? FACILITIES_DATA 
    : FACILITIES_DATA.filter(f => f.category === activeFacilityCategory);

  grid.innerHTML = filtered.map(item => `
    <div class="facility-card">
      <div class="facility-icon-wrap">${item.icon}</div>
      <h3 class="facility-title">${currentLang === 'hi' ? item.titleHi : item.titleEn}</h3>
      <div class="facility-title-hi">${currentLang === 'hi' ? item.titleEn : item.titleHi}</div>
      <p class="facility-text">${currentLang === 'hi' ? item.descHi : item.descEn}</p>
      <a href="#bookingSection" class="facility-link" onclick="selectDepartment('${item.titleEn}')">
        ${currentLang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Consult Specialist'} →
      </a>
    </div>
  `).join('');

  initFacilityTabs();
}

function initFacilityTabs() {
  const tabs = document.querySelectorAll('.facility-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFacilityCategory = tab.dataset.category;
      renderFacilities();
    };
  });
}

/* ==========================================================================
   RENDER DOCTORS & SEARCH / FILTER
   ========================================================================== */
let activeDoctorFilter = 'all';
let searchQuery = '';

function renderDoctors() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;

  const filtered = DOCTORS_DATA.filter(doc => {
    const matchesCategory = activeDoctorFilter === 'all' || doc.department === activeDoctorFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      doc.name.toLowerCase().includes(query) ||
      doc.specialtyEn.toLowerCase().includes(query) ||
      doc.specialtyHi.toLowerCase().includes(query) ||
      doc.qualification.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 1.1rem; font-weight: 600;">No specialist found matching "${searchQuery}".</p>
        <button class="btn btn-secondary" style="margin-top: 12px;" onclick="resetDoctorSearch()">Show All Specialists</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(doc => {
    // Generate avatar letters if no image
    const initials = doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).slice(0, 2).join('');
    
    return `
      <div class="doctor-card" data-id="${doc.id}">
        <div class="doc-top">
          <div class="doc-avatar">
            ${doc.image ? `<img src="${doc.image}" alt="${doc.name}">` : initials}
          </div>
          <div class="doc-meta">
            <span class="doc-qual-badge">${doc.qualification}</span>
            <h4 class="doc-name">${doc.name}</h4>
          </div>
        </div>
        <div class="doc-specialty">
          ${currentLang === 'hi' ? doc.specialtyHi : doc.specialtyEn}
        </div>
        <div class="doc-availability">
          <span>🕒</span> <span>${doc.timing}</span>
        </div>
        <button class="doc-book-btn" onclick="selectDoctor('${doc.name}', '${doc.specialtyEn}')">
          ${currentLang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}
        </button>
      </div>
    `;
  }).join('');
}

function initDoctorFilters() {
  const tabs = document.querySelectorAll('.doc-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDoctorFilter = tab.dataset.dept;
      renderDoctors();
    });
  });

  const searchInput = document.getElementById('doctorSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderDoctors();
    });
  }
}

window.resetDoctorSearch = function() {
  searchQuery = '';
  activeDoctorFilter = 'all';
  const searchInput = document.getElementById('doctorSearchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.doc-tab').forEach((t, i) => {
    if (i === 0) t.classList.add('active');
    else t.classList.remove('active');
  });
  renderDoctors();
};

/* ==========================================================================
   PRESCRIPTION SLIP GENERATOR & APPOINTMENT BOOKING
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  // Real-time update to slip preview
  const inputs = ['patientName', 'patientAge', 'patientSex', 'patientAddress', 'patientDoctor', 'patientReferred', 'patientInstructions'];
  inputs.forEach(id => {
    const inputEl = document.getElementById(id);
    if (inputEl) {
      inputEl.addEventListener('input', updateSlipPreview);
      inputEl.addEventListener('change', updateSlipPreview);
    }
  });

  // Populate doctor select
  const docSelect = document.getElementById('patientDoctor');
  if (docSelect) {
    DOCTORS_DATA.forEach(d => {
      const opt = document.createElement('option');
      opt.value = `${d.name} (${d.specialtyEn})`;
      opt.textContent = `${d.name} — ${d.qualification} (${d.specialtyEn})`;
      docSelect.appendChild(opt);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitAppointment();
  });
}

function updateSlipPreview() {
  const name = document.getElementById('patientName')?.value.trim() || '—';
  const age = document.getElementById('patientAge')?.value.trim() || '—';
  const sex = document.getElementById('patientSex')?.value || '—';
  const address = document.getElementById('patientAddress')?.value.trim() || 'Patna';
  const doctor = document.getElementById('patientDoctor')?.value || 'General Consultation';
  const referred = document.getElementById('patientReferred')?.value.trim() || 'Self';
  const instructions = document.getElementById('patientInstructions')?.value.trim() || 'General OPD check-up';

  document.getElementById('slipName').textContent = name;
  document.getElementById('slipAge').textContent = age;
  document.getElementById('slipSex').textContent = sex;
  document.getElementById('slipAddress').textContent = address;
  document.getElementById('slipDoctor').textContent = doctor;
  document.getElementById('slipReferred').textContent = referred;
  document.getElementById('slipInstructions').textContent = instructions;
  document.getElementById('slipDate').textContent = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function submitAppointment() {
  const name = document.getElementById('patientName')?.value.trim();
  const phone = document.getElementById('patientPhone')?.value.trim();
  const doctor = document.getElementById('patientDoctor')?.value;
  const address = document.getElementById('patientAddress')?.value.trim();
  const instructions = document.getElementById('patientInstructions')?.value.trim();

  if (!name || !phone) {
    showToast('Please enter patient name and contact number');
    return;
  }

  updateSlipPreview();
  showToast('✅ Appointment Request Registered!');

  // Build WhatsApp text
  const waMessage = encodeURIComponent(
    `*NAMAN HOSPITAL - PATIENT APPOINTMENT REQUEST*\n` +
    `-----------------------------------------\n` +
    `👤 *Patient Name:* ${name}\n` +
    `📞 *Phone Number:* ${phone}\n` +
    `📍 *Address:* ${address || 'Patna'}\n` +
    `👨‍⚕️ *Consulting Doctor/Dept:* ${doctor}\n` +
    `📝 *Problem/Instructions:* ${instructions || 'OPD Consultation'}\n` +
    `-----------------------------------------\n` +
    `Kindly confirm my consultation slot. Thank you.`
  );

  // Open WhatsApp direct link
  const waUrl = `https://wa.me/919304671782?text=${waMessage}`;
  
  // Show slip confirmation banner
  const actionsContainer = document.getElementById('slipActionBtns');
  if (actionsContainer) {
    actionsContainer.innerHTML = `
      <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
        <span>📱</span> Send To Hospital WhatsApp
      </a>
      <button class="btn btn-secondary" onclick="window.print()" style="flex: 1;">
        <span>🖨️</span> Print / Save Slip
      </button>
    `;
  }
}

window.selectDoctor = function(doctorName, specialty) {
  const docSelect = document.getElementById('patientDoctor');
  if (docSelect) {
    for (let i = 0; i < docSelect.options.length; i++) {
      if (docSelect.options[i].text.includes(doctorName)) {
        docSelect.selectedIndex = i;
        break;
      }
    }
    updateSlipPreview();
  }
  
  const bookingSec = document.getElementById('bookingSection');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected: ${doctorName}`);
  }
};

window.selectDepartment = function(deptName) {
  const instructions = document.getElementById('patientInstructions');
  if (instructions) {
    instructions.value = `Consultation requested for ${deptName}`;
    updateSlipPreview();
  }
  const bookingSec = document.getElementById('bookingSection');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   TOAST NOTIFICATION COMPONENT
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🔔</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
