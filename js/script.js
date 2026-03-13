// ==============================================
// === GLOBAL DEĞİŞKENLER VE DOM SEÇİMLERİ ===
// ==============================================
// Gerekli HTML elementlerini seçip değişkenlere atarız.
const themeToggleButton = document.getElementById('theme-toggle'); // Tema değiştirme butonu
const languageSwitcher = document.querySelector('.language-switcher'); // Dil seçici div'i
const allLangButtons = languageSwitcher ? languageSwitcher.querySelectorAll('button') : []; // Tüm dil butonları (languageSwitcher varsa)
// data-key'leri içeren elementler için seçici (dinamik olarak seçilecek)
const htmlTag = document.documentElement; // <html> elementi (lang özniteliği için)
const scrollTopButton = document.getElementById('scrollToTop'); // Yukarı çık butonu
const particleContainer = document.querySelector('.particle-container'); // Particle animasyonu için container
// Scroll animasyonu uygulanacak elementler
const animatedElements = document.querySelectorAll('.content-block, .quote-section');

// Sitenin o anki aktif dilini tutan değişken. Başlangıç değeri applyInitialLanguage içinde belirlenecek.
let currentLanguage = 'en'; // Varsayılan olarak İngilizce atayalım, başlangıçta güncellenecek

// ==============================================
// === DİL ÇEVİRİ VERİLERİ =====================
// ==============================================
// Her dil için çevirileri içeren nesne. Anahtarlar HTML'deki data-key ile eşleşmelidir.
const translations = {
    "tr": { // Türkçe
        "portfolio_title": "Aydın Aydemir'in Portföyü",
        "profile_name": "Aydın<br>Aydemir",
        "bio": "Ankara Üniversitesi'nde Bilgisayar Programcılığı ve Atatürk Üniversitesi'nde Web Tasarım ve Kodlama alanlarında öğrenim gören, teknolojiye meraklı bir öğrenciyim.",
        "linkedin_label": "Aydın Aydemir'in LinkedIn Profilini Ziyaret Et",
        "email_label": "Aydın Aydemir'e E-posta Gönder",
        "github_label": "Aydın Aydemir'in GitHub Profilini Ziyaret Et",
        "theme_toggle_label_light": "Aydınlık moda geç",
        "theme_toggle_label_dark": "Karanlık moda geç",
        "about_title": "Hakkımda",
        "about_desc_html": "<p>Merhaba! Ben Aydın Aydemir. Teknolojiye olan tutkum ve öğrenme azmimle, hem <strong>Ankara Üniversitesi</strong>'nde <em>Bilgisayar Programcılığı</em> hem de <strong>Atatürk Üniversitesi</strong>'nde <em>Web Tasarım ve Kodlama</em> alanlarında çift önlisans eğitimi alıyorum. Web tasarımı, yazılım geliştirme ve problem çözme konularında kendimi sürekli geliştiriyorum. <span class=\"highlight\">HTML5</span>, <span class=\"highlight\">CSS</span>, <span class=\"highlight\">SQL</span> ve <span class=\"highlight\">Microsoft SQL Server</span> gibi teknik becerilere sahibim. Ayrıca, araştırma yapma, öğrenmeye açıklık ve analitik düşünme gibi güçlü yönlerimle projelerime değer katıyorum. Daha fazla bilgi için <a href=\"https://www.linkedin.com/in/aydinaydmr\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>LinkedIn profilimi</strong></a> ziyaret edebilirsiniz.</p>",
        "education_title": "Eğitim Geçmişim",
        "edu_table_school": "Okul/Kurum",
        "edu_table_dept": "Bölüm/Alan",
        "edu_table_date": "Tarih Aralığı",
        "edu_uni1_name": "Ankara Üniversitesi",
        "edu_uni1_major": "Önlisans, Bilgisayar Programcılığı",
        "edu_uni1_date_prefix": "Ekim 2024",
        "edu_status_ongoing": "Devam Ediyor",
        "edu_uni2_name": "Atatürk Üniversitesi",
        "edu_uni2_major": "Önlisans, Web Tasarım ve Kodlama",
        "edu_uni2_date_prefix": "Ekim 2024",
        "edu_hs_name": "Pursaklar Anadolu Lisesi",
        "edu_hs_major": "Lise Diploması (Sayısal)",
        "edu_hs_date_prefix": "Eylül 2020",
        "edu_hs_date_suffix": "Haziran 2024",
        "skills_title": "Yeteneklerim",
        "skills_tech_title": "Teknik Beceriler:",
        "skill_html": "HTML",
        "skill_css": "CSS",
        "skill_js": "JavaScript",
        "skill_python": "Python",
        "skill_sql": "SQL",
        "skill_mssql": "Microsoft SQL Server",
        "skill_webdesign": "Web Tasarımı",
        "skill_programming": "Programlama",
        "skill_cpp": "C++ (Temel)",
        "skill_compsci": "Bilgisayar Bilimleri",
        "skill_compop": "Bilgisayar İşletmenliği (Operatörlüğü)",
        "skill_it": "Bilgi Teknolojileri (IT)",
        "skill_keyboard": "Bilgisayarda Hızlı Klavye Kullanımı",
        "skill_research": "Araştırma",
        "skill_cybersec": "Siber Güvenlik",
        "skill_api_dev": "API Development",
        "skill_web_services": "Web Hizmetleri",
        "skill_data_analytics": "Veri Analitiği",
        "skill_cloud_comp": "Bulut Bilgi İşlem",
        "skill_storage_mgmt": "Depolama Yönetimi",
        "skill_cloud_storage": "Cloud Storage",
        "skill_ms_copilot": "Microsoft Copilot",
        "skill_cloud_sec": "Cloud Security",
        "skill_sw_arch": "Yazılım Mimarisi",
        "skills_certs_langs_title": "Sertifikalar ve Diller",
        "cert_cloud_platforms": "Bulut Bilişimi Öğrenmek: Herkese Açık Bulut Platformları (LinkedIn)",
        "cert_cloud_concepts": "Bulut Bilişimi Öğrenmek: Temel Kavramlar (LinkedIn)",
        "cert_cloud_storage": "Bulut Depolama Kavramları: Hizmetler, Maliyet Kontrolü ve Güvenlik (LinkedIn)",
        "cert_ms_copilot_sec": "Güvenlik için Microsoft Copilot (LinkedIn)",
        "cert_html": "HTML Temel Eğitimi (LinkedIn)",
        "cert_first_impressions": "Harika İlk İzlenimler Yaratmak (LinkedIn)",
        "cert_js": "JavaScript Temel Eğitimi (LinkedIn)",
        "cert_api_web_services": "Programlama Esasları: API'lar ve Web Hizmetleri (LinkedIn)",
        "cert_python": "Seviye Atlayın: Python (LinkedIn)",
        "cert_cybersec_essentials": "Siber Güvenlik Esasları (LinkedIn)",
        "cert_cybersec_cloud": "Siber Güvenlik Farkındalığı: Bulut Güvenliği (LinkedIn)",
        "cert_data_analytics_intro": "Veri Analitiğinde Kariyer Yeteneklerine Giriş (LinkedIn)",
        "cert_sw_arch_essentials": "Yazılım Mimarisi Esasları (LinkedIn)",
        "cert_cybersec_workplace": "İş Yerinde Siber Güvenlik (LinkedIn)",
        "cert_comp_op_meb": "Bilgisayar İşletmenliği (Operatörlüğü) (MEB)",
        "cert_fast_keyboard_meb": "Bilgisayarda Hızlı Klavye Kullanımı (MEB)",
        "lang_tr": "Türkçe",
        "lang_en": "İngilizce",
        "lang_ot": "Osmanlıca (1500-1928)",
        "lang_level_native": "Ana Dil",
        "lang_level_limited": "Sınırlı Çalışma Yetkinliği",
        "volunteer_title": "Gönüllü Çalışmalarım",
        "volunteer_afad_title": "AFAD Gönüllüsü",
        "volunteer_afad_org": "T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi Başkanlığı (AFAD)",
        "volunteer_date": "Şubat 2023 - Halen",
        "volunteer_ihh_title": "İHH Gönüllüsü",
        "volunteer_ihh_org": "İHH İnsani Yardım Vakfı",
        "volunteer_footer_text": "Gönüllülük faaliyetlerimle topluma katkıda bulunmaktan mutluluk duyuyorum.",
        "ataturk_quote": "\"Hayattaki yegane üstünlüğüm, Türk doğmaktır!\"",
        "portfolio_title_section": "Projelerim",
        "portfolio_github_btn": "GitHub",
        "project_shadowprint_name": "ShadowPrint-OSINT",
        "project_shadowprint_desc": "Siber güvenlik araştırması için geliştirilmiş OSINT aracı. Verileri toplar, analiz eder ve raporama sağlar.",
        "project_mooweather_name": "MooWeather",
        "project_mooweather_desc": "Modern hava durumu uygulaması. Gerçek zamanlı veri, güzel arayüz ve PWA desteği ile geliştirildi.",
        "project_portfolio_name": "Bu Portfolyo Sitesi",
        "project_portfolio_desc": "Modern, responsive ve PWA destekli kişisel portfolyo sitesi. Çoklu dil ve tema desteği ile geliştirildi.",
        "experience_title": "İş Deneyimi",
        "exp_job1_title": "BT Stajyeri (IT Intern)",
        "exp_job1_company": "İş Yazılım A.Ş.",
        "exp_job1_date": "Şubat 2026 - Devam Ediyor",
        "exp_job1_desc": "BT departmanında sistem yönetimi, ağ yapılandırması ve kullanıcı desteği görevlerinde çalıştım. Sistem güvenliği ve veri yönetimi konularında deneyim kazandım.",
        "exp_job2_title": "Yakında...",
        "exp_job2_company": "...",
        "exp_job2_date": "Yakında...",
        "exp_job2_desc": "Yeni maceraların beklediği bir kariyer başlangıcı...",
        "footer_copyright": "&copy; 2026 Aydın Aydemir. Tüm hakları saklıdır.",
        "contact_title": "Bana Ulaşın",
        "contact_name_label": "İsim",
        "contact_email_label": "E-posta",
        "contact_subject_label": "Konu",
        "contact_message_label": "Mesaj",
        "contact_submit_btn": "Gönder",
        "contact_success_msg": "Mesajınız başarıyla gönderildi! Teşekkür ederiz. ✓",
        "contact_error_msg": "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin. ✗",
        "contact_captcha_error": "Lütfen captcha doğrulamasını tamamlayın."
    },
    "en": { // İngilizce
        "portfolio_title": "Aydın Aydemir's Portfolio",
        "profile_name": "Aydın<br>Aydemir",
        "bio": "I am a technology enthusiast studying Computer Programming at Ankara University and Web Design and Coding at Atatürk University.",
        "linkedin_label": "Visit Aydın Aydemir's LinkedIn Profile",
        "email_label": "Send Email to Aydın Aydemir",
        "github_label": "Visit Aydın Aydemir's GitHub Profile",
        "theme_toggle_label_light": "Switch to light mode",
        "theme_toggle_label_dark": "Switch to dark mode",
        "about_title": "About Me",
        "about_desc_html": "<p>Hello! I'm Aydın Aydemir. With my passion for technology and eagerness to learn, I am pursuing dual associate degrees in <strong>Computer Programming</strong> at <em>Ankara University</em> and <strong>Web Design and Coding</strong> at <em>Atatürk University</em>. I am constantly improving myself in web design, software development, and problem-solving. I possess technical skills such as <span class=\"highlight\">HTML5</span>, <span class=\"highlight\">CSS</span>, <span class=\"highlight\">SQL</span>, and <span class=\"highlight\">Microsoft SQL Server</span>. Additionally, I contribute value to my projects with strengths like research, openness to learning, and analytical thinking. For more information, you can visit my <a href=\"https://www.linkedin.com/in/aydinaydmr\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>LinkedIn profile</strong></a>.</p>",
        "education_title": "Education History",
        "edu_table_school": "School/Institution",
        "edu_table_dept": "Department/Field",
        "edu_table_date": "Date Range",
        "edu_uni1_name": "Ankara University",
        "edu_uni1_major": "Associate Degree, Computer Programming",
        "edu_uni1_date_prefix": "October 2024",
        "edu_status_ongoing": "Ongoing",
        "edu_uni2_name": "Atatürk University",
        "edu_uni2_major": "Associate Degree, Web Design and Coding",
        "edu_uni2_date_prefix": "October 2024",
        "edu_hs_name": "Pursaklar Anatolian High School",
        "edu_hs_major": "High School Diploma (Science)",
        "edu_hs_date_prefix": "September 2020",
        "edu_hs_date_suffix": "June 2024",
        "skills_title": "My Skills",
        "skills_tech_title": "Technical Skills:",
        "skill_html": "HTML",
        "skill_css": "CSS",
        "skill_js": "JavaScript",
        "skill_python": "Python",
        "skill_sql": "SQL",
        "skill_mssql": "Microsoft SQL Server",
        "skill_webdesign": "Web Design",
        "skill_programming": "Programming",
        "skill_cpp": "C++ (Basic)",
        "skill_compsci": "Computer Science",
        "skill_compop": "Computer Operator",
        "skill_it": "Information Technology (IT)",
        "skill_keyboard": "Fast Keyboard Usage",
        "skill_research": "Research",
        "skill_cybersec": "Cybersecurity",
        "skill_api_dev": "API Development",
        "skill_web_services": "Web Services",
        "skill_data_analytics": "Data Analytics",
        "skill_cloud_comp": "Cloud Computing",
        "skill_storage_mgmt": "Storage Management",
        "skill_cloud_storage": "Cloud Storage",
        "skill_ms_copilot": "Microsoft Copilot",
        "skill_cloud_sec": "Cloud Security",
        "skill_sw_arch": "Software Architecture",
        "skills_certs_langs_title": "Certificates and Languages",
        "cert_cloud_platforms": "Learning Cloud Computing: Public Cloud Platforms (LinkedIn)",
        "cert_cloud_concepts": "Learning Cloud Computing: Core Concepts (LinkedIn)",
        "cert_cloud_storage": "Cloud Storage Concepts: Services, Cost Control, and Security (LinkedIn)",
        "cert_ms_copilot_sec": "Microsoft Copilot for Security (LinkedIn)",
        "cert_html": "HTML Essential Training (LinkedIn)",
        "cert_first_impressions": "Creating Great First Impressions (LinkedIn)",
        "cert_js": "JavaScript Essential Training (LinkedIn)",
        "cert_api_web_services": "Programming Foundations: APIs and Web Services (LinkedIn)",
        "cert_python": "Level Up: Python (LinkedIn)",
        "cert_cybersec_essentials": "Cybersecurity Foundations (LinkedIn)",
        "cert_cybersec_cloud": "Cybersecurity Awareness: Cloud Security (LinkedIn)",
        "cert_data_analytics_intro": "Introduction to Career Skills in Data Analytics (LinkedIn)",
        "cert_sw_arch_essentials": "Software Architecture Foundations (LinkedIn)",
        "cert_cybersec_workplace": "Cybersecurity at Work (LinkedIn)",
        "cert_comp_op_meb": "Computer Operator (Ministry of Education Certificate)",
        "cert_fast_keyboard_meb": "Fast Keyboard Usage (Ministry of Education Certificate)",
        "lang_tr": "Turkish",
        "lang_en": "English",
        "lang_ot": "Ottoman Turkish (1500-1928)",
        "lang_level_native": "Native",
        "lang_level_limited": "Limited Working Proficiency",
        "volunteer_title": "Volunteer Experience",
        "volunteer_afad_title": "AFAD Volunteer",
        "volunteer_afad_org": "Republic of Türkiye Ministry of Interior Disaster and Emergency Management Presidency (AFAD)",
        "volunteer_date": "February 2023 - Present",
        "volunteer_ihh_title": "IHH Volunteer",
        "volunteer_ihh_org": "IHH Humanitarian Relief Foundation",
        "volunteer_footer_text": "I am happy to contribute to the community through my volunteering activities.",
        "ataturk_quote": "\"My sole advantage in life is to be born a Turk!\"",
        "portfolio_title_section": "My Projects",
        "portfolio_github_btn": "GitHub",
        "project_shadowprint_name": "ShadowPrint-OSINT",
        "project_shadowprint_desc": "An OSINT tool developed for cybersecurity research. Collects, analyzes data and provides reporting.",
        "project_mooweather_name": "MooWeather",
        "project_mooweather_desc": "Modern weather application. Developed with real-time data, beautiful interface and PWA support.",
        "project_portfolio_name": "This Portfolio Website",
        "project_portfolio_desc": "Modern, responsive personal portfolio website with PWA support. Developed with multi-language and theme support.",
        "experience_title": "Work Experience",
        "exp_job1_title": "IT Intern",
        "exp_job1_company": "İş Yazılım A.Ş.",
        "exp_job1_date": "February 2026 - Present",
        "exp_job1_desc": "Worked on system management, network configuration and user support tasks in the IT department. Gained experience in system security and data management.",
        "exp_job2_title": "Coming Soon...",
        "exp_job2_company": "...",
        "exp_job2_date": "Coming Soon...",
        "exp_job2_desc": "New adventures awaiting in a career beginning...",
        "footer_copyright": "&copy; 2026 Aydın Aydemir. All rights reserved.",
        "contact_title": "Contact Me",
        "contact_name_label": "Name",
        "contact_email_label": "Email",
        "contact_subject_label": "Subject",
        "contact_message_label": "Message",
        "contact_submit_btn": "Send",
        "contact_success_msg": "Message sent successfully! Thank you. ✓",
        "contact_error_msg": "An error occurred while sending your message. Please try again. ✗",
        "contact_captcha_error": "Please complete the captcha verification."
    },
    "es": { // İspanyolca
        "portfolio_title": "Portafolio de Aydın Aydemir",
        "profile_name": "Aydın<br>Aydemir",
        "bio": "Soy un entusiasta de la tecnología que estudia Programación Informática en la Universidad de Ankara y Diseño y Codificación Web en la Universidad de Atatürk.",
        "linkedin_label": "Visitar el Perfil de LinkedIn de Aydın Aydemir",
        "email_label": "Enviar Correo Electrónico a Aydın Aydemir",
        "github_label": "Visitar el Perfil de GitHub de Aydın Aydemir",
        "theme_toggle_label_light": "Cambiar a modo claro",
        "theme_toggle_label_dark": "Cambiar a modo oscuro",
        "about_title": "Sobre Mí",
        "about_desc_html": "<p>¡Hola! Soy Aydın Aydemir. Con mi pasión por la tecnología y mi afán por aprender, estoy cursando dos títulos de asociado en <strong>Programación Informática</strong> en la <em>Universidad de Ankara</em> y <strong>Diseño Web y Codificación</strong> en la <em>Universidad de Atatürk</em>. Me estoy mejorando constantemente en diseño web, desarrollo de software y resolución de problemas. Poseo habilidades técnicas como <span class=\"highlight\">HTML5</span>, <span class=\"highlight\">CSS</span>, <span class=\"highlight\">SQL</span> y <span class=\"highlight\">Microsoft SQL Server</span>. Además, aporto valor a mis proyectos con fortalezas como la investigación, la apertura al aprendizaje y el pensamiento analítico. Para más información, puedes visitar mi <a href=\"https://www.linkedin.com/in/aydinaydmr\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>perfil de LinkedIn</strong></a>.</p>",
        "education_title": "Historial Educativo",
        "edu_table_school": "Escuela/Institución",
        "edu_table_dept": "Departamento/Área",
        "edu_table_date": "Rango de Fechas",
        "edu_uni1_name": "Universidad de Ankara",
        "edu_uni1_major": "Grado Asociado, Programación Informática",
        "edu_uni1_date_prefix": "Octubre 2024",
        "edu_status_ongoing": "En curso",
        "edu_uni2_name": "Universidad Atatürk",
        "edu_uni2_major": "Grado Asociado, Diseño Web y Codificación",
        "edu_uni2_date_prefix": "Octubre 2024",
        "edu_hs_name": "Escuela Secundaria Anatolia de Pursaklar",
        "edu_hs_major": "Diploma de Bachillerato (Ciencias)",
        "edu_hs_date_prefix": "Septiembre 2020",
        "edu_hs_date_suffix": "Junio 2024",
        "skills_title": "Mis Habilidades",
        "skills_tech_title": "Habilidades Técnicas:",
        "skill_html": "HTML",
        "skill_css": "CSS",
        "skill_js": "JavaScript",
        "skill_python": "Python",
        "skill_sql": "SQL",
        "skill_mssql": "Microsoft SQL Server",
        "skill_webdesign": "Diseño Web",
        "skill_programming": "Programación",
        "skill_cpp": "C++ (Básico)",
        "skill_compsci": "Ciencias de la Computación",
        "skill_compop": "Operador de Computadoras",
        "skill_it": "Tecnologías de la Información (TI)",
        "skill_keyboard": "Uso Rápido del Teclado",
        "skill_research": "Investigación",
        "skill_cybersec": "Ciberseguridad",
        "skill_api_dev": "Desarrollo de API",
        "skill_web_services": "Servicios Web",
        "skill_data_analytics": "Análisis de Datos",
        "skill_cloud_comp": "Computación en la Nube",
        "skill_storage_mgmt": "Gestión de Almacenamiento",
        "skill_cloud_storage": "Almacenamiento en la Nube",
        "skill_ms_copilot": "Microsoft Copilot",
        "skill_cloud_sec": "Seguridad en la Nube",
        "skill_sw_arch": "Arquitectura de Software",
        "skills_certs_langs_title": "Certificados e Idiomas",
        "cert_cloud_platforms": "Aprender Cloud Computing: Plataformas de Nube Pública (LinkedIn)",
        "cert_cloud_concepts": "Aprender Cloud Computing: Conceptos Fundamentales (LinkedIn)",
        "cert_cloud_storage": "Conceptos de Almacenamiento en la Nube: Servicios, Control de Costos y Seguridad (LinkedIn)",
        "cert_ms_copilot_sec": "Microsoft Copilot para Seguridad (LinkedIn)",
        "cert_html": "Formación esencial de HTML (LinkedIn)",
        "cert_first_impressions": "Creando Excelentes Primeras Impresiones (LinkedIn)",
        "cert_js": "Formación esencial de JavaScript (LinkedIn)",
        "cert_api_web_services": "Fundamentos de la Programación: API y Servicios Web (LinkedIn)",
        "cert_python": "Sube de Nivel: Python (LinkedIn)",
        "cert_cybersec_essentials": "Fundamentos de la Ciberseguridad (LinkedIn)",
        "cert_cybersec_cloud": "Conciencia sobre Ciberseguridad: Seguridad en la Nube (LinkedIn)",
        "cert_data_analytics_intro": "Introducción a las Habilidades Profesionales en Análisis de Datos (LinkedIn)",
        "cert_sw_arch_essentials": "Fundamentos de la Arquitectura de Software (LinkedIn)",
        "cert_cybersec_workplace": "Ciberseguridad en el Trabajo (LinkedIn)",
        "cert_comp_op_meb": "Operador de Computadoras (Certificado del Ministerio de Educación)",
        "cert_fast_keyboard_meb": "Uso Rápido del Teclado (Certificado del Ministerio de Educación)",
        "lang_tr": "Turco",
        "lang_en": "Inglés",
        "lang_ot": "Turco Otomano (1500-1928)",
        "lang_level_native": "Nativo",
        "lang_level_limited": "Competencia Profesional Limitada",
        "volunteer_title": "Experiencia de Voluntariado",
        "volunteer_afad_title": "Voluntario de AFAD",
        "volunteer_afad_org": "Ministerio del Interior de la República de Turquía, Presidencia de Gestión de Desastres y Emergencias (AFAD)",
        "volunteer_date": "Febrero 2023 - Actualidad",
        "volunteer_ihh_title": "Voluntario de IHH",
        "volunteer_ihh_org": "Fundación de Ayuda Humanitaria IHH",
        "volunteer_footer_text": "Estoy feliz de contribuir a la comunidad a través de mis actividades de voluntariado.",
        "ataturk_quote": "\"¡Mi única ventaja en la vida es nacer turco!\"",        "portfolio_title_section": "Mis Proyectos",
        "portfolio_github_btn": "GitHub",
        "project_shadowprint_name": "ShadowPrint-OSINT",
        "project_shadowprint_desc": "Herramienta OSINT desarrollada para investigación de ciberseguridad. Recopila, analiza datos y proporciona informes.",
        "project_mooweather_name": "MooWeather",
        "project_mooweather_desc": "Aplicación de clima moderna. Desarrollada con datos en tiempo real, interfaz hermosa y soporte PWA.",
        "project_portfolio_name": "Este Sitio Web de Portafolio",
        "project_portfolio_desc": "Sitio web de portafolio personal moderno y responsivo con soporte PWA. Desarrollado con soporte multilingüe y de tema.",
        "experience_title": "Experiencia Laboral",
        "exp_job1_title": "Pasante de TI",
        "exp_job1_company": "İş Yazılım A.Ş.",
        "exp_job1_date": "Febrero 2026 - En curso",
        "exp_job1_desc": "Trabajó en tareas de gestión de sistemas, configuración de redes y soporte al usuario en el departamento de TI. Adquirió experiencia en seguridad de sistemas y gestión de datos.",
        "exp_job2_title": "Próximamente...",
        "exp_job2_company": "...",
        "exp_job2_date": "Próximamente...",
        "exp_job2_desc": "Nuevas aventuras esperan en un comienzo de carrera...",
        "footer_copyright": "&copy; 2026 Aydın Aydemir. Todos los derechos reservados.",
        "contact_title": "Contactarme",
        "contact_name_label": "Nombre",
        "contact_email_label": "Correo Electrónico",
        "contact_subject_label": "Asunto",
        "contact_message_label": "Mensaje",
        "contact_submit_btn": "Enviar",
        "contact_success_msg": "¡Tu mensaje se envió exitosamente! Gracias. ✓",
        "contact_error_msg": "Ocurrió un error al enviar tu mensaje. Por favor, intenta de nuevo. ✗",
        "contact_captcha_error": "Por favor, completa la verificación de captcha."
    }
};


// ==============================================
// === TEMA YÖNETİMİ ============================
// ==============================================

/**
 * Sayfa ilk yüklendiğinde kullanıcının kayıtlı temasını veya sistem tercihini uygular.
 */
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('dark'); // Varsayılan olarak koyu tema
    }
}

/**
 * Belirtilen temayı (dark/light) body elementine uygular,
 * localStorage'a kaydeder ve buton ikonunu/etiketini günceller.
 * @param {string} themeName - Ayarlanacak tema ('dark' veya 'light').
 */
function setTheme(themeName) {
    document.body.dataset.theme = themeName;
    localStorage.setItem('theme', themeName);
    updateThemeButtonVisuals(themeName);
}

/**
 * Tema değiştirme butonunun ikonunu (güneş/ay) ve
 * aria-label'ını (erişilebilirlik metni) mevcut temaya göre günceller.
 * @param {string} currentThemeName - Şu anki aktif tema ('dark' veya 'light').
 */
function updateThemeButtonVisuals(currentThemeName) {
    if (!themeToggleButton) return;
    const icon = themeToggleButton.querySelector('i');
    if (!icon) return;

    if (currentThemeName === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    updateThemeButtonLabel(); // Etiketi de güncelle
}

/**
 * Tema değiştirme butonunun aria-label'ını mevcut dil ve temaya göre günceller.
 */
function updateThemeButtonLabel() {
    if (!themeToggleButton) return;

    const currentTheme = document.body.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const labelKey = currentTheme === 'dark' ? 'theme_toggle_label_light' : 'theme_toggle_label_dark';
    const defaultLabel = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'; // Fallback

    // Çeviriyi al veya varsayılanı kullan
    const labelText = translations[currentLanguage]?.[labelKey] || defaultLabel;
    themeToggleButton.setAttribute('aria-label', labelText);
}

// Tema değiştirme butonu olay dinleyicisi
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}


// ==============================================
// === DİL YÖNETİMİ (IP Geolocation ile) ========
// ==============================================

/**
 * Sayfa ilk yüklendiğinde kullanıcının kayıtlı dilini uygular VEYA
 * IP adresine göre dili tahmin etmeye çalışır.
 */
function applyInitialLanguage() {
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage && translations[savedLanguage]) {
        console.log("Kaydedilmiş dil bulundu:", savedLanguage);
        setLanguage(savedLanguage);
        return;
    }

    console.log("Kaydedilmiş dil yok, IP ile tahmin deneniyor...");
    const defaultLang = 'en'; // Varsayılan dil

    // Basit IP Geolocation Fetch (Hata durumu yönetimi eklenebilir)
    fetch('https://ipinfo.io/country?token=[YOUR_IPINFO_TOKEN]') // API token eklemek iyi bir pratik olabilir
        .then(response => {
            if (!response.ok) {
                 // Ağ hatası veya API limiti vb. durumunda sessizce varsayılana dön
                console.warn(`IP Geolocation isteği başarısız oldu (Status: ${response.status}), varsayılan dil (${defaultLang}) kullanılıyor.`);
                throw new Error('Network response was not ok'); // Hata fırlatıp catch bloğunu tetikle
            }
            return response.text();
        })
        .then(countryCodeText => {
            const countryCode = countryCodeText.trim().toUpperCase();
            console.log("Tespit edilen Ülke Kodu:", countryCode);

            const spanishSpeakingCodes = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'DO', 'PR', 'GQ'];
            let detectedLang = defaultLang;

            if (countryCode === 'TR') {
                detectedLang = 'tr';
            } else if (spanishSpeakingCodes.includes(countryCode)) {
                detectedLang = 'es';
            }

            console.log("Ayarlanan dil:", detectedLang);
            setLanguage(detectedLang);
        })
        .catch(error => {
            // Fetch hatası veya response.ok olmayan durumlar buraya düşer
            console.error('IP Geolocation başarısız oldu veya ağ hatası, varsayılan dil kullanılıyor:', error);
            setLanguage(defaultLang); // Hata durumunda varsayılan dili ayarla
        });
}

/**
 * Belirtilen dile ('lang') sitenin içeriğini çevirir,
 * seçimi saklar ve butonların durumunu günceller.
 * (HTML'deki span yapısıyla uyumlu hale getirildi)
 * @param {string} lang - Ayarlanacak dil kodu ('tr', 'en', 'es').
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Dil "${lang}" çevirilerde bulunamadı.`);
        return;
    }

    currentLanguage = lang;
    htmlTag.lang = lang;
    localStorage.setItem('language', lang);

    // Her dil değişiminde çevrilecek elementleri yeniden seçmek daha güvenli.
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        // Elementin var olup olmadığını kontrol et
        if (!element) {
            // console.warn(`Anahtar "${key}" için element DOM'da bulunamadı.`);
            return;
        }
        const translation = translations[lang]?.[key]; // Çeviriyi al

        if (translation !== undefined) {
            // İkon içeren sosyal linklerde ikonu koru, sadece erişilebilir metni güncelle.
            if (element.tagName === 'A' && element.querySelector('i')) {
                element.setAttribute('aria-label', translation);
                element.setAttribute('title', translation);
            }
            // HTML içeren özel durumlar (_html, profile_name, <, & içerenler)
            else if (key.endsWith('_html') || key === 'profile_name' || translation.includes('<') || translation.includes('&')) {
                element.innerHTML = translation;
            }
            // Label elementi - metin içeriğini güncelle
            else if (element.tagName === 'LABEL') {
                element.textContent = translation;
                element.setAttribute('aria-label', translation);
            }
            // Button elementi - metin içeriğini güncelle
            else if (element.tagName === 'BUTTON') {
                element.textContent = translation;
            }
            // Diğer tüm metin içerikleri
            else {
                element.textContent = translation;
            }
        } else if (key) { // Anahtar varsa ama çeviri yoksa uyar (opsiyonel)
             // console.warn(`Çeviri anahtarı "${key}" dil "${lang}" için bulunamadı.`);
        }
    });

    updateLanguageButtonStates(lang);
    updateThemeButtonLabel(); // Tema butonu etiketini de güncelle
}


/**
 * Dil seçici butonlarının görsel durumunu ('active' sınıfını) günceller.
 * @param {string} activeLang - Aktif olan dil kodu.
 */
function updateLanguageButtonStates(activeLang) {
    if (!allLangButtons || allLangButtons.length === 0) return;
    allLangButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === activeLang);
    });
}

// Dil değiştirme butonları olay dinleyicileri
if (languageSwitcher) {
    allLangButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.currentTarget.dataset.lang;
            if (lang && translations[lang]) { // Sadece geçerli bir dilse ayarla
                 setLanguage(lang);
            } else {
                console.warn(`Geçersiz dil butonu tıklandı: ${lang}`);
            }
        });
    });
}

// ==============================================
// === SCROLL ANİMASYONLARI ====================
// ==============================================
// Intersection Observer: Elementlerin ekrana girip girmediğini izler.
const observerOptions = {
    root: null, // Tarayıcı penceresi
    rootMargin: '0px',
    threshold: 0.1 // %10 görünürlükte tetikle
};

// Observer tetiklendiğinde çalışacak callback fonksiyonu
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animasyon bir kere çalışsın
        }
    });
};

// Observer örneğini oluştur
const observer = new IntersectionObserver(observerCallback, observerOptions);
// Gözlemlenecek elementleri (content-block, quote-section, volunteer) observer'a tanıt
animatedElements.forEach(el => {
    if (el) { // Elementin var olduğundan emin ol
        observer.observe(el)
    }
});

// ==================================
// === YUKARI ÇIK BUTONU ===============
// ==================================

/**
 * Sayfayı yumuşak bir şekilde en üste kaydırır (Smooth animated scroll).
 * EaseInOutCubic easing fonksiyonu kullanarak doğal bir hareket sağlar.
 */
function scrollToTop() {
    const scrollDuration = 1200; // ms (1.2 saniye)
    const scrollStart = window.scrollY;
    const scrollStartTime = performance.now();
    
    // Easing function for smooth animation
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animate(currentTime) {
        const elapsed = currentTime - scrollStartTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        // Scroll from current position to 0
        window.scrollTo(0, scrollStart - scrollStart * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Scroll pozisyonuna göre yukarı çık butonunun görünürlüğünü ayarlar.
 */
function handleScrollButtonVisibility() {
    if (!scrollTopButton) return;
    if (window.scrollY > 200) {
        scrollTopButton.style.display = 'flex'; // Görünür yap (CSS'e göre flex)
    } else {
        scrollTopButton.style.display = 'none'; // Gizle
    }
}

// Scroll olayını dinleyerek buton görünürlüğünü kontrol et
window.addEventListener('scroll', handleScrollButtonVisibility);

// ==============================================
// === SERVICE WORKER DEVRE DISI ===============
// ==============================================
// Service Worker'i devre disi birakma ve silme
if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for (let registration of registrations) {
                        registration.unregister();
                        console.log('Service Worker basariyla silindi.');
                }
        });
}


// ==============================================
// === SAYFA YÜKLEME OLAYLARI ==================
// ==============================================

/**
 * Typing effect animasyonu - Aydın yazılır, br yapılır, Aydemir yazılır
 * Cursor (çizgi) yazıyı harf harf takip eder, yazma bitince cursor kaybolur
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    // HTML'deki mevcut metni temizle
    typingElement.innerHTML = '';
    
    // İki satırda yazılan metin
    const lines = ['Aydın', 'Aydemir'];
    let lineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 120; // ms per character
    const lineDelay = 300; // ms pause before next line
    
    function typeCharacter() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            
            if (charIndex < currentLine.length) {
                // Şu anki satırdan bir karakter al
                const char = currentLine[charIndex];
                const currentContent = typingElement.innerHTML;
                
                // Cursor'ı kaldır ve karakteri ekle
                let newContent = currentContent.replace(/<span class="cursor">.*?<\/span>/g, '');
                newContent += char;
                
                // Karakteri ve yanında cursor'ı ekle
                typingElement.innerHTML = newContent + '<span class="cursor"></span>';
                charIndex++;
                
                // Sonraki karakter için timeout
                setTimeout(typeCharacter, typingSpeed);
            } else if (lineIndex < lines.length - 1) {
                // Satırı bitirdik, sonraki satıra geç
                // Cursor'ı kaldır, <br> ekle
                let newContent = typingElement.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '');
                typingElement.innerHTML = newContent + '<br>';
                
                lineIndex++;
                charIndex = 0;
                
                // Sonraki satırı yazma öncesinde biraz bekle
                setTimeout(typeCharacter, lineDelay);
            } else {
                // Yazma tamamlandı - cursor'ı kaldır
                let finalContent = typingElement.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '');
                typingElement.innerHTML = finalContent;
            }
        }
    }
    
    // Typing efektini başlat
    typeCharacter();
}

/**
 * Particle animasyonu oluşturur. Rastgele sayıda parçacık ekrana eklenir.
 */
function createParticles() {
    if (!particleContainer) return; // Container yoksa çıkış yap

    // Mobil cihazlarda performans için parçacık sayısını sınırla
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 10 : 30; // Mobilde 10, PC'de 30 parçacık
    const sizes = ['small', 'medium', 'large'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', sizes[Math.floor(Math.random() * sizes.length)]);

        // Rastgele yatay pozisyon (0-100%)
        const randomLeft = Math.random() * 100;
        particle.style.left = randomLeft + '%';

        // Rastgele başlangıç yüksekliği (100-150%)
        const randomBottom = Math.random() * 50 + 100;
        particle.style.bottom = randomBottom + '%';

        // Rastgele animasyon gecikmeleri (parçacıklar farklı zamanlarda çıkar)
        const randomDelay = Math.random() * 5;
        particle.style.animationDelay = randomDelay + 's';

        // Rastgele animasyon süresi (10-20 saniye)
        const randomDuration = Math.random() * 10 + 10;
        particle.style.animationDuration = randomDuration + 's';

        particleContainer.appendChild(particle);
    }
}

/**
 * İletişim formu gönder.
 * EmailJS kullanarak e-posta gönderir.
 * Kurulum: EmailJS'e kaydolun ve Service ID, Template ID, Public Key'i ekleyin.
 */
/**
 * İletişim formu gönder - Web3Forms + hCaptcha kullanarak Protonmail'e email gönderir.
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formMessage = document.getElementById('form-message');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // hCaptcha doğrulaması
        const hCaptchaResponse = contactForm.querySelector('textarea[name=h-captcha-response]');
        if (!hCaptchaResponse || !hCaptchaResponse.value) {
            formMessage.textContent = translations[currentLanguage].contact_captcha_error;
            formMessage.className = 'form-message error';
            return;
        }

        const payload = {
            access_key: '114aaeca-ee6b-4fff-8083-f24269fc4075',
            name: contactForm.querySelector('#contact-name').value,
            email: contactForm.querySelector('#contact-email').value,
            subject: contactForm.querySelector('#contact-subject').value,
            message: contactForm.querySelector('#contact-message').value,
            'h-captcha-response': hCaptchaResponse.value
        };

        // Loading durumunda yazıyı güncelle
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLanguage === 'tr' ? 'Gönderiliyor...' : currentLanguage === 'en' ? 'Sending...' : 'Enviando...');
        submitBtn.disabled = true;
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = translations[currentLanguage].contact_success_msg;
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error(data.message || translations[currentLanguage].contact_error_msg);
            }
        } catch (error) {
            console.error('Form gönderme hatası:', error);
            formMessage.textContent = (error.message || translations[currentLanguage].contact_error_msg);
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll bar update
/**
 * Scroll Progress Bar'ı sayfa aşağılanma yüzdesine göre günceller.
 */
function updateScrollProgressBar() {
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    if (!scrollProgressBar) return;

    // Sayfa yüksekliği - viewport yüksekliği = kaydırılabilir mesafe
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    // Yüzdeyi hesapla (0-100)
    const scrollPercent = (scrolled / scrollableHeight) * 100;

    // Progress bar'ın genişliğini güncelle
    scrollProgressBar.style.width = scrollPercent + '%';
}

// Scroll olayında progress bar'ı güncelle
window.addEventListener('scroll', updateScrollProgressBar);


document.addEventListener('DOMContentLoaded', () => {
    applyInitialTheme();            // Temayı uygula
    applyInitialLanguage();         // Dili uygula (IP kontrolü dahil)
    handleScrollButtonVisibility(); // Scroll butonunun ilk durumunu ayarla
    createParticles();              // Particle animasyonlarını oluştur
    initTypingEffect();             // Typing effect animasyonunu başlat
    initializeContactForm();        // Contact form handler'ını başlat
});