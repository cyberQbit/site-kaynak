import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import type { Education } from '../../types/cv';
import { useLanguage } from '../../context/LanguageContext';

interface EducationFormProps {
  education: Education[];
  onAdd: (edu: Omit<Education,'id'>) => void;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

const empty = (): Omit<Education,'id'> => ({ school:'', degree:'', field:'', startDate:'', endDate:'', current:false, gpa:'' });

function fmt(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  return ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][parseInt(m)-1] + ' ' + y;
}

function EduFields({ v, set }: { v: Omit<Education,'id'>; set: (p: Partial<Education>) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <label className="cvl">Okul / Üniversite *</label>
        <input className="cvi no-icon" value={v.school} onChange={e => set({ school: e.target.value })} placeholder="İstanbul Teknik Üniversitesi" />
      </div>
      <div className="form-grid-2" style={{ gap: '12px' }}>
        <div>
          <label className="cvl">Derece</label>
          <input className="cvi no-icon" value={v.degree} onChange={e => set({ degree: e.target.value })} placeholder="Lisans" />
        </div>
        <div>
          <label className="cvl">Bölüm</label>
          <input className="cvi no-icon" value={v.field} onChange={e => set({ field: e.target.value })} placeholder="Bilgisayar Müh." />
        </div>
      </div>
      <div className="form-grid-2" style={{ gap: '12px' }}>
        <div>
          <label className="cvl">Başlangıç</label>
          <input type="month" className="cvi no-icon" value={v.startDate} onChange={e => set({ startDate: e.target.value })} />
        </div>
        <div>
          <label className="cvl">Bitiş</label>
          <input type="month" className="cvi no-icon" value={v.endDate}
            onChange={e => set({ endDate: e.target.value })} disabled={v.current} style={{ opacity: v.current ? 0.4 : 1 }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12.5px', color: 'var(--tm)', cursor: 'pointer' }}>
            <input type="checkbox" checked={v.current} onChange={e => set({ current: e.target.checked, endDate: '' })} style={{ width: '14px', height: '14px' }} />
            Devam ediyor
          </label>
        </div>
      </div>
      <div>
        <label className="cvl">GPA (isteğe bağlı)</label>
        <input className="cvi no-icon" value={v.gpa || ''} onChange={e => set({ gpa: e.target.value })} placeholder="3.80 / 4.00" />
      </div>
    </div>
  );
}

export function EducationForm({ education, onAdd, onUpdate, onRemove }: EducationFormProps) {
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [draft, setDraft] = useState(empty());
  const [editDraft, setEditDraft] = useState<Partial<Education>>({});

  return (
    <div>
      <div className="sec-head" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sec-icon"><GraduationCap size={14} /></div>
          <span className="sec-title">{t('education')}</span>
          {education.length > 0 && <span className="sec-count">{education.length}</span>}
        </div>
        <button className="btn-g" style={{ padding: '6px 12px', fontSize: '12.5px' }}
          onClick={() => { setIsAdding(!isAdding); setDraft(empty()); }}>
          {isAdding ? <><X size={12}/> İptal</> : <><Plus size={12}/> Ekle</>}
        </button>
      </div>

      {isAdding && (
        <div className="add-zone ani" style={{ marginBottom: '16px' }}>
          <EduFields v={draft} set={p => setDraft(prev => ({...prev,...p}))} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
            <button className="btn-g" style={{ padding: '8px 14px' }} onClick={() => setIsAdding(false)}>İptal</button>
            <button className="btn-p" disabled={!draft.school}
              onClick={() => { onAdd(draft); setDraft(empty()); setIsAdding(false); }}>
              <Check size={13} /> Kaydet
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {education.map(edu => (
          <div key={edu.id} className="cvc">
            {editingId === edu.id ? (
              <div className="ani">
                <EduFields v={{...edu,...editDraft}} set={p => setEditDraft(prev => ({...prev,...p}))} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                  <button className="btn-g" style={{ padding: '8px 14px' }} onClick={() => { setEditingId(null); setEditDraft({}); }}>İptal</button>
                  <button className="btn-p" onClick={() => { onUpdate(edu.id, editDraft); setEditingId(null); setEditDraft({}); }}>
                    <Check size={13} /> Güncelle
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>
                    {[edu.degree, edu.field].filter(Boolean).join(', ') || edu.school}
                  </p>
                  <p style={{ fontSize: '12.5px', color: 'var(--tm)', marginBottom: '2px' }}>{edu.school}</p>
                  <p style={{ fontSize: '11.5px', color: 'var(--ts)' }}>
                    {fmt(edu.startDate)}{(edu.startDate||edu.endDate||edu.current) && ' – '}{edu.current ? 'Günümüz' : fmt(edu.endDate)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button className="btn-icon" onClick={() => { setEditingId(edu.id); setEditDraft({}); }}><Pencil size={13} /></button>
                  <button className="btn-del" onClick={() => onRemove(edu.id)}><Trash2 size={13} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {education.length === 0 && !isAdding && (
          <div className="empty-state"><GraduationCap size={26} style={{ opacity: .2 }} /><p>Eğitim bilgisi eklemek için "Ekle" butonuna tıklayın</p></div>
        )}
      </div>
    </div>
  );
}
