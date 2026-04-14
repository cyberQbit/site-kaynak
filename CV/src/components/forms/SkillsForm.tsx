import { useState } from 'react';
import { Wrench, Plus, Trash2, Star } from 'lucide-react';
import type { Skill } from '../../types/cv';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onRemove: (id: string) => void;
}

const skillLevels = [
  { value: 'Beginner', label: 'Başlangıç', color: 'bg-gray-400' },
  { value: 'Intermediate', label: 'Orta', color: 'bg-blue-400' },
  { value: 'Advanced', label: 'İleri', color: 'bg-blue-500' },
  { value: 'Expert', label: 'Uzman', color: 'bg-blue-600' },
] as const;

export function SkillsForm({ skills, onAdd, onRemove }: SkillsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
  });

  const handleAdd = () => {
    if (newSkill.name.trim()) {
      onAdd(newSkill);
      setNewSkill({ name: '', level: 'Intermediate' });
      setIsAdding(false);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          Yetenekler
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? 'İptal' : 'Ekle'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Yetenek Adı *</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="örn: React, Python, Proje Yönetimi"
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
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
              className="group flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-blue-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className={`w-2 h-2 rounded-full ${levelInfo?.color || 'bg-gray-400'}`} title={levelInfo?.label} />
              <button
                onClick={() => onRemove(skill.id)}
                className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {skills.length === 0 && !isAdding && (
          <div className="w-full text-center py-8 text-gray-500">
            <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Henüz yetenek eklenmemiş</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-700 flex items-start gap-2">
          <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            ATS sistemleri için iş ilanındaki anahtar kelimeleri yeteneklerinize eklemeniz önerilir.
            Teknik yetenekler (programlama dilleri, araçlar) ve yumuşak yetenekler (liderlik, iletişim) ekleyebilirsiniz.
          </span>
        </p>
      </div>
    </div>
  );
}
