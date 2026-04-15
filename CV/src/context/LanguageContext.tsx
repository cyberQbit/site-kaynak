import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'tr' | 'en' | 'es';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  tr: {
    app_title: 'CV Olusturucu',
    app_subtitle: 'ATS Uyumlu Profesyonel CV',
    home: 'Ana Sayfa',
    dark_mode: 'Karanlik moda gec',
    light_mode: 'Aydinlik moda gec',
    preview: 'CV Onizleme',
    print: 'Yazdir',
    download_pdf: 'PDF Indir',
    no_data: 'Henüz bir bilgi girilmedi',
    add_info: 'Sol panelden bilgilerinizi ekleyin',
    personal_info: 'Kisisel Bilgiler',
    full_name: 'Ad Soyad',
    email: 'E-posta',
    phone: 'Telefon',
    location: 'Konum',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Web Sitesi',
    summary: 'Profesyonel Ozet',
    summary_placeholder: '5+ yillik deneyime sahip, React ve Node.js uzmani yazilim gelistirici...',
    summary_tip: '💡 Is ilanindaki anahtar kelimeleri kullanin - ATS skoru artar',
    chars: 'kr',
    experience: 'Is Deneyimi',
    add_experience: 'Deneyim Ekle',
    company: 'Sirket',
    position: 'Pozisyon',
    current: 'Devam ediyor',
    education: 'Egitim',
    add_education: 'Egitim Ekle',
    school: 'Okul',
    degree: 'Derece',
    field: 'Bolum',
    skills: 'Yetenekler',
    add_skill: 'Yetenek Ekle',
    skill_name: 'Yetenek adi',
    projects: 'Projeler',
    add_project: 'Proje Ekle',
    linkedin_import: 'LinkedIn\'den Ice Aktar',
    linkedin_placeholder: 'LinkedIn profil URL\'nizi yapistirin',
    import: 'Ice Aktar',
    importing: 'Ice aktariliyor...',
    footer_copyright: '© 2026 Aydin Aydemir. Tum haklari saklidir.',
    ats_compatible: 'ATS Uyumlu',
    professional: 'Profesyonel',
    modern: 'Modern',
  },
  en: {
    app_title: 'CV Creator',
    app_subtitle: 'ATS-Compatible Professional CV',
    home: 'Home',
    dark_mode: 'Switch to dark mode',
    light_mode: 'Switch to light mode',
    preview: 'CV Preview',
    print: 'Print',
    download_pdf: 'Download PDF',
    no_data: 'No information entered yet',
    add_info: 'Add your information from the left panel',
    personal_info: 'Personal Information',
    full_name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Website',
    summary: 'Professional Summary',
    summary_placeholder: 'Software developer with 5+ years of experience, specializing in React and Node.js...',
    summary_tip: '💡 Use keywords from the job description - increases ATS score',
    chars: 'chars',
    experience: 'Work Experience',
    add_experience: 'Add Experience',
    company: 'Company',
    position: 'Position',
    current: 'Present',
    education: 'Education',
    add_education: 'Add Education',
    school: 'School',
    degree: 'Degree',
    field: 'Field of Study',
    skills: 'Skills',
    add_skill: 'Add Skill',
    skill_name: 'Skill name',
    projects: 'Projects',
    add_project: 'Add Project',
    linkedin_import: 'Import from LinkedIn',
    linkedin_placeholder: 'Paste your LinkedIn profile URL',
    import: 'Import',
    importing: 'Importing...',
    footer_copyright: '© 2026 Aydin Aydemir. All rights reserved.',
    ats_compatible: 'ATS Compatible',
    professional: 'Professional',
    modern: 'Modern',
  },
  es: {
    app_title: 'Creador de CV',
    app_subtitle: 'CV Profesional Compatible con ATS',
    home: 'Inicio',
    dark_mode: 'Cambiar a modo oscuro',
    light_mode: 'Cambiar a modo claro',
    preview: 'Vista Previa',
    print: 'Imprimir',
    download_pdf: 'Descargar PDF',
    no_data: 'Aun no se ha ingresado informacion',
    add_info: 'Agregue su informacion desde el panel izquierdo',
    personal_info: 'Informacion Personal',
    full_name: 'Nombre Completo',
    email: 'Correo Electronico',
    phone: 'Telefono',
    location: 'Ubicacion',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Sitio Web',
    summary: 'Resumen Profesional',
    summary_placeholder: 'Desarrollador de software experto en React y Node.js con mas de 5 anos de experiencia...',
    summary_tip: '💡 Utilice palabras clave de la descripcion del trabajo - aumenta la puntuacion ATS',
    chars: 'car.',
    experience: 'Experiencia Laboral',
    add_experience: 'Agregar Experiencia',
    company: 'Empresa',
    position: 'Posicion',
    current: 'Actual',
    education: 'Educacion',
    add_education: 'Agregar Educacion',
    school: 'Escuela',
    degree: 'Titulo',
    field: 'Campo de Estudio',
    skills: 'Habilidades',
    add_skill: 'Agregar Habilidad',
    skill_name: 'Nombre de habilidad',
    projects: 'Proyectos',
    add_project: 'Agregar Proyecto',
    linkedin_import: 'Importar de LinkedIn',
    linkedin_placeholder: 'Pegue la URL de su perfil de LinkedIn',
    import: 'Importar',
    importing: 'Importando...',
    footer_copyright: '© 2026 Aydin Aydemir. Todos los derechos reservados.',
    ats_compatible: 'Compatible con ATS',
    professional: 'Profesional',
    modern: 'Moderno',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    const savedLang = localStorage.getItem('cv-language') as Language;
    if (savedLang && ['tr', 'en', 'es'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'tr') setLanguageState('tr');
      else if (browserLang === 'es') setLanguageState('es');
      else setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cv-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
