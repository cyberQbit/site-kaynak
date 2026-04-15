import type { CVData } from '../types/cv';
import { calculateATSScore } from '../utils/atsScore';
import { useTheme } from '../context/ThemeContext';

interface ATSScorePanelProps {
  data: CVData;
}

export function ATSScorePanel({ data }: ATSScorePanelProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { total, sections } = calculateATSScore(data);

  const getColor = (pct: number) =>
    pct >= 80 ? '#22c55e' : pct >= 55 ? '#f59e0b' : '#ef4444';

  const totalPct = total;
  const strokeDasharray = 2 * Math.PI * 28;
  const strokeDashoffset = strokeDasharray * (1 - totalPct / 100);
  const color = getColor(totalPct);

  const label = totalPct >= 80 ? 'Mükemmel' : totalPct >= 60 ? 'İyi' : totalPct >= 40 ? 'Orta' : 'Zayıf';

  return (
    <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E2E8F0]'}`}>
      <div className="flex items-center gap-4 mb-4">
        {/* Circular gauge */}
        <div className="relative flex-shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none"
              stroke={isDark ? '#374151' : '#F1F3F5'} strokeWidth="6" />
            <circle cx="36" cy="36" r="28" fill="none"
              stroke={color} strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold" style={{ color }}>{total}</span>
            <span className="text-xs" style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>/100</span>
          </div>
        </div>
        <div>
          <p className={`font-semibold text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>ATS Uyum Skoru</p>
          <p className="text-xs font-medium" style={{ color }}>{label}</p>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
            Tarayıcı sistemleri tarafından okunabilirlik
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((sec: any) => {
          const pct = Math.round((sec.score / sec.max) * 100);
          const c = getColor(pct);
          return (
            <div key={sec.label}>
              <div className="flex justify-between items-center mb-0.5">
                <span className={`text-xs ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>{sec.label}</span>
                <span className="text-xs font-medium" style={{ color: c }}>{sec.score}/{sec.max}</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#374151]' : 'bg-[#F1F3F5]'}`}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: c }} />
              </div>
              {sec.score < sec.max && (
                <p className={`text-xs mt-0.5 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                  💡 {sec.tip}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
