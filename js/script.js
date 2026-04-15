// ==============================================
// === GLOBAL DEĞİŞKENLER VE DOM SEÇİMLERİ ===
// ==============================================
const themeToggleButton = document.getElementById('theme-toggle');
const languageSwitcher = document.querySelector('.language-switcher');
const allLangButtons = languageSwitcher ? languageSwitcher.querySelectorAll('button') : [];
const htmlTag = document.documentElement;
const scrollTopButton = document.getElementById('scroll-top');
const particleContainer = document.querySelector('.particle-container');
const animatedElements = document.querySelectorAll('.content-block, .quote-section');

let currentLanguage = 'en';

// ==============================================
// === API GÜVENLİĞİ ===========================
// ==============================================
// Access key obfuscated - do not expose in plain text
const _ak = () => atob('MTE0YWFlY2EtZWU2Yi00ZmZmLTgwODMtZjI0MjY5ZmM0MDc1');

// ==============================================
// === DİL ÇEVİRİ VERİLERİ =====================
// ==============================================
const translations = {
    "tr": {
        "portfolio_title": "Aydın Aydemir (cyberQbit) | Portföy",
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
        "portfolio_view_repo": "Repoya Git",
        "project_mooweather_mobile_name": "MooWeather-Mobile",
        "project_mooweather_mobile_desc": "Flutter ile geliştirilen, glassmorphism arayüzlü ve bulut senkronizasyonlu mobil hava durumu uygulaması.",
        "project_mooweather_backend_name": "MooWeather-BackEnd",
        "project_mooweather_backend_desc": "Mobil uygulama için geliştirilmiş, JWT doğrulamalı C# .NET REST API servisi.",
        "project_swifthub_name": "SwiftHub",
        "project_swifthub_desc": "Geliştiriciler için modern ve hızlı uygulama yönetim platformu.",
        "project_ceptekabin_name": "CepteKabin",
        "project_ceptekabin_desc": "Akıllı Dijital Gardırop Uygulaması.",
        "experience_title": "İş Deneyimi",
        "exp_job1_title": "BT Stajyeri (IT Intern)",
        "exp_job1_company": "İş Yazılım",
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
        "contact_name_placeholder": "Adınız",
        "contact_email_placeholder": "E-posta adresiniz",
        "contact_subject_placeholder": "Konu",
        "contact_message_placeholder": "Mesajınız...",
        "project_cv_name": "CV Oluşturucu",
        "project_cv_desc": "ATS uyumlu, profesyonel CV oluşturun. LinkedIn profilinizi içe aktarın ve PDF olarak indirin.",
        "cv_fab_tooltip": "CV Oluştur",
        "footer_rights": "Tüm Hakları Saklıdır.",
        "contact_submit_btn": "Gönder",
        "contact_success_msg": "Mesajınız başarıyla gönderildi! Teşekkür ederiz. ✓",
        "contact_error_msg": "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin. ✗",
        "contact_captcha_error": "Lütfen captcha doğrulamasını tamamlayın.",
        "sponsor_btn_text": "cyberQbit'e Sponsor Ol"
    },
    "en": {
        "portfolio_title": "Aydın Aydemir (cyberQbit) | Portfolio",
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
        "portfolio_view_repo": "View Repository",
        "project_mooweather_mobile_name": "MooWeather-Mobile",
        "project_mooweather_mobile_desc": "Mobile weather app developed with Flutter, featuring glassmorphism UI and cloud sync.",
        "project_mooweather_backend_name": "MooWeather-BackEnd",
        "project_mooweather_backend_desc": "C# .NET REST API service with JWT authentication, built for the mobile app.",
        "project_swifthub_name": "SwiftHub",
        "project_swifthub_desc": "Modern and fast application management platform for developers.",
        "project_ceptekabin_name": "CepteKabin",
        "project_ceptekabin_desc": "Smart Digital Wardrobe Application.",
        "experience_title": "Work Experience",
        "exp_job1_title": "IT Intern",
        "exp_job1_company": "İş Yazılım",
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
        "contact_name_placeholder": "Your Name",
        "contact_email_placeholder": "Your Email",
        "contact_subject_placeholder": "Subject",
        "contact_message_placeholder": "Your Message...",
        "project_cv_name": "CV Builder",
        "project_cv_desc": "Create an ATS-friendly, professional CV. Import your LinkedIn profile and download as PDF.",
        "cv_fab_tooltip": "Create CV",
        "footer_rights": "All Rights Reserved.",
        "contact_submit_btn": "Send",
        "contact_success_msg": "Message sent successfully! Thank you. ✓",
        "contact_error_msg": "An error occurred while sending your message. Please try again. ✗",
        "contact_captcha_error": "Please complete the captcha verification.",
        "sponsor_btn_text": "Sponsor cyberQbit"
    },
    "es": {
        "portfolio_title": "Aydın Aydemir (cyberQbit) | Portafolio",
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
        "cert_cloud_storage": "Conceptos de Almacenamiento en la Nube (LinkedIn)",
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
        "volunteer_afad_org": "Ministerio del Interior de la República de Turquía (AFAD)",
        "volunteer_date": "Febrero 2023 - Actualidad",
        "volunteer_ihh_title": "Voluntario de IHH",
        "volunteer_ihh_org": "Fundación de Ayuda Humanitaria IHH",
        "volunteer_footer_text": "Estoy feliz de contribuir a la comunidad a través de mis actividades de voluntariado.",
        "ataturk_quote": "\"¡Mi única ventaja en la vida es nacer turco!\"",
        "portfolio_title_section": "Mis Proyectos",
        "portfolio_view_repo": "Ver Repositorio",
        "project_mooweather_mobile_name": "MooWeather-Mobile",
        "project_mooweather_mobile_desc": "Aplicación del tiempo con Flutter, interfaz glassmorphism y sincronización en la nube.",
        "project_mooweather_backend_name": "MooWeather-BackEnd",
        "project_mooweather_backend_desc": "Servicio API REST de C# .NET con autenticación JWT para la aplicación móvil.",
        "project_swifthub_name": "SwiftHub",
        "project_swifthub_desc": "Plataforma moderna de gestión de aplicaciones para desarrolladores.",
        "project_ceptekabin_name": "CepteKabin",
        "project_ceptekabin_desc": "Aplicación de Armario Digital Inteligente.",
        "experience_title": "Experiencia Laboral",
        "exp_job1_title": "Pasante de TI",
        "exp_job1_company": "İş Yazılım",
        "exp_job1_date": "Febrero 2026 - En curso",
        "exp_job1_desc": "Gestión de sistemas, configuración de redes y soporte al usuario en el departamento de TI.",
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
        "contact_name_placeholder": "Tu Nombre",
        "contact_email_placeholder": "Tu Correo Electrónico",
        "contact_subject_placeholder": "Asunto",
        "contact_message_placeholder": "Tu Mensaje...",
        "project_cv_name": "Creador de CV",
        "project_cv_desc": "Cree un CV profesional compatible con ATS. Importe su perfil de LinkedIn y descárguelo en PDF.",
        "cv_fab_tooltip": "Crear CV",
        "footer_rights": "Todos los derechos reservados.",
        "contact_submit_btn": "Enviar",
        "contact_success_msg": "¡Tu mensaje se envió exitosamente! Gracias. ✓",
        "contact_error_msg": "Ocurrió un error al enviar tu mensaje. Por favor, intenta de nuevo. ✗",
        "contact_captcha_error": "Por favor, completa la verificación de captcha.",
        "sponsor_btn_text": "Patrocinar a cyberQbit"
    }
};


// ==============================================
// === LUCIDE ICONS İNİT =======================
// ==============================================
function initLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}


// ==============================================
// === TEMA YÖNETİMİ ============================
// ==============================================
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('dark');
    }
}

function setTheme(themeName) {
    document.body.dataset.theme = themeName;
    localStorage.setItem('theme', themeName);
    updateThemeButtonVisuals(themeName);
}

function updateThemeButtonVisuals(currentThemeName) {
    if (!themeToggleButton) return;
    const wrapper = document.getElementById('theme-icon-wrapper');
    if (!wrapper) return;
    const iconName = currentThemeName === 'dark' ? 'sun' : 'moon';
    wrapper.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    updateThemeButtonLabel();
}

function updateThemeButtonLabel() {
    if (!themeToggleButton) return;
    const currentTheme = document.body.dataset.theme || 'dark';
    const labelKey = currentTheme === 'dark' ? 'theme_toggle_label_light' : 'theme_toggle_label_dark';
    const defaultLabel = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    const labelText = translations[currentLanguage]?.[labelKey] || defaultLabel;
    themeToggleButton.setAttribute('aria-label', labelText);
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}


// ==============================================
// === DİL YÖNETİMİ ============================
// ==============================================
function applyInitialLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
        return;
    }

    const defaultLang = 'en';
    fetch('https://ipinfo.io/country?token=YOUR_IPINFO_TOKEN')
        .then(response => {
            if (!response.ok) throw new Error('IP geo failed');
            return response.text();
        })
        .then(countryCodeText => {
            const countryCode = countryCodeText.trim().toUpperCase();
            const spanishCodes = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'DO', 'PR', 'GQ'];
            let detectedLang = defaultLang;
            if (countryCode === 'TR') detectedLang = 'tr';
            else if (spanishCodes.includes(countryCode)) detectedLang = 'es';
            setLanguage(detectedLang);
        })
        .catch(() => setLanguage(defaultLang));
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    htmlTag.lang = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        const translation = translations[lang]?.[key];
        if (translation !== undefined) {
            if (element.tagName === 'A' && element.querySelector('i, svg')) {
                element.setAttribute('aria-label', translation);
                element.setAttribute('title', translation);
            } else if (key.endsWith('_html') || key === 'profile_name' || translation.includes('<') || translation.includes('&')) {
                element.innerHTML = translation;
            } else if (element.tagName === 'LABEL') {
                element.textContent = translation;
                element.setAttribute('aria-label', translation);
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translation);
            } else {
                element.textContent = translation;
            }
        }
    });

    updateLanguageButtonStates(lang);
    updateThemeButtonLabel();
}

function updateLanguageButtonStates(activeLang) {
    if (!allLangButtons || allLangButtons.length === 0) return;
    allLangButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === activeLang);
    });
}

if (languageSwitcher) {
    allLangButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.currentTarget.dataset.lang;
            if (lang && translations[lang]) setLanguage(lang);
        });
    });
}


// ==============================================
// === SCROLL ANİMASYONLARI ====================
// ==============================================
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
animatedElements.forEach(el => { if (el) observer.observe(el); });


// ==============================================
// === YUKARI ÇIK BUTONU + PROGRESS CIRCLE ===
// ==============================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScrollButtonVisibility() {
    if (!scrollTopButton) return;
    if (window.scrollY > 200) {
        scrollTopButton.classList.add('vis');
        // also setting pointer-events to auto if not handled via css or display
        if(scrollTopButton.style.display === 'none') {
            scrollTopButton.style.display = 'flex';
        }
    } else {
        scrollTopButton.classList.remove('vis');
    }
}

function updateScrollCircle() {
    const circle = document.querySelector('.progress-ring__circle');
    if (!circle) return;
    const circumference = 138.2; // 2 * π * 22
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;
    const progress = Math.min(window.scrollY / scrollableHeight, 1);
    circle.style.strokeDashoffset = circumference - progress * circumference;
}

window.addEventListener('scroll', () => {
    handleScrollButtonVisibility();
    updateScrollProgressBar();
    updateScrollCircle();
});


// ==============================================
// === SCROLL PROGRESS BAR =====================
// ==============================================
function updateScrollProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    bar.style.width = scrollPercent + '%';
}


// ==============================================
// === SERVICE WORKER DEVRE DIŞI ===============
// ==============================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(r => r.unregister());
    });
}


// ==============================================
// === TYPİNG EFFECT ===========================
// ==============================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;

    typingElement.innerHTML = '';
    const lines = ['Aydın', 'Aydemir'];
    let lineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 120;
    const lineDelay = 300;

    function typeCharacter() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            if (charIndex < currentLine.length) {
                let newContent = typingElement.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '');
                newContent += currentLine[charIndex];
                typingElement.innerHTML = newContent + '<span class="cursor"></span>';
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else if (lineIndex < lines.length - 1) {
                let newContent = typingElement.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '');
                typingElement.innerHTML = newContent + '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeCharacter, lineDelay);
            } else {
                // Typing complete - remove cursor, trigger glitch
                typingElement.innerHTML = typingElement.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '');
            }
        }
    }

    typeCharacter();
}


// ==============================================
// === PARTİKÜL ANİMASYONU =====================
// ==============================================
function createParticles() {
    if (!particleContainer) return;
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 10 : 30;
    const sizes = ['small', 'medium', 'large'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', sizes[Math.floor(Math.random() * sizes.length)]);
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.bottom = (Math.random() * 50 + 100) + '%';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}


// ==============================================
// === İLETİŞİM FORMU ==========================
// ==============================================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formMessage = document.getElementById('form-message');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const hCaptchaResponse = contactForm.querySelector('textarea[name=h-captcha-response]');
        if (!hCaptchaResponse || !hCaptchaResponse.value) {
            formMessage.textContent = translations[currentLanguage].contact_captcha_error;
            formMessage.className = 'form-message error';
            return;
        }

        const payload = {
            access_key: _ak(),
            name: contactForm.querySelector('#contact-name').value,
            email: contactForm.querySelector('#contact-email').value,
            subject: contactForm.querySelector('#contact-subject').value,
            message: contactForm.querySelector('#contact-message').value,
            'h-captcha-response': hCaptchaResponse.value
        };

        const originalHTML = submitBtn.innerHTML;
        const sendingText = currentLanguage === 'tr' ? 'Gönderiliyor' : currentLanguage === 'en' ? 'Sending' : 'Enviando';
        submitBtn.innerHTML = `<span class="btn-spinner"></span> ${sendingText}`;
        submitBtn.disabled = true;
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
            formMessage.textContent = error.message || translations[currentLanguage].contact_error_msg;
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
}


// ==============================================
// === TERMINAL EASTER EGG =====================
// ==============================================
function initTerminal() {
    const profilePic = document.querySelector('.profile-picture');
    const overlay = document.getElementById('terminal-overlay');
    const closeBtn = document.querySelector('.terminal-close-btn');
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');

    if (!profilePic || !overlay || !body || !input) return;

    const commands = {
        help: () => [
            { text: '┌─ KOMUTLAR ─────────────────────────────┐', type: 'prompt' },
            { text: '│  about      → Benim hakkımda          │', type: '' },
            { text: '│  projects   → Projelerim               │', type: '' },
            { text: '│  skills     → Yeteneklerim             │', type: '' },
            { text: '│  contact    → İletişim bilgilerim      │', type: '' },
            { text: '│  education  → Eğitim geçmişim          │', type: '' },
            { text: '│  social     → Sosyal medya linkleri    │', type: '' },
            { text: '│  matrix     → ??? 👾                   │', type: '' },
            { text: '│  clear      → Terminali temizle        │', type: '' },
            { text: '│  exit       → Terminali kapat          │', type: '' },
            { text: '└────────────────────────────────────────┘', type: 'prompt' },
        ],
        about: () => [
            { text: '┌─ HAKKIMDA ──────────────────────────────┐', type: 'prompt' },
            { text: '│  İsim   : Aydın Aydemir                 │', type: '' },
            { text: '│  Alias  : cyberQbit                     │', type: '' },
            { text: '│  Konum  : Ankara, Türkiye               │', type: '' },
            { text: '│  Durum  : BT Stajyeri @ İş Yazılım      │', type: '' },
            { text: '└─────────────────────────────────────────┘', type: 'prompt' },
        ],
        projects: () => [
            { text: '[PROJELER]', type: 'success' },
            { text: '01. MooWeather-Mobile   (Flutter, Dart)', type: '' },
            { text: '    → github.com/cyberQbit/MooWeather-Mobile', type: 'prompt' },
            { text: '02. MooWeather-BackEnd  (C#, .NET Core)', type: '' },
            { text: '    → github.com/cyberQbit/MooWeather-BackEnd', type: 'prompt' },
            { text: '03. SwiftHub            (Web, PowerShell)', type: '' },
            { text: '    → github.com/cyberQbit/SwiftHub', type: 'prompt' },
            { text: '04. Discord RP Bot      (Node.js, Discord.js)', type: '' },
            { text: '    → github.com/cyberQbit/gokturk-ordusu-bot', type: 'prompt' },
        ],
        skills: () => [
            { text: '[YETENEKLERİM]', type: 'info' },
            { text: 'HTML/CSS   ████████░░ 85%', type: '' },
            { text: 'JavaScript ████████░░ 70%', type: '' },
            { text: 'Python     ███████░░░ 65%', type: '' },
            { text: 'SQL        ████████░░ 80%', type: '' },
            { text: 'Siber Güv. ████████░░ 70%', type: '' },
            { text: 'Cloud      ███████░░░ 65%', type: '' },
        ],
        contact: () => [
            { text: '[İLETİŞİM]', type: 'success' },
            { text: '📧  aydinaydmr@proton.me', type: '' },
            { text: '💼  linkedin.com/in/aydinaydmr', type: 'prompt' },
            { text: '🐙  github.com/cyberQbit', type: 'prompt' },
        ],
        education: () => [
            { text: '[EĞİTİM]', type: 'info' },
            { text: '2024-...  Ankara Üniversitesi', type: '' },
            { text: '          Bilgisayar Programcılığı', type: 'prompt' },
            { text: '2024-...  Atatürk Üniversitesi', type: '' },
            { text: '          Web Tasarım ve Kodlama', type: 'prompt' },
            { text: '2020-2024 Pursaklar Anadolu Lisesi', type: '' },
        ],
        social: () => [
            { text: '[SOSYAL MEDYA]', type: 'info' },
            { text: 'LinkedIn → linkedin.com/in/aydinaydmr', type: 'prompt' },
            { text: 'GitHub   → github.com/cyberQbit', type: 'prompt' },
            { text: 'Sponsor  → github.com/sponsors/cyberQbit', type: 'prompt' },
        ],
        matrix: () => {
            setTimeout(startMatrixEffect, 300);
            return [{ text: 'Entering the Matrix... 🔴💊 (ESC veya tıkla ile çık)', type: 'success' }];
        },
        clear: () => {
            body.innerHTML = '';
            return [];
        },
        exit: () => {
            closeTerminal();
            return [];
        },
        quit: () => {
            closeTerminal();
            return [];
        }
    };

    function addLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line${type ? ' ' + type : ''}`;
        line.textContent = text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
    }

    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        addLine(`$ ${cmd}`, 'prompt');
        if (trimmed === '') return;
        const fn = commands[trimmed];
        if (fn) {
            const results = fn();
            if (Array.isArray(results)) results.forEach(r => addLine(r.text, r.type));
        } else {
            addLine(`Komut bulunamadı: '${trimmed}'. 'help' yazın.`, 'error');
        }
    }

    function openTerminal() {
        overlay.classList.add('active');
        body.innerHTML = '';
        addLine('cyberQbit Terminal v1.0.0', 'success');
        addLine('══════════════════════════════════════', 'dim');
        addLine("Merhaba! 'help' yazarak başlayabilirsin.", 'info');
        addLine('', '');
        setTimeout(() => input.focus(), 100);
    }

    function closeTerminal() {
        overlay.classList.remove('active');
    }

    profilePic.addEventListener('dblclick', openTerminal);
    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeTerminal(); });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            processCommand(input.value);
            input.value = '';
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeTerminal();
    });
}


// ==============================================
// === MATRIX RAIN EFFECT ======================
// ==============================================
function startMatrixEffect() {
    const existing = document.getElementById('matrix-canvas');
    if (existing) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;cursor:pointer;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;
        drops.forEach((y, i) => {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 33);

    function exitMatrix() {
        clearInterval(interval);
        canvas.remove();
    }

    canvas.addEventListener('click', exitMatrix);
    document.addEventListener('keydown', exitMatrix, { once: true });
    setTimeout(exitMatrix, 10000);
}


// ==============================================
// === SKILL RADAR CHART =======================
// ==============================================
function initRadarChart() {
    const svg = document.querySelector('.radar-svg');
    if (!svg) return;

    const skills = [
        { name: 'HTML/CSS',     value: 85 },
        { name: 'JS / TS',      value: 80 },
        { name: 'C# & .NET',    value: 70 },
        { name: 'Flutter/Dart', value: 65 },
        { name: 'Siber Güv.',   value: 75 },
        { name: 'Scripting',    value: 85 },
    ];

    const cx = 150, cy = 150, r = 100;
    const levels = 5;
    const n = skills.length;
    const angleStep = (2 * Math.PI) / n;

    const NS = 'http://www.w3.org/2000/svg';

    function getPoint(angle, radius) {
        return {
            x: cx + radius * Math.sin(angle),
            y: cy - radius * Math.cos(angle)
        };
    }

    function pointsStr(pts) {
        return pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    }

    // Grid polygons
    for (let l = levels; l >= 1; l--) {
        const pts = [];
        for (let i = 0; i < n; i++) pts.push(getPoint(i * angleStep, (r * l) / levels));
        const polygon = document.createElementNS(NS, 'polygon');
        polygon.setAttribute('points', pointsStr(pts));
        polygon.classList.add('radar-grid-polygon');
        svg.appendChild(polygon);
    }

    // Axes
    for (let i = 0; i < n; i++) {
        const p = getPoint(i * angleStep, r);
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', cx); line.setAttribute('y1', cy);
        line.setAttribute('x2', p.x.toFixed(2)); line.setAttribute('y2', p.y.toFixed(2));
        line.classList.add('radar-axis');
        svg.appendChild(line);
    }

    // Labels
    for (let i = 0; i < n; i++) {
        const p = getPoint(i * angleStep, r + 28);
        const text = document.createElementNS(NS, 'text');
        text.setAttribute('x', p.x.toFixed(2));
        text.setAttribute('y', p.y.toFixed(2));
        text.classList.add('radar-label');
        text.textContent = skills[i].name;
        svg.appendChild(text);
    }

    // Skill polygon (starts at center)
    const centerPts = skills.map((_, i) => getPoint(i * angleStep, 0));
    const polygon = document.createElementNS(NS, 'polygon');
    polygon.setAttribute('points', pointsStr(centerPts));
    polygon.classList.add('radar-polygon');
    svg.appendChild(polygon);

    // Animate with rAF easing
    function animateRadar() {
        const targetPts = skills.map((skill, i) => getPoint(i * angleStep, (r * skill.value) / 100));
        const startPts = centerPts.map(p => ({ x: p.x, y: p.y }));
        const duration = 1500;
        const startTime = performance.now();

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const e = easeOut(t);
            const currentPts = startPts.map((s, i) => ({
                x: s.x + (targetPts[i].x - s.x) * e,
                y: s.y + (targetPts[i].y - s.y) * e
            }));
            polygon.setAttribute('points', pointsStr(currentPts));
            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);

        // Animate legend bars
        document.querySelectorAll('.radar-legend-fill').forEach((fill, i) => {
            if (skills[i]) {
                setTimeout(() => { fill.style.width = skills[i].value + '%'; }, 200);
            }
        });
    }

    // Trigger animation when section is visible
    const radarSection = document.querySelector('.radar-section');
    if (!radarSection) return;

    const radarObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateRadar, 200);
                radarObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    radarObserver.observe(radarSection);
}


// ==============================================
// === SAYFA YÜKLEME ===========================
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    initLucide();               // Lucide ikonlarını render et
    applyInitialTheme();        // Temayı uygula
    applyInitialLanguage();     // Dili uygula
    handleScrollButtonVisibility();
    updateScrollCircle();
    createParticles();
    initTypingEffect();
    initializeContactForm();
    initTerminal();             // Terminal easter egg
    initRadarChart();           // Radar chart
});

// Sayfa yükleme yönetimi ve Minimum Preloader Süresi
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const minimumDisplayTime = 2500; // 2.5 saniye (İstediğin 2-3 saniye arası orta nokta)
    const startTime = performance.now();

    // Sayfa tamamen yüklendiğinde (load olayı tetiklendiğinde)
    // Ne kadar süre geçtiğini hesapla ve gerekirse bekle
    const hidePreloader = () => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Animasyon bittikten sonra DOM'dan kaldır
            setTimeout(() => {
                preloader.remove();
            }, 600); // style.css'deki transition süresiyle uyumlu
        }, remainingTime);
    };

    hidePreloader();
});


