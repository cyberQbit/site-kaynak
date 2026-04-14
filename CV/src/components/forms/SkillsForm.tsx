import { useState } from 'react';
import { Wrench, Plus, Trash2, Star } from 'lucide-react';
import type { Skill } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onRemove: (id: string) => void;
}

const skillLevels = [
  { value: 'Beginner', label: 'Baslangic', color: 'bg-gray-400' },
  { value: 'Intermediate', label: 'Orta', color: 'bg-blue-400' },
  { value: 'Advanced', label: 'Ileri', color: 'bg-blue-500' },
  { value: 'Expert', label: 'Uzman', color: 'bg-blue-600' },
] as const;

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
  });

  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const handleAdd = () => {
    if (newSkill.name.trim()) {
      onAdd(newSkill);
      setNewSkill({ name: '', level: 'Intermediate' });
      setIsAdding(false);
    }
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
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${
          isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
        }`}>
          <Wrench className={`w-5 h-5 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          {t('skills')}
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            isDark
              ? 'text-[#22D3EE] bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20'
              : 'text-[#0062cc] bg-[#0062cc]/10 hover:bg-[#0062cc]/20'
          }`}
        >
          <Plus className="w-4 h-4" />
          {isAdding ? 'Iptal' : 'Ekle'}
        </button>
      </div>

      {isAdding && (
        <div className={`p-4 rounded-lg border space-y-4 ${
          isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Yetenek Adi *</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="ornegin: React, Python, Proje Yonetimi"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Seviye</label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
                className={inputClasses}
              >
                {skillLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAdd}
              className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                isDark
                  ? 'bg-[#22D3EE] hover:bg-[#0BC5EA] text-[#111827]'
                  : 'bg-[#0062cc] hover:bg-[#004c9e]'
              }`}
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const levelInfo = skillLevels.find((l) => l.value === skill.level);
          return (
            <div
              key={skill.id}
              className={`group flex items-center gap-2 px-3 py-1.5 border rounded-full transition-colors ${
                isDark
                  ? 'bg-[#374151] border-[#4B5563] hover:border-[#22D3EE]'
                  : 'bg-white border-[#E2E8F0] hover:border-[#0062cc]'
              }`}
            >
              <span className={`text-sm font-medium ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
                {skill.name}
              </span>
              <span className={`w-2 h-2 rounded-full ${levelInfo?.color || 'bg-gray-400'}`} title={levelInfo?.label} />
              <button
                onClick={() => onRemove(skill.id)}
                className={`opacity-0 group-hover:opacity-100 p-0.5 transition-all ${
                  isDark ? 'text-[#9CA3AF] hover:text-red-400' : 'text-[#A0AEC0] hover:text-red-500'
                }`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {skills.length === 0 && !isAdding && (
          <div className={`w-full text-center py-8 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            <Wrench className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#374151]' : 'text-[#E2E8F0]'}`} />
            <p className="text-sm">Henuz yetenek eklenmemis</p>
          </div>
        )}
      </div>

      <div className={`p-3 rounded-lg ${
        isDark ? 'bg-[#22D3EE]/10' : 'bg-[#0062cc]/10'
      }`}>
        <p className={`text-xs flex items-start gap-2 ${
          isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'
        }`}>
          <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            ATS sistemleri icin is ilanindaki anahtar kelimeleri yeteneklerinize eklemeniz onerilir.
          </span>
        </p>
      </div>
    </div>
  );
}
