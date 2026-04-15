import type { CVData } from '../../types/cv';
import { calculateATSScore } from '../../utils/atsScore';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck } from 'lucide-react';

interface ATSScorePanelProps { data: CVData; }

const ACCENT = '#38BDF8';

export function ATSScorePanel({ data }: ATSScorePanelProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { total, sections } = calculateATSScore(data);

  const tp = isDark ? '#F1F5F9' : '#0F172A';
  const tm = isDark ? '#94A3B8' : '#64748B';
  const pbd = isDark ? 'rgba(56,189,248,0.09)' : 'rgba(14,165,233,0.15)';

  const getColor = (pct: number) => pct >= 80 ? '#22c55e' : pct >= 55 ? '#f59e0b' : '#ef4444';
  const color = getColor(total);
  const label = total >= 80 ? 'Mükemmel' : total >= 60 ? 'İyi' : total >= 40 ? 'Orta' : 'Zayıf';
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - total / 100);

  return (
    <div>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <div className="sec-icon"><ShieldCheck size={14} /></div>
        <span style={{ fontSize: '14px', fontWeight: 700, color: tp }}>ATS Uyum Skoru</span>
      </div>

      {/* Score card */}
      <div style={{
        background: isDark ? 'rgba(15,23,42,0.55)' : 'rgba(248,250,252,0.9)',
        border: `1px solid ${pbd}`,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        display: 'flex', alignItems: 'center', gap: '24px',
      }}>
        {/* Circle gauge */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width="92" height="92" viewBox="0 0 92 92">
            {/* Track */}
            <circle cx="46" cy="46" r={r} fill="none"
              stroke={isDark ? 'rgba(56,189,248,0.1)' : '#E2E8F0'}
              strokeWidth="7" />
            {/* Progress */}
            <circle cx="46" cy="46" r={r} fill="none"
              stroke={color} strokeWidth="7"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 46 46)"
              style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1), stroke 0.4s' }}
            />
            {/* Glow ring */}
            <circle cx="46" cy="46" r={r} fill="none"
              stroke={color} strokeWidth="1.5"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 46 46)"
              opacity="0.3"
              filter="url(#glow)"
              style={{ transition: 'stroke-dashoffset 0.7s' }}
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '22px', fontWeight: 800, color, lineHeight: 1 }}>{total}</span>
            <span style={{ fontSize: '10px', color: tm, fontWeight: 500 }}>/100</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: tp, marginBottom: '2px' }}>Tarayıcı uyumluluğu</p>
          <p style={{ fontSize: '22px', fontWeight: 800, color, lineHeight: 1, marginBottom: '4px' }}>{label}</p>
          <p style={{ fontSize: '12px', color: tm, lineHeight: 1.4, maxWidth: '200px' }}>
            ATS sistemlerinin CV içeriğini ne kadar kolay okuyabileceğinin göstergesi
          </p>
        </div>
      </div>

      {/* Section breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sections.map(sec => {
          const pct = Math.round((sec.score / sec.max) * 100);
          const c = getColor(pct);
          return (
            <div key={sec.label} style={{
              background: isDark ? 'rgba(15,23,42,0.45)' : 'rgba(248,250,252,0.8)',
              border: `1px solid ${pbd}`,
              borderRadius: '12px', padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: tp }}>{sec.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: c }}>{sec.score}/{sec.max}</span>
              </div>
              <div style={{ height: '5px', borderRadius: '10px', background: isDark ? 'rgba(56,189,248,0.08)' : '#E2E8F0', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`, background: c,
                  borderRadius: '10px',
                  boxShadow: pct > 0 ? `0 0 8px ${c}55` : 'none',
                  transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </div>
              {sec.score < sec.max && (
                <p style={{ fontSize: '11.5px', color: tm, marginTop: '5px' }}>💡 {sec.tip}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
