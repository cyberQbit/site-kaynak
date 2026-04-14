import { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar, Building2 } from 'lucide-react';
import type { Experience } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ExperienceFormProps {
  experience: Experience[];
  onAdd: (experience: Omit<Experience, 'id'>) => void;
  onUpdate: (id: string, experience: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ experience, onAdd, onUpdate: _onUpdate, onRemove }: ExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      onAdd(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      });
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
          <Briefcase className={`w-5 h-5 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          {t('experience')}
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
            <div className="md:col-span-2">
              <label className={labelClasses}>Sirket Adi *</label>
              <div className="relative">
                <Building2 className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
                }`} />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="ornegin: Microsoft"
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Pozisyon *</label>
              <input
                type="text"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                placeholder="ornegin: Senior Software Engineer"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Baslangic Tarihi</label>
              <div className="relative">
                <Calendar className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
                }`} />
                <input
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Bitis Tarihi</label>
              <div className="relative">
                <Calendar className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
                }`} />
                <input
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.current}
                  className={`${inputClasses} pl-10 ${newExperience.current ? (isDark ? 'bg-[#1F2937]' : 'bg-[#F1F3F5]') : ''}`}
                />
              </div>
              <label className={`flex items-center gap-2 mt-2 text-sm ${
                isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
              }`}>
                <input
                  type="checkbox"
                  checked={newExperience.current}
                  onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked, endDate: '' })}
                  className={`rounded ${isDark ? 'border-[#4B5563] text-[#22D3EE] focus:ring-[#22D3EE]' : 'border-[#E2E8F0] text-[#0062cc] focus:ring-[#0062cc]'}`}
                />
                Halen calisiyorum
              </label>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Aciklama</label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Gorevlerinizi ve basarilarinizi aciklayin..."
                rows={4}
                className={`${inputClasses} resize-none`}
              />
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

      <div className="space-y-3">
        {experience.map((exp) => (
          <div key={exp.id} className={`p-4 rounded-lg border ${
            isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-medium ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
                  {exp.position}
                </h4>
                <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>{exp.company}</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-[#6B7280]' : 'text-[#A0AEC0]'}`}>
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Devam ediyor' : exp.endDate && new Date(exp.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                </p>
                {exp.description && (
                  <p className={`text-sm mt-2 line-clamp-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
                    {exp.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => onRemove(exp.id)}
                className={`p-1.5 transition-colors ${
                  isDark ? 'text-[#9CA3AF] hover:text-red-400' : 'text-[#A0AEC0] hover:text-red-500'
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {experience.length === 0 && !isAdding && (
          <div className={`text-center py-8 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            <Briefcase className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#374151]' : 'text-[#E2E8F0]'}`} />
            <p className="text-sm">Henuz is deneyimi eklenmemis</p>
          </div>
        )}
      </div>
    </div>
  );
}
