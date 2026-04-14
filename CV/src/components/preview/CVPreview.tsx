import type { CVData } from '../../types/cv';

interface CVPreviewProps {
  data: CVData;
}

export function CVPreview({ data }: CVPreviewProps) {
  const { personalInfo, experience, education, skills, githubProjects } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto shadow-lg">
      {/* ATS-Optimized Single Column Layout */}
      <div className="p-8 md:p-12">
        {/* Header - Personal Info */}
        <header className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            {personalInfo.fullName || 'Ad Soyad'}
          </h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.github && (
              <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.website && (
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Profesyonel Özet
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              İş Deneyimi
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Devam ediyor' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{exp.company}</p>
                  
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Eğitim
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                      <p className="text-sm text-gray-700">
                        {edu.degree}{edu.field && `, ${edu.field}`}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Devam ediyor' : formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Projects */}
        {githubProjects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">
              Projeler
            </h2>
            <div className="space-y-4">
              {githubProjects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{project.repoName}</h3>
                    {project.stars > 0 && (
                      <span className="text-xs text-gray-500">★ {project.stars}</span>
                    )}
                  </div>
                  
                  {project.language && (
                    <p className="text-xs text-gray-500 mb-1">{project.language}</p>
                  )}
                  
                  {project.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-1">{project.description}</p>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Repo:</span> {project.repoUrl.replace(/^https?:\/\//, '')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              Yetenekler
            </h2>
            <p className="text-sm text-gray-700">
              {skills.map((skill) => skill.name).join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
