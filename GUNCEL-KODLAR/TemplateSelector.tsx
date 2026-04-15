import type { CVTemplate } from '../../types/cv';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  current: CVTemplate;
  onChange: (t: CVTemplate) => void;
}

const T: { id: CVTemplate; label: string; desc: string; ac: string; lc: string }[] = [
  { id:'classic', label:'Classic',  desc:'Kurumsal',    ac:'#0F2850', lc:'#1e3a6e' },
  { id:'modern',  label:'Modern',   desc:'Mavi & çağdaş', ac:'#0062cc', lc:'#3b82f6' },
  { id:'minimal', label:'Minimal',  desc:'Sade & odaklı', ac:'#374151', lc:'#6b7280' },
];

function Mini({ ac, lc }: { ac: string; lc: string }) {
  return (
    <svg viewBox="0 0 80 100" width="56" height="70" style={{ display: 'block' }}>
      <rect width="80" height="100" fill="#fff" rx="3" />
      <rect x="8" y="8"  width="44" height="5"   rx="2"   fill={ac} />
      <rect x="8" y="15" width="28" height="2.5" rx="1.2" fill={lc} opacity=".5" />
      <rect x="8" y="21" width="64" height="1"   fill={ac} />
      <rect x="8" y="26" width="20" height="2.2" rx="1"   fill={ac} opacity=".65" />
      <rect x="8" y="31" width="36" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="35" width="52" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="39" width="44" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="46" width="22" height="2.2" rx="1"   fill={ac} opacity=".65" />
      <rect x="8" y="51" width="40" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="55" width="58" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="59" width="48" height="1.8" rx=".9"  fill="#e2e8f0" />
      <rect x="8" y="66" width="18" height="2.2" rx="1"   fill={ac} opacity=".65" />
      <rect x="8"  y="71" width="14" height="5" rx="2.5" fill={lc} opacity=".22" />
      <rect x="25" y="71" width="18" height="5" rx="2.5" fill={lc} opacity=".22" />
      <rect x="46" y="71" width="12" height="5" rx="2.5" fill={lc} opacity=".22" />
    </svg>
  );
}

export function TemplateSelector({ current, onChange }: TemplateSelectorProps) {
  return (
    <div>
      <p className="cvl" style={{ marginBottom: '10px' }}>CV Şablonu</p>
      <div className="tmpl-grid">
        {T.map(t => (
          <button
            key={t.id}
            className={`tmpl-card ${current === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {current === t.id && (
              <div className="tmpl-check">
                <Check size={9} color="#06111F" strokeWidth={3} />
              </div>
            )}
            <div className="tmpl-thumb"><Mini ac={t.ac} lc={t.lc} /></div>
            <div style={{ textAlign: 'center' }}>
              <p className="tmpl-label">{t.label}</p>
              <p className="tmpl-desc">{t.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
