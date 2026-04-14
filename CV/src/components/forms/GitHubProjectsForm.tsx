import { useState } from 'react';
import { Code2, Trash2, Star, GitFork, ExternalLink, Check, RefreshCw } from 'lucide-react';
import type { GitHubProject } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';

interface GitHubProjectsFormProps {
  githubUsername: string;
  projects: GitHubProject[];
  onUsernameChange: (username: string) => void;
  onAddProject: (project: Omit<GitHubProject, 'id'>) => void;
  onRemoveProject: (id: string) => void;
  onUpdateProject: (id: string, project: Partial<GitHubProject>) => void;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

export function GitHubProjectsForm({
  githubUsername,
  projects,
  onUsernameChange,
  onAddProject,
  onRemoveProject,
  onUpdateProject,
}: GitHubProjectsFormProps) {
  const [username, setUsername] = useState(githubUsername);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fetchRepos = async () => {
    if (!username.trim()) {
      setError('Lutfen GitHub kullanici adi girin');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Kullanici bulunamadi');
        }
        throw new Error('GitHub API hatasi');
      }

      const data = await response.json();
      setRepos(data);
      onUsernameChange(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata olustu');
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRepoSelection = (repo: GitHubRepo) => {
    const newSelected = new Set(selectedRepos);
    
    if (newSelected.has(repo.name)) {
      newSelected.delete(repo.name);
      const projectToRemove = projects.find(p => p.repoName === repo.name);
      if (projectToRemove) {
        onRemoveProject(projectToRemove.id);
      }
    } else {
      newSelected.add(repo.name);
      onAddProject({
        repoName: repo.name,
        repoUrl: repo.html_url,
        description: repo.description || '',
        useOriginalDescription: true,
        language: repo.language || '',
        stars: repo.stargazers_count,
      });
    }
    
    setSelectedRepos(newSelected);
  };

  const handleDescriptionChange = (projectId: string, newDescription: string) => {
    onUpdateProject(projectId, {
      description: newDescription,
      useOriginalDescription: false,
    });
  };

  const handleResetDescription = (projectId: string, originalDescription: string) => {
    onUpdateProject(projectId, {
      description: originalDescription,
      useOriginalDescription: true,
    });
  };

  const inputClasses = `w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition-all text-sm ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE] focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc] focus:border-[#0062cc]'
  }`;

  const labelClasses = `block text-sm font-medium mb-1.5 ${
    isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
  }`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-[#111827]' : 'bg-gray-900'}`}>
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>GitHub Projeleri</h3>
          <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>GitHub repolarinizi CV'nize ekleyin</p>
        </div>
      </div>

      <div className={`p-4 rounded-lg border ${
        isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'
      }`}>
        <label className={labelClasses}>GitHub Kullanici Adi</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Code2 className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
            }`} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ornegin: torvalds"
              className={`${inputClasses} pl-10`}
            />
          </div>
          <button
            onClick={fetchRepos}
            disabled={isLoading}
            className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 ${
              isDark
                ? 'bg-[#22D3EE] hover:bg-[#0BC5EA] text-[#111827]'
                : 'bg-[#0062cc] hover:bg-[#004c9e]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Yukleniyor...
              </>
            ) : (
              <>
                <Code2 className="w-4 h-4" />
                Repolari Getir
              </>
            )}
          </button>
        </div>

        {error && (
          <div className={`mt-3 p-3 text-sm rounded-lg border ${
            isDark
              ? 'bg-red-900/20 text-red-400 border-red-800'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {error}
          </div>
        )}
      </div>

      {repos.length > 0 && (
        <div className="space-y-3">
          <h4 className={`font-medium ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>Repolari Secin</h4>
          <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            CV'nize eklemek istediginiz repolari secin.
          </p>
          
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {repos.map((repo) => {
              const isSelected = selectedRepos.has(repo.name);
              const selectedProject = projects.find(p => p.repoName === repo.name);
              
              return (
                <div
                  key={repo.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected
                      ? isDark
                        ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                        : 'border-[#0062cc] bg-[#0062cc]/10'
                      : isDark
                        ? 'border-[#4B5563] hover:border-[#6B7280]'
                        : 'border-[#E2E8F0] hover:border-[#A0AEC0]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleRepoSelection(repo)}
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? isDark
                            ? 'bg-[#22D3EE] border-[#22D3EE] text-[#111827]'
                            : 'bg-[#0062cc] border-[#0062cc] text-white'
                          : isDark
                            ? 'border-[#4B5563] hover:border-[#6B7280]'
                            : 'border-[#E2E8F0] hover:border-[#A0AEC0]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>{repo.name}</span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={isDark ? 'text-[#9CA3AF] hover:text-[#F3F4F6]' : 'text-[#A0AEC0] hover:text-[#1A202C]'}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <div className={`flex items-center gap-3 mt-1 text-xs ${
                        isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
                      }`}>
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#22D3EE]' : 'bg-[#0062cc]'}`}></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      </div>

                      {isSelected && selectedProject && (
                        <div className="mt-3 space-y-2">
                          <label className={`text-sm font-medium ${
                            isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
                          }`}>Proje Aciklamasi</label>
                          <textarea
                            value={selectedProject.description}
                            onChange={(e) => handleDescriptionChange(selectedProject.id, e.target.value)}
                            placeholder="Proje aciklamasi..."
                            rows={3}
                            className={`${inputClasses} resize-none text-sm`}
                          />
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#6C757D]'}`}>
                              {selectedProject.useOriginalDescription
                                ? 'Orijinal aciklama kullaniliyor'
                                : 'Ozel aciklama kullaniliyor'}
                            </span>
                            <button
                              onClick={() => handleResetDescription(selectedProject.id, repo.description || '')}
                              className={`text-xs ${
                                isDark ? 'text-[#22D3EE] hover:text-[#0BC5EA]' : 'text-[#0062cc] hover:text-[#004c9e]'
                              }`}
                            >
                              Orijinale Sifirla
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className={`p-4 rounded-lg border ${
          isDark
            ? 'bg-[#22D3EE]/10 border-[#22D3EE]/30'
            : 'bg-[#0062cc]/10 border-[#0062cc]/30'
        }`}>
          <h4 className={`font-medium mb-2 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`}>
            CV'ye Eklenecek Projeler ({projects.length})
          </h4>
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center justify-between text-sm">
                <span className={isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}>{project.repoName}</span>
                <button
                  onClick={() => {
                    onRemoveProject(project.id);
                    const newSelected = new Set(selectedRepos);
                    newSelected.delete(project.repoName);
                    setSelectedRepos(newSelected);
                  }}
                  className={isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {repos.length === 0 && !isLoading && !error && (
        <div className={`text-center py-8 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
          <Code2 className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#374151]' : 'text-[#E2E8F0]'}`} />
          <p className="text-sm">GitHub kullanici adi girerek repolarinizi goruntuleyin</p>
        </div>
      )}
    </div>
  );
}
