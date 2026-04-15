import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import type { Education } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface EducationFormProps {
  education: Education[];
  onAdd: (edu: Omit<Education, 'id'>) => void;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

const emptyEdu = (): Omit<Education, 'id'> => ({
  school: '', degree: '', field: '', startDate: '', endDate: '', current: false, gpa: '',
});

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
  return `${months[parseInt(m)-1]||''} ${y}`;
}

export function EducationForm({ education, onAdd, onUpdate, onRemove }: EducationFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Education, 'id'>>(emptyEdu());
  const [editDraft, setEditDraft] = useState<Partial<Education>>({});

  const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;
  const labelClass = `block text-xs font-medium mb-1 ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`;

  function EduFields({ values, onChange }: { values: Omit<Education, 'id'>; onChange: (v: Partial<Education>) => void }) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className={labelClass}>Okul / Üniversite *</label>
          <input type="text" value={values.school}
            onChange={e => onChange({ school: e.target.value })}
            placeholder="İstanbul Teknik Üniversitesi" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Derece</label>
          <input type="text" value={values.degree}
            onChange={e => onChange({ degree: e.target.value })}
            placeholder="Lisans, Y.Lisans..." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bölüm</label>
          <input type="text" value={values.field}
            onChange={e => onChange({ field: e.target.value })}
            placeholder="Bilgisayar Müh." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Başlangıç</label>
          <input type="month" value={values.startDate}
            onChange={e => onChange({ startDate: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bitiş</label>
          <input type="month" value={values.endDate}
            onChange={e => onChange({ endDate: e.target.value })}
            disabled={values.current} className={inputClass}
            style={{ opacity: values.current ? 0.4 : 1 }} />
          <label className={`flex items-center gap-1.5 mt-1 text-xs cursor-pointer ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            <input type="checkbox" checked={values.current}
              onChange={e => onChange({ current: e.target.checked, endDate: '' })} className="rounded" />
            Devam ediyor
          </label>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>GPA (isteğe bağlı)</label>
          <input type="text" value={values.gpa || ''}
            onChange={e => onChange({ gpa: e.target.value })}
            placeholder="3.80 / 4.00" className={inputClass} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          <GraduationCap className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          {t('education')}
          {education.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'}`}>
              {education.length}
            </span>
          )}
        </h3>
        <button onClick={() => { setIsAdding(!isAdding); setDraft(emptyEdu()); }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isDark ? 'text-[#22D3EE] bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20' : 'text-[#0062cc] bg-[#0062cc]/10 hover:bg-[#0062cc]/20'
          }`}>
          {isAdding ? <><X className="w-3 h-3" /> İptal</> : <><Plus className="w-3 h-3" /> Ekle</>}
        </button>
      </div>

      {isAdding && (
        <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'}`}>
          <EduFields values={draft} onChange={v => setDraft(prev => ({ ...prev, ...v }))} />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)}
              className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>İptal</button>
            <button onClick={() => { if (!draft.school) return; onAdd(draft); setDraft(emptyEdu()); setIsAdding(false); }}
              disabled={!draft.school}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white disabled:opacity-40 ${isDark ? 'bg-[#22D3EE] text-[#111827]' : 'bg-[#0062cc]'}`}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {education.map(edu => (
          <div key={edu.id} className={`rounded-xl border ${isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
            {editingId === edu.id ? (
              <div className="p-4 space-y-4">
                <EduFields values={{ ...edu, ...editDraft }} onChange={v => setEditDraft(p => ({ ...p, ...v }))} />
                <div className="flex justify-end gap-2">
                  <button onClick={() => { setEditingId(null); setEditDraft({}); }}
                    className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>İptal</button>
                  <button onClick={() => { onUpdate(edu.id, editDraft); setEditingId(null); setEditDraft({}); }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white ${isDark ? 'bg-[#22D3EE] text-[#111827]' : 'bg-[#0062cc]'}`}>
                    <Check className="w-3.5 h-3.5 inline mr-1" />Güncelle
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
                    {[edu.degree, edu.field].filter(Boolean).join(', ') || edu.school}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>{edu.school}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                    {formatDate(edu.startDate)} – {edu.current ? 'Günümüz' : formatDate(edu.endDate)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingId(edu.id); setEditDraft({}); }}
                    className={`p-1.5 rounded-lg ${isDark ? 'text-[#9CA3AF] hover:bg-[#374151]' : 'text-[#4A5568] hover:bg-[#F1F3F5]'}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onRemove(edu.id)}
                    className={`p-1.5 rounded-lg ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
