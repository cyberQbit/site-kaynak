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

const CATEGORIES = ['Teknik', 'Programlama', 'Yazılım', 'Soft Skills', 'Diller', 'Araçlar', 'Genel'];

const SUGGESTIONS: Record<string, string[]> = {
  'Programlama': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP'],
  'Teknik': ['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Git', 'PostgreSQL', 'MongoDB'],
  'Soft Skills': ['Takım Çalışması', 'İletişim', 'Problem Çözme', 'Liderlik', 'Proje Yönetimi'],
};

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Teknik');

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed || skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) return;
    onAdd({ name: trimmed, category });
    setName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
  };

  // Group skills by category for display
  const grouped: Record<string, Skill[]> = {};
  skills.forEach(s => {
    const cat = s.category || 'Genel';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  });

  const inputClass = `px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wrench className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
        <h3 className={`font-semibold text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          {t('skills')}
          {skills.length > 0 && (
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'}`}>
              {skills.length}
            </span>
          )}
        </h3>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="React, Python, Docker..."
          className={`${inputClass} flex-1`}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className={`${inputClass} w-32`}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className={`px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors ${
            isDark ? 'bg-[#22D3EE] text-[#111827] hover:bg-[#0BC5EA]' : 'bg-[#0062cc] text-white hover:bg-[#004c9e]'
          }`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Quick suggestions */}
      {SUGGESTIONS[category] && (
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS[category]
            .filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase()))
            .slice(0, 6)
            .map(s => (
              <button
                key={s}
                onClick={() => onAdd({ name: s, category })}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                  isDark
                    ? 'border-[#4B5563] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'
                    : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#0062cc] hover:text-[#0062cc]'
                }`}
              >
                + {s}
              </button>
            ))}
        </div>
      )}

      {/* Skills grouped */}
      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat}>
          <p className={`text-xs font-medium mb-1.5 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{cat}</p>
          <div className="flex flex-wrap gap-1.5">
            {catSkills.map(skill => (
              <span
                key={skill.id}
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-colors group ${
                  isDark
                    ? 'bg-[#374151] text-[#F3F4F6] border border-[#4B5563]'
                    : 'bg-[#F1F3F5] text-[#1A202C] border border-[#E2E8F0]'
                }`}
              >
                {skill.name}
                <button
                  onClick={() => onRemove(skill.id)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 ${
                    isDark ? 'text-[#6B7280] hover:text-red-400' : 'text-[#A0AEC0] hover:text-red-500'
                  }`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className={`text-center py-6 rounded-xl border-dashed border-2 ${
          isDark ? 'border-[#374151] text-[#6B7280]' : 'border-[#E2E8F0] text-[#9CA3AF]'
        }`}>
          <Wrench className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">Yetenek eklemek için yukarıdaki alana yazın</p>
        </div>
      )}

      <div className={`p-3 rounded-lg text-xs flex gap-2 ${isDark ? 'bg-[#22D3EE]/5 text-[#22D3EE]' : 'bg-[#0062cc]/5 text-[#0062cc]'}`}>
        <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        ATS: İş ilanındaki teknik kelimeleri birebir kullanın (ör. "React.js" değil "React")
      </div>
    </div>
  );
}
