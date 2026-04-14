import { useCV } from './hooks/useCV';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { GitHubProjectsForm } from './components/forms/GitHubProjectsForm';
import { LinkedInImport } from './components/forms/LinkedInImport';
import { CVPreviewPanel } from './components/preview/CVPreviewPanel';
import { Footer } from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FileText, Sun, Moon, Home, Globe } from 'lucide-react';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const {
    cvData,
    updatePersonalInfo,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addGitHubProject,
    removeGitHubProject,
    updateGitHubProject,
    setCVDataFromLinkedIn,
  } = useCV();

  const languages = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#111827] text-[#F3F4F6]' 
        : 'bg-[#FDFDFD] text-[#1A202C]'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#1F2937] border-[#4B5563]' 
          : 'bg-white border-[#E2E8F0]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#22D3EE]' : 'bg-[#0062cc]'
              }`}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
                }`}>
                  {t('app_title')}
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
                }`}>
                  {t('app_subtitle')}
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-4">
              {/* Home Link */}
              <a 
                href="https://aydinaydmr.com.tr" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'text-[#22D3EE] hover:bg-[#22D3EE]/10' 
                    : 'text-[#0062cc] hover:bg-[#0062cc]/10'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">{t('home')}</span>
              </a>

              {/* Language Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-lg ${
                theme === 'dark' ? 'bg-[#374151]' : 'bg-[#F1F3F5]'
              }`}>
                <Globe className={`w-4 h-4 mx-1 ${
                  theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
                }`} />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'tr' | 'en' | 'es')}
                    className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-200 ${
                      language === lang.code
                        ? theme === 'dark'
                          ? 'bg-[#22D3EE]/20 text-[#22D3EE]'
                          : 'bg-[#0062cc]/10 text-[#0062cc]'
                        : theme === 'dark'
                          ? 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                          : 'text-[#4A5568] hover:text-[#1A202C]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'text-[#22D3EE] hover:bg-[#374151]' 
                    : 'text-[#0062cc] hover:bg-[#F1F3F5]'
                }`}
                aria-label={theme === 'dark' ? t('light_mode') : t('dark_mode')}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Panel - Forms */}
          <div className={`rounded-xl shadow-sm border overflow-hidden flex flex-col transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-[#1F2937] border-[#4B5563]' 
              : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <LinkedInImport onImport={setCVDataFromLinkedIn} />
              
              <div className={`border-t pt-6 ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E2E8F0]'
              }`}>
                <PersonalInfoForm 
                  data={cvData.personalInfo} 
                  onChange={updatePersonalInfo} 
                />
              </div>
              
              <div className={`border-t pt-6 ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E2E8F0]'
              }`}>
                <ExperienceForm
                  experience={cvData.experience}
                  onAdd={addExperience}
                  onUpdate={() => {}}
                  onRemove={removeExperience}
                />
              </div>
              
              <div className={`border-t pt-6 ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E2E8F0]'
              }`}>
                <EducationForm
                  education={cvData.education}
                  onAdd={addEducation}
                  onUpdate={() => {}}
                  onRemove={removeEducation}
                />
              </div>

              <div className={`border-t pt-6 ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E2E8F0]'
              }`}>
                <GitHubProjectsForm
                  githubUsername={cvData.personalInfo.github}
                  projects={cvData.githubProjects}
                  onUsernameChange={(username) => updatePersonalInfo({ github: username })}
                  onAddProject={addGitHubProject}
                  onRemoveProject={removeGitHubProject}
                  onUpdateProject={updateGitHubProject}
                />
              </div>
              
              <div className={`border-t pt-6 ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E2E8F0]'
              }`}>
                <SkillsForm
                  skills={cvData.skills}
                  onAdd={addSkill}
                  onRemove={removeSkill}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className={`rounded-xl shadow-sm border overflow-hidden hidden lg:flex flex-col transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-[#1F2937] border-[#4B5563]' 
              : 'bg-white border-[#E2E8F0]'
          }`}>
            <CVPreviewPanel data={cvData} />
          </div>
        </div>
      </main>

      <Footer />
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
