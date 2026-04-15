import { useState } from 'react';
import { Award, Plus, Trash2, X, Languages } from 'lucide-react';
import type { Certificate, Language } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';

// ─── CERTIFICATES ──────────────────────────────────────────────
interface CertificatesFormProps {
  certificates: Certificate[];
  onAdd: (cert: Omit<Certificate, 'id'>) => void;
  onRemove: (id: string) => void;
}

export function CertificatesForm({ certificates, onAdd, onRemove }: CertificatesFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [draft, setDraft] = useState({ name: '', issuer: '', date: '', url: '' });
  const [open, setOpen] = useState(false);

  const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;
  const labelClass = `block text-xs font-medium mb-1 ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          <Award className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
          Sertifikalar
          {certificates.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#F1F3F5] text-[#4A5568]'}`}>
              {certificates.length}
            </span>
          )}
        </h3>
        <button onClick={() => setOpen(!open)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
            isDark ? 'text-[#22D3EE] bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20' : 'text-[#0062cc] bg-[#0062cc]/10 hover:bg-[#0062cc]/20'
          }`}>
          {open ? <><X className="w-3 h-3" /> İptal</> : <><Plus className="w-3 h-3" /> Ekle</>}
        </button>
      </div>

      {open && (
        <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F8F9FA] border-[#E2E8F0]'}`}>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <label className={labelClass}>Sertifika Adı *</label>
              <input type="text" value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
                placeholder="AWS Solutions Architect" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Veren Kurum</label>
              <input type="text" value={draft.issuer} onChange={e => setDraft(p => ({ ...p, issuer: e.target.value }))}
                placeholder="Amazon" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tarih</label>
              <input type="month" value={draft.date} onChange={e => setDraft(p => ({ ...p, date: e.target.value }))}
                className={inputClass} />
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => { if (!draft.name) return; onAdd(draft); setDraft({ name:'',issuer:'',date:'',url:'' }); setOpen(false); }}
              disabled={!draft.name}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white disabled:opacity-40 ${isDark ? 'bg-[#22D3EE] text-[#111827]' : 'bg-[#0062cc]'}`}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {certificates.map(cert => (
          <div key={cert.id} className={`flex items-center justify-between p-2.5 rounded-lg border ${
            isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>{cert.name}</p>
              <p className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>{cert.issuer}</p>
            </div>
            <button onClick={() => onRemove(cert.id)}
              className={`p-1.5 rounded ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LANGUAGES ─────────────────────────────────────────────────
interface LanguagesFormProps {
  languages: Language[];
  onAdd: (lang: Omit<Language, 'id'>) => void;
  onRemove: (id: string) => void;
}

const LEVELS: Language['level'][] = ['A1','A2','B1','B2','C1','C2','Native'];
const LEVEL_LABELS: Record<Language['level'], string> = {
  A1: 'A1 - Başlangıç', A2: 'A2 - Temel',
  B1: 'B1 - Orta', B2: 'B2 - Orta Üstü',
  C1: 'C1 - İleri', C2: 'C2 - Üst Düzey', Native: 'Anadil',
};

export function LanguagesForm({ languages, onAdd, onRemove }: LanguagesFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [level, setLevel] = useState<Language['level']>('B2');

  const inputClass = `px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Languages className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
        <h3 className={`font-semibold text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          Diller
        </h3>
      </div>

      <div className="flex gap-2">
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { onAdd({ name: name.trim(), level }); setName(''); } }}
          placeholder="İngilizce, Almanca..." className={`${inputClass} flex-1`} />
        <select value={level} onChange={e => setLevel(e.target.value as Language['level'])} className={`${inputClass} w-40`}>
          {LEVELS.map(l => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
        </select>
        <button onClick={() => { if (!name.trim()) return; onAdd({ name: name.trim(), level }); setName(''); }}
          disabled={!name.trim()}
          className={`px-3 py-2 rounded-lg disabled:opacity-40 ${isDark ? 'bg-[#22D3EE] text-[#111827]' : 'bg-[#0062cc] text-white'}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {languages.map(lang => (
          <span key={lang.id} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border group ${
            isDark ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6]' : 'bg-[#F1F3F5] border-[#E2E8F0] text-[#1A202C]'
          }`}>
            {lang.name}
            <span className={`${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`}>({lang.level})</span>
            <button onClick={() => onRemove(lang.id)}
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-[#6B7280] hover:text-red-400' : 'text-[#A0AEC0] hover:text-red-500'}`}>
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
