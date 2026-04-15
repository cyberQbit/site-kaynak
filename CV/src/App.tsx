import { useState, useEffect, useRef } from 'react';
import './cv-styles.css';
import { useCV } from './hooks/useCV';
import { PersonalInfoForm }  from './components/forms/PersonalInfoForm';
import { ExperienceForm }    from './components/forms/ExperienceForm';
import { EducationForm }     from './components/forms/EducationForm';
import { SkillsForm }        from './components/forms/SkillsForm';
import { CertificatesForm, LanguagesForm } from './components/forms/CertificatesAndLanguages';
import { GitHubProjectsForm } from './components/forms/GitHubProjectsForm';
import { CVPreviewPanel }    from './components/preview/CVPreviewPanel';
import { ATSScorePanel }     from './components/ATSScorePanel';
import { TemplateSelector }  from './components/forms/TemplateSelector';
import { ThemeProvider, useTheme }     from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import {
  FileText, Sun, Moon, Home, Eye, RotateCcw,
  User, Briefcase, GraduationCap, Wrench, Award, Github, BarChart2,
} from 'lucide-react';

const SECTIONS = [
  { id: 'personal',   label: 'Kişisel',    icon: User },
  { id: 'experience', label: 'Deneyim',    icon: Briefcase },
  { id: 'education',  label: 'Eğitim',     icon: GraduationCap },
  { id: 'skills',     label: 'Yetenekler', icon: Wrench },
  { id: 'extras',     label: 'Ekstralar',  icon: Award },
  { id: 'github',     label: 'GitHub',     icon: Github },
  { id: 'ats',        label: 'ATS',        icon: BarChart2 },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

/* ── helper: useMediaQuery ──────────────────────────────────── */
function useMediaQuery(q: string) {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(q).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(q);
    const cb = (e: MediaQueryListEvent) => setM(e.matches);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  }, [q]);
  return m;
}

/* ── App inner ──────────────────────────────────────────────── */
function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isDark = theme === 'dark';

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeSection, setActiveSection]       = useState<SectionId>('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  /* scroll active tab into view */
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tabsRef.current?.querySelector('.cv-tab.active') as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  /* lock body scroll when overlay open */
  useEffect(() => {
    document.body.style.overflow = showMobilePreview ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMobilePreview]);

  const {
    cvData,
    updatePersonalInfo,
    addExperience, updateExperience, removeExperience,
    addEducation,  updateEducation,  removeEducation,
    addSkill,      removeSkill,
    addCertificate, removeCertificate,
    addLanguage,   removeLanguage,
    addGitHubProject, removeGitHubProject, updateGitHubProject,
    setTemplate,
    resetCV,
  } = useCV();

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TemplateSelector current={cvData.template} onChange={setTemplate} />
            <PersonalInfoForm data={cvData.personalInfo} onChange={updatePersonalInfo} />
          </div>
        );
      case 'experience':
        return <ExperienceForm experience={cvData.experience} onAdd={addExperience} onUpdate={updateExperience} onRemove={removeExperience} />;
      case 'education':
        return <EducationForm education={cvData.education} onAdd={addEducation} onUpdate={updateEducation} onRemove={removeEducation} />;
      case 'skills':
        return <SkillsForm skills={cvData.skills} onAdd={addSkill} onRemove={removeSkill} />;
      case 'extras':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <CertificatesForm certificates={cvData.certificates} onAdd={addCertificate} onRemove={removeCertificate} />
            <div style={{ borderTop: '1px solid var(--panel-bd)', paddingTop: '24px' }}>
              <LanguagesForm languages={cvData.languages} onAdd={addLanguage} onRemove={removeLanguage} />
            </div>
          </div>
        );
      case 'github':
        return (
          <GitHubProjectsForm
            githubUsername={cvData.personalInfo.github}
            projects={cvData.githubProjects}
            onUsernameChange={u => updatePersonalInfo({ github: u })}
            onAddProject={addGitHubProject}
            onRemoveProject={removeGitHubProject}
            onUpdateProject={updateGitHubProject}
          />
        );
      case 'ats':
        return <ATSScorePanel data={cvData} />;
    }
  };

  return (
    <div className={`cv-app ${isDark ? 'theme-dark' : 'theme-light'}`}>

      {/* ── HEADER ──────────────────────────────────────── */}
      <header className="cv-header">
        <div className="cv-header-logo">
          <div className="cv-header-logo-icon">
            <FileText size={18} color="#06111F" strokeWidth={2.2} />
          </div>
          <div>
            <p className="cv-header-title">CV Oluşturucu</p>
            <p className="cv-header-subtitle">ATS Uyumlu Profesyonel CV</p>
          </div>
        </div>

        <div className="cv-header-spacer" />

        <div className="cv-header-actions">
          {/* Lang switcher — hidden on tiny screens, shown on 480+ */}
          <div className="lang-switcher" style={{ display: window.innerWidth < 400 ? 'none' : undefined }}>
            {(['tr','en','es'] as const).map(lang => (
              <button
                key={lang}
                className={`lang-btn ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button className="btn-icon" onClick={toggleTheme} title={isDark ? 'Aydınlık mod' : 'Karanlık mod'}
            style={{ color: 'var(--accent)', borderColor: 'var(--accent-ring)', background: 'var(--accent-glow)' }}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Reset */}
          <button className="btn-icon" title="Sıfırla"
            onClick={() => { if (confirm('CV verilerini sıfırlamak istiyor musunuz?')) resetCV(); }}>
            <RotateCcw size={14} />
          </button>

          {/* Home */}
          <a href="/" className="btn-icon" title="Ana Sayfa">
            <Home size={14} />
          </a>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────── */}
      <main className="cv-main">

        {/* Left panel: form */}
        <div className="cv-panel cv-panel-left ani">
          {/* Section tabs */}
          <div className="cv-tabs" ref={tabsRef}>
            {SECTIONS.map(sec => {
              const Icon = sec.icon;
              const active = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  className={`cv-tab ${active ? 'active' : ''}`}
                  onClick={() => setActiveSection(sec.id)}
                >
                  <Icon size={14} />
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div key={activeSection} className="cv-section-content ani">
            {renderSection()}
          </div>
        </div>

        {/* Right panel: preview — only rendered on desktop */}
        {isDesktop && (
          <div className="cv-panel ani" style={{ overflow: 'hidden' }}>
            <CVPreviewPanel data={cvData} />
          </div>
        )}
      </main>

      {/* ── MOBILE FAB ──────────────────────────────────── */}
      {!isDesktop && (
        <button className="fab-preview" onClick={() => setShowMobilePreview(true)}>
          <Eye size={16} />
          CV Önizle
        </button>
      )}

      {/* ── MOBILE PREVIEW OVERLAY ──────────────────────── */}
      {showMobilePreview && (
        <div className="preview-overlay">
          <div className="preview-overlay-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="sec-icon"><Eye size={13} /></div>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>CV Önizleme</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Direct download from overlay too */}
              <CVPreviewPanel
                data={cvData}
                headerOnly
                onMobileClose={() => setShowMobilePreview(false)}
              />
            </div>
          </div>
          <div className="preview-overlay-body">
            <CVPreviewPanel data={cvData} bodyOnly />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
