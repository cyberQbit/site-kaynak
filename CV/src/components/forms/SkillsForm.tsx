import { useState } from 'react';
import { Wrench, Plus, X, Star } from 'lucide-react';
import type { Skill } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onRemove: (id: string) => void;
}

const CATEGORIES = ['Teknik', 'Programlama', 'Yazılım', 'Araçlar', 'Soft Skills', 'Diller', 'Genel'];
const ACCENT = '#38BDF8';

const SUGGESTIONS: Record<string, string[]> = {
  'Programlama': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin'],
  'Teknik': ['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Git', 'PostgreSQL', 'MongoDB', 'Redis', 'Linux'],
  'Yazılım': ['VS Code', 'Figma', 'Jira', 'GitHub', 'Postman', 'Notion'],
  'Soft Skills': ['Takım Çalışması', 'İletişim', 'Problem Çözme', 'Liderlik', 'Proje Yönetimi', 'Analitik Düşünme'],
};

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [name, setName]     = useState('');
  const [category, setCategory] = useState('Teknik');

  const tp = isDark ? '#F1F5F9' : '#0F172A';
  const tm = isDark ? '#94A3B8' : '#64748B';

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed || skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) return;
    onAdd({ name: trimmed, category });
    setName('');
  };

  const grouped: Record<string, Skill[]> = {};
  skills.forEach(s => {
    const cat = s.category || 'Genel';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <div className="sec-icon"><Wrench size={14} /></div>
        <span style={{ fontSize: '14px', fontWeight: 700, color: tp }}>{t('skills')}</span>
        {skills.length > 0 && (
          <span className="cnt">{skills.length}</span>
        )}
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder="React, Python, Docker..."
          className="cvi no-icon"
          style={{ flex: 1 }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="cvi no-icon" style={{ width: '130px' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd} disabled={!name.trim()} className="btn-p" style={{ padding: '9px 14px', flexShrink: 0 }}>
          <Plus size={15} />
        </button>
      </div>

      {/* Quick suggestions */}
      {SUGGESTIONS[category] && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {SUGGESTIONS[category]
            .filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase()))
            .slice(0, 7)
            .map(s => (
              <button key={s} onClick={() => onAdd({ name: s, category })} className="sug">
                + {s}
              </button>
            ))}
        </div>
      )}

      {/* Grouped skill chips */}
      {Object.keys(grouped).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(grouped).map(([cat, catSkills]) => (
            <div key={cat}>
              <p style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: tm, marginBottom: '7px' }}>{cat}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {catSkills.map(skill => (
                  <span key={skill.id} className="stag">
                    {skill.name}
                    <button
                      onClick={() => onRemove(skill.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', color: isDark ? '#475569' : '#94A3B8', transition: 'color 0.14s' }}
                      onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.color = '#F87171'}
                      onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#475569' : '#94A3B8'}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <Wrench size={28} style={{ opacity: 0.2 }} />
          <p style={{ fontSize: '13px' }}>Yetenek eklemek için yukarıya yazın</p>
        </div>
      )}

      {/* Tip */}
      <div className="tip" style={{ marginTop: '14px' }}>
        <Star size={13} style={{ flexShrink: 0, marginTop: '1px', color: ACCENT }} />
        <span>ATS: İş ilanındaki teknik terimleri birebir ekleyin — "React.js" yerine "React" gibi ilanın kullandığı formu tercih edin.</span>
      </div>
    </div>
  );
}
