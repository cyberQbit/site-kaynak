import type { CVTemplate } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';

interface TemplateSelectorProps {
  current: CVTemplate;
  onChange: (t: CVTemplate) => void;
}

const TEMPLATES: { id: CVTemplate; label: string; desc: string; preview: string }[] = [
  { id: 'classic', label: 'Classic', desc: 'Kurumsal & temiz', preview: '🏛' },
  { id: 'modern', label: 'Modern', desc: 'Mavi vurgulu', preview: '💎' },
  { id: 'minimal', label: 'Minimal', desc: 'Sade & odaklı', preview: '◻' },
];

export function TemplateSelector({ current, onChange }: TemplateSelectorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-2">
      <p className={`text-xs font-medium ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>CV Şablonu</p>
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`p-3 rounded-xl border-2 text-center transition-all ${
              current === t.id
                ? isDark
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                  : 'border-[#0062cc] bg-[#0062cc]/10'
                : isDark
                  ? 'border-[#374151] bg-[#1F2937] hover:border-[#4B5563]'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E0]'
            }`}
          >
            <div className="text-xl mb-1">{t.preview}</div>
            <p className={`text-xs font-medium ${
              current === t.id
                ? isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'
                : isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
            }`}>{t.label}</p>
            <p className={`text-xs ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
