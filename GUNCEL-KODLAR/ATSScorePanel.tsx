import { ShieldCheck } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { calculateATSScore } from '../../utils/atsScore';

export function ATSScorePanel({ data }: { data: CVData }) {
  const { total, sections } = calculateATSScore(data);

  const color = (p: number) => p >= 80 ? '#22c55e' : p >= 55 ? '#f59e0b' : '#ef4444';
  const c     = color(total);
  const label = total >= 80 ? 'Mükemmel' : total >= 60 ? 'İyi' : total >= 40 ? 'Orta' : 'Zayıf';
  const R     = 36;
  const circ  = 2 * Math.PI * R;
  const off   = circ * (1 - total / 100);

  return (
    <div>
      {/* Heading */}
      <div className="sec-head">
        <div className="sec-icon"><ShieldCheck size={14} /></div>
        <span className="sec-title">ATS Uyum Skoru</span>
      </div>

      {/* Score card */}
      <div className="ats-score-card">
        {/* Gauge */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r={R} fill="none"
              stroke="var(--card-bd)" strokeWidth="7" />
            <circle cx="44" cy="44" r={R} fill="none"
              stroke={c} strokeWidth="7"
              strokeDasharray={circ} strokeDashoffset={off}
              strokeLinecap="round" transform="rotate(-90 44 44)"
              style={{ transition: 'stroke-dashoffset .7s cubic-bezier(.4,0,.2,1), stroke .4s' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '21px', fontWeight: 800, color: c, lineHeight: 1 }}>{total}</span>
            <span style={{ fontSize: '10px', color: 'var(--tm)', fontWeight: 500 }}>/100</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>Tarayıcı uyumluluğu</p>
          <p style={{ fontSize: '22px', fontWeight: 800, color: c, lineHeight: 1, marginBottom: '4px' }}>{label}</p>
          <p style={{ fontSize: '12px', color: 'var(--tm)', lineHeight: 1.4, maxWidth: '190px' }}>
            ATS sistemlerinin CV içeriğini ne kadar kolay okuyabileceğinin göstergesi
          </p>
        </div>
      </div>

      {/* Breakdown */}
      {sections.map(sec => {
        const pct = Math.round((sec.score / sec.max) * 100);
        const sc  = color(pct);
        return (
          <div key={sec.label} className="ats-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{sec.label}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: sc }}>{sec.score}/{sec.max}</span>
            </div>
            <div style={{ height: '5px', borderRadius: '10px', background: 'var(--card-bd)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, background: sc,
                borderRadius: '10px',
                transition: 'width .6s cubic-bezier(.4,0,.2,1)',
              }} />
            </div>
            {sec.score < sec.max && (
              <p style={{ fontSize: '11.5px', color: 'var(--tm)', marginTop: '5px' }}>💡 {sec.tip}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
