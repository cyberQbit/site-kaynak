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
import { FileText, Sun, Moon, Home, Eye, RotateCcw, User, Briefcase, GraduationCap, Wrench, Award, Github, BarChart2 } from 'lucide-react';

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

const ACCENT      = '#38BDF8';
const ACCENT_D    = '#0EA5E9';
const ACCENT_GLOW = 'rgba(56,189,248,0.16)';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isDark = theme === 'dark';

  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const { cvData, updatePersonalInfo, addExperience, updateExperience, removeExperience, addEducation, updateEducation, removeEducation, addSkill, removeSkill, addCertificate, removeCertificate, addLanguage, removeLanguage, addGitHubProject, removeGitHubProject, updateGitHubProject, setTemplate, resetCV } = useCV();

  const tp = isDark ? '#F1F5F9' : '#0F172A';
  const tm = isDark ? '#94A3B8' : '#64748B';
  const pb = isDark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.94)';
  const pbd = isDark ? 'rgba(56,189,248,0.09)' : 'rgba(14,165,233,0.15)';

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':   return <div className="space-y-6"><TemplateSelector current={cvData.template} onChange={setTemplate} /><PersonalInfoForm data={cvData.personalInfo} onChange={updatePersonalInfo} /></div>;
      case 'experience': return <ExperienceForm experience={cvData.experience} onAdd={addExperience} onUpdate={updateExperience} onRemove={removeExperience} />;
      case 'education':  return <EducationForm education={cvData.education} onAdd={addEducation} onUpdate={updateEducation} onRemove={removeEducation} />;
      case 'skills':     return <SkillsForm skills={cvData.skills} onAdd={addSkill} onRemove={removeSkill} />;
      case 'extras':     return <div className="space-y-8"><CertificatesForm certificates={cvData.certificates} onAdd={addCertificate} onRemove={removeCertificate} /><div style={{ borderTop: `1px solid ${pbd}`, paddingTop: '1.5rem' }}><LanguagesForm languages={cvData.languages} onAdd={addLanguage} onRemove={removeLanguage} /></div></div>;
      case 'github':     return <GitHubProjectsForm githubUsername={cvData.personalInfo.github} projects={cvData.githubProjects} onUsernameChange={u => updatePersonalInfo({ github: u })} onAddProject={addGitHubProject} onRemoveProject={removeGitHubProject} onUpdateProject={updateGitHubProject} />;
      case 'ats':        return <ATSScorePanel data={cvData} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100%; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: ${isDark
            ? `radial-gradient(ellipse 80% 60% at 15% 0%, rgba(56,189,248,0.055) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 100%, rgba(99,102,241,0.045) 0%, transparent 55%), #080E1A`
            : `radial-gradient(ellipse 80% 60% at 15% 0%, rgba(14,165,233,0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 100%, rgba(99,102,241,0.05) 0%, transparent 55%), #EEF2F8`
          };
          color: ${tp};
          transition: background 0.3s, color 0.3s;
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? 'rgba(56,189,248,0.22)' : 'rgba(14,165,233,0.28)'}; border-radius: 10px; }

        /* Glass */
        .cvglass {
          background: ${pb};
          border: 1px solid ${pbd};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        /* Inputs */
        .cvi {
          width: 100%; padding: 9px 12px 9px 36px;
          background: ${isDark ? 'rgba(15,23,42,0.7)' : '#FFFFFF'};
          border: 1px solid ${isDark ? 'rgba(56,189,248,0.13)' : '#CBD5E1'};
          border-radius: 10px; color: ${tp};
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          outline: none; transition: border-color 0.18s, box-shadow 0.18s;
        }
        .cvi.no-icon { padding-left: 12px; }
        .cvi::placeholder { color: ${isDark ? '#334155' : '#94A3B8'}; }
        .cvi:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 3px ${ACCENT_GLOW}; }
        .cvi:disabled { opacity: 0.38; cursor: not-allowed; }
        textarea.cvi { padding-left: 12px; resize: vertical; }
        select.cvi { padding-left: 12px; cursor: pointer; }

        /* Labels */
        .cvl { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: ${tm}; margin-bottom: 5px; }

        /* Buttons */
        .btn-p {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_D} 100%);
          color: #06111F; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          border: none; border-radius: 10px; cursor: pointer;
          box-shadow: 0 2px 14px rgba(56,189,248,0.28);
          transition: transform 0.14s, box-shadow 0.14s, opacity 0.14s;
        }
        .btn-p:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(56,189,248,0.40); }
        .btn-p:active { transform: translateY(0); }
        .btn-p:disabled { opacity: 0.38; transform: none; box-shadow: none; cursor: not-allowed; }

        .btn-g {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 13px;
          background: ${ACCENT_GLOW};
          color: ${ACCENT}; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
          border: 1px solid ${isDark ? 'rgba(56,189,248,0.22)' : 'rgba(14,165,233,0.30)'};
          border-radius: 9px; cursor: pointer;
          transition: background 0.14s, border-color 0.14s;
        }
        .btn-g:hover { background: rgba(56,189,248,0.24); border-color: ${ACCENT}; }

        .btn-d {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px;
          background: transparent; border: none; cursor: pointer; border-radius: 7px;
          color: ${isDark ? '#F87171' : '#EF4444'};
          transition: background 0.14s;
        }
        .btn-d:hover { background: ${isDark ? 'rgba(248,113,113,0.12)' : 'rgba(239,68,68,0.08)'}; }

        .btn-edit {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px;
          background: transparent; border: none; cursor: pointer; border-radius: 7px;
          color: ${tm};
          transition: background 0.14s, color 0.14s;
        }
        .btn-edit:hover { background: ${isDark ? 'rgba(148,163,184,0.1)' : 'rgba(100,116,139,0.08)'}; color: ${tp}; }

        /* Card */
        .cvc {
          background: ${isDark ? 'rgba(15,23,42,0.55)' : 'rgba(248,250,252,0.85)'};
          border: 1px solid ${isDark ? 'rgba(56,189,248,0.08)' : '#E2E8F0'};
          border-radius: 12px; padding: 14px;
          transition: border-color 0.18s;
        }
        .cvc:hover { border-color: ${isDark ? 'rgba(56,189,248,0.16)' : '#CBD5E1'}; }

        /* Section icon */
        .sec-icon {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.12));
          border: 1px solid ${isDark ? 'rgba(56,189,248,0.2)' : 'rgba(14,165,233,0.22)'};
          color: ${ACCENT};
        }

        /* Badge count */
        .cnt { display: inline-flex; align-items: center; padding: 1px 7px; background: ${isDark ? 'rgba(56,189,248,0.1)' : 'rgba(14,165,233,0.08)'}; color: ${ACCENT}; font-size: 11px; font-weight: 700; border-radius: 20px; border: 1px solid ${isDark ? 'rgba(56,189,248,0.2)' : 'rgba(14,165,233,0.25)'}; }

        /* Skill tag */
        .stag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 11px; background: ${isDark ? 'rgba(15,23,42,0.7)' : '#F1F5F9'}; border: 1px solid ${isDark ? 'rgba(56,189,248,0.12)' : '#CBD5E1'}; border-radius: 20px; font-size: 12.5px; font-weight: 500; color: ${tp}; transition: border-color 0.14s, background 0.14s; cursor: default; }
        .stag:hover { border-color: ${ACCENT}; background: ${ACCENT_GLOW}; }

        /* Suggestion chip */
        .sug { padding: 3px 10px; background: transparent; border: 1px solid ${isDark ? 'rgba(56,189,248,0.15)' : '#CBD5E1'}; border-radius: 20px; font-size: 12px; font-weight: 500; color: ${tm}; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: border-color 0.14s, color 0.14s; }
        .sug:hover { border-color: ${ACCENT}; color: ${ACCENT}; }

        /* Tip box */
        .tip { display: flex; gap: 8px; padding: 10px 12px; background: ${isDark ? 'rgba(56,189,248,0.06)' : 'rgba(14,165,233,0.05)'}; border: 1px solid ${isDark ? 'rgba(56,189,248,0.12)' : 'rgba(14,165,233,0.18)'}; border-radius: 10px; font-size: 12px; color: ${tm}; }

        /* Form add zone */
        .add-zone { background: ${isDark ? 'rgba(15,23,42,0.6)' : 'rgba(248,250,252,0.9)'}; border: 1px solid ${isDark ? 'rgba(56,189,248,0.12)' : '#E2E8F0'}; border-radius: 14px; padding: 16px; }

        /* Empty state */
        .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 36px 20px; border: 2px dashed ${isDark ? 'rgba(56,189,248,0.12)' : '#E2E8F0'}; border-radius: 14px; color: ${tm}; }

        /* Repo card */
        .repo-card { border: 1px solid ${isDark ? 'rgba(56,189,248,0.1)' : '#E2E8F0'}; border-radius: 12px; padding: 12px; cursor: pointer; transition: border-color 0.14s, background 0.14s; background: ${isDark ? 'rgba(15,23,42,0.5)' : '#FFFFFF'}; }
        .repo-card:hover { border-color: ${isDark ? 'rgba(56,189,248,0.22)' : '#94A3B8'}; }
        .repo-card.selected { border-color: ${ACCENT}; background: ${ACCENT_GLOW}; }

        /* Nav tab active glow */
        .nav-tab-active { color: ${ACCENT} !important; border-bottom: 2px solid ${ACCENT} !important; }

        /* Animate in */
        @keyframes fsu { from { opacity:0; transform: translateY(5px); } to { opacity:1; transform: translateY(0); } }
        .ani { animation: fsu 0.2s ease forwards; }

        @media (max-width: 1024px) {
          .dp { display: none !important; }
          .mg { grid-template-columns: 1fr !important; height: auto !important; min-height: calc(100vh - 70px) !important; }
          #mpb { display: inline-flex !important; }
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: isDark ? 'rgba(8,14,26,0.92)' : 'rgba(248,251,255,0.95)',
        borderBottom: `1px solid ${pbd}`,
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT} 0%, #818CF8 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 16px rgba(56,189,248,0.32)`,
            }}>
              <FileText size={19} color="#06111F" strokeWidth={2.2} />
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16.5px', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.01em' }}>CV Oluşturucu</p>
              <p style={{ fontSize: '11px', color: tm, lineHeight: 1, marginTop: '3px' }}>ATS Uyumlu Profesyonel CV</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '2px', background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(241,245,249,0.9)', borderRadius: '10px', padding: '3px', border: `1px solid ${pbd}` }}>
              {(['tr','en','es'] as const).map(lang => (
                <button key={lang} onClick={() => setLanguage(lang)} style={{
                  padding: '4px 10px', borderRadius: '7px', fontSize: '11px', fontWeight: 700,
                  border: 'none', cursor: 'pointer', letterSpacing: '0.05em',
                  background: language === lang ? (isDark ? 'rgba(56,189,248,0.14)' : '#fff') : 'transparent',
                  color: language === lang ? ACCENT : tm,
                  boxShadow: language === lang ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                  transition: 'all 0.14s', fontFamily: 'DM Sans, sans-serif',
                }}>
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button id="mpb" onClick={() => setShowMobilePreview(true)} className="btn-g" style={{ display: 'none' }}>
              <Eye size={14} /> Önizle
            </button>

            <button title="Sıfırla" onClick={() => { if (confirm('CV verilerini sıfırlamak istiyor musunuz?')) resetCV(); }} style={{ width: '36px', height: '36px', borderRadius: '9px', border: 'none', cursor: 'pointer', background: 'transparent', color: tm, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.14s' }}
              onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = isDark ? 'rgba(248,113,113,0.1)' : 'rgba(239,68,68,0.07)'; b.style.color = '#F87171'; }}
              onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = tm; }}
            ><RotateCcw size={15} /></button>

            <button onClick={toggleTheme} style={{ width: '36px', height: '36px', borderRadius: '9px', border: `1px solid ${pbd}`, cursor: 'pointer', background: isDark ? 'rgba(56,189,248,0.08)' : 'rgba(14,165,233,0.06)', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.14s' }}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href="/" style={{ width: '36px', height: '36px', borderRadius: '9px', color: tm, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.14s' }}
              onMouseOver={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(100,116,139,0.08)'; a.style.color = tp; }}
              onMouseOut={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = 'transparent'; a.style.color = tm; }}
            ><Home size={16} /></a>
          </div>
        </div>
      </header>

      {/* ── MAIN ──────────────────────────────────────── */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 24px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100vh - 84px)' }} className="mg">

        {/* LEFT */}
        <div className="cvglass ani" style={{ borderRadius: '18px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <nav style={{
            display: 'flex', overflowX: 'auto', flexShrink: 0, gap: '0',
            borderBottom: `1px solid ${pbd}`,
            background: isDark ? 'rgba(8,14,26,0.55)' : 'rgba(241,245,249,0.7)',
          }}>
            {SECTIONS.map(sec => {
              const Icon = sec.icon;
              const active = activeSection === sec.id;
              return (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                  padding: '11px 10px 9px',
                  minWidth: '68px', background: 'transparent',
                  border: 'none', borderBottom: active ? `2px solid ${ACCENT}` : '2px solid transparent',
                  cursor: 'pointer', color: active ? ACCENT : tm,
                  fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: active ? 600 : 500,
                  transition: 'color 0.14s, border-color 0.14s',
                  position: 'relative',
                }}>
                  <Icon size={15} />
                  {sec.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)',
                      width: '18px', height: '2px', background: ACCENT, borderRadius: '2px',
                      boxShadow: `0 0 8px ${ACCENT}`,
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Section content */}
          <div key={activeSection} className="ani" style={{ flex: 1, overflowY: 'auto', padding: '20px 18px 28px' }}>
            {renderSection()}
          </div>
        </div>

        {/* RIGHT */}
        <div className="cvglass dp ani" style={{ borderRadius: '18px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <CVPreviewPanel data={cvData} />
        </div>
      </main>

      {/* MOBILE OVERLAY */}
      {showMobilePreview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: isDark ? '#080E1A' : '#EEF2F8', display: 'flex', flexDirection: 'column' }}>
          <CVPreviewPanel data={cvData} onMobileClose={() => setShowMobilePreview(false)} />
        </div>
      )}
    </>
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

