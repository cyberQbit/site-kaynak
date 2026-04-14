import { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar, Building2 } from 'lucide-react';
import type { Experience } from '../../types/cv';

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

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          İş Deneyimi
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
            <div className="md:col-span-2">
              <label className={labelClasses}>Şirket Adı *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="örn: Microsoft"
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
                placeholder="örn: Senior Software Engineer"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Başlangıç Tarihi</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Bitiş Tarihi</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.current}
                  className={`${inputClasses} pl-10 ${newExperience.current ? 'bg-gray-100' : ''}`}
                />
              </div>
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={newExperience.current}
                  onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked, endDate: '' })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Halen çalışıyorum
              </label>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Açıklama</label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Görevlerinizi ve başarılarınızı açıklayın. ATS sistemleri için görev tanımlarınızda sektöre özel anahtar kelimeler kullanın."
                rows={4}
                className={`${inputClasses} resize-none`}
              />
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

      <div className="space-y-3">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{exp.position}</h4>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Devam ediyor' : exp.endDate && new Date(exp.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{exp.description}</p>
                )}
              </div>
              <button
                onClick={() => onRemove(exp.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {experience.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Henüz iş deneyimi eklenmemiş</p>
          </div>
        )}
      </div>
    </div>
  );
}
