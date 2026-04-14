import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'tr' | 'en' | 'es';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  tr: {
    app_title: 'CV Oluşturucu',
    app_subtitle: 'ATS Uyumlu Profesyonel CV',
    home: 'Ana Sayfa',
    dark_mode: 'Karanlık moda geç',
    light_mode: 'Aydınlık moda geç',
    preview: 'CV Önizleme',
    print: 'Yazdır',
    download_pdf: 'PDF İndir',
    no_data: 'Henüz bir bilgi girilmedi',
    add_info: 'Sol panelden bilgilerinizi ekleyin',
    personal_info: 'Kişisel Bilgiler',
    full_name: 'Ad Soyad',
    email: 'E-posta',
    phone: 'Telefon',
    location: 'Konum',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Web Sitesi',
    summary: 'Profesyonel Özet',
    experience: 'İş Deneyimi',
    add_experience: 'Deneyim Ekle',
    company: 'Şirket',
    position: 'Pozisyon',
    current: 'Devam ediyor',
    education: 'Eğitim',
    add_education: 'Eğitim Ekle',
    school: 'Okul',
    degree: 'Derece',
    field: 'Bölüm',
    skills: 'Yetenekler',
    add_skill: 'Yetenek Ekle',
    skill_name: 'Yetenek adı',
    projects: 'Projeler',
    add_project: 'Proje Ekle',
    linkedin_import: 'LinkedIn\'den İçe Aktar',
    linkedin_placeholder: 'LinkedIn profil URL\'nizi yapıştırın',
    import: 'İçe Aktar',
    importing: 'İçe aktarılıyor...',
    footer_copyright: '© 2026 Aydın Aydemir. Tüm hakları saklıdır.',
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
    footer_copyright: '© 2026 Aydın Aydemir. All rights reserved.',
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
    no_data: 'Aún no se ha ingresado información',
    add_info: 'Agregue su información desde el panel izquierdo',
    personal_info: 'Información Personal',
    full_name: 'Nombre Completo',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    location: 'Ubicación',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Sitio Web',
    summary: 'Resumen Profesional',
    experience: 'Experiencia Laboral',
    add_experience: 'Agregar Experiencia',
    company: 'Empresa',
    position: 'Posición',
    current: 'Actual',
    education: 'Educación',
    add_education: 'Agregar Educación',
    school: 'Escuela',
    degree: 'Título',
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
    footer_copyright: '© 2026 Aydın Aydemir. Todos los derechos reservados.',
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
      // Try to detect from browser
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
