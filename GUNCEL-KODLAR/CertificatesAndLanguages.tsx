import { useState } from 'react';
import { Award, Plus, Trash2, X, Languages } from 'lucide-react';
import type { Certificate, Language } from '../../types/cv';

interface CertificatesFormProps {
  certificates: Certificate[];
  onAdd: (c: Omit<Certificate,'id'>) => void;
  onRemove: (id: string) => void;
}

export function CertificatesForm({ certificates, onAdd, onRemove }: CertificatesFormProps) {
  const [open, setOpen] = useState(false);
  const [d, setD] = useState({ name:'', issuer:'', date:'', url:'' });

  return (
    <div>
      <div className="sec-head" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sec-icon"><Award size={14} /></div>
          <span className="sec-title">Sertifikalar</span>
          {certificates.length > 0 && <span className="sec-count">{certificates.length}</span>}
        </div>
        <button className="btn-g" style={{ padding: '6px 12px', fontSize: '12.5px' }} onClick={() => setOpen(!open)}>
          {open ? <><X size={12}/> İptal</> : <><Plus size={12}/> Ekle</>}
        </button>
      </div>

      {open && (
        <div className="add-zone ani" style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label className="cvl">Sertifika Adı *</label>
              <input className="cvi no-icon" value={d.name} onChange={e => setD(p=>({...p,name:e.target.value}))} placeholder="AWS Solutions Architect" />
            </div>
            <div className="form-grid-2" style={{ gap: '10px' }}>
              <div>
                <label className="cvl">Veren Kurum</label>
                <input className="cvi no-icon" value={d.issuer} onChange={e => setD(p=>({...p,issuer:e.target.value}))} placeholder="Amazon" />
              </div>
              <div>
                <label className="cvl">Tarih</label>
                <input type="month" className="cvi no-icon" value={d.date} onChange={e => setD(p=>({...p,date:e.target.value}))} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button className="btn-g" style={{ padding: '8px 14px' }} onClick={() => setOpen(false)}>İptal</button>
            <button className="btn-p" disabled={!d.name}
              onClick={() => { onAdd(d); setD({name:'',issuer:'',date:'',url:''}); setOpen(false); }}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {certificates.map(c => (
          <div key={c.id} className="cvc" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: '13px', marginBottom: '1px' }}>{c.name}</p>
              {c.issuer && <p style={{ fontSize: '12px', color: 'var(--tm)' }}>{c.issuer}</p>}
            </div>
            <button className="btn-del" onClick={() => onRemove(c.id)}><Trash2 size={13} /></button>
          </div>
        ))}
        {certificates.length === 0 && !open && (
          <div className="empty-state"><Award size={24} style={{ opacity: .2 }} /><p>Sertifika ekleyin</p></div>
        )}
      </div>
    </div>
  );
}

/* ── Languages ──────────────────────────────────────────────── */
interface LanguagesFormProps {
  languages: Language[];
  onAdd: (l: Omit<Language,'id'>) => void;
  onRemove: (id: string) => void;
}

const LEVELS: Language['level'][] = ['A1','A2','B1','B2','C1','C2','Native'];
const LEVEL_LABEL: Record<Language['level'], string> = {
  A1:'A1 Başlangıç', A2:'A2 Temel', B1:'B1 Orta', B2:'B2 Orta Üstü',
  C1:'C1 İleri', C2:'C2 Üst Düzey', Native:'Anadil',
};

export function LanguagesForm({ languages, onAdd, onRemove }: LanguagesFormProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Language['level']>('B2');

  const handleAdd = () => {
    const trim = name.trim();
    if (!trim) return;
    onAdd({ name: trim, level });
    setName('');
  };

  return (
    <div>
      <div className="sec-head">
        <div className="sec-icon"><Languages size={14} /></div>
        <span className="sec-title">Diller</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <input className="cvi no-icon" style={{ flex: '1 1 120px', minWidth: 0 }}
          value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder="İngilizce, Almanca..." />
        <select className="cvi no-icon" style={{ flex: '0 0 auto', width: '150px' }}
          value={level} onChange={e => setLevel(e.target.value as Language['level'])}>
          {LEVELS.map(l => <option key={l} value={l}>{LEVEL_LABEL[l]}</option>)}
        </select>
        <button className="btn-p" style={{ padding: '10px 14px' }} disabled={!name.trim()} onClick={handleAdd}>
          <Plus size={15} />
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {languages.map(l => (
          <span key={l.id} className="stag">
            {l.name}
            <span style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600 }}>({l.level})</span>
            <button
              onClick={() => onRemove(l.id)}
              style={{ background:'none', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', color:'var(--ts)', transition:'color .14s' }}
              onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--danger)'}
              onMouseOut={e  => (e.currentTarget as HTMLButtonElement).style.color = 'var(--ts)'}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        {languages.length === 0 && (
          <p style={{ fontSize: '12.5px', color: 'var(--ts)' }}>Dil ve seviye girerek ekleyin</p>
        )}
      </div>
    </div>
  );
}
