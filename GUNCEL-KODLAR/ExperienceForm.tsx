import { useState } from 'react';
import { Briefcase, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import type { Experience } from '../../types/cv';
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

function fmt(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  return ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][parseInt(m)-1] + ' ' + y;
}

function ExpFields({ v, set }: { v: Omit<Experience,'id'>; set: (p: Partial<Experience>) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <label className="cvl">Şirket Adı *</label>
        <input className="cvi no-icon" value={v.company} onChange={e => set({ company: e.target.value })} placeholder="Google, Microsoft..." />
      </div>
      <div>
        <label className="cvl">Pozisyon *</label>
        <input className="cvi no-icon" value={v.position} onChange={e => set({ position: e.target.value })} placeholder="Senior Frontend Developer" />
      </div>
      <div className="form-grid-2" style={{ gap: '12px' }}>
        <div>
          <label className="cvl">Başlangıç</label>
          <input type="month" className="cvi no-icon" value={v.startDate} onChange={e => set({ startDate: e.target.value })} />
        </div>
        <div>
          <label className="cvl">Bitiş</label>
          <input type="month" className="cvi no-icon" value={v.endDate}
            onChange={e => set({ endDate: e.target.value })}
            disabled={v.current} style={{ opacity: v.current ? 0.4 : 1 }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12.5px', color: 'var(--tm)', cursor: 'pointer' }}>
            <input type="checkbox" checked={v.current} onChange={e => set({ current: e.target.checked, endDate: '' })} style={{ width: '14px', height: '14px' }} />
            Hâlâ çalışıyorum
          </label>
        </div>
      </div>
      <div>
        <label className="cvl">Açıklama</label>
        <textarea className="cvi" value={v.description} onChange={e => set({ description: e.target.value })}
          placeholder="Rol ve sorumluluklarınızı açıklayın..." rows={3}
          style={{ paddingLeft: '12px', minHeight: '80px' }} />
      </div>
      <div>
        <label className="cvl">Başarılar / Maddeler</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(v.bullets || []).map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '6px' }}>
              <input className="cvi no-icon" style={{ flex: 1 }} value={b}
                onChange={e => { const buls = [...(v.bullets||[])]; buls[i]=e.target.value; set({ bullets: buls }); }}
                placeholder="Başarı veya sorumluluk..." />
              <button className="btn-del" onClick={() => set({ bullets: (v.bullets||[]).filter((_,j)=>j!==i) })}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button className="btn-g" style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '12.5px' }}
            onClick={() => set({ bullets: [...(v.bullets||[]), ''] })}>
            <Plus size={12} /> Madde ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExperienceForm({ experience, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [draft, setDraft] = useState(emptyExp());
  const [editDraft, setEditDraft] = useState<Partial<Experience>>({});

  return (
    <div>
      <div className="sec-head" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sec-icon"><Briefcase size={14} /></div>
          <span className="sec-title">{t('experience')}</span>
          {experience.length > 0 && <span className="sec-count">{experience.length}</span>}
        </div>
        <button className="btn-g" style={{ padding: '6px 12px', fontSize: '12.5px' }}
          onClick={() => { setIsAdding(!isAdding); setDraft(emptyExp()); }}>
          {isAdding ? <><X size={12}/> İptal</> : <><Plus size={12}/> Ekle</>}
        </button>
      </div>

      {isAdding && (
        <div className="add-zone ani" style={{ marginBottom: '16px' }}>
          <ExpFields v={draft} set={p => setDraft(prev => ({...prev,...p}))} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
            <button className="btn-g" style={{ padding: '8px 14px' }} onClick={() => setIsAdding(false)}>İptal</button>
            <button className="btn-p" disabled={!draft.company || !draft.position}
              onClick={() => { onAdd(draft); setDraft(emptyExp()); setIsAdding(false); }}>
              <Check size={13} /> Kaydet
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {experience.map(exp => (
          <div key={exp.id} className="cvc">
            {editingId === exp.id ? (
              <div className="ani">
                <ExpFields v={{...exp,...editDraft}} set={p => setEditDraft(prev => ({...prev,...p}))} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                  <button className="btn-g" style={{ padding: '8px 14px' }} onClick={() => { setEditingId(null); setEditDraft({}); }}>İptal</button>
                  <button className="btn-p" onClick={() => { onUpdate(exp.id, editDraft); setEditingId(null); setEditDraft({}); }}>
                    <Check size={13} /> Güncelle
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>{exp.position}</p>
                  <p style={{ fontSize: '12.5px', color: 'var(--tm)', marginBottom: '2px' }}>{exp.company}</p>
                  <p style={{ fontSize: '11.5px', color: 'var(--ts)' }}>
                    {fmt(exp.startDate)}{(exp.startDate||exp.endDate||exp.current) && ' – '}{exp.current ? 'Günümüz' : fmt(exp.endDate)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button className="btn-icon" onClick={() => { setEditingId(exp.id); setEditDraft({}); }} title="Düzenle"><Pencil size={13} /></button>
                  <button className="btn-del" onClick={() => onRemove(exp.id)} title="Sil"><Trash2 size={13} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {experience.length === 0 && !isAdding && (
          <div className="empty-state"><Briefcase size={26} style={{ opacity: .2 }} /><p>Deneyim eklemek için "Ekle" butonuna tıklayın</p></div>
        )}
      </div>
    </div>
  );
}
