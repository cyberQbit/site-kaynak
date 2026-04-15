import { useState } from 'react';
import { Wrench, Plus, X, Star } from 'lucide-react';
import type { Skill } from '../../types/cv';
import { useLanguage } from '../../context/LanguageContext';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill,'id'>) => void;
  onRemove: (id: string) => void;
}

const CATS = ['Teknik','Programlama','Yazılım','Araçlar','Soft Skills','Diller','Genel'];
const SUGG: Record<string, string[]> = {
  'Programlama': ['JavaScript','TypeScript','Python','Java','C#','Go','Rust','PHP','Swift','Kotlin'],
  'Teknik':      ['React','Node.js','Docker','Kubernetes','AWS','Git','PostgreSQL','MongoDB','Redis','Linux'],
  'Yazılım':     ['VS Code','Figma','Jira','GitHub','Postman','Notion'],
  'Soft Skills': ['Takım Çalışması','İletişim','Problem Çözme','Liderlik','Proje Yönetimi'],
};

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const { t } = useLanguage();
  const [name, setName]     = useState('');
  const [cat, setCat]       = useState('Teknik');

  const handleAdd = () => {
    const trim = name.trim();
    if (!trim || skills.some(s => s.name.toLowerCase() === trim.toLowerCase())) return;
    onAdd({ name: trim, category: cat });
    setName('');
  };

  const grouped: Record<string, Skill[]> = {};
  skills.forEach(s => {
    const c = s.category || 'Genel';
    if (!grouped[c]) grouped[c] = [];
    grouped[c].push(s);
  });

  return (
    <div>
      <div className="sec-head">
        <div className="sec-icon"><Wrench size={14} /></div>
        <span className="sec-title">{t('skills')}</span>
        {skills.length > 0 && <span className="sec-count">{skills.length}</span>}
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <input
          className="cvi no-icon"
          style={{ flex: '1 1 140px', minWidth: 0 }}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder="React, Python, Docker..."
        />
        <select className="cvi no-icon" style={{ flex: '0 0 auto', width: '120px' }}
          value={cat} onChange={e => setCat(e.target.value)}>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn-p" style={{ padding: '10px 14px' }} disabled={!name.trim()} onClick={handleAdd}>
          <Plus size={15} />
        </button>
      </div>

      {/* Suggestions */}
      {SUGG[cat] && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {SUGG[cat]
            .filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase()))
            .slice(0, 7)
            .map(s => (
              <button key={s} className="sug-pill" onClick={() => onAdd({ name: s, category: cat })}>
                + {s}
              </button>
            ))}
        </div>
      )}

      {/* Grouped chips */}
      {Object.keys(grouped).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {Object.entries(grouped).map(([c, cSkills]) => (
            <div key={c}>
              <p style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ts)', marginBottom: '7px' }}>{c}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cSkills.map(sk => (
                  <span key={sk.id} className="stag">
                    {sk.name}
                    <button
                      onClick={() => onRemove(sk.id)}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--ts)', transition: 'color .14s' }}
                      onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--danger)'}
                      onMouseOut={e  => (e.currentTarget as HTMLButtonElement).style.color = 'var(--ts)'}
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
        <div className="empty-state"><Wrench size={26} style={{ opacity: .2 }} /><p>Yetenek eklemek için yukarıya yazın</p></div>
      )}

      <div className="tip-box" style={{ marginTop: '16px' }}>
        <Star size={13} style={{ flexShrink: 0, marginTop: '1px', color: 'var(--accent)' }} />
        <span>ATS: İş ilanındaki teknik terimleri birebir ekleyin. "React.js" yerine ilanın kullandığı "React" gibi.</span>
      </div>
    </div>
  );
}
