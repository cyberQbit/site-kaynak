const SUPPORTED_LANGS = ['tr', 'en', 'es'];
const GT_SCRIPT_URL = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
let gtLoaded = false;

function detectLang() {
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  const lang = nav.toLowerCase();
  if (lang.startsWith('tr')) return 'tr';
  if (lang.startsWith('es')) return 'es';
  return 'en';
}

function setTranslateCookies(lang) {
  document.cookie = "googtrans=/tr/" + lang + "; path=/; domain=" + window.location.hostname;
  document.cookie = "googtrans=/tr/" + lang + "; path=/;";
}

function clearTranslateCookies() {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
}

function loadGoogleTranslate() {
  if (gtLoaded || document.querySelector('script[data-gt]')) return;
  gtLoaded = true;
  const load = () => {
    const script = document.createElement('script');
    script.src = GT_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-gt', '1');
    document.head.appendChild(script);
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 1500 });
  } else {
    setTimeout(load, 600);
  }
}

window.googleTranslateElementInit = function googleTranslateElementInit() {
  if (typeof google === 'undefined' || !google.translate) return;
  if (!document.getElementById('google_translate_element')) return;
  new google.translate.TranslateElement(
    { pageLanguage: 'tr', includedLanguages: 'tr,en,es', autoDisplay: false },
    'google_translate_element'
  );
};

(function initLanguage() {
  let currentLang = localStorage.getItem('user_lang');
  if (!currentLang || !SUPPORTED_LANGS.includes(currentLang)) {
    currentLang = detectLang();
    localStorage.setItem('user_lang', currentLang);
    if (currentLang !== 'tr' && !window.location.search.includes('lang=')) {
      sessionStorage.setItem('skip_loader', 'true');
      window.location.href = window.location.pathname + '?lang=' + currentLang;
      return;
    }
  }

  if (currentLang && currentLang !== 'tr') {
    setTranslateCookies(currentLang);
    loadGoogleTranslate();
  } else {
    clearTranslateCookies();
  }
})();

function changeLanguage(lang) {
  const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : 'en';
  localStorage.setItem('user_lang', safeLang);
  if (safeLang === 'tr') {
    clearTranslateCookies();
  } else {
    setTranslateCookies(safeLang);
    loadGoogleTranslate();
  }
  sessionStorage.setItem('skip_loader', 'true');
  window.location.href = window.location.pathname + '?lang=' + safeLang;
}
