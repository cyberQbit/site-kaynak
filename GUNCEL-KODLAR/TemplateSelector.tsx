import type { CVTemplate } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  current: CVTemplate;
  onChange: (t: CVTemplate) => void;
}

const ACCENT      = '#38BDF8';
const ACCENT_GLOW = 'rgba(56,189,248,0.14)';

const TEMPLATES: { id: CVTemplate; label: string; desc: string; ac: string; lc: string }[] = [
  { id: 'classic', label: 'Classic',  desc: 'Kurumsal & güvenilir', ac: '#0F2850', lc: '#1e3a6e' },
  { id: 'modern',  label: 'Modern',   desc: 'Mavi & çağdaş',       ac: '#0062cc', lc: '#3b82f6' },
  { id: 'minimal', label: 'Minimal',  desc: 'Sade & odaklı',        ac: '#374151', lc: '#6b7280' },
];

function MiniCV({ ac, lc }: { ac: string; lc: string }) {
  return (
    <svg viewBox="0 0 80 100" width="60" height="75" style={{ display: 'block' }}>
      <rect width="80" height="100" fill="#fff" rx="3" />
      <rect x="8" y="8"  width="44" height="5"   rx="2"   fill={ac} />
      <rect x="8" y="15" width="28" height="2.5" rx="1.2" fill={lc} opacity="0.5" />
      <rect x="8" y="21" width="64" height="1"   rx="0.5" fill={ac} />
      <rect x="8" y="26" width="20" height="2.2" rx="1"   fill={ac} opacity="0.65" />
      <rect x="8" y="31" width="36" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="35" width="52" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="39" width="44" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="46" width="22" height="2.2" rx="1"   fill={ac} opacity="0.65" />
      <rect x="8" y="51" width="40" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="55" width="58" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="59" width="48" height="1.8" rx="0.9" fill="#e2e8f0" />
      <rect x="8" y="66" width="18" height="2.2" rx="1"   fill={ac} opacity="0.65" />
      <rect x="8"  y="71" width="14" height="5" rx="2.5" fill={lc} opacity="0.22" />
      <rect x="25" y="71" width="18" height="5" rx="2.5" fill={lc} opacity="0.22" />
      <rect x="46" y="71" width="12" height="5" rx="2.5" fill={lc} opacity="0.22" />
    </svg>
  );
}

export function TemplateSelector({ current, onChange }: TemplateSelectorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const tp = isDark ? '#F1F5F9' : '#0F172A';
  const tm = isDark ? '#94A3B8' : '#64748B';

  return (
    <div>
      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: tm, marginBottom: '10px' }}>
        CV Şablonu
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {TEMPLATES.map(t => {
          const active = current === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              padding: '14px 10px 12px',
              background: active ? (isDark ? 'rgba(56,189,248,0.07)' : 'rgba(14,165,233,0.05)') : (isDark ? 'rgba(15,23,42,0.55)' : 'rgba(248,250,252,0.9)'),
              border: `1.5px solid ${active ? ACCENT : (isDark ? 'rgba(56,189,248,0.09)' : '#E2E8F0')}`,
              borderRadius: '14px', cursor: 'pointer',
              transition: 'all 0.18s', position: 'relative',
              boxShadow: active ? `0 0 0 3px ${ACCENT_GLOW}` : 'none',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              {active && (
                <span style={{ position: 'absolute', top: '8px', right: '8px', width: '18px', height: '18px', borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px rgba(56,189,248,0.45)` }}>
                  <Check size={10} color="#06111F" strokeWidth={3} />
                </span>
              )}
              <div style={{ padding: '4px', background: '#fff', borderRadius: '6px', boxShadow: active ? `0 2px 14px rgba(56,189,248,0.20)` : '0 1px 6px rgba(0,0,0,0.09)', transition: 'box-shadow 0.18s' }}>
                <MiniCV ac={t.ac} lc={t.lc} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: active ? ACCENT : tp, lineHeight: 1 }}>{t.label}</p>
                <p style={{ fontSize: '11px', color: tm, marginTop: '2px' }}>{t.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
