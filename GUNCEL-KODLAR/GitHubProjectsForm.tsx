import { useState } from 'react';
import { Code2, Trash2, Star, GitFork, Check, RefreshCw, X } from 'lucide-react';
import type { GitHubProject } from '../../types/cv';

interface Props {
  githubUsername: string;
  projects: GitHubProject[];
  onUsernameChange: (u: string) => void;
  onAddProject: (p: Omit<GitHubProject,'id'>) => void;
  onRemoveProject: (id: string) => void;
  onUpdateProject: (id: string, p: Partial<GitHubProject>) => void;
}

interface Repo {
  id: number; name: string; description: string|null; html_url: string;
  language: string|null; stargazers_count: number; forks_count: number;
}

export function GitHubProjectsForm({ githubUsername, projects, onUsernameChange, onAddProject, onRemoveProject, onUpdateProject }: Props) {
  const [username, setUsername] = useState(githubUsername || '');
  const [repos, setRepos]       = useState<Repo[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string|null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set(projects.map(p => p.repoName)));

  const fetch_ = async () => {
    const u = username.trim();
    if (!u) { setError('GitHub kullanıcı adı girin'); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${u}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error(res.status === 404 ? 'Kullanıcı bulunamadı' : 'GitHub API hatası');
      const data: Repo[] = await res.json();
      setRepos(data.filter(r => !r.name.startsWith('.')));
      onUsernameChange(u);
    } catch (e) { setError(e instanceof Error ? e.message : 'Hata'); setRepos([]); }
    finally { setLoading(false); }
  };

  const toggle = (r: Repo) => {
    const next = new Set(selected);
    if (next.has(r.name)) {
      next.delete(r.name);
      const p = projects.find(p => p.repoName === r.name);
      if (p) onRemoveProject(p.id);
    } else {
      next.add(r.name);
      onAddProject({ repoName: r.name, repoUrl: r.html_url, description: r.description||'', useOriginalDescription: true, language: r.language||'', stars: r.stargazers_count });
    }
    setSelected(next);
  };

  return (
    <div>
      <div className="sec-head">
        <div className="sec-icon"><Code2 size={14} /></div>
        <span className="sec-title">GitHub Projeleri</span>
        {projects.length > 0 && <span className="sec-count">{projects.length} seçili</span>}
      </div>

      {/* Fetch */}
      <div className="add-zone" style={{ marginBottom: '14px' }}>
        <label className="cvl">GitHub Kullanıcı Adı</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input className="cvi no-icon" style={{ flex: 1, minWidth: 0 }}
            value={username} onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetch_()}
            placeholder="örn: torvalds" />
          <button className="btn-p" onClick={fetch_} disabled={loading} style={{ padding: '10px 14px', flexShrink: 0 }}>
            {loading ? <RefreshCw size={14} className="spin" /> : <Code2 size={14} />}
            {loading ? '' : 'Getir'}
          </button>
        </div>
        {error && (
          <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '8px', padding: '8px 10px', background: 'var(--danger-bg)', borderRadius: '8px' }}>{error}</p>
        )}
      </div>

      {/* Repo list */}
      {repos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', maxHeight: '380px', overflowY: 'auto', WebkitOverflowScrolling: 'touch' as any }}>
          {repos.map(r => {
            const isSel = selected.has(r.name);
            const proj  = projects.find(p => p.repoName === r.name);
            return (
              <div key={r.id} className={`repo-card ${isSel ? 'sel' : ''}`} onClick={() => toggle(r)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                      <p style={{ fontWeight: 600, fontSize: '13px' }}>{r.name}</p>
                      {r.language && (
                        <span style={{ fontSize: '11px', padding: '1px 7px', background: 'var(--card-bg)', border: '1px solid var(--card-bd)', borderRadius: '20px', color: 'var(--tm)' }}>
                          {r.language}
                        </span>
                      )}
                    </div>
                    {r.description && <p style={{ fontSize: '12px', color: 'var(--tm)', marginBottom: '4px' }}>{r.description}</p>}
                    <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px', color: 'var(--ts)' }}>
                      {r.stargazers_count > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={11} />{r.stargazers_count}</span>}
                      {r.forks_count > 0      && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><GitFork size={11} />{r.forks_count}</span>}
                    </div>
                  </div>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSel ? 'var(--accent)' : 'var(--input-bd)'}`, background: isSel ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .14s' }}>
                    {isSel && <Check size={11} color="#06111F" strokeWidth={3} />}
                  </div>
                </div>

                {/* Custom desc */}
                {isSel && proj && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--panel-bd)' }}
                    onClick={e => e.stopPropagation()}>
                    <label className="cvl">Özel açıklama</label>
                    <textarea className="cvi" style={{ paddingLeft: '12px', minHeight: '64px' }}
                      value={proj.description}
                      onChange={e => onUpdateProject(proj.id, { description: e.target.value, useOriginalDescription: false })}
                      placeholder="Projeyi açıklayın..." rows={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* No repos yet */}
      {repos.length === 0 && projects.length === 0 && (
        <div className="empty-state"><Code2 size={26} style={{ opacity: .2 }} /><p>GitHub kullanıcı adı girerek repolarınızı getirin</p></div>
      )}

      {/* Selected summary when repos not loaded */}
      {repos.length === 0 && projects.length > 0 && (
        <div className="cvc">
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>Eklenmiş projeler ({projects.length})</p>
          {projects.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: '4px' }}>
              <span style={{ fontSize: '13px' }}>{p.repoName}</span>
              <button className="btn-del" onClick={() => { onRemoveProject(p.id); setSelected(s => { const n=new Set(s); n.delete(p.repoName); return n; }); }}>
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
