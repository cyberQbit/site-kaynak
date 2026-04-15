(async function initLanguage() {
  let currentLang = localStorage.getItem('user_lang');
  
  if (!currentLang) {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        const country = data.country_code;
        if (country === 'TR') {
          currentLang = 'tr';
        } else if (['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI'].includes(country)) {
          currentLang = 'es';
        } else {
          currentLang = 'en';
        }
      } else {
        currentLang = 'en';
      }
    } catch(e) {
      currentLang = 'en';
    }
    localStorage.setItem('user_lang', currentLang);
    if(currentLang !== 'tr' && !window.location.search.includes('lang=')) {
      sessionStorage.setItem('skip_loader', 'true');
      window.location.href = window.location.pathname + '?lang=' + currentLang;
    } 
  }

  if (currentLang && currentLang !== 'tr') {
    document.cookie = "googtrans=/tr/" + currentLang + "; path=/; domain=" + window.location.hostname;
    document.cookie = "googtrans=/tr/" + currentLang + "; path=/;";
  } else {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
  }
})();

function changeLanguage(lang) {
  localStorage.setItem('user_lang', lang);
  if (lang === 'tr') {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
  } else {
    document.cookie = "googtrans=/tr/" + lang + "; path=/; domain=" + window.location.hostname;
    document.cookie = "googtrans=/tr/" + lang + "; path=/;";
  }
  sessionStorage.setItem('skip_loader', 'true');
  window.location.href = window.location.pathname + '?lang=' + lang;
}
