import { useState } from 'react';
import { useCV } from './hooks/useCV';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { CertificatesForm, LanguagesForm } from './components/forms/CertificatesAndLanguages';
import { GitHubProjectsForm } from './components/forms/GitHubProjectsForm';
import { CVPreviewPanel } from './components/preview/CVPreviewPanel';
import { ATSScorePanel } from './components/ATSScorePanel';
import { TemplateSelector } from './components/forms/TemplateSelector';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import {
  FileText, Sun, Moon, Home, Eye, RotateCcw,
  User, Briefcase, GraduationCap, Wrench, Award, Github, BarChart2
} from 'lucide-react';

const SECTIONS = [
  { id: 'personal',  label: 'Kişisel',   icon: User },
  { id: 'experience',label: 'Deneyim',   icon: Briefcase },
  { id: 'education', label: 'Eğitim',    icon: GraduationCap },
  { id: 'skills',    label: 'Yetenekler',icon: Wrench },
  { id: 'extras',    label: 'Ekstralar', icon: Award },
  { id: 'github',    label: 'GitHub',    icon: Github },
  { id: 'ats',       label: 'ATS',       icon: BarChart2 },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isDark = theme === 'dark';

  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const {
    cvData,
    updatePersonalInfo,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, removeSkill,
    addCertificate, removeCertificate,
    addLanguage, removeLanguage,
    addGitHubProject, removeGitHubProject, updateGitHubProject,
    setTemplate,
    resetCV,
  } = useCV();

  const bg = isDark ? '#111827' : '#F5F7FA';
  const panelBg = isDark ? '#1F2937' : '#FFFFFF';
  const borderColor = isDark ? '#374151' : '#E2E8F0';
  const textPrimary = isDark ? '#F3F4F6' : '#1A202C';
  const textMuted = isDark ? '#9CA3AF' : '#6B7280';
  const accent = isDark ? '#22D3EE' : '#0062cc';

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-6">
            <TemplateSelector current={cvData.template} onChange={setTemplate} />
            <PersonalInfoForm data={cvData.personalInfo} onChange={updatePersonalInfo} />
          </div>
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={cvData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={cvData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm skills={cvData.skills} onAdd={addSkill} onRemove={removeSkill} />
        );
      case 'extras':
        return (
          <div className="space-y-6">
            <CertificatesForm
              certificates={cvData.certificates}
              onAdd={addCertificate}
              onRemove={removeCertificate}
            />
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '1.5rem' }}>
              <LanguagesForm
                languages={cvData.languages}
                onAdd={addLanguage}
                onRemove={removeLanguage}
              />
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
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: bg, color: textPrimary }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: panelBg, borderBottom: `1px solid ${borderColor}`,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ backgroundColor: accent, borderRadius: '8px', padding: '6px' }}>
                <FileText style={{ width: '18px', height: '18px', color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1 }}>CV Oluşturucu</p>
                <p style={{ fontSize: '11px', color: textMuted, lineHeight: 1, marginTop: '2px' }}>ATS Uyumlu Profesyonel CV</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Lang */}
              {(['tr','en','es'] as const).map(lang => (
                <button key={lang}
                  onClick={() => setLanguage(lang)}
                  style={{
                    padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer',
                    backgroundColor: language === lang ? (isDark ? '#22D3EE20' : '#0062cc15') : 'transparent',
                    color: language === lang ? accent : textMuted,
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}

              {/* Mobile preview button */}
              <button
                onClick={() => setShowMobilePreview(true)}
                className="lg:hidden"
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                  backgroundColor: isDark ? '#22D3EE20' : '#0062cc15',
                  color: accent, border: 'none', cursor: 'pointer',
                }}
              >
                <Eye style={{ width: '14px', height: '14px' }} />
                Önizle
              </button>

              {/* Reset */}
              <button
                onClick={() => { if (confirm('CV verilerini sıfırlamak istediğinizden emin misiniz?')) resetCV(); }}
                title="Sıfırla"
                style={{
                  padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: 'transparent', color: textMuted,
                }}
              >
                <RotateCcw style={{ width: '16px', height: '16px' }} />
              </button>

              {/* Theme */}
              <button onClick={toggleTheme}
                style={{
                  padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: 'transparent', color: accent,
                }}
              >
                {isDark ? <Sun style={{ width: '18px', height: '18px' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
              </button>

              <a href="/"
                style={{
                  padding: '6px', borderRadius: '8px', color: textMuted,
                  display: 'flex', alignItems: 'center',
                }}
              >
                <Home style={{ width: '16px', height: '16px' }} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ───────────────────────────────────────────────── */}
      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: 'calc(100vh - 6rem)' }}
          className="grid-cols-1-on-mobile">

          {/* ── LEFT PANEL ─────────────────────────────────── */}
          <div style={{
            borderRadius: '16px', border: `1px solid ${borderColor}`,
            backgroundColor: panelBg, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            {/* Section tabs */}
            <div style={{
              display: 'flex', overflowX: 'auto', borderBottom: `1px solid ${borderColor}`,
              padding: '0 4px', gap: '2px', flexShrink: 0,
            }}>
              {SECTIONS.map(sec => {
                const Icon = sec.icon;
                const active = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                      padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      backgroundColor: active ? (isDark ? '#22D3EE15' : '#0062cc10') : 'transparent',
                      color: active ? accent : textMuted,
                      borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
                      whiteSpace: 'nowrap', fontSize: '11px', fontWeight: active ? 600 : 400,
                      transition: 'all 0.15s',
                      minWidth: '56px',
                    }}
                  >
                    <Icon style={{ width: '15px', height: '15px' }} />
                    {sec.label}
                  </button>
                );
              })}
            </div>

            {/* Section content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
              {renderSection()}
            </div>
          </div>

          {/* ── RIGHT PANEL (desktop) ─────────────────────── */}
          <div style={{
            borderRadius: '16px', border: `1px solid ${borderColor}`,
            backgroundColor: panelBg, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
            className="hidden lg:flex"
          >
            <CVPreviewPanel data={cvData} />
          </div>
        </div>
      </main>

      {/* ── MOBILE PREVIEW OVERLAY ──────────────────────────── */}
      {showMobilePreview && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: panelBg, display: 'flex', flexDirection: 'column',
        }}>
          <CVPreviewPanel data={cvData} onMobileClose={() => setShowMobilePreview(false)} />
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .hidden.lg\\:flex { display: none !important; }
          main > div { grid-template-columns: 1fr !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
