import { useState } from 'react';
import { Code2, Trash2, Star, GitFork, ExternalLink, Check, RefreshCw } from 'lucide-react';
import type { GitHubProject } from '../../types/cv';

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

  const fetchRepos = async () => {
    if (!username.trim()) {
      setError('Lütfen GitHub kullanıcı adı girin');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // GitHub API'den repoları çek
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Kullanıcı bulunamadı');
        }
        throw new Error('GitHub API hatası');
      }

      const data = await response.json();
      setRepos(data);
      onUsernameChange(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRepoSelection = (repo: GitHubRepo) => {
    const newSelected = new Set(selectedRepos);
    
    if (newSelected.has(repo.name)) {
      newSelected.delete(repo.name);
      // Projeyi kaldır
      const projectToRemove = projects.find(p => p.repoName === repo.name);
      if (projectToRemove) {
        onRemoveProject(projectToRemove.id);
      }
    } else {
      newSelected.add(repo.name);
      // Proje ekle
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

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-900 rounded-lg">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">GitHub Projeleri</h3>
          <p className="text-sm text-gray-600">GitHub repolarınızı CV'nize ekleyin</p>
        </div>
      </div>

      {/* GitHub Username Input */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className={labelClasses}>GitHub Kullanıcı Adı</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Code2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ornek: torvalds"
              className={`${inputClasses} pl-10`}
            />
          </div>
          <button
            onClick={fetchRepos}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Code2 className="w-4 h-4" />
                Repoları Getir
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>

      {/* Repo List */}
      {repos.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Repoları Seçin</h4>
          <p className="text-sm text-gray-600">
            CV'nize eklemek istediğiniz repoları seçin. Seçtiğiniz repoların açıklamalarını düzenleyebilirsiniz.
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
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleRepoSelection(repo)}
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">{repo.name}</span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
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
                          <label className="text-sm font-medium text-gray-700">Proje Açıklaması</label>
                          <textarea
                            value={selectedProject.description}
                            onChange={(e) => handleDescriptionChange(selectedProject.id, e.target.value)}
                            placeholder="Proje açıklaması..."
                            rows={3}
                            className={`${inputClasses} resize-none text-sm`}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {selectedProject.useOriginalDescription
                                ? 'Orijinal açıklama kullanılıyor'
                                : 'Özel açıklama kullanılıyor'}
                            </span>
                            <button
                              onClick={() => handleResetDescription(selectedProject.id, repo.description || '')}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Orijinale Sıfırla
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

      {/* Selected Projects Summary */}
      {projects.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">CV'ye Eklenecek Projeler ({projects.length})</h4>
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center justify-between text-sm">
                <span className="text-blue-800">{project.repoName}</span>
                <button
                  onClick={() => {
                    onRemoveProject(project.id);
                    const newSelected = new Set(selectedRepos);
                    newSelected.delete(project.repoName);
                    setSelectedRepos(newSelected);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {repos.length === 0 && !isLoading && !error && (
        <div className="text-center py-8 text-gray-500">
          <Code2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">GitHub kullanıcı adı girerek repolarınızı görüntüleyin</p>
        </div>
      )}
    </div>
  );
}
