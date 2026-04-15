import { useState } from 'react';
import { Code2, Star, GitFork, Check, RefreshCw, X } from 'lucide-react';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [username, setUsername] = useState(githubUsername || '');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(
    new Set(projects.map(p => p.repoName))
  );

  const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;

  const fetchRepos = async () => {
    const user = username.trim();
    if (!user) { setError('GitHub kullanıcı adı girin'); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error(res.status === 404 ? 'Kullanıcı bulunamadı' : 'GitHub API hatası');
      const data: GitHubRepo[] = await res.json();
      setRepos(data.filter(r => !r.name.startsWith('.')));
      onUsernameChange(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRepo = (repo: GitHubRepo) => {
    const next = new Set(selectedRepos);
    if (next.has(repo.name)) {
      next.delete(repo.name);
      const p = projects.find(p => p.repoName === repo.name);
      if (p) onRemoveProject(p.id);
    } else {
      next.add(repo.name);
      onAddProject({
        repoName: repo.name,
        repoUrl: repo.html_url,
        description: repo.description || '',
        useOriginalDescription: true,
        language: repo.language || '',
        stars: repo.stargazers_count,
      });
    }
    setSelectedRepos(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Code2 className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
        <h3 className={`font-semibold text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          GitHub Projeleri
          {projects.length > 0 && (
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'}`}>
              {projects.length} seçili
            </span>
          )}
        </h3>
      </div>

      {/* Fetch row */}
      <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'}`}>
        <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
          GitHub Kullanıcı Adı
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchRepos()}
            placeholder="örn: torvalds"
            className={inputClass}
          />
          <button
            onClick={fetchRepos}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
              isDark ? 'bg-[#22D3EE] text-[#111827] hover:bg-[#0BC5EA]' : 'bg-[#0062cc] text-white hover:bg-[#004c9e]'
            }`}
          >
            {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Code2 className="w-3.5 h-3.5" />}
            {isLoading ? 'Yükleniyor' : 'Getir'}
          </button>
        </div>
        {error && (
          <p className={`mt-2 text-xs p-2 rounded-lg ${isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'}`}>
            {error}
          </p>
        )}
      </div>

      {/* Repo list */}
      {repos.length > 0 && (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {repos.map(repo => {
            const isSelected = selectedRepos.has(repo.name);
            const selectedProject = projects.find(p => p.repoName === repo.name);
            return (
              <div
                key={repo.id}
                onClick={() => toggleRepo(repo)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? isDark ? 'border-[#22D3EE] bg-[#22D3EE]/10' : 'border-[#0062cc] bg-[#0062cc]/8'
                    : isDark ? 'border-[#4B5563] bg-[#374151] hover:border-[#6B7280]' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E0]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium text-sm truncate ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
                        {repo.name}
                      </p>
                      {repo.language && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                          isDark ? 'bg-[#1F2937] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'
                        }`}>{repo.language}</span>
                      )}
                    </div>
                    {repo.description && (
                      <p className={`text-xs mt-0.5 truncate ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
                        {repo.description}
                      </p>
                    )}
                    <div className={`flex items-center gap-3 mt-1 text-xs ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3" />{repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-0.5">
                          <GitFork className="w-3 h-3" />{repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? isDark ? 'bg-[#22D3EE] border-[#22D3EE]' : 'bg-[#0062cc] border-[#0062cc]'
                      : isDark ? 'border-[#4B5563]' : 'border-[#CBD5E0]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                {/* Custom description for selected */}
                {isSelected && selectedProject && (
                  <div className="mt-2 pt-2 border-t border-dashed" style={{ borderColor: isDark ? '#4B5563' : '#E2E8F0' }}
                    onClick={e => e.stopPropagation()}>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                      Özel açıklama (isteğe bağlı)
                    </label>
                    <textarea
                      value={selectedProject.description}
                      onChange={e => onUpdateProject(selectedProject.id, { description: e.target.value, useOriginalDescription: false })}
                      rows={2}
                      className={`w-full px-2 py-1.5 rounded-lg border text-xs outline-none resize-none ${
                        isDark
                          ? 'bg-[#1F2937] border-[#374151] text-[#F3F4F6] placeholder-[#6B7280]'
                          : 'bg-white border-[#E2E8F0] text-[#1A202C]'
                      }`}
                      placeholder="Projeyi açıklayın..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {repos.length === 0 && projects.length === 0 && (
        <div className={`text-center py-8 rounded-xl border-dashed border-2 ${
          isDark ? 'border-[#374151] text-[#6B7280]' : 'border-[#E2E8F0] text-[#9CA3AF]'
        }`}>
          <Code2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">GitHub kullanıcı adını girerek repolarınızı getirin</p>
        </div>
      )}

      {/* Selected summary when not fetched yet */}
      {repos.length === 0 && projects.length > 0 && (
        <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
          <p className={`text-xs font-medium mb-2 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`}>
            Eklenmiş projeler ({projects.length})
          </p>
          {projects.map(p => (
            <div key={p.id} className="flex items-center justify-between py-1">
              <span className={`text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>{p.repoName}</span>
              <button onClick={() => { onRemoveProject(p.id); selectedRepos.delete(p.repoName); }}
                className={`p-1 rounded ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
