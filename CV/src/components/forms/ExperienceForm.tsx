import { useState } from 'react';
import { Briefcase, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import type { Experience } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ExperienceFormProps {
  experience: Experience[];
  onAdd: (exp: Omit<Experience, 'id'>) => void;
  onUpdate: (id: string, exp: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

const emptyExp = (): Omit<Experience, 'id'> => ({
  company: '', position: '', startDate: '', endDate: '', current: false, description: '', bullets: [],
});

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
  return `${months[parseInt(m)-1]||''} ${y}`;
}

export function ExperienceForm({ experience, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Experience, 'id'>>(emptyExp());
  const [editDraft, setEditDraft] = useState<Partial<Experience>>({});

  const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;
  const labelClass = `block text-xs font-medium mb-1 ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`;

  function ExpFields({ values, onChange }: {
    values: Omit<Experience, 'id'>; onChange: (v: Partial<Experience>) => void;
  }) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={labelClass}>Şirket Adı *</label>
            <input type="text" value={values.company}
              onChange={e => onChange({ company: e.target.value })}
              placeholder="Google, Microsoft..." className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Pozisyon *</label>
            <input type="text" value={values.position}
              onChange={e => onChange({ position: e.target.value })}
              placeholder="Senior Frontend Developer" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Başlangıç</label>
            <input type="month" value={values.startDate}
              onChange={e => onChange({ startDate: e.target.value })}
              className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Bitiş</label>
            <input type="month" value={values.endDate}
              onChange={e => onChange({ endDate: e.target.value })}
              disabled={values.current} className={inputClass}
              style={{ opacity: values.current ? 0.4 : 1 }} />
            <label className={`flex items-center gap-1.5 mt-1 text-xs cursor-pointer ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
              <input type="checkbox" checked={values.current}
                onChange={e => onChange({ current: e.target.checked, endDate: '' })}
                className="rounded" />
              Hâlâ çalışıyorum
            </label>
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Açıklama</label>
            <textarea value={values.description}
              onChange={e => onChange({ description: e.target.value })}
              placeholder="Rolünüzü ve sorumluluklarınızı açıklayın..."
              rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Başarılar / Maddeler</label>
            <div className="space-y-2">
              {(values.bullets || []).map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={b}
                    onChange={e => {
                      const bullets = [...(values.bullets || [])];
                      bullets[i] = e.target.value;
                      onChange({ bullets });
                    }}
                    className={`${inputClass} flex-1`} placeholder="Başarı veya sorumluluk..." />
                  <button onClick={() => {
                    const bullets = (values.bullets || []).filter((_, j) => j !== i);
                    onChange({ bullets });
                  }} className={`p-2 rounded-lg ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => onChange({ bullets: [...(values.bullets || []), ''] })}
                className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  isDark ? 'text-[#22D3EE] hover:bg-[#22D3EE]/10' : 'text-[#0062cc] hover:bg-[#0062cc]/10'
                }`}
              >
                <Plus className="w-3 h-3" /> Madde ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    if (!draft.company || !draft.position) return;
    onAdd(draft);
    setDraft(emptyExp());
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          <Briefcase className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          {t('experience')}
          {experience.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'}`}>
              {experience.length}
            </span>
          )}
        </h3>
        <button
          onClick={() => { setIsAdding(!isAdding); setDraft(emptyExp()); }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isDark ? 'text-[#22D3EE] bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20' : 'text-[#0062cc] bg-[#0062cc]/10 hover:bg-[#0062cc]/20'
          }`}
        >
          {isAdding ? <><X className="w-3 h-3" /> İptal</> : <><Plus className="w-3 h-3" /> Ekle</>}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'}`}>
            {ExpFields({ values: draft, onChange: v => setDraft(prev => ({ ...prev, ...v })) })}
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)}
              className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'text-[#9CA3AF] hover:bg-[#4B5563]' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}>
              İptal
            </button>
            <button onClick={handleAdd}
              disabled={!draft.company || !draft.position}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white disabled:opacity-40 ${isDark ? 'bg-[#22D3EE] text-[#111827] hover:bg-[#0BC5EA]' : 'bg-[#0062cc] hover:bg-[#004c9e]'}`}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {experience.map(exp => (
          <div key={exp.id} className={`rounded-xl border ${isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
            {editingId === exp.id ? (
              <div className="p-4 space-y-4">
                {ExpFields({
                  values: { ...exp, ...editDraft },
                  onChange: v => setEditDraft(prev => ({ ...prev, ...v }))
                })}
                <div className="flex justify-end gap-2">
                  <button onClick={() => { setEditingId(null); setEditDraft({}); }}
                    className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'text-[#9CA3AF] hover:bg-[#374151]' : 'text-[#4A5568] hover:bg-[#F1F3F5]'}`}>
                    İptal
                  </button>
                  <button onClick={() => { onUpdate(exp.id, editDraft); setEditingId(null); setEditDraft({}); }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white ${isDark ? 'bg-[#22D3EE] text-[#111827]' : 'bg-[#0062cc]'}`}>
                    <Check className="w-3.5 h-3.5 inline mr-1" />Güncelle
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>{exp.position}</p>
                  <p className={`text-xs truncate ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>{exp.company}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                    {formatDate(exp.startDate)} – {exp.current ? 'Günümüz' : formatDate(exp.endDate)}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => { setEditingId(exp.id); setEditDraft({}); }}
                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-[#9CA3AF] hover:bg-[#374151]' : 'text-[#4A5568] hover:bg-[#F1F3F5]'}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onRemove(exp.id)}
                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}>
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
