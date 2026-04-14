import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Calendar, School } from 'lucide-react';
import type { Education } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface EducationFormProps {
  education: Education[];
  onAdd: (education: Omit<Education, 'id'>) => void;
  onUpdate: (id: string, education: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ education, onAdd, onUpdate: _onUpdate, onRemove }: EducationFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
  });

  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      onAdd(newEducation);
      setNewEducation({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
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
          <GraduationCap className={`w-5 h-5 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          {t('education')}
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
              <label className={labelClasses}>Okul / Universite *</label>
              <div className="relative">
                <School className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
                }`} />
                <input
                  type="text"
                  value={newEducation.school}
                  onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                  placeholder="ornegin: Istanbul Teknik Universitesi"
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Derece *</label>
              <select
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className={inputClasses}
              >
                <option value="">Seciniz</option>
                <option value="Lise">Lise</option>
                <option value="Onlisans">Onlisans</option>
                <option value="Lisans">Lisans</option>
                <option value="Yuksek Lisans">Yuksek Lisans</option>
                <option value="Doktora">Doktora</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Bolum</label>
              <input
                type="text"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="ornegin: Bilgisayar Muhendisligi"
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
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
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
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  disabled={newEducation.current}
                  className={`${inputClasses} pl-10 ${newEducation.current ? (isDark ? 'bg-[#1F2937]' : 'bg-[#F1F3F5]') : ''}`}
                />
              </div>
              <label className={`flex items-center gap-2 mt-2 text-sm ${
                isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
              }`}>
                <input
                  type="checkbox"
                  checked={newEducation.current}
                  onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked, endDate: '' })}
                  className={`rounded ${isDark ? 'border-[#4B5563] text-[#22D3EE] focus:ring-[#22D3EE]' : 'border-[#E2E8F0] text-[#0062cc] focus:ring-[#0062cc]'}`}
                />
                Devam ediyorum
              </label>
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
        {education.map((edu) => (
          <div key={edu.id} className={`p-4 rounded-lg border ${
            isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-medium ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>{edu.school}</h4>
                <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
                  {edu.degree}{edu.field && ` - ${edu.field}`}
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-[#6B7280]' : 'text-[#A0AEC0]'}`}>
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  {' - '}
                  {edu.current ? 'Devam ediyor' : edu.endDate && new Date(edu.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => onRemove(edu.id)}
                className={`p-1.5 transition-colors ${
                  isDark ? 'text-[#9CA3AF] hover:text-red-400' : 'text-[#A0AEC0] hover:text-red-500'
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {education.length === 0 && !isAdding && (
          <div className={`text-center py-8 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            <GraduationCap className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#374151]' : 'text-[#E2E8F0]'}`} />
            <p className="text-sm">Henuz egitim bilgisi eklenmemis</p>
          </div>
        )}
      </div>
    </div>
  );
}
