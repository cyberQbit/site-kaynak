import { useCV } from './hooks/useCV';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { GitHubProjectsForm } from './components/forms/GitHubProjectsForm';
import { LinkedInImport } from './components/forms/LinkedInImport';
import { CVPreviewPanel } from './components/preview/CVPreviewPanel';
import { FileText, ChevronRight } from 'lucide-react';

function App() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CV Oluşturucu</h1>
                <p className="text-xs text-gray-500">ATS Uyumlu Profesyonel CV</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 text-sm text-gray-500">
              <span>Ana Sayfa</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">CV Oluştur</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-7rem)]">
          {/* Left Panel - Forms */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <LinkedInImport onImport={setCVDataFromLinkedIn} />
              
              <div className="border-t border-gray-100 pt-6">
                <PersonalInfoForm 
                  data={cvData.personalInfo} 
                  onChange={updatePersonalInfo} 
                />
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <ExperienceForm
                  experience={cvData.experience}
                  onAdd={addExperience}
                  onUpdate={() => {}}
                  onRemove={removeExperience}
                />
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <EducationForm
                  education={cvData.education}
                  onAdd={addEducation}
                  onUpdate={() => {}}
                  onRemove={removeEducation}
                />
              </div>

              <div className="border-t border-gray-100 pt-6">
                <GitHubProjectsForm
                  githubUsername={cvData.personalInfo.github}
                  projects={cvData.githubProjects}
                  onUsernameChange={(username) => updatePersonalInfo({ github: username })}
                  onAddProject={addGitHubProject}
                  onRemoveProject={removeGitHubProject}
                  onUpdateProject={updateGitHubProject}
                />
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <SkillsForm
                  skills={cvData.skills}
                  onAdd={addSkill}
                  onRemove={removeSkill}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden lg:flex flex-col">
            <CVPreviewPanel data={cvData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
