import { useState, useCallback } from 'react';
import type { CVData, PersonalInfo, Experience, Education, Skill, GitHubProject } from '../types/cv';

export function useCV() {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    githubProjects: [],
  });

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const addExperience = useCallback((experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: crypto.randomUUID(),
    };
    setCVData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  }, []);

  const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const addEducation = useCallback((education: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...education,
      id: crypto.randomUUID(),
    };
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  }, []);

  const updateEducation = useCallback((id: string, education: Partial<Education>) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: crypto.randomUUID(),
    };
    setCVData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  }, []);

  const updateSkill = useCallback((id: string, skill: Partial<Skill>) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const addGitHubProject = useCallback((project: Omit<GitHubProject, 'id'>) => {
    const newProject: GitHubProject = {
      ...project,
      id: crypto.randomUUID(),
    };
    setCVData((prev) => ({
      ...prev,
      githubProjects: [...prev.githubProjects, newProject],
    }));
  }, []);

  const updateGitHubProject = useCallback((id: string, project: Partial<GitHubProject>) => {
    setCVData((prev) => ({
      ...prev,
      githubProjects: prev.githubProjects.map((p) =>
        p.id === id ? { ...p, ...project } : p
      ),
    }));
  }, []);

  const removeGitHubProject = useCallback((id: string) => {
    setCVData((prev) => ({
      ...prev,
      githubProjects: prev.githubProjects.filter((p) => p.id !== id),
    }));
  }, []);

  const setCVDataFromLinkedIn = useCallback((data: Partial<CVData>) => {
    setCVData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  return {
    cvData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addGitHubProject,
    updateGitHubProject,
    removeGitHubProject,
    setCVDataFromLinkedIn,
  };
}
