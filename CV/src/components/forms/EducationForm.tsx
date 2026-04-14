import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Calendar, School } from 'lucide-react';
import type { Education } from '../../types/cv';

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

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Eğitim
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
              <label className={labelClasses}>Okul / Üniversite *</label>
              <div className="relative">
                <School className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newEducation.school}
                  onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                  placeholder="örn: İstanbul Teknik Üniversitesi"
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
                <option value="">Seçiniz</option>
                <option value="Lise">Lise</option>
                <option value="Önlisans">Önlisans</option>
                <option value="Lisans">Lisans</option>
                <option value="Yüksek Lisans">Yüksek Lisans</option>
                <option value="Doktora">Doktora</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Bölüm</label>
              <input
                type="text"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="örn: Bilgisayar Mühendisliği"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Başlangıç Tarihi</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="month"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
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
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  disabled={newEducation.current}
                  className={`${inputClasses} pl-10 ${newEducation.current ? 'bg-gray-100' : ''}`}
                />
              </div>
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={newEducation.current}
                  onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked, endDate: '' })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Devam ediyorum
              </label>
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
        {education.map((edu) => (
          <div key={edu.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{edu.school}</h4>
                <p className="text-sm text-gray-600">
                  {edu.degree}{edu.field && ` - ${edu.field}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  {' - '}
                  {edu.current ? 'Devam ediyor' : edu.endDate && new Date(edu.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => onRemove(edu.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {education.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Henüz eğitim bilgisi eklenmemiş</p>
          </div>
        )}
      </div>
    </div>
  );
}
