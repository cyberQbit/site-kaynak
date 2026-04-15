import { useState, useCallback, useEffect } from 'react';
import type { CVData, PersonalInfo, Experience, Education, Skill, GitHubProject, Certificate, Language, CVTemplate } from '../types/cv';
import { defaultCVData } from '../types/cv';

const STORAGE_KEY = 'cv_data_v3';

function loadFromStorage(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCVData;
    const parsed = JSON.parse(raw);
    return {
      ...defaultCVData,
      ...parsed,
      personalInfo: { ...defaultCVData.personalInfo, ...parsed.personalInfo },
    };
  } catch {
    return defaultCVData;
  }
}

export function useCV() {
  const [cvData, setCVData] = useState<CVData>(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch { /* quota exceeded — ignore */ }
  }, [cvData]);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setCVData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  }, []);

  // Experience
  const addExperience = useCallback((exp: Omit<Experience, 'id'>) => {
    setCVData(prev => ({ ...prev, experience: [...prev.experience, { ...exp, id: crypto.randomUUID() }] }));
  }, []);
  const updateExperience = useCallback((id: string, exp: Partial<Experience>) => {
    setCVData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, ...exp } : e) }));
  }, []);
  const removeExperience = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  }, []);
  const reorderExperience = useCallback((from: number, to: number) => {
    setCVData(prev => {
      const arr = [...prev.experience];
      arr.splice(to, 0, arr.splice(from, 1)[0]);
      return { ...prev, experience: arr };
    });
  }, []);

  // Education
  const addEducation = useCallback((edu: Omit<Education, 'id'>) => {
    setCVData(prev => ({ ...prev, education: [...prev.education, { ...edu, id: crypto.randomUUID() }] }));
  }, []);
  const updateEducation = useCallback((id: string, edu: Partial<Education>) => {
    setCVData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, ...edu } : e) }));
  }, []);
  const removeEducation = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  }, []);

  // Skills
  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    setCVData(prev => ({ ...prev, skills: [...prev.skills, { ...skill, id: crypto.randomUUID() }] }));
  }, []);
  const removeSkill = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  }, []);

  // Certificates
  const addCertificate = useCallback((cert: Omit<Certificate, 'id'>) => {
    setCVData(prev => ({ ...prev, certificates: [...prev.certificates, { ...cert, id: crypto.randomUUID() }] }));
  }, []);
  const updateCertificate = useCallback((id: string, cert: Partial<Certificate>) => {
    setCVData(prev => ({ ...prev, certificates: prev.certificates.map(c => c.id === id ? { ...c, ...cert } : c) }));
  }, []);
  const removeCertificate = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, certificates: prev.certificates.filter(c => c.id !== id) }));
  }, []);

  // Languages
  const addLanguage = useCallback((lang: Omit<Language, 'id'>) => {
    setCVData(prev => ({ ...prev, languages: [...prev.languages, { ...lang, id: crypto.randomUUID() }] }));
  }, []);
  const removeLanguage = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));
  }, []);

  // GitHub Projects
  const addGitHubProject = useCallback((project: Omit<GitHubProject, 'id'>) => {
    setCVData(prev => ({ ...prev, githubProjects: [...prev.githubProjects, { ...project, id: crypto.randomUUID() }] }));
  }, []);
  const updateGitHubProject = useCallback((id: string, project: Partial<GitHubProject>) => {
    setCVData(prev => ({ ...prev, githubProjects: prev.githubProjects.map(p => p.id === id ? { ...p, ...project } : p) }));
  }, []);
  const removeGitHubProject = useCallback((id: string) => {
    setCVData(prev => ({ ...prev, githubProjects: prev.githubProjects.filter(p => p.id !== id) }));
  }, []);

  const setTemplate = useCallback((template: CVTemplate) => {
    setCVData(prev => ({ ...prev, template }));
  }, []);

  const resetCV = useCallback(() => {
    setCVData(defaultCVData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setCVDataFromLinkedIn = useCallback((data: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...data }));
  }, []);

  return {
    cvData,
    updatePersonalInfo,
    addExperience, updateExperience, removeExperience, reorderExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, removeSkill,
    addCertificate, updateCertificate, removeCertificate,
    addLanguage, removeLanguage,
    addGitHubProject, updateGitHubProject, removeGitHubProject,
    setTemplate,
    resetCV,
    setCVDataFromLinkedIn,
  };
}
